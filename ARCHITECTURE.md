# Vibe Makers Academy — Architecture

## Overview

Marketing/informational site for Vibe Makers Academy (Singapore AI coding academy for teens, a Dialogic Academy programme). Single-page app with public marketing pages, blog, admin backend, and print-optimized pages. Built with Lovable.

## System Map

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (SPA)                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  App.tsx (Providers + Router)                          │ │
│  │  ├─ QueryClientProvider (TanStack Query v5)            │ │
│  │  ├─ AuthProvider (Supabase auth + admin role)          │ │
│  │  ├─ TooltipProvider (Radix)                            │ │
│  │  ├─ Toaster + Sonner                                   │ │
│  │  └─ BrowserRouter → ScrollToTop + <Routes>             │ │
│  └────────────────────────────────────────────────────────┘ │
│           │                                                 │
│           ▼                                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Layout (all pages)                                    │ │
│  │  ├─ Header (scroll-collapsing pill)                    │ │
│  │  ├─ <main>                                             │ │
│  │  │   └─ Page (Index, Schools, Parents, Hackathon, …)   │ │
│  │  ├─ Footer                                             │ │
│  │  └─ WhatsAppButton (floating)                          │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │ supabase-js v2
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Supabase                                                   │
│  ├─ Auth (email/password; admin role in user_roles table)   │
│  ├─ Postgres (blog_posts, *_interest, *_enquiries, waitlist)│
│  └─ Edge Functions (invite-admin, receive-article,          │
│                     send-notification-email)                │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

| Path | Responsibility |
|------|----------------|
| `src/App.tsx` | Root providers + flat route config (no nested routes) |
| `src/main.tsx` | Entry: HelmetProvider + GrommetProvider wrapping App |
| `src/pages/` | Route-level page components (each wraps `<Layout>` + `<Helmet>`) |
| `src/components/layout/` | Header, Footer, Layout shell, WhatsAppButton |
| `src/components/home/` | Homepage sections (Hero, PromptDemo, Gallery, etc.) |
| `src/components/hackathon/`, `programme-page/`, `programmes/` | Page-specific section components |
| `src/components/admin/` | Admin panel UI (invites, API keys, slides, flyers) |
| `src/components/ui/` | shadcn/ui primitives + custom UI (Reveal, parallax, etc.) |
| `src/contexts/AuthContext.tsx` | Supabase auth state + admin role check |
| `src/integrations/supabase/` | Auto-generated client + types — **DO NOT EDIT** |
| `src/hooks/` | `use-mobile`, `use-parallax`, `use-toast` |
| `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `src/lib/sendNotification.ts` | Invokes `send-notification-email` edge function |
| `src/content/testimonials.ts` | Static data |
| `src/test/` | Vitest setup + tests |
| `src/assets/` | Static images (logos, faculty, gallery, slides) |
| `supabase/functions/` | Edge functions (Deno) |
| `supabase/config.toml` | **DO NOT EDIT** |
| `public/` | `robots.txt`, `sitemap.xml`, `og-image.png`, `favicon.ico` |

## Data Flow

**Marketing page render (typical):**
1. Browser hits `/` → Vite serves SPA shell
2. React mounts → providers initialize (QueryClient, Auth listens to Supabase session, etc.)
3. Router matches route → page component renders inside `<Layout>`
4. `<Helmet>` injects per-page `<title>`, meta, OG, canonical, JSON-LD
5. Static sections render directly; any dynamic data uses TanStack Query → Supabase

**Form submission (e.g. `/schools` enquiry):**
1. Form submit (react-hook-form + zod validation)
2. `supabase.from("school_enquiries").insert(...)` writes row
3. `sendNotificationEmail("school_enquiry", data)` → edge function → email

**Admin flow:**
1. Login (`/login`) → `supabase.auth.signInWithPassword`
2. `AuthContext` listener fires → checks `user_roles` table for `role='admin'` (wrapped in `setTimeout(0)` to avoid Supabase client deadlock)
3. `isAdmin` guards `/admin` UI

## Key Design Decisions

- **Lovable-first build**: Site was scaffolded/iterated via Lovable (`lovable-tagger` in dev plugins). Implies heavy use of shadcn defaults and CSS-variable theming.
- **Flat routes, not nested**: All 16 routes declared directly in `App.tsx`. No layout routes; `Layout` is a regular component page templates opt into.
- **Design tokens over raw Tailwind colors**: Brand palette defined as HSL CSS variables in `src/index.css` (`--primary`, `--accent`, etc.). Components reference `bg-primary`, never `bg-orange-500`.
- **Two UI libraries coexist**: shadcn/ui (dominant, Radix-based) + Grommet (wrapped via custom `GrommetProvider`, used sparingly for `grommet-*` components).
- **Auth listener ordering**: `onAuthStateChange` is subscribed BEFORE `getSession()` to avoid a race where the listener fires for the first time with stale state.
- **SEO via react-helmet-async**: Every page owns its own meta tags; no central meta layer. Canonicals point to `vibemakers.dev`.

## Module Boundaries

- **Pages ↔ Section components**: Pages import multiple section components (e.g. `Index.tsx` imports `HeroSection`, `ComparisonSection`, `TestimonialsSection`, …). Sections own their own layout + data.
- **Components ↔ Supabase**: Only forms and admin components talk to Supabase directly. Public marketing sections are pure presentation.
- **Auto-generated Supabase layer**: `src/integrations/supabase/client.ts` + `types.ts` are regenerated from the remote schema. Consumers import types from there, never redefine them.
- **Edge functions are independent**: `supabase/functions/*` have their own Deno runtime; they only share shape with the frontend via the JSON payload contract (e.g. `{ formType, data }`).

## External Dependencies

| Service | Purpose | How configured |
|---------|---------|----------------|
| Supabase (Postgres + Auth + Edge Functions + Storage) | Backend | `src/integrations/supabase/client.ts` (auto-generated URL + anon key) |
| Dialogic ecosystem | Parent company relationship | Content references only (no API) |
| Lovable platform | Hosting (`vibemakerz.lovable.app`) + dev tooling | `lovable-tagger` plugin (dev mode only) |
| Fonts (CDNFonts) | Cabinet Grotesk, Satoshi, JetBrains Mono | CSS `@import` at top of `src/index.css` |
| WhatsApp | Lead capture | Hardcoded number `+65 8890 0368` in `whatsapp-button.tsx` |

## Entry Points

| Scenario | Start here |
|----------|------------|
| New page | `src/App.tsx` (add route) + `src/pages/` (add component) |
| Homepage section change | `src/pages/Index.tsx` → section component in `src/components/home/` |
| Auth / admin change | `src/contexts/AuthContext.tsx` + `src/pages/Admin.tsx` |
| Schema / RLS change | Supabase dashboard (remote) → regenerate `src/integrations/supabase/types.ts` |
| Edge function change | `supabase/functions/<name>/index.ts` |
| Design token / brand color change | `src/index.css` (`:root` CSS variables) |
| Adding a route to sitemap | `public/sitemap.xml` |
