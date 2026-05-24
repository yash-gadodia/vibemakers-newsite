#!/usr/bin/env node
// Insert (or upsert) a blog post into Railway Postgres blog_posts table.
// Usage:
//   railway run node scripts/insert-blog-post.mjs content/blog/<slug>.md
// or directly:
//   DATABASE_URL=... node scripts/insert-blog-post.mjs content/blog/<slug>.md

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import pg from "pg";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/insert-blog-post.mjs <path-to-markdown>");
  process.exit(1);
}

const raw = await readFile(resolve(file), "utf8");
const { data: meta, content: md } = matter(raw);
const html = marked.parse(md);

for (const k of ["title", "slug", "description"]) {
  if (!meta[k]) {
    console.error(`Front-matter missing required field: ${k}`);
    process.exit(1);
  }
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: dbUrl,
  ssl: dbUrl.includes("railway.internal") ? false : { rejectUnauthorized: false },
});

const sql = `
  INSERT INTO blog_posts (
    title, slug, description, html_content, author, category, tags,
    cover_image, status, meta_title, meta_description, published_at,
    created_at, updated_at
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW(), NOW()
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    html_content = EXCLUDED.html_content,
    author = EXCLUDED.author,
    category = EXCLUDED.category,
    tags = EXCLUDED.tags,
    cover_image = EXCLUDED.cover_image,
    status = EXCLUDED.status,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    updated_at = NOW()
  RETURNING id, slug, status, published_at;
`;

try {
  const res = await pool.query(sql, [
    meta.title,
    meta.slug,
    meta.description,
    html,
    meta.author ?? "Vibe Makers Academy",
    meta.category ?? null,
    meta.tags ?? null,
    meta.cover_image ?? null,
    meta.status ?? "draft",
    meta.meta_title ?? meta.title,
    meta.meta_description ?? meta.description,
  ]);
  console.log("Upserted:", res.rows[0]);
} catch (e) {
  console.error("Insert failed:", e.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
