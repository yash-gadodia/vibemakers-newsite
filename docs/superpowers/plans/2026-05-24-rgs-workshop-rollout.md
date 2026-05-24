# RGS Workshop Rollout — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land evidence of the successful 5-May + 14-May RGS workshop across 4 surfaces of vibemakers.dev (homepage gallery, trust bar, blog post, /schools case study) in 4 atomic commits, each independently revertable.

**Architecture:** Direct edits to existing components (PhotoGallery, TrustSection), one new component (RGSCaseStudy) following v2 "warm sticker" design patterns, blog post inserted via a one-off Node script that talks to Railway Postgres `blog_posts` table over `DATABASE_URL`. Render-verify with Playwright before push, curl-verify after deploy.

**Tech Stack:** React 18 + Vite 5 + TypeScript + Tailwind + shadcn/ui + Vitest, Hono + pg (Postgres) on Railway, ImageMagick/sips for asset optimisation, Playwright MCP for render-verify.

**Spec:** `docs/superpowers/specs/2026-05-24-rgs-workshop-rollout-design.md`

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `src/assets/gallery/rgs-w1-01.jpg` … `rgs-w1-06.jpg` | **Create** | 6 culled + resized RGS workshop photos for homepage gallery |
| `src/assets/blog/rgs-w1-cover.jpg` | **Create** | Hero/cover image for blog post |
| `src/components/home/PhotoGallery.tsx` | **Modify** | Append 6 RGS entries + update trust sub-line |
| `src/components/home/TrustSection.tsx` | **Modify** | Stats refresh (5,000+→15,000+, 40+→50+) + RGS recent-workshop BrutalSticker callout |
| `src/components/home/RGSCaseStudy.tsx` | **Create** | New section: sticker eyebrow + outcome strip + photo collage + Dr Lim placeholder quote + CTA to blog |
| `src/components/home/RGSCaseStudy.test.tsx` | **Create** | Vitest co-located component test |
| `src/pages/Schools.tsx` | **Modify** | Import + render `<RGSCaseStudy />` after the trust section, before the V.I.B.E. methodology section |
| `scripts/insert-blog-post.mjs` | **Create** | One-off Node script that INSERTs a blog post row into Railway Postgres using DATABASE_URL + pg |
| `content/blog/rgs-research-agents-workshop.md` | **Create** | Source-of-truth Markdown for the blog post (version-controlled, script reads it) |
| `scripts/md-to-html.mjs` | **Create** | Tiny helper: render the Markdown to HTML for `html_content` column |

Schools.tsx is 1033 lines but is essentially flat sections. We insert one new `<RGSCaseStudy />` import + invocation; we do not refactor.

---

### Task 1: Cull, resize, and copy RGS photos into the newsite repo

**Files:**
- Source: `/Users/yash/Documents/vibemakers/workshops/rgs/photos&videos/*.jpg|jpeg`
- Create: `vibemakers-newsite/src/assets/gallery/rgs-w1-{01..06}.jpg`
- Create: `vibemakers-newsite/src/assets/blog/rgs-w1-cover.jpg`

The 6 picks (already chosen with Yash):

| Output filename | Source filename | What it shows |
|---|---|---|
| `rgs-w1-01.jpg` | `photo_2026-05-24_10-25-16.jpg` | Wide group shot, 35+ students with peace signs, curriculum projected |
| `rgs-w1-02.jpg` | `photo_2026-05-24_10-25-23.jpg` | Over-shoulder, V.I.B.E. cycle slide visible, backs-only |
| `rgs-w1-03.jpg` | `photo_2026-05-24_10-25-21.jpg` | Over-shoulder, W2 title slide on laptop, backs-only |
| `rgs-w1-04.jpg` | `photo_2026-05-24_10-25-18.jpg` | Yash teaching 2 students, ChatGPT projected, backs-only |
| `rgs-w1-05.jpg` | `WhatsApp Image 2026-05-14 at 17.49.19.jpeg` | Student presenting Ferrari/McLaren HTML deck |
| `rgs-w1-06.jpg` | `photo_2026-05-24_10-25-15.jpg` | Yash with peace sign + laptop curriculum |

Cover: `rgs-w1-cover.jpg` ← also from `photo_2026-05-24_10-25-16.jpg` (wide group shot).

- [ ] **Step 1: Create the asset folders**

```bash
mkdir -p /Users/yash/Documents/vibemakers/vibemakers-newsite/src/assets/blog
ls /Users/yash/Documents/vibemakers/vibemakers-newsite/src/assets/gallery
```

Expected: `gallery/` exists with existing stock images. `blog/` is created fresh.

- [ ] **Step 2: Resize + optimise each photo to ≤1600px wide, ≤300KB**

Use macOS built-in `sips` (no extra deps):

```bash
SRC="/Users/yash/Documents/vibemakers/workshops/rgs/photos&videos"
DST="/Users/yash/Documents/vibemakers/vibemakers-newsite/src/assets/gallery"

sips -Z 1600 -s format jpeg -s formatOptions 80 "$SRC/photo_2026-05-24_10-25-16.jpg" --out "$DST/rgs-w1-01.jpg"
sips -Z 1600 -s format jpeg -s formatOptions 80 "$SRC/photo_2026-05-24_10-25-23.jpg" --out "$DST/rgs-w1-02.jpg"
sips -Z 1600 -s format jpeg -s formatOptions 80 "$SRC/photo_2026-05-24_10-25-21.jpg" --out "$DST/rgs-w1-03.jpg"
sips -Z 1600 -s format jpeg -s formatOptions 80 "$SRC/photo_2026-05-24_10-25-18.jpg" --out "$DST/rgs-w1-04.jpg"
sips -Z 1600 -s format jpeg -s formatOptions 80 "$SRC/WhatsApp Image 2026-05-14 at 17.49.19.jpeg" --out "$DST/rgs-w1-05.jpg"
sips -Z 1600 -s format jpeg -s formatOptions 80 "$SRC/photo_2026-05-24_10-25-15.jpg" --out "$DST/rgs-w1-06.jpg"

# Cover image (larger, also 80% quality for slightly better cover quality)
sips -Z 2000 -s format jpeg -s formatOptions 85 "$SRC/photo_2026-05-24_10-25-16.jpg" --out "/Users/yash/Documents/vibemakers/vibemakers-newsite/src/assets/blog/rgs-w1-cover.jpg"
```

- [ ] **Step 3: Verify outputs**

```bash
ls -la /Users/yash/Documents/vibemakers/vibemakers-newsite/src/assets/gallery/rgs-w1-*.jpg
ls -la /Users/yash/Documents/vibemakers/vibemakers-newsite/src/assets/blog/rgs-w1-cover.jpg
```

Expected: 6 gallery files + 1 cover file, each ≤500KB, dimensions ≤1600px wide for gallery, ≤2000px for cover.

- [ ] **Step 4: Commit**

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
git add src/assets/gallery/rgs-w1-*.jpg src/assets/blog/rgs-w1-cover.jpg
git commit -m "Add RGS workshop photos to gallery and blog assets"
```

---

### Task 2: Update PhotoGallery component with RGS entries

**Files:**
- Modify: `src/components/home/PhotoGallery.tsx`

- [ ] **Step 1: Add 6 RGS imports + entries to galleryImages array**

Open `src/components/home/PhotoGallery.tsx`. The import block (lines 9-14) currently looks like:

```ts
import auditorium1 from "@/assets/gallery/auditorium-event-01.jpg";
import instructorPresentation1 from "@/assets/gallery/instructor-presentation-01.jpg";
import workshop1 from "@/assets/gallery/workshop-students-01.jpg";
import hackathon1 from "@/assets/gallery/hackathon-event-01.jpg";
import coding1 from "@/assets/gallery/coding-session-01.jpg";
import team1 from "@/assets/gallery/team-collaboration-01.jpg";
```

Append (do not replace) these 6 imports right below:

```ts
import rgsW101 from "@/assets/gallery/rgs-w1-01.jpg";
import rgsW102 from "@/assets/gallery/rgs-w1-02.jpg";
import rgsW103 from "@/assets/gallery/rgs-w1-03.jpg";
import rgsW104 from "@/assets/gallery/rgs-w1-04.jpg";
import rgsW105 from "@/assets/gallery/rgs-w1-05.jpg";
import rgsW106 from "@/assets/gallery/rgs-w1-06.jpg";
```

Then in `galleryImages` (line 17-24), **prepend** the 6 new entries so RGS appears first:

```ts
const galleryImages = [
  { src: rgsW101, alt: "40 RGS students raising peace signs at end of Vibe Makers W2 workshop", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW102, alt: "RGS students watching the V.I.B.E. cycle being taught", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW103, alt: "RGS students working on their HTML decks during W2", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW104, alt: "Yash teaching two RGS students at the lab bench with ChatGPT projected", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW105, alt: "RGS student presenting her vibe-coded HTML slide deck on Ferrari and McLaren", category: "RGS · May 2026", emoji: "🔬" },
  { src: rgsW106, alt: "Yash instructing in front of the W2 title slide", category: "RGS · May 2026", emoji: "🔬" },
  { src: auditorium1, alt: "Large-scale workshop with students from multiple schools", category: "Event", emoji: "🎪" },
  { src: instructorPresentation1, alt: "Instructor presenting student project examples", category: "Teaching", emoji: "👨‍🏫" },
  { src: hackathon1, alt: "Hackathon event with excited participants", category: "Hackathon", emoji: "🚀" },
  { src: workshop1, alt: "Students collaborating during a vibe coding workshop", category: "Workshop", emoji: "💻" },
  { src: coding1, alt: "Students focused on building their apps", category: "Coding", emoji: "⌨️" },
  { src: team1, alt: "Team collaboration during a build sprint", category: "Teamwork", emoji: "🤝" },
];
```

- [ ] **Step 2: Update the trust sub-line**

Find the existing trust indicator (lines 69-74) which reads:

```tsx
<p className="text-sm text-muted-foreground">
  Photos from our workshops at <span className="font-medium text-foreground">40+ partner schools</span> across Singapore
</p>
```

Replace with:

```tsx
<p className="text-sm text-muted-foreground">
  Photos from our workshops at <span className="font-medium text-foreground">50+ partner schools</span> across Singapore · most recently <span className="font-medium text-foreground">Raffles Girls' School (May 2026)</span>
</p>
```

(No em-dashes per memory — uses · separator.)

- [ ] **Step 3: Run lint + existing tests**

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
bun run lint
bun run test
```

Expected: zero ESLint errors. Tests pass (PhotoGallery has no existing test).

- [ ] **Step 4: Commit**

```bash
git add src/components/home/PhotoGallery.tsx
git commit -m "Add RGS workshop photos to homepage gallery"
```

---

### Task 3: Update TrustSection — stats refresh + RGS recent-workshop sticker

**Files:**
- Modify: `src/components/home/TrustSection.tsx`

- [ ] **Step 1: Bump the stats numbers**

In `src/components/home/TrustSection.tsx`, find the `stats` array (lines 32-36):

```ts
const stats = [
  { value: "5,000+", label: "Students taught across Singapore since 2018" },
  { value: "40+", label: "School partners from primary to JC" },
  { value: "6+", label: "Years delivering enrichment programmes" },
];
```

Replace with (per memory: 15,000+/50+ are current numbers, CLAUDE.md is stale):

```ts
const stats = [
  { value: "15,000+", label: "Students taught across Singapore since 2018" },
  { value: "50+", label: "School partners from primary to JC" },
  { value: "6+", label: "Years delivering enrichment programmes" },
];
```

- [ ] **Step 2: Add a BrutalSticker import**

At the top of `TrustSection.tsx` add (after the `Reveal` import):

```ts
import { BrutalSticker } from "@/components/ui/brutal-sticker";
```

- [ ] **Step 3: Add the recent-workshop sticker between the school carousel and the dark stats strip**

Find the closing `</div>` of the light section (currently line 123, ends the `<div className="bg-secondary/40 py-12 md:py-16">` block). Just above that closing `</div>`, after the school carousel's `Reveal` block (line 121 closer), insert:

```tsx
<Reveal variant="up" delayMs={240}>
  <div className="mt-8 md:mt-10 flex justify-center">
    <BrutalSticker tone="yellow" rotate={-2}>
      ● Just delivered · RGS · May 2026
    </BrutalSticker>
  </div>
</Reveal>
```

(Sticker text is 33 chars — within the 30-ish memory guidance; the leading bullet counts as decoration.)

- [ ] **Step 4: Run lint + tests**

```bash
bun run lint
bun run test
```

Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/TrustSection.tsx
git commit -m "Update Trust stats and add RGS recent-workshop sticker"
```

---

### Task 4: Build RGSCaseStudy component (TDD)

**Files:**
- Create: `src/components/home/RGSCaseStudy.tsx`
- Create: `src/components/home/RGSCaseStudy.test.tsx`

- [ ] **Step 1: Write the failing test FIRST**

Create `src/components/home/RGSCaseStudy.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RGSCaseStudy } from "./RGSCaseStudy";

describe("RGSCaseStudy", () => {
  const renderIt = () =>
    render(
      <MemoryRouter>
        <RGSCaseStudy />
      </MemoryRouter>,
    );

  it("renders the recent-delivery sticker and RGS heading", () => {
    renderIt();
    expect(screen.getByText(/Recent delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Raffles Girls' School/i)).toBeInTheDocument();
  });

  it("renders the three outcome stats with their numbers and labels", () => {
    renderIt();
    expect(screen.getByText("40")).toBeInTheDocument();
    expect(screen.getByText(/research agents built/i)).toBeInTheDocument();
    expect(screen.getByText(/HTML decks shipped/i)).toBeInTheDocument();
    expect(screen.getByText(/Y1–Y4 mixed cohort/i)).toBeInTheDocument();
  });

  it("includes the placeholder Dr Lim quote marker", () => {
    renderIt();
    expect(screen.getByText(/\[DR LIM QUOTE/i)).toBeInTheDocument();
  });

  it("links the CTA to the blog post", () => {
    renderIt();
    const cta = screen.getByRole("link", { name: /full case study/i });
    expect(cta).toHaveAttribute("href", "/blog/rgs-research-agents-workshop");
  });

  it("renders all three RGS photos", () => {
    renderIt();
    const photos = screen.getAllByRole("img");
    // Expect at least 3 collage photos
    expect(photos.length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails for the right reason**

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
bun run test src/components/home/RGSCaseStudy.test.tsx
```

Expected: FAIL — `Cannot find module './RGSCaseStudy'` or similar.

- [ ] **Step 3: Implement the minimal RGSCaseStudy component to make tests pass**

Create `src/components/home/RGSCaseStudy.tsx`:

```tsx
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { BrutalSticker } from "@/components/ui/brutal-sticker";
import rgsW101 from "@/assets/gallery/rgs-w1-01.jpg";
import rgsW102 from "@/assets/gallery/rgs-w1-02.jpg";
import rgsW105 from "@/assets/gallery/rgs-w1-05.jpg";

const outcomes = [
  { value: "40", label: "research agents built" },
  { value: "40", label: "HTML decks shipped" },
  { value: "Y1–Y4", label: "mixed cohort, 4 contact hours" },
];

export function RGSCaseStudy() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <Reveal variant="up">
          <div className="text-center mb-10">
            <BrutalSticker tone="yellow" rotate={-3}>
              ● Recent delivery
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6 mb-4">
              Raffles Girls' School · May 2026
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              40 students · 4 contact hours across 2 sessions · each student walked
              out with two deliverables that support their existing research project.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={120}>
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10">
            {outcomes.map((o) => (
              <div key={o.label} className="vm-card rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-display font-bold text-3xl md:text-5xl text-primary mb-2">
                  {o.value}
                </p>
                <p className="font-sans text-xs md:text-sm text-ink-2">{o.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <img
              src={rgsW101}
              alt="40 RGS students raising peace signs at end of Vibe Makers W2 workshop"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
            <img
              src={rgsW102}
              alt="RGS students watching the V.I.B.E. cycle being taught"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
            <img
              src={rgsW105}
              alt="RGS student presenting her vibe-coded HTML slide deck on Ferrari and McLaren"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={280}>
          <blockquote className="vm-card rounded-2xl border border-border bg-bg-warm-2 p-6 md:p-8 mb-10">
            <p className="font-sans text-base md:text-lg text-foreground italic">
              [DR LIM QUOTE · fill before final ship · 1-2 sentence endorsement from
              Dr Lim AK, RGS teacher, on how Vibe Makers supported student research]
            </p>
            <footer className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mt-3">
              Dr Lim AK · RGS
            </footer>
          </blockquote>
        </Reveal>

        <Reveal variant="up" delayMs={360}>
          <div className="text-center">
            <Link
              to="/blog/rgs-research-agents-workshop"
              className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-eyebrow font-semibold"
            >
              See the full case study
              <span className="vm-arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to confirm it passes**

```bash
bun run test src/components/home/RGSCaseStudy.test.tsx
```

Expected: PASS — all 5 tests green.

- [ ] **Step 5: Run the full suite + lint**

```bash
bun run test
bun run lint
```

Expected: full suite green, no lint errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/RGSCaseStudy.tsx src/components/home/RGSCaseStudy.test.tsx
git commit -m "Add RGSCaseStudy component with placeholder Dr Lim quote"
```

---

### Task 5: Integrate RGSCaseStudy into /schools page

**Files:**
- Modify: `src/pages/Schools.tsx`

- [ ] **Step 1: Add the import**

At the top of `src/pages/Schools.tsx`, after the existing imports, add:

```ts
import { RGSCaseStudy } from "@/components/home/RGSCaseStudy";
```

- [ ] **Step 2: Render `<RGSCaseStudy />` between the trust section and the V.I.B.E. methodology section**

Schools.tsx has a section starting near line 449 (V.I.B.E. methodology block). Insert `<RGSCaseStudy />` immediately BEFORE that section, AFTER the trust band ending around line 447.

Locate the closing `</section>` near line 447 (end of the trust/credibility band — section starting at line 379 `bg-bg-warm py-12 md:py-16 overflow-hidden border-t border-border`). Right after that `</section>`, insert:

```tsx
<RGSCaseStudy />
```

If the line numbers have drifted, use this anchor instead: insert `<RGSCaseStudy />` immediately AFTER the FIRST section whose className contains `bg-bg-warm py-12 md:py-16 overflow-hidden border-t border-border` and BEFORE the next `<section>`.

- [ ] **Step 3: Run tests + lint**

```bash
bun run test
bun run lint
```

Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Schools.tsx
git commit -m "Render RGS case study on /schools above V.I.B.E. methodology"
```

---

### Task 6: Write the blog post Markdown content

**Files:**
- Create: `content/blog/rgs-research-agents-workshop.md`

This file is the source of truth for the post. The insert script (Task 7) renders it to HTML.

- [ ] **Step 1: Create the content directory + file**

```bash
mkdir -p /Users/yash/Documents/vibemakers/vibemakers-newsite/content/blog
```

Then create `content/blog/rgs-research-agents-workshop.md` with this exact body:

```markdown
---
title: "How Raffles Girls' School used AI workshops to support student research projects"
slug: rgs-research-agents-workshop
description: "How 40 Sec 1 to Sec 4 students at RGS used Gemini Gems and ChatGPT to support their existing research projects across two 2-hour vibe coding workshops in May 2026."
author: "Vibe Makers Academy"
category: "Case Study"
tags: ["case-study", "rgs", "research-agents", "ai-tools", "schools"]
cover_image: "/src/assets/blog/rgs-w1-cover.jpg"
meta_title: "AI Workshop Case Study: Raffles Girls' School | Vibe Makers"
meta_description: "Case study of two AI vibe coding workshops at Raffles Girls' School in May 2026. 40 students built research agents and HTML decks to support their own research projects."
status: "published"
---

## The brief

In April 2026, Dr Lim AK at Raffles Girls' School asked us a sharp question: can AI tools actually help our students do their own research better, without replacing the thinking?

That was the brief. Not "teach the students coding". Not "introduce a new module". Support the work they were already doing on their own research projects · give them tools to spot weak sources, structure their thinking, and present their findings · keep them in the driver's seat the whole way.

We ran two workshops to answer that: Tuesday 5 May (Workshop 1) and Thursday 14 May (Workshop 2). Two hours each. 40 students across Y1 to Y4. Every student already had a research topic of their own. Our job was to make sure they walked out with two concrete deliverables they could keep using.

## What the 40 students walked out with

Each RGS student left the two sessions with:

1. **A personal research agent** built in Gemini Gems · tuned to their specific research topic · persistent in their own Google account so it follows them after the workshop ends.
2. **A polished HTML slide deck** of their research work · with interactive elements, smooth animations, and the structure of a real presentation · ready to drop straight into their research showcase.

Both deliverables run on the iPads RGS issues to students. No new software to install. No paid accounts. No reliance on anything that disappears when the workshop ends.

## Workshop 1 · Build your research agent

The first session was about turning each student's research topic into a working agent that could actually be useful to them across the rest of their project.

We opened with the framing Dr Lim wanted up front: **vibe coding is not for completing homework**. AI is a learning companion, a research assistant you configured yourself, a thinking partner · not a shortcut.

Then we taught the **RACE framework** for prompting a research agent: Role, Audience, Context, Expectations. Students used a worksheet to capture their own topic in those terms before they opened Gemini.

By the end of the two hours every student had:

- A Gemini Gem they built themselves, named for their topic, with a clear role and expectations baked in
- Tested it against three real research sub-questions from their own project
- Run a **source-check** pass: asked the agent to cite sources, then verified one source themselves by opening the link
- An exit slip with three things they would change next time

[STUDENT QUOTE 1 · fill before final ship · short line from a Sec 2 or Sec 3 student on what surprised them about prompting their own agent]

## Workshop 2 · Vibe-code your presentation

Nine days later we ran Workshop 2. Same room, same students, same iPads. This time the brief was: take the research you have done, and build a polished single-file HTML deck you can actually present from.

We taught them the **V.I.B.E. cycle** as a working method:

- **Vision** · pick the artefact, write a one-line brief
- **Ideate** · sketch on paper before opening AI · what does the first slide need to do, what does the last slide need to do
- **Build** · vibe-code your first version with ChatGPT, paste back errors, iterate
- **Evolve** · polish, fix one thing, ship

The deliverable was a single HTML file. Runs in any browser. Renders the same on iPad with a keyboard, on a teacher's laptop, on a projector. Students who finished early started adding interactive elements: clickable timelines, hover states, animations between slides.

Three Y3 students built decks that, by the end of the session, were objectively presentation-ready. One was on the comparison of Ferrari and McLaren engineering philosophies. One was on microplastic exposure in Singapore reservoirs. One was on AI fake-news detection · which felt appropriately on-the-nose.

[STUDENT QUOTE 2 · fill before final ship · short line from a Y3 or Y4 student on the build]

## Why it worked

Three things kept the workshops on the rails:

**1 · We tied AI use directly to their existing research project.** Nothing was theoretical. Every prompt, every iteration, every deck was about the topic they had already chosen and were already invested in. The teacher had already done the hard work of picking topics that mattered to them. We did not undo that.

**2 · We framed AI as a research assistant they configured.** Not a shortcut. Not a homework machine. Students built their own Gem · they chose the role, they wrote the expectations, they tested it. By the end of session one they could already feel the difference between a Gem they had tuned and a generic ChatGPT chat. That ownership matters.

**3 · We made verification the default move.** Every output got a source-check. Every claim got a "find the link". Dr Lim's framing of "verify, don't trust" became the cadence of the room.

[DR LIM QUOTE · fill before final ship · 1 to 2 sentence endorsement on how the workshops supported the research programme, the standard of the deliverables, or the framing students walked away with]

## For other schools considering AI workshops

If you are a school thinking about how to bring AI into your research, enrichment, or applied learning programmes, three things are worth holding:

- **Tie it to work students are already doing.** Do not introduce AI as a separate module. Anchor it to a real project · research, a CCA build, a community problem · so the AI is in service of work students already care about.
- **Build configurability, not consumption.** Students who configure their own agent get a different relationship with AI than students who chat with a default model. Tuning is the lesson.
- **Make verification non-optional.** The single most important habit we taught was the source-check. Every AI claim gets a link. Every link gets opened. That is the move that separates research from autocomplete.

We deliver Vibe Makers workshops at schools across Singapore in three formats: a 1-day Introductory Lab, a 3-day Build Sprint, and a 1 to 2-week Studio Programme. Each can be customised by build track (Portfolio Builder · Game Builder · Problem Solver) and cohort profile.

If you would like to talk about how a Vibe Makers workshop could fit your school, you can [reach out via our schools page](/schools) or message us on WhatsApp at +65 8890 0368.
```

(Note: no em-dashes anywhere · uses `·` separator · no "screw up" type language · placeholder quotes are visibly marked.)

- [ ] **Step 2: Commit the content file**

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
git add content/blog/rgs-research-agents-workshop.md
git commit -m "Add RGS workshop blog post Markdown source"
```

---

### Task 7: Build + run insert-blog-post script

**Files:**
- Create: `scripts/insert-blog-post.mjs`

The plan uses `marked` (already in many React projects · we'll add it as a one-off dev dep if not present) to render Markdown → HTML for the `html_content` column.

- [ ] **Step 1: Check if marked is already installed**

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
grep '"marked"' package.json
```

If not present, install as a devDependency:

```bash
bun add -d marked gray-matter
```

(`gray-matter` parses the YAML front-matter in the Markdown file.)

- [ ] **Step 2: Create the insert script**

Create `scripts/insert-blog-post.mjs`:

```js
#!/usr/bin/env node
// Insert a blog post into Railway Postgres blog_posts table.
// Usage:
//   DATABASE_URL=... node scripts/insert-blog-post.mjs content/blog/<slug>.md
// or via railway CLI:
//   railway run node scripts/insert-blog-post.mjs content/blog/<slug>.md

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

const required = ["title", "slug", "description"];
for (const k of required) {
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
  console.error("Insert failed:", e);
  process.exitCode = 1;
} finally {
  await pool.end();
}
```

- [ ] **Step 3: Pull the Railway DATABASE_URL**

In a terminal where the Railway CLI is logged in to the `vibemakers-newsite` project (per CLAUDE.md, project ID `9e97029e-b1f1-46ad-a8b7-3a5a8e13fffc` in `yash-gadodia's Projects` workspace):

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
railway status   # confirm linked to the right project
railway variables --service Postgres-vU8j 2>/dev/null | grep -i DATABASE_URL || railway variables | grep -i DATABASE_URL
```

Capture the `DATABASE_URL` value (it should look like `postgresql://postgres:...@...railway.internal:5432/railway`).

If running locally (not on Railway), you may need the **public** URL instead (host ends in `.proxy.rlwy.net` or similar). Use `railway variables --kv` and look for the proxy URL, or run via `railway run` which injects internal vars.

- [ ] **Step 4: Run the insert via railway CLI (preferred — uses internal URL)**

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
railway run node scripts/insert-blog-post.mjs content/blog/rgs-research-agents-workshop.md
```

Expected stdout:

```
Upserted: {
  id: '<uuid>',
  slug: 'rgs-research-agents-workshop',
  status: 'published',
  published_at: <Date>
}
```

If `railway run` is not configured, fall back to setting `DATABASE_URL` directly (use a public proxy URL since you are running off-Railway):

```bash
DATABASE_URL='<proxy-url-here>' node scripts/insert-blog-post.mjs content/blog/rgs-research-agents-workshop.md
```

- [ ] **Step 5: Verify the post exists in the DB**

```bash
railway run psql $DATABASE_URL -c "SELECT slug, title, status, published_at FROM blog_posts WHERE slug = 'rgs-research-agents-workshop';"
```

Expected: one row returned with `status = published`.

- [ ] **Step 6: Verify the post renders in the LOCAL dev server**

```bash
bun run dev &
sleep 6
curl -s http://localhost:8080/api/blog | grep -i rgs
curl -s http://localhost:8080/api/blog/rgs-research-agents-workshop | head -50
# Stop the dev server when done:
kill %1
```

Expected: `/api/blog` lists the new post, `/api/blog/rgs-research-agents-workshop` returns the full HTML.

- [ ] **Step 7: Commit the script (the blog-post row is data, not code · already committed via Markdown source)**

```bash
git add scripts/insert-blog-post.mjs package.json bun.lock
git commit -m "Add insert-blog-post script for Markdown to Postgres"
```

---

### Task 8: Render-verify the live local site with Playwright (MCP)

**Files:** No code changes · just screenshots into `.scratch/screenshots/`.

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
bun run dev
```

(Run in background; the harness will surface the URL · default `http://localhost:8080`.)

- [ ] **Step 2: Capture desktop + mobile screenshots of each changed surface**

Use the `mcp__plugin_playwright_playwright__browser_navigate` + `browser_take_screenshot` tools (Playwright MCP).

Save screenshots to `.scratch/screenshots/rgs-rollout/` (per memory: never the vibemakers/ root).

Targets:

| Viewport | URL | Filename |
|---|---|---|
| 1440×900 | `http://localhost:8080/` | `home-desktop.png` |
| 375×812  | `http://localhost:8080/` | `home-mobile.png` |
| 1440×900 | `http://localhost:8080/blog` | `blog-list-desktop.png` |
| 1440×900 | `http://localhost:8080/blog/rgs-research-agents-workshop` | `blog-post-desktop.png` |
| 375×812  | `http://localhost:8080/blog/rgs-research-agents-workshop` | `blog-post-mobile.png` |
| 1440×900 | `http://localhost:8080/schools` | `schools-desktop.png` |
| 375×812  | `http://localhost:8080/schools` | `schools-mobile.png` |

For each: `browser_resize` to the viewport, `browser_navigate` to the URL, `browser_take_screenshot` with `filename` set to the path under `.scratch/screenshots/rgs-rollout/`.

- [ ] **Step 3: Show Yash the screenshots and wait for sign-off**

Print the 7 screenshot paths back to Yash. Pause for explicit go-ahead before pushing.

If anything looks wrong (sticker overflow, photo blur, content alignment), fix inline and re-screenshot.

- [ ] **Step 4: Stop the dev server**

```bash
# Whichever process supervisor — bring down `bun run dev`
```

---

### Task 9: Deploy + verify live

**Files:** None · git operations only.

- [ ] **Step 1: Final pre-push checks**

```bash
cd /Users/yash/Documents/vibemakers/vibemakers-newsite
bun run lint
bun run test
git status   # should show only committed, nothing untracked you forgot
git log --oneline -10   # confirm the 5 commits from tasks 1-7 are in order
```

Expected: lint clean · tests green · no uncommitted changes.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

Expected: exit 0.

- [ ] **Step 3: Wait for Railway to deploy and then curl-verify**

```bash
# Railway typically takes 2-3 minutes for a fresh build
sleep 180

# Cache-busted curl with no-cache headers, grep for new content per CLAUDE.md
curl -s -H "Cache-Control: no-cache" "https://vibemakers.dev/?cb=$(date +%s)" | grep -o "Just delivered · RGS" || echo "MISS: sticker not visible"
curl -s -H "Cache-Control: no-cache" "https://vibemakers.dev/?cb=$(date +%s)" | grep -o "15,000+" || echo "MISS: stats not updated"
curl -s -H "Cache-Control: no-cache" "https://vibemakers.dev/blog?cb=$(date +%s)" | grep -o "rgs-research-agents-workshop" || echo "MISS: blog list missing post"
curl -s -H "Cache-Control: no-cache" "https://vibemakers.dev/api/blog/rgs-research-agents-workshop?cb=$(date +%s)" | grep -o "How Raffles Girls" || echo "MISS: blog post API empty"
curl -s -H "Cache-Control: no-cache" "https://vibemakers.dev/schools?cb=$(date +%s)" | grep -o "Recent delivery" || echo "MISS: case study not on /schools"
```

Expected for each line: a match printed (NOT a `MISS:` line). Per CLAUDE.md: report the actual matched strings back to the user (e.g. `verified live: "Just delivered · RGS"`).

- [ ] **Step 4: If any curl MISSES, do NOT claim success**

Per CLAUDE.md: say "deploy succeeded but live content not yet showing · likely CDN" and ask Yash to hard-refresh, instead of claiming success. Optionally re-run after another 60-120 seconds.

- [ ] **Step 5: Report completion back to Yash**

Final message to Yash should include:
1. The 5 matched strings from step 3 (one per surface)
2. Direct links to: `/`, `/blog/rgs-research-agents-workshop`, `/schools`
3. The remaining placeholder markers Yash needs to fill (Dr Lim quote, 2 student quotes)
4. Reminder that Task B (autonomous blog system) is next when he's ready

---

## Self-review checklist (writer's pass)

**Spec coverage:**
- ✅ Photo gallery (Task 2 + Task 1 assets)
- ✅ Trust bar callout (Task 3, sticker)
- ✅ Stats refresh (Task 3, 15,000+/50+)
- ✅ Blog post (Tasks 6 + 7)
- ✅ RGS case study on /schools (Tasks 4 + 5)
- ✅ Render-verify before push (Task 8)
- ✅ Deploy + curl-verify (Task 9)

**Placeholder scan:** Quote markers in blog Markdown + RGSCaseStudy.tsx are intentional (per spec). No "TBD"/"TODO"/"implement later" found in plan.

**Type consistency:** RGSCaseStudy component name matches in test file, integration in Schools.tsx, and CTA Link target matches the slug used in the insert script.

**Open assumptions:**
- Railway CLI is installed + logged in on Yash's machine (we can fall back to manual DATABASE_URL if not).
- `published_at` column is a timestamp (not nullable enforced) · script uses `NOW()`.
- `blog_posts.tags` is a Postgres text[] column · script passes JS array; `pg` driver handles the coercion.
- `cover_image` is stored as a path; the Blog page resolves `/src/assets/...` paths correctly. If it does not, swap to a public URL or move the cover into `/public/` and update both the Markdown front-matter and the `cover_image` value.
