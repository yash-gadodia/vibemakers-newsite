# RGS Workshop Rollout — Design Spec

**Date**: 2026-05-24
**Owner**: Yash
**Status**: Draft — awaiting review
**Scope**: Task A of a two-task initiative. Task B (autonomous AI blog system, every 3 days) is a separate spec to be brainstormed after Task A ships.

## Goal

Land evidence of the successful RGS workshop (5 May + 14 May 2026, 40 students, 2×2hr sessions) across four surfaces of vibemakers.dev within 1–2 days, with placeholder quotes that Yash will fill in later.

## Why now

- Workshop ran successfully; we have 14 photos from the day
- RGS is on our trust bar already as a logo; we now have **evidence** of delivery, not just a brand pledge
- School-sales pipeline benefits from a citable case study
- Establishes the quality benchmark for Task B's autonomous AI blog system

## Non-goals

- Building the autonomous blog system (Task B, separate spec)
- Replacing the fictional CCA-tracker case study on `/programme` (it's a V.I.B.E. teaching device — keep)
- Adults / working-adult positioning (mentioned by Yash but out of scope for this rollout)
- Real Dr Lim / student quote sourcing — placeholders only; Yash fills before final ship

## Surfaces + changes

### 1. Photo gallery — homepage

**File**: `src/components/home/PhotoGallery.tsx`
**Assets**: 6 photos → `src/assets/gallery/rgs-w1-01.jpg` … `rgs-w1-06.jpg`

**Selection rule** (pick 6 from 14):
- Prioritise landscape WhatsApp images (2048×1536) for better grid fit
- Show variety: students-at-screens · instructor-presenting · close-up-of-work · wide-room-shot · collaboration · demo-moment
- Resize to ~1600px wide, optimise to <300KB each (current ~500KB+)

**Code change**: Append 6 entries to `galleryImages` array with `category: "RGS · May 2026"`, emoji `"🔬"` (research-themed). Update the trust sub-line from:
> "Photos from our workshops at **40+ partner schools** across Singapore"

to:
> "Photos from our workshops at **50+ partner schools** across Singapore — most recently at **Raffles Girls' School (May 2026)**"

### 2. Trust bar — recent workshops callout

**File**: `src/components/home/TrustSection.tsx`
**Stats update**: 5,000+ → **15,000+** students · 40+ → **50+** schools · 6+ → **6+ years** (unchanged)

**New element**: A v2 `BrutalSticker` callout placed between the school carousel and the dark stats strip:
```
● Just delivered · Raffles Girls' School · May 2026
```
Rotation `-2deg`, tone `yellow`. Single line, no extra body copy (per memory: stickers must be ≤5 words / ≤30 chars — "● Just delivered · RGS · May 2026" is ~30 chars, OK).

### 3. Blog post

**Table**: `blog_posts` (Railway Postgres)
**Slug**: `rgs-research-agents-workshop`
**Cover image**: `src/assets/blog/rgs-w1-cover.jpg` (best wide-shot from the 14)

**Title**: *"How Raffles Girls' School used AI workshops to support student research projects"*

**Angle**: School-sales-first. Frames it as a replicable case study other schools can cite. Targets SEO keyword *"AI workshop for schools singapore"* and AEO citability for Perplexity/ChatGPT.

**Structure** (~1500–2000 words):
1. Hook — what the 40 RGS students walked out with (2 deliverables: Gemini Gem + HTML deck)
2. The brief — Dr Lim's framing, research-project-support not new-content
3. What we did across 4 hours — W1 (research agent) + W2 (HTML deck) summarised
4. Why it worked — the "verify, don't trust" framing, AI-as-research-assistant
5. Outcomes — placeholder quotes from Dr Lim + 2 students, photos inline
6. For other schools — clear CTA + link to `/schools`

**Meta** (SEO + AEO):
- `meta_title`: "AI Workshop Case Study: Raffles Girls' School | Vibe Makers"
- `meta_description`: "How 40 Sec 1–4 students at RGS used Gemini Gems + ChatGPT to support their research projects in two 2-hour vibe coding workshops. May 2026."
- `tags`: `["case-study", "rgs", "research-agents", "ai-tools", "schools"]`
- `category`: `"Case Study"`
- `status`: `"published"`
- JSON-LD: `Article` schema (covered by existing `BlogPost.tsx`)

**Placeholder convention**: Dr Lim quote `[DR LIM QUOTE — fill before final ship]`, student quotes `[STUDENT QUOTE 1 — fill]` / `[STUDENT QUOTE 2 — fill]`. Render visibly so Yash can spot them on the live preview.

**Voice rules** (from memory):
- Coach explaining what we did — not marketing brochure
- No em-dashes (use `·` or `:` or split into sentences)
- No "screw up" / "messed up" — student audiences may read this
- Must NOT read AI-generated (Pei's veto)

### 4. RGS case study — /schools page

**File**: `src/components/home/RGSCaseStudy.tsx` (new) — placed under `home/` since `schools/` folder doesn't yet exist and one-off isn't worth a new folder
**Imported in**: `src/pages/Schools.tsx`, positioned after the trust bar / before the enquiry form (highest intent surface)

**Section content**:
- Sticker eyebrow: `● Recent delivery`
- Heading: *"Raffles Girls' School — May 2026"*
- Sub: "40 students · 4 contact hours · 2 deliverables per student"
- 3-column outcome strip: **40 research agents built** · **40 HTML decks shipped** · **Y1–Y4 mixed cohort**
- Photo collage: 3 photos in a 2-up + 1-tall layout
- Placeholder Dr Lim quote block (with `[QUOTE — fill]` marker)
- CTA button: *"See the full case study →"* → links to `/blog/rgs-research-agents-workshop`

**Design**: Reuse `BrutalSticker`, `vm-card`, `Reveal` patterns. No raw colors. Mobile-responsive (horizontal scroll for photos on mobile per saved memory).

## Sequence + atomic commits

1. **Assets prep** (1 commit)
   - Cull 6 best photos · resize/optimise · drop into `src/assets/gallery/rgs-w1-{01..06}.jpg`
   - Pick 1 wide-shot for blog cover · drop into `src/assets/blog/rgs-w1-cover.jpg`
   - Commit: `Add RGS workshop photos`

2. **PhotoGallery + TrustSection updates** (1 commit)
   - Append to `galleryImages` array
   - Update sub-line copy
   - Update stats numbers
   - Add `BrutalSticker` recent-workshop callout
   - **Render-verify**: Playwright screenshot of `/` (desktop + mobile)
   - Commit: `Add RGS to homepage gallery + trust bar`

3. **Blog post insert** (1 commit + DB row)
   - Write `html_content` Markdown→HTML
   - Insert into `blog_posts` via `/admin` UI or direct Postgres `INSERT`
   - **Render-verify**: visit `/blog` (listing) + `/blog/rgs-research-agents-workshop` (post)
   - Commit: only the cover image asset (DB row is data, not code)

4. **RGS case study on /schools** (1 commit)
   - New `RGSCaseStudy.tsx` component
   - Import + position in `Schools.tsx`
   - **Render-verify**: Playwright screenshot of `/schools` (desktop + mobile)
   - Commit: `Add RGS case study to /schools`

5. **Deploy**: Push `main` → Railway auto-deploy → wait ~2 min → curl-verify with cache-bust headers per CLAUDE.md deploy protocol. Cite the matched string back to user.

## Testing strategy

Per `.claude/rules/testing.md` (RED → GREEN → REFACTOR):
- **PhotoGallery**: existing test (if any) should still pass. New test: `renders RGS gallery item with correct category label`
- **TrustSection**: new test: `renders recent workshop callout sticker with RGS + May 2026`
- **RGSCaseStudy**: new co-located `RGSCaseStudy.test.tsx` — renders headline, photo count, outcome strip values, CTA link target
- **Blog post**: no unit test required (data, not code). Manual verification on `/blog/<slug>`.

All tests: Vitest + `@testing-library/react`. Run `bun run test` + `bun run lint` before each commit.

## Risk + rollback

- **Photo licensing**: Yash owns the photos (instructor on the day). No external rights issue.
- **Privacy**: RGS students are visible in photos. Yash to confirm school consent before final push (this is the one gating question for the final ship — placeholder for now).
- **Placeholder quotes shipping accidentally**: Mitigation — placeholders are visually marked `[QUOTE — fill]` so they're obvious on staging; final ship is gated on Yash filling them.
- **Rollback**: Each commit is atomic. `git revert <sha>` on any single commit cleanly removes one surface without affecting others.

## Open questions (for Yash to answer before / during implementation)

1. **Photo consent** — does RGS allow us to publish photos showing students? (Likely yes via the workshop agreement, but confirm before push.)
2. **Stats refresh** — confirm 15,000+ / 50+ is the number to use, or sharpen to today's exact count if you have it.
3. **Blog cover photo** — final pick from the 14 (I'll propose top-3 with screenshots during implementation).
4. **Component location** — `RGSCaseStudy.tsx` under `home/` or worth creating `src/components/schools/`? Default: `home/` for now (YAGNI).

## What "done" looks like

- `vibemakers.dev/` loads and shows RGS in the photo gallery (verified via `curl` + grep)
- `vibemakers.dev/` shows the "Just delivered · RGS · May 2026" sticker (verified visually + via grep)
- `vibemakers.dev/blog` lists the new post; `/blog/rgs-research-agents-workshop` renders with cover + content
- `vibemakers.dev/schools` shows the RGS case study section above the enquiry form
- Mobile-responsive on iPhone-sized viewport (verified via Playwright at 375px width)
- Stats updated to 15,000+ / 50+
- All Vitest tests pass · ESLint clean · Railway deploy succeeded · live content verified via curl
