---
description: "Automatic development workflow — Claude follows this process for every task without manual skill invocation. Covers the full lifecycle: clarify → plan → implement (TDD) → verify → review."
---

# Development Workflow

Follow this process automatically for every task in this repo. You do not need the user to type `/plan`, `/tdd`, or `/review` — do it as part of your natural workflow.

**If there is even a 1% chance a step applies, do it.** The cost of doing an unnecessary step is minutes. The cost of skipping a necessary one is hours of debugging or broken production content.

## The Pipeline

### 1. Understand

Read the request. For non-trivial work, explore the codebase first:
- `CLAUDE.md` for project/brand context
- `ARCHITECTURE.md` for structural context
- The actual page/component you're about to change + 1-2 similar existing examples

If requirements are ambiguous, ask up to 3 clarifying questions (one at a time, prefer multiple choice). Make reasonable assumptions for everything else and state them.

### 2. Plan (medium+ tasks)

Before writing code on non-trivial changes:
- Identify which files change and why
- Break into bite-sized tasks (2-5 min each)
- Each task specifies exact file paths + what changes + how to verify
- Challenge your own plan: simplest version? existing pattern to reuse? what's hardest to change later?
- Present the plan and wait for approval

For large tasks (architecture changes, new systems): propose 2-3 approaches with trade-offs, get approval, THEN plan.

### 3. Implement (with TDD)

RED → GREEN → REFACTOR:
1. **RED**: write one failing test describing the desired behavior
2. **Verify RED**: run `npm test` and confirm the test fails for the right reason
3. **GREEN**: write the minimal code to make the test pass
4. **Verify GREEN**: run `npm test` — new test passes, all others still pass
5. **REFACTOR**: clean up with tests green (no new behavior)
6. **Repeat** for the next behavior

**Iron law: no production code without a failing test first.** Wrote code before the test? Delete it. Write the test. Implement fresh.

Skip TDD only for: config files, generated code, content-only edits (copy changes in existing sections), or when the user explicitly says so.

### 4. Verify

**No completion claims without fresh evidence.**

Before saying "done", "fixed", "passing":
1. Run `npm test` and `npm run lint`
2. Read the full output
3. Confirm the output supports the claim
4. State the claim WITH the evidence (`All N tests pass — output above`)

For UI/visual changes: `npm test` doesn't prove visual correctness. Say so explicitly and ask the user to verify in the browser. Don't claim "looks good" without having opened it yourself (via a Playwright/browse subagent if needed).

### 5. Self-Review

Review your own changes (spec compliance + code quality). Fix issues before presenting.

### 6. Finish

When work is complete, land it:
- `npm test` passes? Present options: commit locally, push + create PR, keep branch, discard
- Never merge without passing tests
- Memory note for this user: always commit and push after completing work unless told otherwise

## Scaling

| Task Type | Steps |
|-----------|-------|
| Typo, copy change, static content | Implement → verify (lint + build) |
| Bug fix | Understand → RED (reproduce as test) → GREEN → verify |
| Small feature | Plan briefly → TDD → verify → self-review → finish |
| Multi-file feature | Understand → plan (with approval) → TDD → verify → self-review → finish |
| Architecture / schema change | Clarify → design → plan (with approval) → TDD → verify → self-review → finish |

**Never skip verification**, even for a typo — at minimum run `npm run lint`.

## Principles

- **Don't ask permission to be thorough.** If a feature needs tests, write them.
- **Evidence before claims.** Run the command. Read the output. Cite it.
- **Proportional rigor.** Typos don't need design docs. Supabase schema changes do.
- **Show, don't tell.** Instead of saying "you should add tests", write the tests.
- **Delete and redo over patching.** If you wrote code before the test, delete it. Start over with TDD.
