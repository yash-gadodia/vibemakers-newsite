# Vibe Makers Academy — Project Context

> **For AI assistants**: Read `ARCHITECTURE.md` for detailed architecture context before planning or making structural changes.
>
> Claude automatically follows a development workflow (clarify → plan → implement → test → self-review) scaled to task size. You don't need to invoke `/plan` or `/test` manually — see `.claude/rules/workflow.md` and the skills in `.claude/skills/`.

## What This Is

Vibe Makers Academy (vibemakers.dev) is a marketing/informational site for a Singapore-based AI coding academy targeting teens aged 13–18. It's part of Dialogic Academy. The site includes public-facing pages (programme info, hackathon, blog, school/parent outreach), an admin backend (blog CMS, invite management, slide/flyer export), and SEO infrastructure.

- **Published URL (preview)**: https://vibemakers-newsite-production.up.railway.app
- **Production domain (still on Lovable until cutover)**: vibemakers.dev → vibemakerz.lovable.app
- **Hosting**: Railway (this repo: `yash-gadodia/vibemakers-newsite`, personal workspace). All new development happens here.
- **Status**: rebuilding off Lovable. Codebase forked from `yashgadodia/vibemakerz` on 2026-05-01; design system being swapped to v2 (see below). Lovable repo is now read-only / frozen.

## Migration & port status

This repo was forked from the Lovable-hosted `vibemakerz` repo. We're keeping the **structure, routes, components, Supabase wiring** but replacing the **design system** with the v2 "warm sticker" direction (source: `_prototype/homepage-prototype.html`).

| Page | Port status | Design version |
|------|-------------|----------------|
| `/` (Index) | TODO — port from prototype | v2 |
| `/parents`, `/schools`, `/contact`, `/programme`, `/hackathon`, `/about`, `/blog`, `/blog/:slug` | TODO — re-skin to v2 | v1 (legacy, still rendering) |
| `/admin`, `/login`, `/print`, `/print-slides`, `/privacy`, `/terms` | TODO — re-skin (lowest priority) | v1 (legacy) |

When porting a page: read `.claude/design-system.md` first. Don't carry over old `--gradient-*` references, raw color hexes, or `shadow-glow` patterns.

## Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | React 18 + Vite 5 + TypeScript + SWC |
| Styling | Tailwind CSS 3 + tailwindcss-animate + shadcn/ui (default style, CSS variables, `@` alias) |
| UI Primitives | Radix UI (full suite), Grommet (wrapped in custom provider), Framer Motion / Motion |
| Icons | Lucide React, Tabler Icons React |
| Routing | react-router-dom v6 (flat route config in App.tsx) |
| State / Data | TanStack React Query v5, Supabase JS v2 |
| Backend | Supabase (auth, Postgres, edge functions, storage) |
| Forms | react-hook-form + zod + @hookform/resolvers |
| SEO | react-helmet-async (per-page meta + JSON-LD) |
| Other | recharts, qrcode.react, jspdf + html2canvas (PDF export), embla-carousel-react, styled-components (Grommet dep), date-fns, cmdk, vaul, input-otp |

**Path alias**: `@` → `./src` (configured in vite.config.ts + tsconfig)

## Design System v2 — "warm sticker"

**Canonical reference**: `.claude/design-system.md`. **Visual source of truth**: `_prototype/homepage-prototype.html`. Read both before porting any page.

### Palette summary (HSL CSS vars in `src/index.css`)

```
--background: 38 36% 96%      #faf7f2  warm cream (page bg)
--bg-warm:    36 38% 91%      #f3ecdf  alt section bg
--foreground: 30 17% 9%       #1a1612  near-black warm (ink)
--ink-2:      23 16% 19%      #3a312a  secondary ink
--muted-fg:   27 11% 49%      #8a7d70  tertiary text
--border:     34 32% 87%      #e8e0d4  hairlines (rule)
--card:       0 0% 100%       #ffffff  card surfaces
--primary:    20 100% 55%     #ff6b1a  brand orange
--accent:     22 100% 43%     #d94e00  deep orange (hover)
--yellow:     43 100% 65%     #ffc94d  sticker / highlight (NEW in v2)
--yellow-deep:41 100% 47%     #f0a500  yellow emphasis
--radius: 0.5rem · --radius-lg: 0.75rem · --radius-xl: 1rem
```

Custom shadows: `--shadow-sticker` (`2px 2px 0 ink` — signature hard-shadow look), `--shadow-glow`, `--shadow-md`, `--shadow-lg`.

### Typography

| Token | Font | Usage |
|-------|------|-------|
| `font-display` | Cabinet Grotesk 700 | Headings, brand wordmark, big stat numbers |
| `font-sans` | Satoshi 400/500 (default body) | Body, UI text, buttons |
| `font-mono` | JetBrains Mono 600 | Eyebrow labels, code-display blocks, sticker text |

Loaded from Fontshare (Cabinet Grotesk + Satoshi) and Google (JetBrains Mono) via `@import` in `src/index.css`. Italic Cabinet Grotesk used sparingly for short editorial accents only.

### Signature elements (use these, don't reinvent)

- **`.vm-sticker`** — rotated yellow pill with ink border + hard 2px shadow. Section eyebrows ("● What you could build"). Vary `transform: rotate(±3deg)` per instance.
- **`.vm-sheen-text`** — gradient sweep across hero h1. **One per page max.**
- **`.vm-card`** — white surface, ink hairline, lifts 4px on hover with dialed-in cubic-bezier easing.
- **`.vm-btn`** — pill button, lifts 2px, pairs with `.vm-arrow` companion that slides on hover.
- **`.vm-nav-link`** — underline grows from left.
- **`animate-vm-wiggle` / `animate-vm-pulse` / `animate-vm-drift` / `animate-vm-marquee`** — the v2 motion library.
- **Terminal strip** — `bg-[#0f0a05]` + green/white mono text + `.vm-caret`. Used for "tech moments" only.

### Logo

- Primary: `src/assets/logo.png` — peace-sign-V mark
- Variants: `logo-light.png`, `logo-horizontal.png`, `logo-horizontal-light.png`, `logo.svg`
- The prototype uses an inline SVG with the same mark; new components should import `@/assets/logo.png` rather than re-encoding base64.

### Existing custom components (legacy — many will be retired during port)

shadcn/ui suite lives in `src/components/ui/`. Custom additions include `Reveal` / `RevealGroup` (scroll reveals), `parallax-section`, `shaders-hero-section`, `typewriter-text`, `hero-glow-background`, `animated-gradient-background`, `feature-section-with-hover-effects`, `shifting-dropdown`, Grommet wrappers, `builder-input`. **The v2 design avoids most of these decorative backgrounds** — keep `Reveal`/`RevealGroup` (still useful for staggered entries), retire glow/shader/gradient backgrounds in favor of clean cream + sticker accents.

### Animations

Old Tailwind keyframes (`fade-in`, `slide-in-left`, `scale-in`) **are kept** for the unported pages. New v2 keyframes (`vm-wiggle`, `vm-pulse`, `vm-drift`, `vm-marquee`, `vm-sheen`, `vm-blink`) are defined in both `src/index.css` and `tailwind.config.ts`. Framer Motion still available for complex interactive sequences but the v2 default is CSS keyframes via the `vm-*` utilities.

## Project Structure

```
vibemakerz/
├── src/
│   ├── App.tsx                     # Root: providers (QueryClient, Auth, Tooltip) + BrowserRouter + Routes
│   ├── main.tsx                    # Entry: HelmetProvider, GrommetProvider wrapping App
│   ├── index.css                   # Design system CSS variables, font imports, global styles
│   ├── App.css                     # Additional app-level styles
│   ├── assets/                     # Static images
│   │   ├── logo.png, logo-light.png, logo-horizontal*.png, logo.svg
│   │   ├── about-hero.png, singapore.svg
│   │   ├── faculty/               # Faculty member photos
│   │   ├── gallery/               # Photo gallery images
│   │   ├── logos/                  # Partner/brand logos
│   │   ├── partners/              # Partner images
│   │   └── slides/                # Slide deck assets
│   ├── components/
│   │   ├── layout/                # Header, Footer, Layout (structural shell)
│   │   ├── home/                  # Homepage sections (Hero, Trust, Testimonials, etc.)
│   │   ├── hackathon/             # Hackathon page sections
│   │   ├── programme-page/        # Programme detail page sections
│   │   ├── programmes/            # Programmes listing sections
│   │   ├── admin/                 # Admin panel components (invites, API keys, slides, flyers)
│   │   ├── providers/             # GrommetProvider.tsx
│   │   ├── ui/                    # shadcn/ui + custom UI components (~60 files)
│   │   ├── NavLink.tsx            # Shared nav link component
│   │   └── ScrollToTop.tsx        # Scroll restoration on route change
│   ├── contexts/
│   │   └── AuthContext.tsx         # Auth state + admin role check via user_roles table
│   ├── content/
│   │   └── testimonials.ts        # Static testimonial data
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile breakpoint detection
│   │   ├── use-parallax.ts        # Parallax scroll effect
│   │   └── use-toast.ts           # Toast notification hook
│   ├── integrations/supabase/
│   │   ├── client.ts              # ⚠️ AUTO-GENERATED — DO NOT EDIT
│   │   └── types.ts               # ⚠️ AUTO-GENERATED — DO NOT EDIT
│   ├── lib/
│   │   ├── utils.ts               # cn() helper (clsx + tailwind-merge)
│   │   └── sendNotification.ts    # Email notification helper via edge function
│   ├── pages/                     # Route page components (each wraps in <Layout> + <Helmet>)
│   └── test/                      # Test files
├── supabase/
│   ├── functions/
│   │   ├── invite-admin/          # Send admin invite emails
│   │   ├── receive-article/       # Receive/create blog articles via API
│   │   └── send-notification-email/ # Send notification emails
│   └── config.toml                # ⚠️ DO NOT EDIT
├── public/
│   ├── robots.txt, sitemap.xml, og-image.png, favicon.ico
│   └── ...
├── tailwind.config.ts
├── vite.config.ts                 # SWC plugin, @ alias, port 8080, lovable-tagger (dev only)
├── vitest.config.ts
├── components.json                # shadcn/ui config
├── tsconfig.json, tsconfig.app.json, tsconfig.node.json
└── package.json
```

## Routing

All routes in `src/App.tsx` (flat, no nested routes):

| Path | Page | Purpose |
|------|------|---------|
| `/` | Index | Homepage (hero, trust bar, what is vibe coding, comparison table, student projects, testimonials, programme formats, gallery, FAQ, final CTA) |
| `/programme` | Programme | Programme details |
| `/hackathon` | Hackathon | Hackathon event page |
| `/schools` | Schools | For schools outreach (trust bar, Dialogic credibility, V.I.B.E. methodology, sample lesson plan, learning outcomes, programme formats, build tracks, customisation, enquiry form) |
| `/parents` | Parents | For parents & students |
| `/about` | About | About us |
| `/blog` | Blog | Blog listing |
| `/blog/:slug` | BlogPost | Individual blog post |
| `/contact` | Contact | Contact form |
| `/login` | Login | Admin login |
| `/admin` | Admin | Admin dashboard (protected) |
| `/print` | PrintFlyer | Print-optimized flyer |
| `/print-slides` | PrintSlides | Print-optimized slides |
| `*` | NotFound | 404 |

## Layout Architecture

**`Layout`** component wraps all pages: `min-h-screen flex flex-col` → fixed `Header` + `<main className="flex-1 pt-24">` + `Footer`.

**Header behavior**:
- Fixed top, full-width transparent on load
- Collapses to centered pill on scroll (>60px): `max-w-4xl rounded-full bg-white/90 backdrop-blur-xl shadow-lg`
- Dark hero detection: `/hackathon` route gets light nav text when not scrolled
- Nav links: Programme, Hackathon, For Schools, For Parents & Students, About Us, Blog
- CTA button links to `/contact`

**Footer**: Dark background (`bg-foreground text-background`), 4-column grid with brand, quick links, programmes, contact info. "Powered by Dialogic Academy" badge.

**ScrollToTop**: Restores scroll position to top on route changes.

## Database Schema (Supabase Postgres)

### Tables

**admin_invites** — Admin invitation tracking
- `id` uuid PK, `email` text, `invited_by` uuid nullable, `accepted_at` timestamptz nullable, `created_at` timestamptz

**api_keys** — API key management for external integrations
- `id` uuid PK, `name` text, `key_hash` text, `scopes` text[] nullable, `expires_at` timestamptz nullable, `last_used_at` timestamptz nullable, `created_at` timestamptz nullable

**blog_posts** — Blog CMS
- `id` uuid PK, `title` text, `slug` text unique, `description` text nullable, `html_content` text nullable, `author` text nullable, `category` text nullable, `tags` text[] nullable, `cover_image` text nullable, `status` text nullable, `meta_title` text nullable, `meta_description` text nullable, `published_at` timestamptz nullable, `created_at` timestamptz nullable, `updated_at` timestamptz nullable

**hackathon_waitlist** — Hackathon signups
- `id` uuid PK, `name` text, `email` text, `school` text, `age_group` text, `parental_consent` boolean, `created_at` timestamptz

**parent_interest** — Parent/student interest forms
- `id` uuid PK, `parent_name` text, `parent_email` text, `student_name` text, `student_age` text, `programme_interest` text, `message` text nullable, `created_at` timestamptz

**school_enquiries** — School partnership enquiries
- `id` uuid PK, `contact_name` text, `contact_email` text, `contact_role` text, `school_name` text nullable, `student_level` text nullable, `number_of_students` text nullable, `programme_objectives` text nullable, `timing_sessions` text nullable, `message` text nullable, `created_at` timestamptz

**user_roles** — Role-based access control
- `id` uuid PK, `user_id` uuid, `role` app_role enum, `created_at` timestamptz nullable

### Enums
- `app_role`: `'admin'` | `'user'`

### Functions
- `has_role(_user_id uuid, _role app_role) → boolean` — Security definer function for RLS policies

## Authentication

- Email/password login only (no public signup)
- `AuthContext` provides: `user`, `session`, `isAdmin`, `isLoading`, `signIn`, `signOut`
- Admin role determined by querying `user_roles` table for `role = 'admin'` (not stored on user object)
- Auth state listener set up first, then existing session checked (avoids race conditions)
- Admin role check uses `setTimeout(0)` to prevent Supabase client deadlock
- Admin pages protected by `isAdmin` check from `useAuth()` hook

## Edge Functions

| Function | Purpose |
|----------|---------|
| `invite-admin/` | Send admin invitation emails |
| `receive-article/` | Receive/create blog articles via external API |
| `send-notification-email/` | Send notification emails (used via `lib/sendNotification.ts`) |

## Key Conventions

1. **Never edit auto-generated files**: `src/integrations/supabase/client.ts`, `types.ts`, `supabase/config.toml`
2. **Supabase client import**: `import { supabase } from "@/integrations/supabase/client"`
3. **Class merging**: Use `cn()` from `@/lib/utils` (clsx + tailwind-merge)
4. **Typography classes**: `font-display` for headings, default `font-sans` for body
5. **Page structure**: Every page uses `<Layout>` wrapper + `<Helmet>` for SEO meta
6. **Admin protection**: Check `isAdmin` from `AuthContext` before rendering admin UI
7. **Forms**: react-hook-form + zod schema validation + @hookform/resolvers
8. **Toasts**: sonner (`toast()`) for simple notifications, shadcn toast for richer ones
9. **Container pattern**: `container mx-auto px-4` with max-width 1400px (Tailwind config)
10. **Border radius**: Uses `--radius: 0.75rem` base with `lg`, `md`, `sm`, `2xl`, `3xl` variants
11. **Colors**: Always use design tokens (`primary`, `accent`, `foreground`, `secondary`, `muted`, `background`, `border`, `destructive`). Never use raw Tailwind color classes (`bg-blue-500`, `text-slate-700`) in public-facing components. Exception: browser chrome dots (red/yellow/green traffic lights), code syntax highlighting, and WhatsApp brand green `#25D366`.
12. **External links**: Always add `target="_blank" rel="noopener noreferrer"` to external links.
13. **Section animation pattern**: Use `<Reveal variant="up">` for section headers and `<RevealGroup staggerMs={100} variant="up">` for card grids.
14. **WhatsApp button**: Floating CTA rendered in `Layout.tsx` via `<WhatsAppButton />`. Number: +65 8890 0368. Component at `src/components/ui/whatsapp-button.tsx`.

## SEO Setup

- react-helmet-async for per-page `<title>`, `<meta>`, OG tags, Twitter card meta
- Every page must have: `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:title`, `og:description`, `og:type`, `og:image`, `<meta name="twitter:card" content="summary_large_image">`
- JSON-LD structured data on homepage (`EducationalOrganization` schema)
- Canonical URLs point to `vibemakers.dev`
- `public/robots.txt` and `public/sitemap.xml` present (update sitemap when adding new routes)
- OG image at `public/og-image.png` (currently hackathon-themed — TODO: replace with general brand image)
- 404 page has `<meta name="robots" content="noindex">` to prevent indexing

## Dev Environment

- **Dev server**: `bun run dev` (or `npm run dev`) → vite on port 8080, IPv6 host (`::`)
- **Build**: `bun run build` (production) → outputs to `dist/`
- **Production serve (Railway)**: `npm start` → `serve -s dist -l tcp://0.0.0.0:$PORT`
- **Tests**: `bun run test` → vitest one-shot (config in `vitest.config.ts`), `@testing-library/react` + `jsdom`. Watch: `bun run test:watch`.
- **Lint**: `bun run lint` → ESLint 9 flat config with react-hooks + react-refresh plugins
- **Package manager**: bun (preferred — `bun.lock` is canonical) — npm also works (`package-lock.json` present)
- **Lovable artefacts kept for now**: `lovable-tagger` (devDeps, dev-only Vite plugin) — harmless on Railway since it only loads in dev mode. Remove once we're confident the Lovable migration is final.

### Railway deployment

- **Project**: `vibemakers-newsite` (ID `9e97029e-b1f1-46ad-a8b7-3a5a8e13fffc`) in *yash-gadodia's Projects* workspace (personal — NOT Voltade)
- **Deploy path**: GitHub `main` → Railway auto-deploy (after dashboard repo connection). Manual fallback: `railway up` from repo root.
- **Required env vars (set on Railway, not committed)**:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - (optionally `VITE_SUPABASE_PROJECT_ID`)
- **Build chain**: Nixpacks detects Node project → `bun install` → `bun run build` → `npm start`. The `serve` package serves `dist/` on `$PORT`.

---

## Business Context

### Parent Company — Dialogic Academy

Dialogic Academy Pte Ltd (UEN: 202040782G) is the parent company of Vibe Makers Academy. Founded in 2018 by Pei Song, Dialogic specialises in debate, public speaking, journalism, and bespoke communication programmes for schools across Singapore.

**Key facts:**
- "Dialogic" = "Dialogue" + "Logic" — grooming critical thinkers and presentable speakers through effective communication
- Philosophy: Break free from traditional frontal instruction; opt for high-quality discussions that groom eloquent speakers and global-minded citizens
- Progressive, comfortable yet fruitful learning journeys guided by experienced coaches

**School partners (debate/communication):**
- Anglo-Chinese School (Primary), Blangah Rise Primary, Compassvale Primary, CHIJ Katong Convent (Primary), Fern Green Primary, Mayflower Primary, Kong Hwa School, Pei Chun Public School, Princess Elizabeth Primary
- Secondary/JC partners: Raffles Girls' School (RGS), Tanglin Trust School, International French School (IFS), National Junior College (NJC), Victoria Junior College (VJC), Catholic Junior College (CJC), Maris Stella High School, Anglo-Chinese School (ACS)

**Contact:** info@dialogic.academy

### Dialogic Proposal Style Guide

When creating proposals for schools, follow Dialogic's established format. This is the house style — practical, substantive, coach-explaining-what-they'll-deliver tone. NOT marketing/corporate brochure style.

**Structure:**
1. Company header (Dialogic Academy Pte Ltd, UEN)
2. **AIMS** — 3 clear bullet points with sub-bullets explaining each aim
3. **"[BRAND] APPROACH"** — Philosophy section explaining the brand name/methodology (e.g., "Dialogic Approach" explains dialogue + logic)
4. **FRAMEWORK** — Visual/conceptual framework overview
5. **WORKSHOP LESSON PLAN** — Session-by-session breakdown with:
   - Clear learning objective for each session
   - Specific activities described in detail (not just topic headers — describe what students actually do, like the "Hot Air Balloon" debate game)
   - Frameworks/acronyms students use (e.g., P.E.E.L, S.P.E.E.C.H, 5Ws+1H)
   - Capstone/culminating activity at the end
6. **School client list** — "WE HAVE CONDUCTED SIMILAR PROGRAMMES FOR:" + bullet list
7. **Contact** — Simple closing with email

**Tone principles:**
- Reads like a coach explaining exactly what they'll do
- Substantive and practical, not aspirational/marketing
- Activities are described in enough detail that the teacher can picture them happening
- Each session builds on the previous one (progressive structure)
- Capstone activity ties everything together
- Frameworks give students concrete tools they walk away with

**Reference example — Yu Neng Primary Debate CCA proposal:**
- Session 1: Introduction (confidence building) → "Hot Air Balloon" game, "Where Do You Stand?" activity
- Session 2: Building a case → 5Ws+1H framework, "Townhall Discussion" activity
- Session 3: Arguments & Rebuttals → P.E.E.L framework, rebuttal template
- Session 4: Style & Persuasion → S.P.E.E.C.H acronym, video examples, daily life application
- Session 5&6: Rehearsal & Debate → Mock debate, interclass competition, peer feedback

### RGS (Raffles Girls' School) — Strategic Context

RGS is the first school Vibe Makers is targeting. Dialogic has a 5-year relationship with the school.

**Key people:**
- **Pei Song** — Founder of Dialogic Academy and Vibe Makers
- **Papa Chua** — RGS debate coach, the relationship contact at RGS

**Strategic notes from Papa Chua:**
- The RGS teacher "has many ideas" — do NOT position the pitch too narrowly
- Position the programme as **illustrative examples for further discussion**, not prescriptive
- Present **both Y1 and Y2-4 as options** (not either/or)
- Y2-4 pipeline advantage: next year you can do Y2 AND new Y1 (growing footprint)
- Customisation/flexibility is key — show what we CAN do, let the teacher shape it

**RGS-specific intel:**
- Infocomm Club: 28 members, won Distinction at National Infocomm Competition for "Healing Café" project (mental wellness platform)
- Robotics Club also exists
- 36 CCAs total, compulsory CCA participation
- Good fit for vibe coding: students already building tech projects, this adds product thinking + AI tools layer

### Vibe Makers Programme Content

**Core positioning:** "Problem-Solving with AI" — An applied learning experience where students define problems, design solutions, and develop 21st Century Competencies, using AI as a tool, not a shortcut.

**What is Vibe Coding:** Describing what you want in plain language, using AI to generate, test, and refine working code. Focus is on problem-solving, not syntax. Students don't need prior coding experience.

**Product Thinking Pillars:**
1. User-Centered — Start with real people and real problems
2. Constraint-Aware — Work within realistic boundaries (time, tools, scope)
3. Feedback-Driven — Test, learn, iterate

**V.I.B.E. Cycle Methodology:**
- **Vision** (Empathise & Define) — Students identify real-world problems, define user needs, set project vision
- **Ideate** (Explore & Decide) — Brainstorm solutions, evaluate trade-offs, select approach
- **Build** (Prototype) — Use AI tools (Lovable, Claude) to build working prototypes through natural language
- **Evolve** (Test & Improve) — User testing, feedback collection, iteration, reflection

**Primary tools:** Lovable (AI app builder) + Claude (AI reasoning partner). Flexible to school's needs/preferences.

**MOE alignment:** EdTech Masterplan 2030, self-directed learners, digital literacy, 21st Century Competencies

**Default format:** 4 half-day sessions, 2-3 hours each. Can present alternative options (e.g., 2 full days, 6 shorter sessions, etc.)

### Existing Proposal — RGS Vibe Makers (v2)

The current proposal is at `~/Downloads/Vibe-Makers-RGS-Proposal.docx` (9 pages). It follows the Dialogic house style with:
- Executive summary + programme overview table
- About Us (Dialogic history + Vibe Makers positioning)
- Why This Programme (opportunity, RGS alignment, Y1 vs Y2-4 options)
- V.I.B.E. Cycle methodology breakdown with evidence-of-learning table
- Sample 4-day lesson plan (2.5 hrs/session) with activities and deliverables
- Sample project ideas (CCA tracker, Study Group Matcher, School Event Hub, Mental Wellness Check-in)
- Customisation & flexibility section (duration, themes, integration point, assessment, tools, cohort size)
- Learning outcomes + skills developed table mapped to 21CC
- Logistics & next steps

The `/schools` page on the site now mirrors this proposal's content (V.I.B.E. methodology, lesson plan, learning outcomes, trust bar).

### Contact & Lead Gen

- **WhatsApp**: +65 8890 0368 (floating button on all pages)
- **Email**: vibemakers@dialogic.academy
- **School enquiries**: Form on `/schools` page → `school_enquiries` Supabase table → email notification
- **Parent interest**: Form on `/parents` page → `parent_interest` Supabase table → email notification
- **General contact**: Form on `/contact` page with enquiry type routing (school/parent/general)

### Hackathon Programme

**Format:** 2 Saturdays, 8 hours total, 50 teams of 3-4 pax (150-200 students)
- **Saturday 1 (Teaching Day):** Vibe coding fundamentals, tool familiarisation (Lovable, Claude), problem identification, team formation, initial prototyping
- **Saturday 2 (Demo Day):** Continued building, demo presentations, sharings, prize presentation

**Challenge Tracks:**
1. Productivity & Learning — Tools for school, study, time management
2. Community & Environment — Solutions for neighbourhood, sustainability, social good
3. Creative Expression — Art, music, storytelling, content creation with AI

**Judging Criteria:** Innovation (25%), Impact (25%), Execution (25%), Presentation (25%)

**Venue Requirements:** Main hall (200+ capacity), breakout rooms (5-10), reliable WiFi (200+ devices), power outlets, A/V system, catering area

**Two Venue Proposal Templates Created:**
1. **School Venue Proposal** (`Hackathon-Venue-Proposal-Schools.docx`) — Pitched to schools as hosts. Value props: Visibility as AI Education Leader, Priority Student Access (10 teams/40 students guaranteed), MOE Alignment with national AI direction, Zero Cost/Minimal Lift (we handle everything). Includes "We Provide vs School Provides" table.
2. **Lorong.ai Venue Proposal** (`Hackathon-Venue-Proposal-Lorong-AI.docx`) — Pitched to Lorong.ai (Singapore's AI ecosystem hub at WeWork@22 Cross St, 250+ core members, 8,500+ practitioners). Personal angle: Yash attended OpenAI Codex hackathon there. Value props: Youth Pipeline into AI ecosystem, Visibility & Impact, Mission Alignment, National AI Direction. Optional community involvement (mentors, judges, lightning talks).

**National Context Framing (used across proposals):**
- PM Lawrence Wong, Budget 2026: "In a changed world, a decisive factor for success will be how we harness new technologies — foremost amongst them, Artificial Intelligence."
- PM Wong: "Our advantage does not lie in building the largest frontier models. It lies in deploying AI effectively, responsibly, and at speed."
- MOE Four AI 'Learns' Framework: Learn about AI, Learn to use AI, Learn with AI, Learn beyond AI
- Minister Chan Chun Sing (Education): Emphasis on preparing students for AI-transformed economy

### RGS Y2 Lesson Plan (4 Sessions × 2 Hours)

Created detailed lesson plan for RGS Year 2 students (`Vibe-Makers-RGS-Y2-Lesson-Plan.docx`, 11 pages). Builds on what Y2 students already know from Stick'Em programme (empathy maps, HMW questions, Value Proposition Canvas, physical prototyping).

**Session Breakdown:**
1. **Vision — From Physical to Digital** (Bridge Stick'Em → Vibe Makers): Rapid empathy mapping, problem scoping, intro to Lovable/Claude, first scaffold
2. **Build — AI-Powered Prototyping** (Core build session): Prompt engineering, iterative building with AI, structured build sprint
3. **Evolve — Test, Iterate, Polish** (Quality & iteration): User testing protocols, feedback capture, iteration sprint, pitch prep
4. **Superday — Demo, Present, Reflect** (Showcase): Final polish, 5-min team presentations, peer judging, awards, reflection

**Key Design Decisions:**
- Explicitly bridges physical (Stick'Em) → digital (Vibe Makers) prototyping
- Same design thinking process, different prototyping material ("transfer learning")
- Tools: Lovable (AI app builder) + Claude (AI reasoning partner)
- Progressive structure: each session builds on previous
- Superday format with peer judging and awards

### Stick'Em Programme Context (RGS Cogitare Club)

Stick'Em is Dialogic's physical prototyping programme already running at RGS Cogitare Club. Important context for positioning Vibe Makers as complementary, not competing.

**What students already know from Stick'Em:**
- Y1 (9 sessions): Basic connectors + sensors, block-based programming, design thinking (empathy maps, HMW questions), prototyping challenges, Rube Goldberg machines
- Y2-4 (6 sessions): Advanced engineering (microgravity RPM, solar panel optimization), reverse engineering (Gardens by the Bay), ISRP support

**Positioning:** "Where Stick'Em teaches students to build physical prototypes with connectors and sensors, Vibe Makers teaches them to build digital prototypes with AI." Complementary, not competing.

### Document Generation Patterns

**Brand colors for documents:**
- ORANGE: #E8652B (primary)
- DARK_ORANGE: #C44A1A (headers, emphasis)
- WARM_BEIGE: #F5EDE3 (backgrounds)
- NEAR_BLACK: #2A2017 (body text)
- LIGHT_BEIGE: #FAF7F2 (alternate backgrounds)

**Logo:** `vibemakerz/src/assets/logo-horizontal.png` (used in document headers)

**Tech for .docx generation:** docx-js (Node.js) with programmatic Document, Packer, Paragraph, TextRun, Table, ImageRun. Validated via `scripts/office/validate.py`. PDF conversion via LibreOffice (`soffice`).

**For surgical edits to existing .docx:** Unpack ZIP → edit `word/document.xml` → repack. Preserves all existing formatting/styles.

### Files Created

| File | Description |
|------|-------------|
| `Vibe-Makers-RGS-Proposal-v2.docx` | 9-page RGS proposal with Budget 2026 framing |
| `Vibe-Makers-RGS-Y2-Lesson-Plan.docx` | 11-page detailed lesson plan for Y2 students |
| `Hackathon-Venue-Proposal-Schools.docx` | 7-page school venue proposal |
| `Hackathon-Venue-Proposal-Lorong-AI.docx` | 7-page Lorong.ai venue proposal |
| `Vibe-Makers-Team-Context-Pack/` | Full context pack for team handoff |
| `WEBSITE_IMPROVEMENT_PROMPT.md` | 23 website issues, prioritized |
