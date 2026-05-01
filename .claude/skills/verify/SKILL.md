---
name: verify
description: "Verification before completion — no 'done/fixed/passing' claims without fresh evidence for the Vibe Makers codebase. Auto-triggered before any completion claim."
allowed-tools: Read, Bash, Glob, Grep
---

# Verification Before Completion

Claiming work is complete without verification is dishonesty, not efficiency.

**Core principle: evidence before claims, always.**

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

If you haven't run the verification command in this response, you cannot claim it passes.

## The Gate

Before claiming ANY status (done, fixed, passing, working, complete, good):

1. **Identify**: which command proves this?
2. **Run**: execute fresh (not "I already ran it earlier")
3. **Read**: full output, exit code, pass/fail counts
4. **Confirm**: does output support the claim?
   - **No** → state actual status with evidence
   - **Yes** → state claim WITH the evidence
5. **Only then** make the claim

## What Counts as Verification

| Claim | Requires | NOT Sufficient |
|-------|----------|----------------|
| "Tests pass" | `npm test` output showing 0 failures | Earlier run, "should pass", tests not-yet-written |
| "Build succeeds" | `npm run build` with exit 0 | Dev server starts |
| "Lint clean" | `npm run lint` with 0 errors | Partial check |
| "Bug is fixed" | A test reproducing the bug now passes | Code changed, manual click |
| "Looks right in browser" | Actual browser check (you or user) with before/after | Dev server is running |
| "Requirements met" | Line-by-line check vs plan/spec | "Tests pass" |

## UI / Visual Changes

`npm test` does NOT prove visual correctness. For any UI change:
- Say so explicitly
- Ask the user to confirm visually, OR dispatch a browse/Playwright subagent to screenshot
- Don't claim "looks good" if you haven't seen it

## Red Flags — STOP

These thoughts mean you're about to make an unverified claim:

- "should", "probably", "seems to", "looks correct"
- Feeling satisfied before running verification
- About to say "Done!", "Fixed!", "All good!"
- Trusting a change works without running it
- "Just this once" / "obvious it works"

**Replace each with**: run the command, read the output, cite the evidence.

## Rules

- Run the FULL test suite (`npm test`), not just one file
- If a test looks flaky, run twice to confirm
- If a subagent reports success, verify independently
- If there's no way to verify (e.g., production-only feature), say so explicitly instead of claiming success
- For this user: always confirm with `npm test` + `npm run lint` before claiming done; always commit and push after work is complete unless told otherwise
