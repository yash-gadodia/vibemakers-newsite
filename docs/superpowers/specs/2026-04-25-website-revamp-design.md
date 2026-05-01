# Vibe Makers Website Revamp — Design Spec

**Date**: 2026-04-25
**Author**: yash (with Claude)
**Status**: **Approved** by user 2026-04-25
**Related**: see research artefacts in conversation; will be summarised into `/docs/research/` after approval

---

## 1. Goals

**Primary**: 5 parent enquiries/week (private classes — 1-on-1, small group, holiday intensives) within 3 months of relaunch.
**Secondary**: 1-2 school enquiries/week (workshops). Schools mostly come via Dialogic network; site reinforces credibility.

**Editorial goal**: position Vibe Makers as the **default AI-coding academy for ambitious Singapore teens (13-18)**, anchored by Dialogic's 18-year track record at top schools (RGS, ACS, NJC, VJC, CHIJ).

**Success signals (3 months post-launch)**:
- ≥20 parent enquiries/month via form + WhatsApp
- ≥4 school enquiries/month
- Page-1 SG ranking for `vibe coding`, `ai coding singapore teens`, `1-on-1 ai coding tutor singapore`, `holiday coding camp singapore secondary` (long-tail; not generic "coding classes")
- Site lighthouse: ≥90 perf, ≥95 SEO, ≥95 accessibility

## 2. Positioning

**Hybrid: institutional credibility (Dialogic) + outcome differentiation (build real things with AI).**

> *"Singapore's debate, journalism, and now AI academy. Teens build real apps with AI in days — not just learn syntax."*

Three trust pillars (in order):
1. **Halo**: Dialogic Academy (est. 2018) runs programmes at RGS, ACS, NJC, VJC, CHIJ, Maris Stella, Nan Chiau, Pei Chun + others. AI is the new arm.
2. **Pedagogy**: V.I.B.E. cycle (Vision → Ideate → Build → Evolve). Problem-solving with AI tools (Lovable + Claude), not syntax drilling. MOE EdTech 2030 + Budget 2026 AI aligned.
3. **Transparency**: pricing on the site (most competitors hide it). Pricing + format clarity = conversion accelerant.

**Differentiators vs Mind Theory** (the closest competitor — also uses "vibe coding" terminology, est. March 2023): we lead with Dialogic's school relationships and the V.I.B.E. *methodology* (not just the term). They lead with creative AI (art, video). We lead with apps, pedagogy, and school halo.

## 3. Audiences

Three personas (from research). Site copy is anchored mainly on (1) and (2); (3) is captured via dedicated holiday-camps landing.

| Persona | Where they land | What converts them |
|---|---|---|
| **Kiasu Pathway-Climber** (RGS/ACS mum, S$4-6k/mo enrichment, DSA-obsessed) | `/`, `/classes`, `/about` | Named-school testimonials, founder credentials, DSA portfolio outcomes |
| **AI Disruption Dad** (tech-aware, problem-solving > syntax) | `/`, `/vibe-method`, `/about` | Methodology clarity, founder background, student-built apps |
| **Holiday-Intensive Parent** (time-poor, $500-1,500/programme) | `/classes/holiday-camps` | Schedule clarity, outcomes visibility, fast signup |

**Schools** (admins/HoDs) land on `/schools`, `/programme`, `/about`. Convert on Dialogic credentials, MOE alignment, sample lesson plan, named-school list.

## 4. Aesthetic Direction — "Modern + Warm with editorial sections"

Reference register: **Linear/Stripe layout discipline, Notion warmth, NYT-Education editorial sections.**

### Tone shifts from current site
| From (current) | To (new) |
|---|---|
| Multiple shader/gradient backgrounds | One subtle hero treatment, otherwise solid + image-led |
| Orange used everywhere (cards, sections, accents) | Orange reserved for CTAs + 1-2 key accents per page |
| Heavy parallax + scroll-driven motion | Restrained motion: Framer Motion only for micro-reveals, no parallax-everywhere |
| Abstract decorative imagery | Real photos: classroom, coding sessions, student presentations |
| "Vibe coding" terminology spread thin | "V.I.B.E. method" as the named, defensible pedagogy |
| Bright/playful enrichment-school feel | Confident academy feel — leaders in AI teaching, not another coding bootcamp |

### Design tokens — adjustments to `src/index.css`
- Keep: `--primary: 24 95% 53%` (vibrant orange), `--accent: 16 85% 45%`, type stack
- Add a discipline rule: orange is **only** for `bg-primary`/`text-primary`/`ring-primary` on CTAs and 1-2 elements per section. Not used on section backgrounds.
- Strengthen neutrals: introduce a `--surface` token (warm off-white, slightly cooler than current `--background`) for alternating section bands so sections feel distinct without colored backgrounds.
- Tighten radius: reduce default radius from `0.75rem` to `0.5rem` for cards. Keep larger radii for hero/feature cards. (Smaller radii read as more institutional.)
- New shadows: lighter, single-layer shadows; remove `--shadow-glow` from non-hero use.

### Typography
- Headings: keep Cabinet Grotesk
- Body: keep Satoshi
- New: an **editorial section style** for `/about`, `/vibe-method`, founder note — wider line-height (1.7), larger font-size (18-19px), narrower max-width (~640px), drop-cap optional. Borrows the NYT editorial register without going monospace/cold.

### Motion
- All decorative shaders/parallax/raining-letters removed from non-hero contexts
- `<Reveal>` / `<RevealGroup>` kept (subtle stagger) for section reveals
- Hero animation: ONE subtle treatment per page (fade-in headline, no scroll-jacking)
- No carousel/marquee unless content genuinely benefits (school logos = OK, hero = no)

## 5. Information Architecture

### Public pages (9 + 1 retained)

| Path | Status | Job | Primary audience | Target query | Primary CTA |
|---|---|---|---|---|---|
| `/` | Revamp | Brand + outcomes + audience routing | Both (60% parents) | `vibe makers academy` | "See classes" → `/classes` |
| `/classes` | **NEW** (replaces `/parents`) | Hub for 1-on-1, small group, holiday camps + format comparison | Parents | `ai coding classes singapore teens` | "Enquire" → form |
| `/classes/1-on-1` | **NEW** | Premium tutoring deep-dive | Parents (premium) | `1-on-1 ai coding tutor singapore` | "Book trial" → form |
| `/classes/holiday-camps` | **NEW** | Seasonal holiday intensive | Parents (busy) | `holiday coding camp singapore secondary` | "Reserve seat" → form |
| `/schools` | Revamp | School admin enquiry conversion | Schools | `ai workshop schools singapore moe` | "Get a proposal" → form |
| `/programme` | Refocus | School-workshop programme detail (linked from `/schools`) | Schools | `moe-aligned coding workshop singapore` | "Get a proposal" → form |
| `/pricing` | **NEW** | Transparency moat — every format with $$ | Both | `coding class price singapore` | Per-format CTAs |
| `/vibe-method` | **NEW** | "What is vibe coding" pillar (own the term) | Both | `what is vibe coding`, `ai assisted coding for teens` | "See classes" / "Schools enquiry" |
| `/about` | Revamp | Founder story + Dialogic 18-year arc | Both | `vibe makers founder`, `dialogic academy ai` | Audience-routed CTAs |
| `/contact` | Revamp | Catch-all + audience routing | Both | branded | Form with audience picker |
| `/hackathon` | Light visual refresh only (event content unchanged) | Event landing | Event attendees | branded | Existing waitlist |

Removed: `/blog`, `/blog/:slug` (already done). Kept internal: `/login`, `/admin`, `/print`, `/print-slides`, `/privacy`, `/terms`, `/demo/loyang-view`.

### Navigation

**Header (desktop)**: Classes · Schools · Pricing · Method · About → `Enquire` button (primary CTA, orange)

**Header (mobile)**: hamburger expanding to same list + Contact link

**Footer**:
- Column 1: brand + Dialogic-powered badge + tagline
- Column 2: For Parents — `/classes`, `/classes/1-on-1`, `/classes/holiday-camps`, `/pricing`
- Column 3: For Schools — `/schools`, `/programme`, `/about`
- Column 4: Vibe Makers — `/vibe-method`, `/about`, `/contact`, `/hackathon`
- Bottom row: copyright, privacy, terms, WhatsApp icon

## 6. Page-by-Page Briefs

### `/` Landing

| Section | Content |
|---|---|
| 1. Hero | Headline: *"Where Singapore teens learn to build real apps with AI."* Subhead: *"From the academy that's run debate and journalism at RGS, ACS, NJC, VJC for 18 years — now teaching the next generation of AI-native builders."* Primary CTA: "See classes". Secondary: "For schools". One real classroom photo right side. No shaders. |
| 2. Trust bar | Logo grid: ACS, RGS, NJC, VJC, CHIJ, Maris Stella, Nan Chiau, Pei Chun, PLMGS, Bedok South. Above: "Trusted at" |
| 3. The problem (editorial section) | 1 short paragraph (~80 words): why generic coding tuition isn't enough in 2026. Cite Budget 2026 AI push + MOE EdTech 2030. Editorial typography. |
| 4. The V.I.B.E. method | 4 stacked cards (Vision, Ideate, Build, Evolve) with icon + 1-line + 1-line example. Link to `/vibe-method` for deeper explainer. |
| 5. Proof — student work | 3-4 cards with screenshot + project name + 1-liner outcome. Pull from `app-demo-screenshot.jpg` + others. |
| 6. Why Vibe Makers (3-pillar) | 3 cards: (a) Dialogic 18-year halo (b) AI-native pedagogy (c) Transparent pricing |
| 7. Two paths CTA | Side-by-side: "For Parents → Classes" / "For Schools → Workshops". Primary parent CTA orange; school CTA outlined. |
| 8. Founder note | Editorial section: small founder photo + ~120-word personal note from Yash. Signed. |
| 9. FAQ | 6 high-intent questions: format, pricing, age range, online vs in-person, AI tools used, MOE alignment |
| 10. Final CTA + footer | Banner: "Ready to start?" with WhatsApp + form + email |

### `/classes`

| Section | Content |
|---|---|
| Hero | "Three ways your teen can learn AI coding with us" + one-line for each |
| Format comparison table | Columns: 1-on-1 / Small group / Holiday camp. Rows: format, group size, schedule, intensity, who it's for, price-from |
| Each format expanded | 3 vertical sections, each: photo + paragraph + bullet outcomes + CTA → `/classes/<slug>` or enquiry |
| Trust bar | Same as homepage (school logos) |
| Testimonials | 3 parent or student quotes with school name |
| FAQ | 5 questions specific to private classes |
| Final CTA | Audience-routed enquiry form |

### `/classes/1-on-1`

| Section | Content |
|---|---|
| Hero | "1-on-1 AI Coding Coaching for Ambitious Teens" + premium framing |
| Who it's for | 3 personas: portfolio builder, JC student, deep-dive learner |
| What you get | Personalised pace, founder/coach matched, outcome-driven |
| Sample 8-week arc | Week-by-week structure |
| Pricing | Hourly + package rates. Transparent. |
| FAQ | 4 questions |
| Final CTA | "Book a free 30-min consult" |

### `/classes/holiday-camps`

| Section | Content |
|---|---|
| Hero | "Holiday AI Coding Intensives — Sep / Dec / Jun school holidays" + next-cohort dates |
| Format | 3-5 day intensive, 4 hrs/day, 6-10 students, online or in-person |
| Daily arc | Day 1: Vision → Day 5: Demo Day |
| Sample student outputs | Past hackathon-style projects |
| Pricing + dates | Specific upcoming cohorts with $$ |
| FAQ | 4 questions: prerequisites, what to bring, refund policy, age mix |
| Final CTA | "Reserve a seat" form |

### `/schools`

Largely refresh of current page with new visuals + tightened copy:

| Section | Content |
|---|---|
| Hero | "AI workshops for Singapore schools — MOE-aligned, ready-to-deploy" |
| Trust bar | School logos |
| Why now (editorial) | Budget 2026 AI + MOE EdTech 2030 framing |
| The V.I.B.E. method (link) | Same 4-card deck → `/vibe-method` |
| Sample 4-day lesson plan | Existing content from current `/schools`, restyled |
| Learning outcomes | 21CC + AI Literacy mapping |
| Customisation | "What we adapt to your school" |
| Founder note + Dialogic | Pei Song + Yash photo + Dialogic 18-year story |
| Enquiry form | School-specific fields |

### `/programme`

Refocus to the school workshop programme (linked from `/schools`). Currently sparse — fill in with the proposal-style content (we have Vibe-Makers-RGS-Proposal-v2.docx as source material).

### `/pricing`

| Section | Content |
|---|---|
| Hero | "Transparent pricing. No hidden fees." (Direct shot at competitors who hide pricing.) |
| Format cards | 3 cards: 1-on-1 / Small group / Holiday camp. Each shows price-from, what's included, what's not |
| Comparison table | Side-by-side detail |
| Schools section | "School workshop pricing is custom — request a proposal" → `/schools` form |
| FAQ | "Is there a free trial?", "Do you offer sibling discount?", "Refund policy?", "Material costs?" |
| Final CTA | Form |

**Drafted pricing (subject to user final review before publish)**:

Benchmarks: Empire Code S$30/hr (budget tier, public). Coding Lab S$200-2000+ range (premium, opaque). Saturday Kids holiday camps S$200-600/week. Vibe Makers positions premium-but-accessible: above Empire Code (we are not budget), below Coding Lab list pricing (we are newer + transparent).

| Format | Price (drafted) | Notes |
|---|---|---|
| 1-on-1 with Head Coach (Yash) | **S$160/hour** · 8-hr package S$1,200 (S$150 effective) | Premium tier; founder-led |
| 1-on-1 with Associate Coach | **S$100/hour** · 8-hr package S$760 (S$95 effective) | Trained Vibe Makers coach |
| Small group (4-6 students) — 10-week term | **From S$760** (1hr/wk) · S$1,400 (2hr/wk) | Per student. Cohort-based |
| Holiday intensive — 3 days, 4hr/day | **S$680** | 6-10 students. Includes Demo Day. |
| Holiday intensive — 5 days, 4hr/day | **S$1,080** | 6-10 students. Includes Demo Day. |
| Free 30-min discovery consult | S$0 | All formats. Lead-gen entry point. |

These show on `/pricing`. User reviews before launch.

### `/vibe-method`

Pillar SEO page targeting "what is vibe coding" + adjacent queries.

| Section | Content |
|---|---|
| Hero | "What is Vibe Coding? The Vibe Method, explained." |
| Definition (editorial) | 200 words on what vibe coding is + isn't (Mind Theory's term ≠ ours; ours is methodology) |
| The 4 stages | Each gets a long-form section: Vision (empathise + define), Ideate (explore + decide), Build (prototype with AI), Evolve (test + improve). Each 150-200 words + diagram. |
| Why this works for teens | Cognitive science + design-thinking framing |
| What teens actually build | 3-4 student examples |
| Schools using V.I.B.E. | Logos + 1-line per school |
| FAQ | "How is this different from regular coding?", "Will my teen actually learn programming?", "What tools?" |
| Final CTA | Two paths (parents/schools) |

### `/about`

| Section | Content |
|---|---|
| Hero | "An 18-year academy. A new arm for AI." |
| Pei Song founder block | Photo + 200-word bio: Dialogic founder, debate/journalism legacy, schools she serves |
| Yash founder block | Photo + 200-word bio: builder, AI background, why he's teaching personally |
| The journey | Editorial 4-paragraph story: 2018 Dialogic founded → 5+ year school relationships → 2025 AI inflection → 2026 Vibe Makers launches |
| Coaches under Yash | Brief mention (no photos required) — "Yash teaches personally; coaches under him for scale" |
| Schools we serve | Full logo grid |
| Press / partners | Crimson, MOE, NLB partnership badges |
| Values (editorial) | 3 short principles: Rigor, Agency, Transparency |
| Final CTA | Two paths |

### `/contact`

| Section | Content |
|---|---|
| Hero | "Tell us about your teen, your school, or your idea." |
| Audience picker | Tabs: Parent · School · Other → form fields adjust |
| Form | Per-audience fields (existing tables: parent_interest, school_enquiries) |
| Direct contact | WhatsApp +65 8890 0368 + email |
| FAQ | 3-4 logistics questions ("How fast do you reply?", etc.) |

## 7. Component System Updates

### New shared components in `src/components/ui/`
- `EditorialSection` — wraps content in editorial typography + max-width 640
- `FormatComparisonTable` — used on `/classes` and `/pricing`
- `PricingCard` — single-format card with price-from + features
- `FounderBlock` — photo + name + role + bio + signature feel
- `SchoolLogosGrid` — responsive grid (NOT marquee — looks more institutional)
- `MethodologyDiagram` — V.I.B.E. cycle visual (4 stages connected)
- `StudentWorkCard` — screenshot + project name + 1-line outcome + builder name + school
- `StatBar` — single horizontal row of "18 years · 15+ schools · 5,000+ students · MOE-aligned"
- `AudiencePathCTA` — twin-card "For Parents | For Schools" component
- `EnquiryForm` — unified form with audience-tab variants (replaces the per-page form copies)

### Components to retire / restyle
- `shaders-hero-section` — retire (use simple Hero with optional photo)
- `raining-letters-background` — retire
- `animated-gradient-background` — retire
- `hero-glow-background` — keep but use sparingly (one page max)
- `parallax-section` — retire (looks dated; bad for accessibility)
- `typewriter-text` — retire
- `feature-section-with-hover-effects` — keep but simplify
- `shifting-dropdown` — retire (one-tab dropdown is now just one nav link to `/about`)
- `grommet-*` — audit usage; aim to replace with shadcn equivalents to drop the Grommet dep

### Layout
- `Layout.tsx` — keep wrapper pattern; ensure WhatsApp button is positioned consistently
- `Header.tsx` — restructure to new nav (Classes · Schools · Pricing · Method · About + Enquire CTA)
- `Footer.tsx` — restructure to new 4-column architecture

## 8. SEO Fixes (must ship with revamp)

These are **bugs + structural issues** uncovered in the audit. Will be addressed during the revamp, not as a separate project.

1. **Fix 404 indexing bug** — `index.html` has a global `<meta name="robots" content="index, follow">` that Helmet's per-page noindex on `NotFound.tsx` doesn't override in all crawler conditions. Fix: remove default robots tag from `index.html`; let Helmet own it per-route.
2. **Fix duplicate canonical / meta description tags** — `index.html` has static defaults that race with Helmet's per-page tags. Same fix: thin out `index.html` to charset + viewport + favicon only; let Helmet own all SEO meta.
3. **Add JSON-LD schemas** — currently only `/` has `EducationalOrganization`. Add:
   - `LocalBusiness` (Layout-level, every page)
   - `Person` (founder schema on `/about`)
   - `Course` (`/programme`, `/classes/*`)
   - `FAQPage` (every page that has FAQ section)
   - `BreadcrumbList` (every non-home page)
4. **Sitemap update** — add the 4 new pages, remove the now-stale `2026-03-12` lastmod values, add `<image:image>` namespace for hero images
5. **Per-page meta hygiene** — every page gets unique title (≤60 chars), unique description (≤155 chars), canonical (https://vibemakers.dev/...), OG + Twitter card
6. **H1 audit** — every page has exactly one H1. Heading hierarchy coherent (no skipping levels).
7. **Image alt audit** — every `<img>` gets meaningful alt; decorative ones get `alt=""`
8. **Performance** — lazy-load below-fold images, replace any 1MB+ hero with optimised versions, audit bundle size (currently 2MB JS — code-split routes if practical)

## 9. Content & Copy Notes

**Voice**: confident, specific, restrained. NOT marketing-fluffy. Closer to "founder-explaining-to-a-school-principal" than "growth-marketing-landing-page".

**Forbidden phrases**: "revolutionize", "next-gen", "cutting-edge", "unleash", "empower" (overused), "unlock potential", "future-ready" (cliché in SG enrichment market).

**Required phrases (where natural)**: school names (RGS, ACS, NJC, VJC, CHIJ, Maris Stella, Nan Chiau), Dialogic, V.I.B.E., MOE EdTech Masterplan 2030, Budget 2026, Lovable + Claude.

**Founder note (homepage)**: ~120 words, first-person from Yash. Why he's personally teaching. What he wants for SG teens.

**Pricing copy**: state numbers. If a number is "from S$X", make X concrete. No "investment in your child's future" copy.

## 10. Out of Scope (this cycle)

- Blog return / SEO content engine — proposed as **next cycle** after revamp ships and we measure
- Full mobile app or course platform
- New logo / wordmark redesign — current logo stays
- Internationalisation
- Translating site to Mandarin/Malay
- Lovable platform abandonment — site stays on Lovable for now
- Custom CMS — admin panel stays as-is
- Receive-article edge function — leave deployed but unused (until SEO content engine)

## 11. Dependencies

| Dependency | Owner | Status |
|---|---|---|
| Higher-res Yash photo (current is 7.8k thumbnail) | Yash | **Needed before launch** |
| Pricing numbers (1-on-1, small group, holiday camp) | Yash | **Needed before /pricing goes live** |
| Founder note copy (~120 words from Yash) | Yash | **Needed before /  goes live** |
| Coach bios (optional, low priority) | Yash | Nice-to-have |
| Permission/wording for using school names in testimonials & logos | Already done via Dialogic relationships | Confirm before publishing |
| Real student-work screenshots (have `app-demo-screenshot.jpg` — need 3-4 more) | Yash | Needed before `/` and `/vibe-method` ship |

## 12. Execution Plan (high-level, full plan via writing-plans next)

**Week 1 — Foundations**
- Fix critical SEO bugs (`index.html` meta cleanup, 404 noindex)
- Refresh design tokens in `src/index.css`
- Build new shared components (Hero, EditorialSection, PricingCard, FounderBlock, SchoolLogosGrid, MethodologyDiagram, StudentWorkCard, StatBar, AudiencePathCTA, EnquiryForm)
- Restructure Header + Footer
- Add LocalBusiness JSON-LD to Layout

**Week 2-3 — Page builds**
- `/` (landing) — first, since other pages link back
- `/classes` + `/classes/1-on-1` + `/classes/holiday-camps`
- `/schools` + `/programme`
- `/pricing`
- `/vibe-method`
- `/about`
- `/contact`

**Week 4 — Polish + ship**
- All JSON-LD schemas
- Sitemap update
- Lighthouse audit + fixes
- Pricing numbers + founder note inserted
- E2E click-through review of all pages
- Push to main → Lovable deploys

## 13. Risks

1. **Mind Theory positioning collision on "vibe coding"** — mitigated by emphasising V.I.B.E. *method* (capital letters, defined acronym) and pedagogy depth, not the lowercase term.
2. **Photo dependency** — if Yash photo + pricing don't come through, launch slips. Mitigated by shipping with placeholders and swapping in.
3. **Reduced visual flair vs current site** — some users may miss the shaders/animation. Risk traded for credibility with school admins + reduced page weight.
4. **Domain authority is low** — generic head terms still take 12+ months. We compete on niche / brand / local for this cycle.

## 14. Resolved decisions (was: Open Questions)

- **Pricing**: drafted from competitor benchmarks (see section 6 `/pricing` brief). User will final-review before publish.
- **Yash's title**: **Head Coach**. Used everywhere on the site.
- **`/programme` vs `/schools`**: kept separate. `/programme` deep-dives on the workshop curriculum (SEO play); `/schools` stays conversion-focused.
- **Hosting**: stay on Lovable for this revamp cycle. Hosting migration to Railway/Vercel is **Phase 5** (post-launch, only if we see real Googlebot indexing issues that pure-SPA rendering can't solve). Same code, different host — no rewrite required.

## 15. Phase 5 (post-launch, conditional) — Hosting migration

**Trigger**: 4-6 weeks post-launch, if Google Search Console shows < 50% of pages indexed, or if pages aren't ranking for branded queries (`vibe makers`, `vibe coding singapore`).

**Path A** (recommended): migrate to **Vercel** + add `vite-plugin-ssr` (or `vike`) to pre-render the 9 public pages at build time. Static HTML for crawlers, full React app for users. Forms still POST to Supabase (no backend change). Migration is 3-5 days.

**Path B**: migrate to **Railway** + run a Node server with the same Vite build. Less SEO benefit unless we add SSG. Useful if we want to move other services off Supabase (we don't, currently).

**Path C**: stay on Lovable but add SSG via `vite-plugin-ssr` if Lovable supports it. Need to check.

Decision deferred to Phase 5 review.

---

**Next step**: invoke `superpowers:writing-plans` to break Phase 1 (foundations: SEO bug fixes + design system refresh + new shared components + Header/Footer restructure) into bite-sized TDD-ready tasks. Each subsequent phase gets its own plan after the previous one ships.
