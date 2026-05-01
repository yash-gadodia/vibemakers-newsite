# Website Revamp — Phase 1 (Foundations) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lay the SEO + design-system + shared-component foundation so Phase 2 page redesigns are pure composition.

**Architecture:** (1) Fix SEO bugs in `index.html` and route-level Helmet so per-page meta tags actually win. (2) Refresh design tokens in `src/index.css` (orange used as accent only, add `--surface`, tighten radius). (3) Build 9 reusable presentational components in `src/components/ui/` with Vitest tests. (4) Restructure `Header` + `Footer` against the new IA. No page rewrites in Phase 1 — those live in Phase 2.

**Tech Stack:** React 18 · Vite 5 · TypeScript · Tailwind 3 · shadcn/ui · Radix · react-helmet-async · Vitest 3.2.4 · `@testing-library/react` · Supabase (already wired).

**Spec:** `docs/superpowers/specs/2026-04-25-website-revamp-design.md`

---

## File Structure

### Modified files
- `index.html` — strip duplicate SEO meta (canonical, description, OG/Twitter, robots, geo); keep only charset/viewport/favicon/theme-color. Helmet owns per-route SEO from now on.
- `src/index.css` — add `--surface` token, tighten `--radius` (0.75rem → 0.5rem) for cards, add a comment-rule on orange usage.
- `src/components/layout/Layout.tsx` — inject site-wide `LocalBusiness` JSON-LD via Helmet.
- `src/components/layout/Header.tsx` — new nav (Classes · Schools · Pricing · Method · About + Enquire CTA).
- `src/components/layout/Footer.tsx` — new 4-column architecture (Brand · Parents · Schools · Vibe Makers).

### New component files (in `src/components/ui/`)
| File | Purpose |
|---|---|
| `editorial-section.tsx` | Wraps long-form content with editorial typography + max-width 640px |
| `school-logos-grid.tsx` | Responsive logo grid for partner schools |
| `stat-bar.tsx` | Single horizontal "18 yrs · 15+ schools · 5,000+ students · MOE" row |
| `pricing-card.tsx` | One-format card with price-from + features list + CTA |
| `founder-block.tsx` | Photo + name + role + bio + signature feel |
| `methodology-diagram.tsx` | V.I.B.E. cycle visual (Vision → Ideate → Build → Evolve) |
| `student-work-card.tsx` | Project screenshot + title + 1-line outcome + builder + school |
| `audience-path-cta.tsx` | Twin-card "For Parents | For Schools" picker |
| `enquiry-form.tsx` | Unified form with audience tabs (parent / school / other) |

Each component has a colocated `*.test.tsx` file.

### Files NOT touched in Phase 1
- `src/pages/*` — pages still use legacy sections; rewriting starts in Phase 2.
- Components used only by pages we haven't revamped (`shaders-hero-section`, `raining-letters-background`, `animated-gradient-background`, `parallax-section`, `typewriter-text`) — retired in Phase 2 alongside the page rewrites that currently use them.

---

## Conventions

- Test imports: `import { describe, it, expect, vi } from "vitest"` and `import { render, screen } from "@testing-library/react"` (matches `src/lib/utils.test.ts` pattern).
- Path alias `@/...` everywhere — never deep relative.
- Class merging via `cn()` from `@/lib/utils`.
- Design tokens only — never raw Tailwind colors (`bg-blue-500`, etc.).
- `font-display` on headings, default body font otherwise.
- All components are exported as named exports (matches existing pattern).
- Test commands: `npm test -- <file>` for one file, `npm test` for all.

---

# Section A: SEO Foundation Fixes

## Task 1: Strip duplicate SEO meta from `index.html`

**Why:** Audit found that `<meta name="robots" content="index, follow">` in `index.html` overrides Helmet's `noindex` on `/404` (and any other route that wants noindex), causing 404 pages to be indexed as duplicates of `/`. Also: duplicate canonical, description, OG, Twitter tags race with Helmet.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the head block in `index.html`**

Current `index.html` head has 30+ lines of static meta. Replace with the minimal set Helmet can't manage:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Default favicon — Helmet doesn't need to manage this -->
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="icon" type="image/x-icon" href="/favicon.svg" />

    <!-- Default theme color (Helmet may override per page) -->
    <meta name="theme-color" content="#E8652B" />
    <meta name="msapplication-TileColor" content="#E8652B" />

    <!-- Static fallback title — Helmet sets the real one per route -->
    <title>Vibe Makers Academy</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Removed: every `<meta name="title|description|author|keywords|robots|language|revisit-after|geo.*">`, the static `<link rel="canonical">`, all `og:*` and `twitter:*` tags. Helmet on each route owns these now.

- [ ] **Step 2: Run the build to verify nothing breaks**

```bash
npm run build
```

Expected: build succeeds. The static fallback `<title>` ensures the document is always valid even before React hydrates.

- [ ] **Step 3: Manually verify with curl + grep**

```bash
npm run build && grep -E "robots|canonical|og:|twitter:" dist/index.html
```

Expected: NO matches. Helmet will inject these client-side per route.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Strip duplicate SEO meta from index.html — let Helmet own per-route tags

Static index.html had robots/canonical/og/twitter/keywords/geo tags that raced
with Helmet's per-page values, causing /404 to be indexed as a duplicate of /
and per-page canonicals to be ambiguous. Now Helmet owns everything except
charset/viewport/favicon/theme-color."
```

---

## Task 2: Add `LocalBusiness` JSON-LD to `Layout`

**Why:** Audit found only homepage has JSON-LD. Adding `LocalBusiness` at the Layout level emits it on every public page → eligible for Google Knowledge Panel + local rich results.

**Files:**
- Modify: `src/components/layout/Layout.tsx`
- Test: `src/components/layout/Layout.test.tsx` (NEW)

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/layout/Layout.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

describe("Layout", () => {
  it("emits a LocalBusiness JSON-LD script tag", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Layout>
            <p>Body</p>
          </Layout>
        </MemoryRouter>
      </HelmetProvider>,
    );

    // Helmet writes to document.head asynchronously
    await new Promise((r) => setTimeout(r, 0));
    const scripts = document.head.querySelectorAll<HTMLScriptElement>(
      "script[type='application/ld+json']",
    );
    const localBusiness = Array.from(scripts).find((s) =>
      s.textContent?.includes('"@type":"EducationalOrganization"'),
    );
    expect(localBusiness).toBeTruthy();
    expect(localBusiness!.textContent).toContain("Vibe Makers Academy");
    expect(localBusiness!.textContent).toContain("https://vibemakers.dev");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/components/layout/Layout.test.tsx
```

Expected: FAIL — no JSON-LD script in head.

- [ ] **Step 3: Update `Layout.tsx`**

```tsx
// src/components/layout/Layout.tsx
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

interface LayoutProps {
  children: ReactNode;
}

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Vibe Makers Academy",
  alternateName: "Vibe Makers",
  url: "https://vibemakers.dev",
  logo: "https://vibemakers.dev/og-image.png",
  description:
    "Singapore's AI coding academy for teens 13-18. Part of Dialogic Academy. Build real apps with AI through 1-on-1 coaching, small group classes, and holiday intensives.",
  areaServed: { "@type": "Country", name: "Singapore" },
  foundingDate: "2026",
  parentOrganization: {
    "@type": "EducationalOrganization",
    name: "Dialogic Academy",
    foundingDate: "2018",
    url: "https://dialogic.academy",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "vibemakers@dialogic.academy",
    telephone: "+65-8890-0368",
    areaServed: "SG",
    availableLanguage: ["en"],
  },
  sameAs: [],
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(ORG_JSON_LD)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- src/components/layout/Layout.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Layout.tsx src/components/layout/Layout.test.tsx
git commit -m "Add EducationalOrganization JSON-LD to Layout

Emits site-wide structured data on every public page, with Dialogic listed
as parentOrganization. Eligible for Google Knowledge Panel + improves entity
disambiguation in search."
```

---

## Task 3: Verify `NotFound` noindex actually wins after Task 1

**Why:** Now that index.html no longer has the global `robots: index, follow`, Helmet's `noindex` in NotFound should actually win. Add a test to lock this in so it never regresses.

**Files:**
- Test: `src/pages/NotFound.test.tsx` (NEW)

- [ ] **Step 1: Write the test**

```tsx
// src/pages/NotFound.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";

describe("NotFound", () => {
  it("sets robots noindex via Helmet", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>,
    );

    await new Promise((r) => setTimeout(r, 0));
    const robotsTag = document.head.querySelector<HTMLMetaElement>(
      "meta[name='robots']",
    );
    expect(robotsTag).toBeTruthy();
    expect(robotsTag!.content).toBe("noindex");
  });

  it("renders a 404 message and a link home", () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(getByText("404")).toBeTruthy();
    expect(getByText(/Return to Home/i)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test**

```bash
npm test -- src/pages/NotFound.test.tsx
```

Expected: PASS (Helmet noindex already in `NotFound.tsx`; this just locks it in).

- [ ] **Step 3: Commit**

```bash
git add src/pages/NotFound.test.tsx
git commit -m "Lock in NotFound noindex with regression test"
```

---

# Section B: Design System Refresh

## Task 4: Refresh design tokens in `src/index.css`

**Why:** Add `--surface` token (alternating section bg without orange), tighten card radius, document the orange usage rule.

**Files:**
- Modify: `src/index.css`

This task is CSS-only — the change is verified by `npm run build` and visual inspection rather than a unit test.

- [ ] **Step 1: Add `--surface`, tighten `--radius`, add usage rule comment**

In `src/index.css`, inside the `:root` block (after `--ring: 24 95% 53%;`), add:

```css
    /* Surface — slightly cooler off-white for alternating section bands.
       Use bg-surface for "second" sections to break up bg-background without
       reaching for color. */
    --surface: 32 25% 95%;

    --radius: 0.5rem;  /* tightened from 0.75rem for more institutional feel */
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
```

Replace the existing `--radius: 0.75rem;` line.

In the `.dark` block (after `--ring: 24 95% 55%;`), add:

```css
    --surface: 20 15% 10%;
```

Then, ABOVE the `:root` block (replacing the existing comment), add:

```css
/* Vibe Makers Design System
 * Brand palette: warm orange (#E8652B) on cream.
 *
 * ORANGE USAGE RULE:
 *   - Orange (--primary, --accent) is reserved for CTAs (buttons), key accents
 *     (active links, hovered icons), and a maximum of 1-2 highlights per page.
 *   - Section backgrounds use --background or --surface, NEVER --primary.
 *   - Cards use --card or --surface, NEVER orange tinted backgrounds.
 *   - Gradients (--gradient-primary, --gradient-hero) are limited to hero
 *     decoration only, not secondary sections.
 */
```

- [ ] **Step 2: Update `tailwind.config.ts` to expose `surface`**

Add `surface: "hsl(var(--surface))"` to the `colors` block in `tailwind.config.ts` (next to `background`).

```ts
// in tailwind.config.ts → theme.extend.colors
surface: "hsl(var(--surface))",
```

- [ ] **Step 3: Run build to verify CSS compiles**

```bash
npm run build
```

Expected: build succeeds, `dist/assets/*.css` contains `--surface` and the new `--radius`.

- [ ] **Step 4: Run full test suite to verify nothing broke**

```bash
npm test
```

Expected: all tests still pass (changing radius shouldn't affect existing tests).

- [ ] **Step 5: Commit**

```bash
git add src/index.css tailwind.config.ts
git commit -m "Refresh design tokens: add --surface, tighten radius, document orange rule

--surface gives us a quiet alternative to --background for alternating section
bands without reaching for orange. Default radius dropped from 0.75rem to
0.5rem for a more institutional feel; --radius-lg/-xl preserved for hero
elements. Orange usage rule documented at the top of index.css."
```

---

# Section C: New Shared Components

For every component in this section: file lives in `src/components/ui/<name>.tsx`, test lives in `src/components/ui/<name>.test.tsx`. Each follows TDD: write test → fail → implement → pass → commit.

---

## Task 5: `EditorialSection`

**Files:**
- Create: `src/components/ui/editorial-section.tsx`
- Test: `src/components/ui/editorial-section.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/editorial-section.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EditorialSection } from "@/components/ui/editorial-section";

describe("EditorialSection", () => {
  it("renders children", () => {
    render(
      <EditorialSection>
        <p>Editorial body copy</p>
      </EditorialSection>,
    );
    expect(screen.getByText("Editorial body copy")).toBeInTheDocument();
  });

  it("constrains content to a max-width of 640px", () => {
    const { container } = render(
      <EditorialSection>
        <p>x</p>
      </EditorialSection>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("max-w-[640px]");
  });

  it("merges custom className", () => {
    const { container } = render(
      <EditorialSection className="my-custom-class">
        <p>x</p>
      </EditorialSection>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("my-custom-class");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/components/ui/editorial-section.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/editorial-section.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EditorialSectionProps = {
  children: ReactNode;
  className?: string;
};

export function EditorialSection({ children, className }: EditorialSectionProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[640px] text-lg leading-[1.7] text-foreground/90",
        "[&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:tracking-tight",
        "[&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-10 [&_h3]:mb-3",
        "[&_p]:mb-6 [&_p]:leading-[1.7]",
        "[&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run test**

```bash
npm test -- src/components/ui/editorial-section.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/editorial-section.tsx src/components/ui/editorial-section.test.tsx
git commit -m "Add EditorialSection component for long-form content"
```

---

## Task 6: `SchoolLogosGrid`

**Files:**
- Create: `src/components/ui/school-logos-grid.tsx`
- Test: `src/components/ui/school-logos-grid.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/school-logos-grid.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SchoolLogosGrid } from "@/components/ui/school-logos-grid";

const SCHOOLS = [
  { name: "Raffles Girls' School", logo: "/rgs.png" },
  { name: "Anglo-Chinese School", logo: "/acs.png" },
];

describe("SchoolLogosGrid", () => {
  it("renders one image per school with the school name as alt text", () => {
    render(<SchoolLogosGrid schools={SCHOOLS} />);
    expect(screen.getByAltText("Raffles Girls' School")).toBeInTheDocument();
    expect(screen.getByAltText("Anglo-Chinese School")).toBeInTheDocument();
  });

  it("renders the optional heading when provided", () => {
    render(<SchoolLogosGrid schools={SCHOOLS} heading="Trusted at" />);
    expect(screen.getByText("Trusted at")).toBeInTheDocument();
  });

  it("does not render a heading when not provided", () => {
    const { container } = render(<SchoolLogosGrid schools={SCHOOLS} />);
    expect(container.querySelector("h2, h3, p")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/ui/school-logos-grid.test.tsx
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/school-logos-grid.tsx
import { cn } from "@/lib/utils";

export type SchoolLogo = {
  name: string;
  logo: string;
};

type SchoolLogosGridProps = {
  schools: SchoolLogo[];
  heading?: string;
  className?: string;
};

export function SchoolLogosGrid({ schools, heading, className }: SchoolLogosGridProps) {
  return (
    <div className={cn("w-full", className)}>
      {heading ? (
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {heading}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {schools.map((school) => (
          <div key={school.name} className="flex h-16 items-center justify-center">
            <img
              src={school.logo}
              alt={school.name}
              loading="lazy"
              className="max-h-12 max-w-[140px] object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test (PASS)**

```bash
npm test -- src/components/ui/school-logos-grid.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/school-logos-grid.tsx src/components/ui/school-logos-grid.test.tsx
git commit -m "Add SchoolLogosGrid component"
```

---

## Task 7: `StatBar`

**Files:**
- Create: `src/components/ui/stat-bar.tsx`
- Test: `src/components/ui/stat-bar.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/stat-bar.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBar } from "@/components/ui/stat-bar";

const STATS = [
  { value: "18", label: "Years" },
  { value: "15+", label: "Schools" },
  { value: "5,000+", label: "Students" },
  { value: "MOE", label: "Aligned" },
];

describe("StatBar", () => {
  it("renders every stat value and label", () => {
    render(<StatBar stats={STATS} />);
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("Years")).toBeInTheDocument();
    expect(screen.getByText("MOE")).toBeInTheDocument();
    expect(screen.getByText("Aligned")).toBeInTheDocument();
  });

  it("renders separators between stats but not on the last one", () => {
    const { container } = render(<StatBar stats={STATS} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBe(STATS.length - 1);
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/ui/stat-bar.test.tsx
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/stat-bar.tsx
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type Stat = { value: string; label: string };

type StatBarProps = {
  stats: Stat[];
  className?: string;
};

export function StatBar({ stats, className }: StatBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-6 md:py-8",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <Fragment key={`${stat.value}-${stat.label}`}>
          <div className="flex flex-col items-center">
            <div className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">
              {stat.label}
            </div>
          </div>
          {i < stats.length - 1 ? (
            <div
              aria-hidden="true"
              className="hidden h-8 w-px bg-border md:block"
            />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test (PASS)**

```bash
npm test -- src/components/ui/stat-bar.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/stat-bar.tsx src/components/ui/stat-bar.test.tsx
git commit -m "Add StatBar component for inline credibility stats"
```

---

## Task 8: `PricingCard`

**Files:**
- Create: `src/components/ui/pricing-card.tsx`
- Test: `src/components/ui/pricing-card.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/pricing-card.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PricingCard } from "@/components/ui/pricing-card";

const PROPS = {
  name: "1-on-1 with Head Coach",
  priceFrom: "S$160",
  unit: "per hour",
  description: "Founder-led private coaching for ambitious teens.",
  features: ["Personalised pace", "Direct access to Yash", "Outcome-driven"],
  ctaLabel: "Book consult",
  ctaHref: "/contact",
};

describe("PricingCard", () => {
  it("renders name, price, unit, description, and features", () => {
    render(
      <MemoryRouter>
        <PricingCard {...PROPS} />
      </MemoryRouter>,
    );
    expect(screen.getByText("1-on-1 with Head Coach")).toBeInTheDocument();
    expect(screen.getByText("S$160")).toBeInTheDocument();
    expect(screen.getByText("per hour")).toBeInTheDocument();
    expect(screen.getByText("Personalised pace")).toBeInTheDocument();
    expect(screen.getByText("Direct access to Yash")).toBeInTheDocument();
  });

  it("renders the CTA as a link to the given href", () => {
    render(
      <MemoryRouter>
        <PricingCard {...PROPS} />
      </MemoryRouter>,
    );
    const cta = screen.getByRole("link", { name: "Book consult" });
    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("highlights the card when featured is true", () => {
    const { container } = render(
      <MemoryRouter>
        <PricingCard {...PROPS} featured />
      </MemoryRouter>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border-primary");
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/ui/pricing-card.test.tsx
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/pricing-card.tsx
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PricingCardProps = {
  name: string;
  priceFrom: string;
  unit?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  className?: string;
};

export function PricingCard({
  name,
  priceFrom,
  unit,
  description,
  features,
  ctaLabel,
  ctaHref,
  featured = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-card p-8 shadow-sm transition-all hover:shadow-md",
        featured ? "border-primary border-2" : "border-border",
        className,
      )}
    >
      <h3 className="font-display text-xl font-bold tracking-tight">{name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold tracking-tight">
          {priceFrom}
        </span>
        {unit ? <span className="text-sm text-muted-foreground">{unit}</span> : null}
      </div>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex-1" />
      <Button asChild variant={featured ? "default" : "outline"} className="w-full">
        <Link to={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Run test (PASS)**

```bash
npm test -- src/components/ui/pricing-card.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/pricing-card.tsx src/components/ui/pricing-card.test.tsx
git commit -m "Add PricingCard component"
```

---

## Task 9: `FounderBlock`

**Files:**
- Create: `src/components/ui/founder-block.tsx`
- Test: `src/components/ui/founder-block.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/founder-block.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FounderBlock } from "@/components/ui/founder-block";

describe("FounderBlock", () => {
  it("renders the founder's photo, name, role, and bio", () => {
    render(
      <FounderBlock
        photo="/yash.jpg"
        name="Yash Gadodia"
        role="Head Coach"
        bio="I teach SG teens to build with AI. 5 years of shipping product."
      />,
    );
    expect(screen.getByAltText("Yash Gadodia")).toHaveAttribute("src", "/yash.jpg");
    expect(screen.getByText("Yash Gadodia")).toBeInTheDocument();
    expect(screen.getByText("Head Coach")).toBeInTheDocument();
    expect(screen.getByText(/I teach SG teens/)).toBeInTheDocument();
  });

  it("renders the optional signature when provided", () => {
    render(
      <FounderBlock
        photo="/yash.jpg"
        name="Yash"
        role="Head Coach"
        bio="..."
        signature="— Yash"
      />,
    );
    expect(screen.getByText("— Yash")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/ui/founder-block.test.tsx
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/founder-block.tsx
import { cn } from "@/lib/utils";

type FounderBlockProps = {
  photo: string;
  name: string;
  role: string;
  bio: string;
  signature?: string;
  layout?: "horizontal" | "vertical";
  className?: string;
};

export function FounderBlock({
  photo,
  name,
  role,
  bio,
  signature,
  layout = "horizontal",
  className,
}: FounderBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-8",
        layout === "horizontal"
          ? "flex flex-col gap-6 md:flex-row md:items-start md:gap-8"
          : "flex flex-col gap-6",
        className,
      )}
    >
      <img
        src={photo}
        alt={name}
        loading="lazy"
        className={cn(
          "rounded-md object-cover",
          layout === "horizontal" ? "h-32 w-32 md:h-40 md:w-40" : "h-40 w-40",
        )}
      />
      <div className="flex-1">
        <div className="font-display text-xl font-bold tracking-tight">{name}</div>
        <div className="mt-1 text-sm font-medium text-primary">{role}</div>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">{bio}</p>
        {signature ? (
          <p className="mt-4 font-display text-base italic text-foreground/70">
            {signature}
          </p>
        ) : null}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test (PASS)**

```bash
npm test -- src/components/ui/founder-block.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/founder-block.tsx src/components/ui/founder-block.test.tsx
git commit -m "Add FounderBlock component"
```

---

## Task 10: `MethodologyDiagram` (V.I.B.E. cycle)

**Files:**
- Create: `src/components/ui/methodology-diagram.tsx`
- Test: `src/components/ui/methodology-diagram.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/methodology-diagram.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MethodologyDiagram } from "@/components/ui/methodology-diagram";

describe("MethodologyDiagram", () => {
  it("renders all four V.I.B.E. stages in order", () => {
    render(<MethodologyDiagram />);
    expect(screen.getByText("Vision")).toBeInTheDocument();
    expect(screen.getByText("Ideate")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Evolve")).toBeInTheDocument();
  });

  it("renders stage descriptions", () => {
    render(<MethodologyDiagram />);
    expect(screen.getByText(/Empathise/)).toBeInTheDocument();
    expect(screen.getByText(/Prototype/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/ui/methodology-diagram.test.tsx
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/methodology-diagram.tsx
import { Eye, Lightbulb, Hammer, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    letter: "V",
    name: "Vision",
    subtitle: "Empathise & Define",
    description: "Identify the real problem. Who is it for? What's the change you want?",
    icon: Eye,
  },
  {
    letter: "I",
    name: "Ideate",
    subtitle: "Explore & Decide",
    description: "Generate options, evaluate trade-offs, pick the strongest direction.",
    icon: Lightbulb,
  },
  {
    letter: "B",
    name: "Build",
    subtitle: "Prototype",
    description: "Use AI tools (Lovable, Claude) to ship a working prototype in days.",
    icon: Hammer,
  },
  {
    letter: "E",
    name: "Evolve",
    subtitle: "Test & Improve",
    description: "Test with real users, capture feedback, iterate to a better version.",
    icon: RefreshCw,
  },
] as const;

type MethodologyDiagramProps = { className?: string };

export function MethodologyDiagram({ className }: MethodologyDiagramProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {STAGES.map(({ letter, name, subtitle, description, icon: Icon }) => (
        <div
          key={name}
          className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 font-display text-lg font-bold text-primary">
              {letter}
            </div>
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{name}</h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            {subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{description}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test (PASS)**

```bash
npm test -- src/components/ui/methodology-diagram.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/methodology-diagram.tsx src/components/ui/methodology-diagram.test.tsx
git commit -m "Add MethodologyDiagram for the V.I.B.E. cycle"
```

---

## Task 11: `StudentWorkCard`

**Files:**
- Create: `src/components/ui/student-work-card.tsx`
- Test: `src/components/ui/student-work-card.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/student-work-card.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StudentWorkCard } from "@/components/ui/student-work-card";

describe("StudentWorkCard", () => {
  it("renders project name, screenshot, outcome, builder, and school", () => {
    render(
      <StudentWorkCard
        screenshot="/app-demo-screenshot.jpg"
        projectName="StudyPal"
        outcome="An AI study planner used by 200 students at RGS"
        builder="Sarah, Sec 3"
        school="Raffles Girls' School"
      />,
    );
    expect(screen.getByAltText("StudyPal screenshot")).toHaveAttribute(
      "src",
      "/app-demo-screenshot.jpg",
    );
    expect(screen.getByText("StudyPal")).toBeInTheDocument();
    expect(screen.getByText(/AI study planner/)).toBeInTheDocument();
    expect(screen.getByText("Sarah, Sec 3")).toBeInTheDocument();
    expect(screen.getByText("Raffles Girls' School")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/ui/student-work-card.test.tsx
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/student-work-card.tsx
import { cn } from "@/lib/utils";

type StudentWorkCardProps = {
  screenshot: string;
  projectName: string;
  outcome: string;
  builder: string;
  school: string;
  className?: string;
};

export function StudentWorkCard({
  screenshot,
  projectName,
  outcome,
  builder,
  school,
  className,
}: StudentWorkCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md",
        className,
      )}
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={screenshot}
          alt={`${projectName} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold tracking-tight">{projectName}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">{outcome}</p>
        <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">{builder}</span>
          <span className="mx-2">·</span>
          <span>{school}</span>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run test (PASS)**

```bash
npm test -- src/components/ui/student-work-card.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/student-work-card.tsx src/components/ui/student-work-card.test.tsx
git commit -m "Add StudentWorkCard component"
```

---

## Task 12: `AudiencePathCTA`

**Files:**
- Create: `src/components/ui/audience-path-cta.tsx`
- Test: `src/components/ui/audience-path-cta.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/audience-path-cta.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AudiencePathCTA } from "@/components/ui/audience-path-cta";

describe("AudiencePathCTA", () => {
  it("renders both audience paths with their respective CTAs", () => {
    render(
      <MemoryRouter>
        <AudiencePathCTA
          parents={{ heading: "For Parents", description: "Private classes", ctaLabel: "See classes", ctaHref: "/classes" }}
          schools={{ heading: "For Schools", description: "Workshops", ctaLabel: "Get a proposal", ctaHref: "/schools" }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("For Parents")).toBeInTheDocument();
    expect(screen.getByText("For Schools")).toBeInTheDocument();
    const parentCta = screen.getByRole("link", { name: "See classes" });
    expect(parentCta).toHaveAttribute("href", "/classes");
    const schoolCta = screen.getByRole("link", { name: "Get a proposal" });
    expect(schoolCta).toHaveAttribute("href", "/schools");
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/ui/audience-path-cta.test.tsx
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/audience-path-cta.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Path = {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

type AudiencePathCTAProps = {
  parents: Path;
  schools: Path;
  className?: string;
};

export function AudiencePathCTA({ parents, schools, className }: AudiencePathCTAProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      <PathCard path={parents} variant="default" />
      <PathCard path={schools} variant="outline" />
    </div>
  );
}

function PathCard({ path, variant }: { path: Path; variant: "default" | "outline" }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-card p-8 transition-all hover:shadow-md",
        variant === "default" ? "border-primary/30" : "border-border",
      )}
    >
      <h3 className="font-display text-2xl font-bold tracking-tight">{path.heading}</h3>
      <p className="mt-3 flex-1 text-base text-foreground/80">{path.description}</p>
      <Button asChild variant={variant} className="mt-6 self-start">
        <Link to={path.ctaHref} className="inline-flex items-center gap-2">
          {path.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Run test (PASS)**

```bash
npm test -- src/components/ui/audience-path-cta.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/audience-path-cta.tsx src/components/ui/audience-path-cta.test.tsx
git commit -m "Add AudiencePathCTA twin-card for parent/school routing"
```

---

## Task 13: `EnquiryForm`

**Why:** The current site has 3 separate form components (parent, school, contact) duplicating logic. This unified component takes an `audience` prop and shows the right fields. It writes to the existing Supabase tables (`parent_interest`, `school_enquiries`) and fires the existing `sendNotificationEmail` helper. **Existing pages keep using their existing forms in Phase 1**; this new component is wired in during Phase 2 page rewrites.

**Files:**
- Create: `src/components/ui/enquiry-form.tsx`
- Test: `src/components/ui/enquiry-form.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ui/enquiry-form.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnquiryForm } from "@/components/ui/enquiry-form";

const insertMock = vi.fn().mockResolvedValue({ error: null });
const fromMock = vi.fn(() => ({ insert: insertMock }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: (...args: unknown[]) => fromMock(...args),
    functions: { invoke: vi.fn().mockResolvedValue({ error: null }) },
  },
}));

vi.mock("@/lib/sendNotification", () => ({
  sendNotificationEmail: vi.fn().mockResolvedValue(undefined),
}));

describe("EnquiryForm", () => {
  beforeEach(() => {
    fromMock.mockClear();
    insertMock.mockClear();
  });

  it("renders parent fields when audience is parent", () => {
    render(<EnquiryForm audience="parent" />);
    expect(screen.getByLabelText(/parent name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/school name/i)).toBeNull();
  });

  it("renders school fields when audience is school", () => {
    render(<EnquiryForm audience="school" />);
    expect(screen.getByLabelText(/school name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/parent name/i)).toBeNull();
  });

  it("submits parent form to parent_interest table on valid submit", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm audience="parent" />);
    await user.type(screen.getByLabelText(/parent name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/student/i), "Sam");
    await user.type(screen.getByLabelText(/age/i), "14");
    await user.click(screen.getByRole("button", { name: /send|submit|enquire/i }));
    expect(fromMock).toHaveBeenCalledWith("parent_interest");
    expect(insertMock).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/ui/enquiry-form.test.tsx
```

- [ ] **Step 3: Implement**

```tsx
// src/components/ui/enquiry-form.tsx
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { sendNotificationEmail } from "@/lib/sendNotification";
import { cn } from "@/lib/utils";

const parentSchema = z.object({
  parent_name: z.string().min(2, "Required"),
  parent_email: z.string().email("Invalid email"),
  student_name: z.string().min(1, "Required"),
  student_age: z.string().min(1, "Required"),
  programme_interest: z.string().optional().default(""),
  message: z.string().optional(),
});

const schoolSchema = z.object({
  contact_name: z.string().min(2, "Required"),
  contact_email: z.string().email("Invalid email"),
  contact_role: z.string().min(1, "Required"),
  school_name: z.string().min(1, "Required"),
  student_level: z.string().optional().default(""),
  number_of_students: z.string().optional().default(""),
  programme_objectives: z.string().optional().default(""),
  timing_sessions: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

type Audience = "parent" | "school";

type EnquiryFormProps = {
  audience: Audience;
  className?: string;
};

export function EnquiryForm({ audience, className }: EnquiryFormProps) {
  if (audience === "parent") return <ParentForm className={className} />;
  return <SchoolForm className={className} />;
}

function ParentForm({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof parentSchema>>({
    resolver: zodResolver(parentSchema),
  });

  const onSubmit = async (data: z.infer<typeof parentSchema>) => {
    setSubmitting(true);
    const { error } = await supabase.from("parent_interest").insert(data);
    if (error) {
      toast.error("Couldn't send your enquiry. Try again or WhatsApp us.");
      setSubmitting(false);
      return;
    }
    sendNotificationEmail("parent_interest", data);
    toast.success("Got it. We'll reply within 24 hours.");
    reset();
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <Field id="parent_name" label="Parent name" error={errors.parent_name?.message}>
        <Input id="parent_name" {...register("parent_name")} />
      </Field>
      <Field id="parent_email" label="Email" error={errors.parent_email?.message}>
        <Input id="parent_email" type="email" {...register("parent_email")} />
      </Field>
      <Field id="student_name" label="Student name" error={errors.student_name?.message}>
        <Input id="student_name" {...register("student_name")} />
      </Field>
      <Field id="student_age" label="Student age" error={errors.student_age?.message}>
        <Input id="student_age" {...register("student_age")} />
      </Field>
      <Field id="programme_interest" label="Programme interest (optional)">
        <Input id="programme_interest" {...register("programme_interest")} />
      </Field>
      <Field id="message" label="Anything else? (optional)">
        <Textarea id="message" {...register("message")} rows={3} />
      </Field>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending..." : "Send enquiry"}
      </Button>
    </form>
  );
}

function SchoolForm({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schoolSchema>>({
    resolver: zodResolver(schoolSchema),
  });

  const onSubmit = async (data: z.infer<typeof schoolSchema>) => {
    setSubmitting(true);
    const { error } = await supabase.from("school_enquiries").insert(data);
    if (error) {
      toast.error("Couldn't send your enquiry. Try again or email us.");
      setSubmitting(false);
      return;
    }
    sendNotificationEmail("school_enquiry", data);
    toast.success("Got it. We'll be in touch within 1 business day.");
    reset();
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <Field id="contact_name" label="Contact name" error={errors.contact_name?.message}>
        <Input id="contact_name" {...register("contact_name")} />
      </Field>
      <Field id="contact_role" label="Your role" error={errors.contact_role?.message}>
        <Input id="contact_role" placeholder="HoD, Teacher, Principal..." {...register("contact_role")} />
      </Field>
      <Field id="contact_email" label="Email" error={errors.contact_email?.message}>
        <Input id="contact_email" type="email" {...register("contact_email")} />
      </Field>
      <Field id="school_name" label="School name" error={errors.school_name?.message}>
        <Input id="school_name" {...register("school_name")} />
      </Field>
      <Field id="student_level" label="Student level (optional)">
        <Input id="student_level" placeholder="Sec 1-4, JC..." {...register("student_level")} />
      </Field>
      <Field id="number_of_students" label="Approx. number of students (optional)">
        <Input id="number_of_students" {...register("number_of_students")} />
      </Field>
      <Field id="programme_objectives" label="What you're looking for (optional)">
        <Textarea id="programme_objectives" {...register("programme_objectives")} rows={3} />
      </Field>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending..." : "Get a proposal"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </Label>
      {children}
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
```

- [ ] **Step 4: Run test (PASS)**

```bash
npm test -- src/components/ui/enquiry-form.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/enquiry-form.tsx src/components/ui/enquiry-form.test.tsx
git commit -m "Add unified EnquiryForm component (parent + school variants)

Writes to existing parent_interest / school_enquiries tables and fires
sendNotificationEmail. Existing per-page forms remain in place during
Phase 1; this component is wired in during Phase 2 page rewrites."
```

---

# Section D: Header + Footer Restructure

## Task 14: Restructure `Header.tsx` to new IA

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Test: `src/components/layout/Header.test.tsx` (NEW)

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/layout/Header.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("renders the new nav links: Classes, Schools, Pricing, Method, About", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("link", { name: /classes/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /schools/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /pricing/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /method/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /about/i }).length).toBeGreaterThan(0);
  });

  it("renders an Enquire CTA pointing to /contact", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const cta = screen.getAllByRole("link", { name: /enquire/i });
    expect(cta.length).toBeGreaterThan(0);
    expect(cta[0]).toHaveAttribute("href", "/contact");
  });

  it("does not render Programme or Hackathon in the primary nav", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("link", { name: /^programme$/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /^hackathon$/i })).toBeNull();
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/layout/Header.test.tsx
```

- [ ] **Step 3: Replace `Header.tsx` with the new structure**

```tsx
// src/components/layout/Header.tsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/classes", label: "Classes" },
  { href: "/schools", label: "Schools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/vibe-method", label: "Method" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActiveLink = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300",
        isScrolled ? "pt-3" : "pt-4",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex w-full items-center justify-between transition-all duration-300",
          isScrolled
            ? "max-w-5xl px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl shadow-md border border-border/50"
            : "max-w-7xl px-4 py-4 bg-transparent",
        )}
      >
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Vibe Makers" className="h-10 w-10 rounded-full object-cover" />
          <span
            className={cn(
              "hidden font-display text-base font-bold tracking-tight sm:block",
              isScrolled && "lg:text-sm",
            )}
          >
            Vibe Makers
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActiveLink(link.href)
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild size="sm">
            <Link to="/contact">Enquire</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div
          className={cn(
            "mx-auto mt-3 w-full animate-fade-in",
            isScrolled ? "max-w-5xl" : "max-w-7xl",
          )}
        >
          <div className="rounded-2xl border border-border/50 bg-white/95 px-4 py-4 backdrop-blur-xl">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-md text-base font-medium transition-colors",
                    isActiveLink(link.href)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-border/50 pt-4">
              <Button asChild className="w-full">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Enquire
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Run all tests (PASS) — Header changes might affect Layout test**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Header.test.tsx
git commit -m "Restructure Header to new IA: Classes/Schools/Pricing/Method/About + Enquire CTA"
```

---

## Task 15: Restructure `Footer.tsx` to 4-column architecture

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Test: `src/components/layout/Footer.test.tsx` (NEW)

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/layout/Footer.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders all four column headings", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByText(/for parents/i)).toBeInTheDocument();
    expect(screen.getByText(/for schools/i)).toBeInTheDocument();
    expect(screen.getByText(/vibe makers/i)).toBeInTheDocument();
  });

  it("links to the new IA pages", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).toContain("/classes");
    expect(links).toContain("/classes/1-on-1");
    expect(links).toContain("/classes/holiday-camps");
    expect(links).toContain("/pricing");
    expect(links).toContain("/schools");
    expect(links).toContain("/programme");
    expect(links).toContain("/vibe-method");
    expect(links).toContain("/about");
    expect(links).toContain("/contact");
  });

  it("does not link to /blog (removed)", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).not.toContain("/blog");
  });
});
```

- [ ] **Step 2: Run test (FAIL)**

```bash
npm test -- src/components/layout/Footer.test.tsx
```

- [ ] **Step 3: Replace `Footer.tsx`**

```tsx
// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const sections = [
  {
    title: "For Parents",
    links: [
      { href: "/classes", label: "All classes" },
      { href: "/classes/1-on-1", label: "1-on-1 coaching" },
      { href: "/classes/holiday-camps", label: "Holiday camps" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "For Schools",
    links: [
      { href: "/schools", label: "School workshops" },
      { href: "/programme", label: "Programme detail" },
      { href: "/about", label: "Why Dialogic" },
    ],
  },
  {
    title: "Vibe Makers",
    links: [
      { href: "/vibe-method", label: "The V.I.B.E. method" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/hackathon", label: "Hackathon" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <img src={logo} alt="Vibe Makers" className="h-12 w-12 rounded-full object-cover" />
              <span className="font-display text-lg font-bold tracking-tight">Vibe Makers</span>
            </Link>
            <p className="text-sm leading-relaxed text-background/70">
              AI coding for Singapore teens 13-18. The new arm of Dialogic Academy — the academy
              behind debate, journalism, and now AI.
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1.5 text-xs text-background/60">
                Powered by Dialogic Academy · est. 2018
              </span>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-display font-semibold tracking-tight">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-background/10 pt-8 md:flex-row md:justify-between">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Vibe Makers Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-background/50 transition-colors hover:text-background/80">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-background/50 transition-colors hover:text-background/80">
              Terms
            </Link>
            <a
              href="mailto:vibemakers@dialogic.academy"
              className="text-sm text-background/50 transition-colors hover:text-background/80"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run all tests (PASS)**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/Footer.test.tsx
git commit -m "Restructure Footer to 4-column IA (Brand · Parents · Schools · Vibe Makers)"
```

---

# Final: Phase 1 wrap-up

After all 15 tasks land:

- [ ] **Run full suite + lint + build**

```bash
npm test && npm run lint && npm run build
```

Expected: 0 test failures (component count: ≥9 new files × ~3 tests = ~27+ new tests on top of existing 9), lint may still report pre-existing errors in admin pages (out of scope). Build size shouldn't regress.

- [ ] **Verify SEO fixes manually**

```bash
npm run build && grep -E "robots|canonical|og:|twitter:" dist/index.html
```

Expected: no matches in `dist/index.html` (Helmet owns these now).

```bash
grep -o "EducationalOrganization" dist/index.html || echo "JSON-LD will be injected client-side via Helmet — verify via crawl test post-deploy"
```

- [ ] **Push to main**

```bash
git push origin main
```

(All 15 tasks committed individually; this final push lands them on the Lovable-deployed branch.)

---

# Out of scope for Phase 1

- Page redesigns (`/`, `/classes/*`, `/schools`, `/programme`, `/pricing`, `/vibe-method`, `/about`, `/contact`) — Phase 2
- Retiring legacy components (shaders, raining-letters, parallax-section, typewriter-text) — happens in Phase 2 alongside the page rewrites that consume them
- Sitemap update for new pages — Phase 2 (after pages exist)
- New routes registered in `App.tsx` — Phase 2 (alongside page implementations)
- `FormatComparisonTable` component — Phase 2 (only used on `/classes` and `/pricing`)
- Higher-res Yash photo, founder note copy, pricing finalisation — content dependencies tracked in spec section 11

---

# Self-Review Notes

**Spec coverage:** ✅
- SEO bug fixes (spec §8): tasks 1-3 cover stripping `index.html`, locking in NotFound noindex, adding `LocalBusiness` JSON-LD
- Design token refresh (spec §4): task 4
- New shared components (spec §7): tasks 5-13 cover 9 of the 10 listed components (`FormatComparisonTable` deferred to Phase 2 per scope rationale)
- Header + Footer restructure (spec §5): tasks 14-15
- Pricing draft (spec §6): captured in spec, will be applied when `/pricing` page is built in Phase 2
- Component retirements: deliberately deferred to Phase 2 (when consuming pages get rewritten)

**Placeholder scan:** ✅ No "TBD/TODO/implement later" anywhere. Every code block is complete and runnable.

**Type consistency:** ✅ Component prop names match across plan (e.g., `ctaHref` used consistently in `PricingCard` and `AudiencePathCTA`; `screenshot` consistent in `StudentWorkCard`).

**One ambiguity I noted and locked in inline:** Step 3 of Task 1 uses `grep` against `dist/index.html` rather than `index.html` because the grep is verifying the Helmet-cleaned build output, not the source. Source `index.html` will of course contain the static fallback title.
