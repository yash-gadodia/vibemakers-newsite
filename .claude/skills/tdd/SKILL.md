---
name: tdd
description: "Test-driven development loop for Vibe Makers (Vitest + Testing Library). RED → verify fail → GREEN → verify pass → REFACTOR. Auto-triggered during implementation."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Test-Driven Development

Write the test first. Watch it fail. Write minimal code to pass.

**If you didn't watch the test fail, you don't know if it tests the right thing.**

## When to Use

**Always** — new features, bug fixes, refactors, behavior changes.

**Exceptions only** (user must explicitly say): throwaway prototypes, generated code, pure config, pure copy/content edits inside an existing section (e.g., changing a headline).

Thinking "skip TDD just this once"? Stop. Rationalization.

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Wrote code before the test? Delete it. Start over. Don't keep it "for reference" — you'll adapt it, which is testing-after. Delete means delete.

## Stack

- **Runner**: `npm test` (single run) / `npm run test:watch`
- **Testing Library**: `@testing-library/react` for components; `vitest` API for units
- **Globals**: enabled in vitest config, but existing tests import explicitly — follow the file you're near

## RED-GREEN-REFACTOR

### RED — One Failing Test

Minimal test describing what SHOULD happen. One behavior per test.

```ts
// src/lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges conflicting tailwind classes, keeping the last", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
```

- Descriptive name (`merges conflicting tailwind classes, keeping the last`)
- Real behavior, not mocks
- Exact expected values, not ranges

### Verify RED — Watch It Fail

**MANDATORY.**

```bash
npm test -- src/lib/utils.test.ts
```

Confirm:
- Test **fails** (not an import error — that's a typo, not a failing test)
- Failure message matches what you expect
- Fails because the feature is missing, not because of infrastructure

Test passes immediately? You're testing existing behavior. Rewrite.

### GREEN — Minimal Code

Simplest code that makes the test pass. No extras. No "while I'm here" refactors. YAGNI.

### Verify GREEN — Watch It Pass

**MANDATORY.**

```bash
npm test
```

Confirm:
- The new test passes
- ALL other tests still pass
- No warnings or errors

Test fails? Fix the code, not the test.
Other tests break? Fix them now.

### REFACTOR — Optional

Only after green:
- Remove duplication
- Improve names
- Extract helpers

Tests stay green. Don't add new behavior.

## Bug Fix Flow

Bug reported → write the test that reproduces it → watch it fail → fix the bug → watch it pass.

The test proves the fix and prevents regression. Never fix a bug without a test.

## Component Tests

For `@testing-library/react`:
- Mock Supabase at module boundary with `vi.mock("@/integrations/supabase/client", () => ({ supabase: {...} }))`
- Use `userEvent` over `fireEvent` for keyboard/click simulation
- Assert on what the user sees (`screen.getByRole`, `getByText`), not on internal state

## Test Quality Bar

- Specific assertions (exact values, exact class strings)
- Independent (no shared state)
- Deterministic (no real timers, no real network, no real Supabase)
- Behavior over implementation
- Match existing imports: `import { describe, it, expect } from "vitest"` is the current pattern

## Rationalizations That Mean "Start Over"

| Thought | Reality |
|---------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll write tests after" | Tests written after pass immediately. Proves nothing. |
| "I already clicked through it" | Ad-hoc ≠ systematic. No record, can't re-run. |
| "Deleting work is wasteful" | Sunk cost. Unverified code is tech debt. |
| "Keep as reference, write tests first" | You'll adapt it. Delete means delete. |
| "This is different" | It's not. Write the test. |

## Checklist Before Claiming Done

- [ ] Every new function/hook/component has a test
- [ ] Watched each test fail before implementing
- [ ] Each failure was for the expected reason
- [ ] Wrote minimal code to pass each test
- [ ] `npm test` shows 0 failures on the FULL suite
- [ ] `npm run lint` clean
- [ ] Mocks only at system boundaries (Supabase client, `fetch`) — not on internal helpers
- [ ] Edge cases covered (empty, null, boundary, error)

Can't check all boxes? Start over.
