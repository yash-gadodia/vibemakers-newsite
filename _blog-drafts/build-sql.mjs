// Generates INSERT.sql from the 4 cleaned blog post markdown drafts.
// Each post has frontmatter with: title, slug, description, meta_title,
// meta_description, category, tags. The .html sibling holds rendered body.
//
// Run from /Users/yash/Documents/vibemakers-newsite/_blog-drafts:
//     node build-sql.mjs > INSERT.sql
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SLUGS = [
  "what-is-vibe-coding",
  "ai-coding-vs-traditional",
  "moe-4-ai-learns",
  "lovable-cursor-claude-chatgpt",
  "dsa-portfolio-singapore",
  "ai-coding-projects-teens-real-problems",
  "teen-coding-without-syntax",
];

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]+?)\n---/);
  if (!m) return {};
  const fm = {};
  const lines = m[1].split("\n");
  for (const line of lines) {
    const km = line.match(/^([a-z_]+):\s*(.*)$/i);
    if (!km) continue;
    let v = km[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    if (v.startsWith("[") && v.endsWith("]")) {
      v = v.slice(1, -1)
        .split(",")
        .map((x) => x.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }
    fm[km[1].toLowerCase()] = v;
  }
  return fm;
}

function sqlEscape(v) {
  if (v === null || v === undefined) return "NULL";
  if (Array.isArray(v))
    return "ARRAY[" + v.map((x) => `'${String(x).replace(/'/g, "''")}'`).join(",") + "]::text[]";
  return `'${String(v).replace(/'/g, "''")}'`;
}

const out = [];
out.push("-- Vibe Makers Academy — 4 SEO blog posts (de-fabricated 2026-05-01)");
out.push("-- Run in Supabase SQL editor (https://supabase.com/dashboard).");
out.push("-- Each row uses ON CONFLICT (slug) DO UPDATE so it's idempotent.");
out.push("");

for (const slug of SLUGS) {
  const md = readFileSync(join(__dirname, slug + ".md"), "utf8");
  const html = readFileSync(join(__dirname, slug + ".html"), "utf8");
  const fm = parseFrontmatter(md);

  const row = {
    title: fm.title,
    slug: fm.slug || slug,
    description: fm.description || null,
    meta_title: fm.meta_title || null,
    meta_description: fm.meta_description || null,
    category: fm.category || null,
    tags: Array.isArray(fm.tags) ? fm.tags : null,
    html_content: html,
    author: fm.author || "Vibe Makers Academy",
    status: "published",
    published_at: "2026-05-01T00:00:00Z",
  };

  out.push(`-- ${row.title}`);
  out.push(
    `INSERT INTO public.blog_posts (title, slug, description, meta_title, meta_description, category, tags, html_content, author, status, published_at)`
  );
  out.push(
    `VALUES (${[
      sqlEscape(row.title),
      sqlEscape(row.slug),
      sqlEscape(row.description),
      sqlEscape(row.meta_title),
      sqlEscape(row.meta_description),
      sqlEscape(row.category),
      sqlEscape(row.tags),
      sqlEscape(row.html_content),
      sqlEscape(row.author),
      sqlEscape(row.status),
      sqlEscape(row.published_at) + "::timestamptz",
    ].join(", ")})`
  );
  out.push(
    `ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, meta_title = EXCLUDED.meta_title, meta_description = EXCLUDED.meta_description, category = EXCLUDED.category, tags = EXCLUDED.tags, html_content = EXCLUDED.html_content, author = EXCLUDED.author, status = EXCLUDED.status, published_at = EXCLUDED.published_at, updated_at = now();`
  );
  out.push("");
}

writeFileSync(join(__dirname, "INSERT.sql"), out.join("\n"));
console.log(`Wrote ${out.length} lines to INSERT.sql`);
