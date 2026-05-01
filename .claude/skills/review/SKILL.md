---
name: review
description: "Two-stage code review for Vibe Makers: spec compliance → code quality. Auto-triggered after implementation. Also /review."
allowed-tools: Read, Grep, Glob, Bash
---

# Review: Two-Stage Code Review

Review all changes in two passes: spec compliance first, then code quality.

## When This Triggers

Automatically after implementing any change. Also manually before committing or creating PRs.

## Process

### Stage 1: Spec Compliance

Does the code match what was requested?

```bash
git diff HEAD
# or for a branch:
git diff main...HEAD
```

For each requirement / acceptance criterion from the plan or request:
- [ ] Code implementing it?
- [ ] Test verifying it?
- [ ] Implementation matches spec (not over-built, not under-built)?

**Missing requirement?** Flag it. Don't proceed until spec is met.
**Extra code not in spec?** Flag it. YAGNI — remove unless there's a documented reason.

### Stage 2: Code Quality

For each changed file:

**Correctness**
- Logic does what it claims?
- Edge cases handled (null, empty, boundary)?
- Async / Supabase calls handle `error` + race conditions?
- Off-by-one errors?

**Security**
- User input validated (zod schema present + used)?
- No credentials / anon keys committed (only the existing auto-generated `client.ts` is OK)
- No unsanitized `dangerouslySetInnerHTML` (blog renders through `dompurify` — don't bypass)
- Admin UI gated on `isAdmin` from `useAuth()`?
- No unvalidated row writes (e.g., directly passing `req.body` into `supabase.from().insert`)?

**Conventions** (see `.claude/rules/`)
- Design tokens only — no `bg-blue-500`, `text-slate-700`, etc.?
- `<Layout>` + `<Helmet>` on every new page?
- `@/...` imports, not deep relative?
- `cn()` for class merging, not template literals for conditionals?
- `font-display` on headings, default elsewhere?
- External links have `target="_blank" rel="noopener noreferrer"`?
- New route registered in BOTH `src/App.tsx` AND `public/sitemap.xml`?
- Not editing auto-generated files (`src/integrations/supabase/client.ts`, `types.ts`, `supabase/config.toml`)?

**Tests**
- New functionality has Vitest tests written TDD-style?
- Assertions are specific (exact values, not `toBeTruthy()`)?
- Mocks only at module boundaries (Supabase), never on internal helpers?

### Output

```
## Review

### Spec Compliance: PASS / FAIL
- [requirement]: ✅ implemented + tested / ❌ missing

### Code Quality
**Critical** (must fix):
- [file:line] Description. Fix: ...

**Important** (should fix):
- [file:line] Description. Fix: ...

**Suggestions** (consider):
- [file:line] Description.

### Verdict: APPROVE / REQUEST CHANGES
```

## Rules

- Run `git diff` — don't guess at changes
- Read FULL files for context, not just diffs
- Specific: line numbers, code snippets, concrete fixes
- Spec compliance BEFORE code quality — wrong order wastes time
- If everything looks good, say so. Don't invent issues.
- Critical issues block — don't approve with unresolved criticals.

## Red Flags — STOP

| Thought | Reality |
|---------|---------|
| "Looks fine to me" | Not a review. Check spec line by line. |
| "I wrote it so I know it works" | Author blindness. Review like a stranger. |
| "`npm test` passes so it's fine" | Tests verify behavior, not security or style conformance. |
| "No critical issues" without reading diff | You haven't checked. Read first. |
