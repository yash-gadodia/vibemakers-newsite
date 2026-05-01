---
description: Testing conventions for Vitest 3.x on Vibe Makers
---

# Testing Rules

## Framework
- Vitest 3.2.4 with jsdom environment (see `vitest.config.ts`)
- `@testing-library/react` v16 + `@testing-library/jest-dom` v6
- Setup file: `src/test/setup.ts` (stubs `matchMedia` — don't remove, components use it)
- Globals (`describe`, `it`, `expect`) are enabled in vitest config AND explicitly imported in the existing test (`src/test/example.test.ts`). Follow the existing style: explicit imports from `vitest` at the top of each test file.
- Path alias `@/...` resolves in tests

## Commands
- `npm test` — one-shot run (the "CI" command)
- `npm run test:watch` — watch mode during development
- Run the FULL suite before claiming done, not just a single test file

## Patterns
- Co-locate tests next to the file under test (`foo.ts` → `foo.test.ts`) OR put them under `src/test/`. Follow the nearest existing example in the area you're editing.
- Mock Supabase at the module boundary:
  ```ts
  vi.mock("@/integrations/supabase/client", () => ({
    supabase: { from: vi.fn(), auth: { … }, functions: { invoke: vi.fn() } },
  }));
  ```
  Never mock internal helpers (`cn`, hooks, other components).
- For component tests, use `@testing-library/react`'s `render` + `screen` + `userEvent`. Don't reach into internal state.

## Quality bar
- Every feature change gets a test; every bug fix gets a regression test
- Test behavior, not implementation — tests should survive a refactor
- Descriptive names: `should reject expired tokens`, not `test auth 3`
- Independent tests (no shared mutable state)
- Deterministic (no `Date.now()`, no unseeded randomness, no real network)
- **Assertions are specific.** Assert the exact class string from `cn()`, the exact error message, the exact row object — never `toBeTruthy()` / `toBeGreaterThan(0)` as the sole assertion for logic.
- Integration-style tests (real `@testing-library` render) beat over-mocked unit tests for UI

## Don't
- Don't add a `test` for a generated Supabase type or a shadcn primitive — trust the library
- Don't gate a PR on coverage numbers — we don't run coverage reporting yet
- Don't `.skip` or delete failing tests to make the suite green
