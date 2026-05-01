---
description: Code style and conventions for the Vibe Makers TS/React codebase
---

# Code Style

## Imports
- Use path alias `@/...` → `src/...`, never deep relative imports (`../../components/...`)
- Let ESLint / Prettier handle formatting — don't hand-format
- No commented-out code — delete, git has history

## TypeScript
- No `any` without explicit justification in a comment
- Prefer `type` for unions/primitives, `interface` for object shapes that might be extended
- Import types separately when it reads cleaner: `import type { Session } from "@supabase/supabase-js"`
- Don't redeclare Supabase row shapes — import from `@/integrations/supabase/types`

## React
- Function components only; no class components
- Keep components focused — if a component has 300+ lines of JSX, consider splitting into sub-sections (look at how `Schools.tsx` pulls sections in)
- Extract hooks to `src/hooks/` when logic is reused across ≥2 components
- No inline styles — use Tailwind classes via `cn()`

## Naming
- Components: `PascalCase` (`HeroSection.tsx` exports `HeroSection`)
- Hooks: `camelCase` starting with `use` (`useMobile`, `useParallax`)
- Utilities: `camelCase`
- Types: `PascalCase`
- Files match their primary export: `FooBar.tsx` exports `FooBar`, `use-foo.ts` exports `useFoo`

## Errors
- Handle errors at system boundaries (Supabase calls, fetch, form submits) — trust internal code
- Don't swallow errors silently for anything user-facing; do fire-and-forget only where the existing code does (e.g., `sendNotificationEmail`)
- Use Sonner (`toast(...)`) for simple success/error feedback, shadcn's `useToast()` for richer toasts

## Don't
- No premature abstractions — three similar `<Section>` blocks are fine; don't create a generic `<DynamicSection>`
- No new patterns when an existing one works (look first, invent second)
- No TODO comments without a linked issue
- No `console.log` in committed code — use toasts or throw real errors
