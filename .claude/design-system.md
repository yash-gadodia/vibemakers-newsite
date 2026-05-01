# Vibe Makers — Design System v2 ("warm sticker")

**Canonical reference for all visual work.** When porting an old page or building a new one, read this first.

**Source of truth**: `_prototype/homepage-prototype.html` (the original static prototype). Token names match the JS `H` object in that file.

---

## 1. The mental model

Three jobs the design needs to do at once:
1. **Warm and inviting** — backgrounds are cream/beige, ink is near-black warm (not pure black). Reads like a printed book, not a SaaS dashboard.
2. **Branded and confident** — vibrant orange `#ff6b1a` is the brand, used liberally on CTAs, highlights, and one bold sheen-sweep on the hero headline.
3. **Singapore-school-friendly** — serif italic accents, named school list, mono-uppercase eyebrows. Readable, slightly editorial, never tech-cold.

The signature visual move is the **sticker**: a small rotated pill with a hard 2px ink-shadow, used as eyebrow labels above section headers ("● What you could build", "● The stack", "● Signal"). Feels handmade. No other site does this.

---

## 2. Color tokens

All colors are defined as HSL CSS variables in `src/index.css`. Tailwind exposes them via the names below.

| Hex | Name | Tailwind | CSS var | Use |
|---|---|---|---|---|
| `#faf7f2` | bg | `bg-background` | `--background` | Default page background |
| `#f3ecdf` | bgWarm | `bg-bg-warm` | `--bg-warm` | Alt section background (every other section) |
| `#fff4e6` | bgWarm2 | `bg-bg-warm-2` | `--bg-warm-2` | Light peach callouts, soft inserts |
| `#ffffff` | card | `bg-card` | `--card` | Card surfaces, popovers |
| `#1a1612` | ink | `text-foreground` / `text-ink` | `--foreground` | Primary text, borders for stickers |
| `#3a312a` | ink2 | `text-ink-2` | `--ink-2` | Secondary text, sub-headings |
| `#8a7d70` | muted | `text-muted-foreground` | `--muted-foreground` | Tertiary text, captions |
| `#e8e0d4` | rule | `border-border` / `border-rule` | `--border` | Borders, hairlines, dividers |
| `#ff6b1a` | orange | `bg-primary` / `text-primary` | `--primary` | Brand orange — CTAs, accents, sheen |
| `#d94e00` | orangeDeep | `bg-accent` / `text-accent` | `--accent` | Hover state, emphasis |
| `#ffc94d` | yellow | `bg-yellow` / `text-yellow` | `--yellow` | Sticker default, highlight |
| `#f0a500` | yellowDeep | `bg-yellow-deep` | `--yellow-deep` | Yellow emphasis |

**Rules of thumb:**
- Section backgrounds alternate between `bg-background` (cream) and `bg-bg-warm` (warm beige). Never use orange or yellow as a section background — they're accents.
- Cards live on `bg-card` (white) with a `border-border` hairline — they pop against both warm backgrounds.
- Body text is `text-foreground`. Eyebrows and meta text use `text-ink-2` or `text-muted-foreground`.
- Orange CTAs get **white text** (`text-primary-foreground`) for contrast.
- Yellow stickers always have **ink-colored text** (`text-foreground`) and an ink border. Never yellow-on-yellow.

---

## 3. Typography

Three families, all loaded from CDNs in `src/index.css` (Fontshare for Cabinet Grotesk + Satoshi, Google for JetBrains Mono).

| Role | Font | Tailwind | When |
|---|---|---|---|
| Display (h1–h6, section titles) | Cabinet Grotesk 700 | `font-display` | Headings, brand wordmark, big stat numbers |
| Body (default) | Satoshi 400/500 | `font-sans` | Paragraph copy, UI text, buttons |
| Mono (eyebrows, technical) | JetBrains Mono 600 | `font-mono` | Eyebrow labels, code-display blocks, sticker text |
| Serif accent (sparingly!) | Cabinet Grotesk italic 500 | inline `font-style: italic` + `font-display` | Editorial pull-quotes, "from session 1" style flourishes |

**Type rules:**
- All headings: `font-display font-bold tracking-display leading-[1.02]` (already applied via base `h1-h6`)
- Eyebrows / kicker labels: `font-mono text-xs uppercase tracking-eyebrow text-ink-2` (~`tracking-[0.06em]`)
- Body copy size: 16px / 1.55 line-height (Tailwind `text-base`)
- Avoid mid-sentence font swaps — italic Cabinet Grotesk is reserved for short editorial accents only

---

## 4. Component patterns

These are the recurring patterns that make the v2 design feel cohesive. CSS implementations are in `src/index.css` under `@layer components`.

### Sticker (`.vm-sticker`)

The signature element. Rotated pill, ink border, hard shadow.

```tsx
<span className="vm-sticker" style={{ transform: 'rotate(-3deg)' }}>
  ● What you could build
</span>

// Orange variant
<span className="vm-sticker vm-sticker--orange" style={{ transform: 'rotate(-3deg)' }}>
  ● Signal
</span>
```

- Default background: `--yellow`. Variant: `vm-sticker--orange` for orange + white text.
- Always rotated (`-3deg` is canonical, vary slightly for stacks).
- Always paired with a leading dot character (`●`).
- Animate with `animate-vm-wiggle` for hero stickers; static for body stickers.

### Card (`.vm-card`)

White surface + ink hairline + lift on hover.

```tsx
<div className="vm-card rounded-2xl border border-border bg-card p-6">
  ...
</div>
```

- Always rounded-2xl (`1rem`) or larger.
- Hover lifts 4px with shadow growth — handled by `.vm-card`. Don't add `hover:translate-y-*` Tailwind on top.
- For "drifting" cards (showcase grids), add `animate-vm-drift` and a per-card `--card-rot` CSS var for subtle rotation.

### Button (`.vm-btn`)

Lift on hover + arrow-slide companion.

```tsx
<a className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sticker">
  Book a free trial class
  <span className="vm-arrow">→</span>
</a>
```

- Pill shape (`rounded-full`).
- Primary CTA: `bg-primary text-primary-foreground`.
- Secondary CTA: `bg-transparent text-foreground border-1.5 border-foreground`.
- Optional: add `shadow-sticker` for the hard-shadow look on key CTAs.
- Pair with `<span className="vm-arrow">→</span>` so the arrow slides on hover.

### Nav link (`.vm-nav-link`)

Underline grows from the left on hover.

```tsx
<a className="vm-nav-link text-foreground">Programme</a>
```

### FAQ accordion (`.vm-faq-open` toggle)

Plus-icon rotates to X on open, body height transitions.

```tsx
<div className={cn("vm-faq", isOpen && "vm-faq-open")}>
  <button>Question text <span className="vm-chev">+</span></button>
  <div className="vm-faq-body px-4 pb-4">...</div>
</div>
```

### Sheen-sweep heading

Use sparingly — once on the hero h1.

```tsx
<h1>
  Singapore teens are{' '}
  <span className="vm-sheen-text">shipping real apps</span>.
</h1>
```

### Terminal strip

Used for "tech moments" — fake terminal showing code generation.

```tsx
<div className="rounded-xl bg-[#0f0a05] p-4 font-mono text-sm">
  <div className="text-[#7fda8c]">{'>'} Generating UI elements…</div>
  <div className="text-white">{'>'} First version: good enough to demo<span className="vm-caret">▌</span></div>
</div>
```

Colors `#0f0a05`, `#7fda8c`, `#a8998b` are intentionally hardcoded (not tokens) — terminal styling is its own micro-system.

---

## 5. Animation library

All animations live in `src/index.css` (and have Tailwind utility shortcuts in `tailwind.config.ts`).

| Class | Effect | Duration | When to use |
|---|---|---|---|
| `animate-vm-wiggle` | Sticker rotates ±2° | 4.5s loop | Hero stickers; never body stickers |
| `animate-vm-pulse` | Orange ring pulses outward | 2.4s loop | "Live" / "Now" indicators |
| `animate-vm-drift` | Card floats up 6px | 6s loop | Showcase card grids (with `--card-rot`) |
| `animate-vm-marquee` | Translates 0 → -50% | 25s linear | School logo strip |
| `vm-sheen-text` | Gradient sweep across text | 6s loop, 1.2s delay | Hero h1 ONLY |
| `.vm-caret` | Blink | 1s steps | Terminal cursor |

**Reduced motion**: Already handled globally via `@media (prefers-reduced-motion: reduce)` in `src/index.css`. Animations down to 0.01ms automatically — don't write per-component prefers-reduced-motion checks.

**Hover transitions**: All `.vm-card`, `.vm-btn`, `.vm-arrow`, `.vm-nav-link` interactions use `cubic-bezier(.2,.7,.2,1)` for a punchy-but-soft easing. Don't override.

---

## 6. Layout primitives

| Pattern | Implementation |
|---|---|
| Page container | `mx-auto max-w-[1200px] px-6 md:px-14` (matches prototype's 56px desktop padding) |
| Section vertical rhythm | `py-20 md:py-28` for major sections, `py-12 md:py-16` for compact strips |
| Section divider | `border-t border-border` between sections; never use horizontal `<hr/>` |
| Two-column grid | `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12` |
| Card grid | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |

---

## 7. What changed from v1 (old Lovable design)

| | v1 (old) | v2 (new) |
|---|---|---|
| Brand orange | `#f97316` (`24 95% 53%`) | `#ff6b1a` (`20 100% 55%`) — slightly warmer, more saturated |
| Background | `#fbf7f3` (`35 30% 97%`) | `#faf7f2` (`38 36% 96%`) — barely different |
| Yellow accent | none | `#ffc94d` — NEW signature highlight |
| Text colors | `--foreground` only | Hierarchy: ink → ink-2 → muted |
| Border radius default | `0.75rem` | `0.5rem` (cards keep `1rem`+ via `rounded-2xl`) |
| Signature element | gradient hero, glow shadows | sticker pills, hard shadows, sheen |
| Animations | fade-in, slide, scale | wiggle, pulse, drift, marquee, sheen, caret |
| Tone | "premium SaaS" | "warm editorial" |

**Migration heuristic**: replacing `bg-secondary` → `bg-bg-warm`. Replacing `text-muted-foreground` is mostly stable. Replacing `shadow-glow` → `shadow-sticker` for the hand-stamped look. Anywhere you see a soft drop-shadow card, ask whether `shadow-sticker` (hard 2px offset) reads better.

---

## 8. Don't

- ❌ Don't use raw Tailwind colors (`bg-blue-500`, `text-slate-700`) anywhere except the terminal strip and the WhatsApp-green button (`#25D366`)
- ❌ Don't add new keyframe animations without a clear reason — six is the budget
- ❌ Don't use the sheen-sweep on more than one element per page (hero h1 only)
- ❌ Don't rotate stickers consistently in the same direction — vary `-3deg` to `+3deg` for hand-placed feel
- ❌ Don't load additional Google Fonts — Cabinet Grotesk, Satoshi, JetBrains Mono are the only families
- ❌ Don't replace `.vm-card` with manual hover transitions — the easing is dialed-in

---

## 9. Reference files

- `_prototype/homepage-prototype.html` — the canonical visual artefact. When in doubt, render it in a browser side-by-side.
- `src/index.css` — token definitions, keyframes, component primitives
- `tailwind.config.ts` — Tailwind utility surface
- `src/components/home/` — homepage section components (port target — once ported, the structure here becomes the reference for other pages)
