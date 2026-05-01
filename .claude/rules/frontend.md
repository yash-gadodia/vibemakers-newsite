---
description: Frontend component, styling, and SEO rules for the Vibe Makers site
paths:
  - "src/components/**"
  - "src/pages/**"
---

# Frontend Rules

## Design tokens (non-negotiable)
- Use design tokens only: `bg-primary`, `text-accent`, `text-foreground`, `bg-secondary`, `bg-muted`, `text-muted-foreground`, `bg-background`, `border-border`, `bg-destructive`, `ring`
- **Never** use raw Tailwind color scales in public-facing components: `bg-blue-500`, `text-slate-700`, `border-gray-200` — these break the brand palette
- Exceptions: browser chrome traffic-light dots (red/yellow/green), code syntax highlighting, WhatsApp brand green `#25D366`
- Tokens are defined as HSL CSS vars in `src/index.css` under `:root` — if you need a new color, add it there, don't inline

## Typography
- Headings use `font-display` (Cabinet Grotesk)
- Body defaults to `font-sans` (Satoshi)
- Code snippets use `font-mono` (JetBrains Mono)
- Fonts load via CDNFonts `@import` at the top of `src/index.css`

## Class merging
- Always use `cn(...)` from `@/lib/utils` (clsx + tailwind-merge) for conditional classes
- Never build class strings with template literals for conditionals

## Every page MUST
- Wrap in `<Layout>` (provides fixed header + footer + WhatsApp button)
- Include `<Helmet>` with `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG tags (`og:title`, `og:description`, `og:type`, `og:image`), and `<meta name="twitter:card" content="summary_large_image">`
- Canonical URLs point to `https://vibemakers.dev/<path>`
- Be registered in `src/App.tsx` AND `public/sitemap.xml`

## Sections + animations
- Most sections use the `<Reveal variant="up">` pattern for headers and `<RevealGroup staggerMs={100} variant="up">` for card grids — follow the pattern in neighboring sections unless there's a reason not to
- For decorative backgrounds reuse the existing helpers: `hero-glow-background`, `animated-gradient-background`, `raining-letters-background`, `shaders-hero-section`

## Accessibility
- Every image needs `alt` text (decorative images: `alt=""`)
- All interactive elements (buttons, links, form inputs) must be keyboard-accessible
- Respect the visible text labels — don't strip them to make something look cleaner

## Forms (react-hook-form + zod)
- Define a zod schema → pass through `zodResolver` from `@hookform/resolvers/zod`
- Validate on submit (default) — never ship a form without validation
- On success: write to Supabase → call `sendNotificationEmail(formType, data)` from `@/lib/sendNotification` → show a Sonner or shadcn toast → reset the form
- On failure: surface the error via toast, don't fail silently to the user
- Loading, error, and empty states are required for every data-fetching component

## Links
- External links: always `target="_blank" rel="noopener noreferrer"`
- Internal navigation: `<Link to="…">` from `react-router-dom`, never plain `<a href>` for internal routes

## Don't
- Don't `console.log` in committed code
- Don't call Supabase from a pure marketing section — lift it to a hook or form component
- Don't introduce a third UI library (shadcn + Grommet already coexist)
- Don't edit `src/components/ui/*` shadcn primitives unless you're consciously customizing the system; prefer wrapping
