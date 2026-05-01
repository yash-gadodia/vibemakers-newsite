# How to publish the 4 SEO blog posts

The 4 cleaned blog posts are ready. Anon-key insertion is blocked by RLS, so paste this SQL once in Supabase dashboard.

## Steps

1. Open https://supabase.com/dashboard/project/rtvlqgieeckkxdwjbnrh/sql/new
2. Open `_blog-drafts/INSERT.sql` (1051 lines — same content also in `supabase/migrations/20260502003453_insert_blog_posts.sql`)
3. Copy entire contents → paste into the SQL editor
4. Click **Run** (bottom-right green button)
5. Verify on https://vibemakers.dev/blog — 4 posts should show up immediately

## What gets inserted

| Slug | Target keyword | Word count |
|---|---|---|
| `what-is-vibe-coding-singapore-parent-guide` | "what is vibe coding" / "vibe coding Singapore" | ~1,800 |
| `ai-coding-vs-traditional-dsa-eae` | "AI coding vs Python" / "DSA portfolio" | ~2,300 |
| `moe-4-ai-learns-framework-guide` | "MOE 4 AI Learns" / "EdTech Masterplan 2030" | ~2,200 |
| `ai-tools-comparison-teens` | "Lovable vs Cursor" / "AI tools for teens" | ~2,000 |

The SQL uses `ON CONFLICT (slug) DO UPDATE` — safe to re-run if you tweak any post.

## What was de-fabricated before push

Earlier drafts (now deleted) named specific schools as having student stories that didn't happen:
- "An RGS student in English class analyzed..." — removed
- "A Hwa Chong student scored A1 on Chinese O Levels..." — removed
- "An ACS Independent student stuck on physics..." — removed
- "A National Junior College student built a mental health app..." — removed
- "Vibe Makers has been running programmes with RGS and Loyang View Secondary for over a year" — corrected (Loyang View was won Apr 2026)
- Speculative stats ("100% of students ship by week 4", etc.) — replaced with framework reasoning
- "Coding Lab Python Level 3" name-drop — generalized to "12-week Python course"

Framework analysis, MOE policy references, V.I.B.E. methodology, and Lovable/Cursor/Claude tool comparisons all kept as-is — they're not fabricated.
