// Vibe Makers — Railway server
//
// Hono app that serves the Vite SPA + a small REST API backed by Railway
// Postgres (DATABASE_URL). Endpoints:
//
//   GET  /api/health
//   GET  /api/blog                  — list published posts (cards on /blog)
//   GET  /api/blog/:slug            — single post (rendered on /blog/:slug)
//   POST /api/parent-interest       — /parents form
//   POST /api/school-enquiries      — /schools form
//   POST /api/hackathon-waitlist    — /hackathon form
//   POST /api/notify-telegram       — Vibby ping (called by GH Actions + forms)
//
// All form POSTs also fire a Telegram notification to the vibemakers group.
//
// Env vars (Railway):
//   PORT                   — provided by Railway, defaults to 3000 in dev
//   DATABASE_URL           — Postgres connection string (provided by the
//                            Postgres-vU8j service via Railway internal DNS)
//   TELEGRAM_BOT_TOKEN     — vibby2_bot
//   TELEGRAM_CHAT_ID       — vibemakers group (-512751062)

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises";
import pg from "pg";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = parseInt(process.env.PORT || "3000", 10);

// Single shared connection pool. Railway internal Postgres doesn't need SSL.
const pool = DATABASE_URL
  ? new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("railway.internal") ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30_000,
    })
  : null;

const escapeMd = (s) =>
  String(s ?? "").replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");

function formatMessage(formType, data) {
  const lines = [];
  switch (formType) {
    case "parent_interest":
      lines.push("*🎓 New Parent Interest*");
      lines.push(`Parent: ${escapeMd(data.parent_name)} \\(${escapeMd(data.parent_email)}\\)`);
      lines.push(`Student: ${escapeMd(data.student_name)} \\(age ${escapeMd(data.student_age)}\\)`);
      if (data.programme_interest) lines.push(`Interest: ${escapeMd(data.programme_interest)}`);
      if (data.message) lines.push(`Message: ${escapeMd(data.message)}`);
      break;
    case "school_enquiry":
      lines.push("*🏫 New School Enquiry*");
      lines.push(
        `From: ${escapeMd(data.contact_name)}${data.contact_role ? ` \\(${escapeMd(data.contact_role)}\\)` : ""}`,
      );
      if (data.school_name) lines.push(`School: ${escapeMd(data.school_name)}`);
      lines.push(`Email: ${escapeMd(data.contact_email)}`);
      if (data.number_of_students || data.student_level) {
        lines.push(
          `Cohort: ${escapeMd(data.number_of_students || "-")} ${escapeMd(data.student_level || "")}`.trim(),
        );
      }
      const schoolMsg = data.message || data.programme_objectives;
      if (schoolMsg) lines.push(`Message: ${escapeMd(schoolMsg)}`);
      break;
    case "hackathon_waitlist":
      lines.push("*🏆 New Hackathon Signup*");
      lines.push(`Name: ${escapeMd(data.name)} \\(${escapeMd(data.email)}\\)`);
      lines.push(`School: ${escapeMd(data.school)}, age ${escapeMd(data.age_group)}`);
      lines.push(`Parental consent: ${data.parental_consent ? "✓" : "✗"}`);
      break;
    case "deploy":
      lines.push("*🚀 Site updated*");
      if (data.commit) lines.push(`Commit: \`${escapeMd(data.commit)}\``);
      if (data.message) lines.push(escapeMd(data.message));
      if (data.url) lines.push(`URL: ${escapeMd(data.url)}`);
      break;
    case "test":
      lines.push("*🤖 Test ping*");
      if (data.message) lines.push(escapeMd(data.message));
      break;
    default:
      lines.push("*New form submission*");
      lines.push("```");
      lines.push(JSON.stringify(data, null, 2));
      lines.push("```");
  }
  return lines.join("\n");
}

async function pingTelegram(formType, data) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    const text = formatMessage(formType, data || {});
    const resp = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
        disable_web_page_preview: true,
      }),
    });
    if (!resp.ok) console.error("Telegram send failed:", resp.status, await resp.text());
  } catch (e) {
    console.error("Telegram error:", e);
  }
}

// Simple in-memory per-IP rate limiter for the public form endpoints. Fixed
// 1-minute window, resets on redeploy. Fine for a single Railway instance at
// marketing-site traffic; keeps form spam out of Postgres + the Telegram group.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateBuckets = new Map();

function rateLimited(c) {
  const ip =
    (c.req.header("x-forwarded-for") || "").split(",")[0].trim() ||
    c.req.header("x-real-ip") ||
    "unknown";
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.reset) {
    if (rateBuckets.size > 5000) {
      for (const [k, v] of rateBuckets) if (now > v.reset) rateBuckets.delete(k);
    }
    rateBuckets.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

const app = new Hono();

app.use("/api/*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  if (c.req.method === "OPTIONS") return c.text("", 204);
  await next();
});

app.get("/api/health", (c) =>
  c.json({
    ok: true,
    db: Boolean(pool),
    telegramConfigured: Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID),
  }),
);

// =============================================================================
// Blog
// =============================================================================
app.get("/api/blog", async (c) => {
  if (!pool) return c.json({ ok: false, error: "DB unavailable" }, 503);
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, description, meta_title, meta_description,
              category, tags, cover_image, author, status, published_at
         FROM blog_posts
        WHERE status = 'published'
        ORDER BY published_at DESC NULLS LAST, created_at DESC`,
    );
    return c.json({ ok: true, posts: rows });
  } catch (e) {
    console.error("/api/blog list error:", e);
    return c.json({ ok: false, error: "Server error" }, 500);
  }
});

app.get("/api/blog/:slug", async (c) => {
  if (!pool) return c.json({ ok: false, error: "DB unavailable" }, 503);
  const slug = c.req.param("slug");
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, description, meta_title, meta_description,
              category, tags, cover_image, html_content, author, status,
              published_at, created_at, updated_at
         FROM blog_posts
        WHERE slug = $1 AND status = 'published'
        LIMIT 1`,
      [slug],
    );
    if (!rows.length) return c.json({ ok: false, error: "Not found" }, 404);
    return c.json({ ok: true, post: rows[0] });
  } catch (e) {
    console.error("/api/blog/:slug error:", e);
    return c.json({ ok: false, error: "Server error" }, 500);
  }
});

// =============================================================================
// Forms — each returns the inserted row + fires a Telegram ping
// =============================================================================
async function readJson(c) {
  try {
    return await c.req.json();
  } catch {
    return null;
  }
}

app.post("/api/parent-interest", async (c) => {
  if (!pool) return c.json({ ok: false, error: "DB unavailable" }, 503);
  if (rateLimited(c)) return c.json({ ok: false, error: "Too many requests. Please try again in a minute." }, 429);
  const body = await readJson(c);
  if (!body) return c.json({ ok: false, error: "Invalid JSON" }, 400);
  const {
    parent_name,
    parent_email,
    student_name,
    student_age,
    programme_interest,
    message,
    enquiry_type,
  } = body;
  if (!parent_name || !parent_email || !student_name || !student_age) {
    return c.json({ ok: false, error: "Missing required fields" }, 400);
  }
  // enquiry_type is optional on the wire — older clients won't send it.
  // Default to 'for_teen' to match historical /parents form behaviour.
  const safeEnquiryType =
    enquiry_type === "for_self" || enquiry_type === "for_teen" ? enquiry_type : "for_teen";
  try {
    const { rows } = await pool.query(
      `INSERT INTO parent_interest (parent_name, parent_email, student_name, student_age, programme_interest, message, enquiry_type)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        parent_name,
        parent_email,
        student_name,
        student_age,
        programme_interest || null,
        message || null,
        safeEnquiryType,
      ],
    );
    pingTelegram("parent_interest", rows[0]);
    return c.json({ ok: true, row: rows[0] });
  } catch (e) {
    console.error("/api/parent-interest error:", e);
    return c.json({ ok: false, error: "Server error" }, 500);
  }
});

app.post("/api/school-enquiries", async (c) => {
  if (!pool) return c.json({ ok: false, error: "DB unavailable" }, 503);
  if (rateLimited(c)) return c.json({ ok: false, error: "Too many requests. Please try again in a minute." }, 429);
  const body = await readJson(c);
  if (!body) return c.json({ ok: false, error: "Invalid JSON" }, 400);
  const {
    contact_name, contact_email, contact_role, school_name, student_level,
    number_of_students, programme_objectives, timing_sessions, message,
  } = body;
  if (!contact_name || !contact_email) {
    return c.json({ ok: false, error: "Missing required fields" }, 400);
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO school_enquiries (contact_name, contact_email, contact_role, school_name,
                                     student_level, number_of_students, programme_objectives,
                                     timing_sessions, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        contact_name, contact_email, contact_role || null, school_name || null,
        student_level || null, number_of_students || null, programme_objectives || null,
        timing_sessions || null, message || null,
      ],
    );
    pingTelegram("school_enquiry", rows[0]);
    return c.json({ ok: true, row: rows[0] });
  } catch (e) {
    console.error("/api/school-enquiries error:", e);
    return c.json({ ok: false, error: "Server error" }, 500);
  }
});

app.post("/api/hackathon-waitlist", async (c) => {
  if (!pool) return c.json({ ok: false, error: "DB unavailable" }, 503);
  if (rateLimited(c)) return c.json({ ok: false, error: "Too many requests. Please try again in a minute." }, 429);
  const body = await readJson(c);
  if (!body) return c.json({ ok: false, error: "Invalid JSON" }, 400);
  const { name, email, school, age_group, parental_consent } = body;
  if (!name || !email || !school || !age_group) {
    return c.json({ ok: false, error: "Missing required fields" }, 400);
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO hackathon_waitlist (name, email, school, age_group, parental_consent)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [name, email, school, age_group, Boolean(parental_consent)],
    );
    pingTelegram("hackathon_waitlist", rows[0]);
    return c.json({ ok: true, row: rows[0] });
  } catch (e) {
    console.error("/api/hackathon-waitlist error:", e);
    return c.json({ ok: false, error: "Server error" }, 500);
  }
});

// Legacy endpoint — frontend has been ported to dedicated form endpoints
// above, but this one stays in case GitHub Actions or any external caller
// is still using it for deploy / generic notifications.
app.post("/api/notify-telegram", async (c) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return c.json({ ok: false, error: "Telegram not configured on server" }, 500);
  }
  const body = await readJson(c);
  if (!body) return c.json({ ok: false, error: "Invalid JSON body" }, 400);
  const { formType, data } = body || {};
  if (!formType || typeof formType !== "string") {
    return c.json({ ok: false, error: "formType is required" }, 400);
  }
  await pingTelegram(formType, data || {});
  return c.json({ ok: true });
});

// Static SPA — serve dist/, fall back to index.html for client-side routes
app.use("/*", serveStatic({ root: "./dist" }));
app.notFound(async (c) => {
  try {
    const html = await readFile("./dist/index.html", "utf8");
    return c.html(html);
  } catch {
    return c.text("Not found", 404);
  }
});

serve({ fetch: app.fetch, port: PORT, hostname: "0.0.0.0" }, (info) => {
  console.log(`Server listening on port ${info.port}`);
  console.log(`DB: ${pool ? "connected pool ready" : "no DATABASE_URL"}`);
  console.log(`Telegram: ${TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID ? "configured" : "not configured"}`);
});
