// Tiny Node server for Railway: serves the Vite build + a /api/notify-telegram
// endpoint that posts to Vibby (the vibemakers Telegram bot) for the
// vibemakers group chat. Replaces the old `serve -s dist` runtime.
//
// Env vars (set on Railway):
//   PORT                  — provided by Railway, fall back to 3000 in dev
//   TELEGRAM_BOT_TOKEN    — vibby2_bot token
//   TELEGRAM_CHAT_ID      — vibemakers group chat id (negative number)
//
// The endpoint is open (no auth) — anyone could spam it. That's an accepted
// trade-off for now since the only thing they can do is post a noisy message
// in the vibemakers group; bot token never leaves the server.

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const PORT = parseInt(process.env.PORT || "3000", 10);

const escapeMd = (s) =>
  String(s ?? "").replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");

function formatMessage(formType, data) {
  const lines = [];
  switch (formType) {
    case "parent_interest":
      lines.push("*🎓 New Parent Interest*");
      lines.push(
        `Parent: ${escapeMd(data.parent_name)} \\(${escapeMd(data.parent_email)}\\)`,
      );
      lines.push(
        `Student: ${escapeMd(data.student_name)} \\(age ${escapeMd(data.student_age)}\\)`,
      );
      if (data.programme_interest)
        lines.push(`Interest: ${escapeMd(data.programme_interest)}`);
      if (data.message) lines.push(`Message: ${escapeMd(data.message)}`);
      break;
    case "school_enquiry":
      lines.push("*🏫 New School Enquiry*");
      lines.push(
        `From: ${escapeMd(data.contact_name)}${data.contact_role ? ` \\(${escapeMd(data.contact_role)}\\)` : ""}`,
      );
      if (data.school_name)
        lines.push(`School: ${escapeMd(data.school_name)}`);
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
      lines.push(
        `Name: ${escapeMd(data.name)} \\(${escapeMd(data.email)}\\)`,
      );
      lines.push(
        `School: ${escapeMd(data.school)}, age ${escapeMd(data.age_group)}`,
      );
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

const app = new Hono();

// CORS so the React app can call this in dev and prod
app.use("/api/*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  if (c.req.method === "OPTIONS") return c.text("", 204);
  await next();
});

app.post("/api/notify-telegram", async (c) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return c.json(
      { ok: false, error: "Telegram not configured on server" },
      500,
    );
  }
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "Invalid JSON body" }, 400);
  }
  const { formType, data } = body || {};
  if (!formType || typeof formType !== "string") {
    return c.json({ ok: false, error: "formType is required" }, 400);
  }
  try {
    const text = formatMessage(formType, data || {});
    const resp = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        }),
      },
    );
    if (!resp.ok) {
      const err = await resp.text();
      console.error("Telegram send failed:", resp.status, err);
      return c.json(
        { ok: false, error: `Telegram returned ${resp.status}` },
        502,
      );
    }
    return c.json({ ok: true });
  } catch (e) {
    console.error("Telegram error:", e);
    return c.json({ ok: false, error: String(e) }, 500);
  }
});

app.get("/api/health", (c) =>
  c.json({
    ok: true,
    telegramConfigured: Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID),
  }),
);

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
});
