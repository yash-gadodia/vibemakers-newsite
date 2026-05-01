---
name: plan
description: "Create a bite-sized implementation plan for a change in the Vibe Makers codebase. Auto-triggered for medium+ tasks. Includes design exploration, devil's advocate challenge, and approval gate."
allowed-tools: Read, Grep, Glob, Agent
---

# Plan: Design Before You Build

Turn a feature request into a vetted, executable implementation plan tailored to the Vibe Makers codebase.

## When This Triggers

Automatically for any non-trivial change: new page, new section component, new Supabase table/column, new form, new edge function, multi-file refactor, auth/admin change. Skip for typos, copy changes inside an existing section, config tweaks, and one-liner bug fixes.

## Process

### Phase 1: Understand

- Read `CLAUDE.md` (project conventions, brand context) + `ARCHITECTURE.md` (system map)
- Grep for the feature area (e.g., `School` / `Parents` / `Hackathon`) and read the closest existing pattern
- If the change touches Supabase, open `src/integrations/supabase/types.ts` to confirm current schema
- If vague, ask up to 3 clarifying questions (one at a time, prefer multiple choice)

### Phase 2: Explore Approaches (medium+ tasks)

Propose 2-3 approaches:
- Lead with your recommendation and why
- Trade-offs: complexity, time, SEO impact, risk to auth/admin paths
- Prefer reusing an existing section pattern over inventing a new one

### Phase 3: Design

Write the plan with bite-sized tasks. Each task: 2-5 minutes of work.

```markdown
## Plan: [Feature Name]

### Problem
<What we're solving, 1-2 sentences>

### Approach
<Chosen approach, why this over alternatives>

### Files
- Create: `src/pages/Foo.tsx`
- Create: `src/components/foo/FooSection.tsx`
- Modify: `src/App.tsx` (register route)
- Modify: `public/sitemap.xml` (add URL)
- Test: `src/pages/Foo.test.tsx`

### Tasks

#### Task 1: Add Foo page skeleton
- [ ] RED: test that `/foo` renders a heading
- [ ] Verify test fails (route not registered)
- [ ] GREEN: create `Foo.tsx` with `<Layout>` + `<Helmet>` + heading; register in `App.tsx`
- [ ] Verify test passes + `npm run lint` clean
- [ ] Commit

#### Task 2: ...
```

### Phase 4: Devil's Advocate

Challenge your own plan:
- What's the simplest version? Can we ship less?
- Is there an existing section / page / hook we should reuse?
- If auth-related: does it break the `AuthContext` listener ordering or admin-role check?
- If Supabase-related: does it assume a column that isn't in `types.ts`? Does it need new RLS?
- What breaks SEO (missing canonical, missing sitemap entry, duplicate title)?
- What's hardest to change later if we get it wrong?

Update the plan based on this challenge.

### Phase 5: Present and Wait

Show the plan. **Wait for approval before writing any implementation code.**

## Task Granularity
- 2-5 minutes per task
- Exact file paths (not "the relevant files")
- Every task follows TDD: RED → verify fail → GREEN → verify pass → commit
- Each task leaves the codebase in a working state

## Plan Quality Rules
- Plans under 50 lines. Longer = scope too big, split it.
- Every file change has a "why"
- Don't plan work outside the user's request (YAGNI)
- Include exact commands for verification (`npm test`, `npm run lint`, `npm run build`)
- If the plan adds a new route, the checklist MUST include both `src/App.tsx` and `public/sitemap.xml`
- If the plan adds/removes design tokens, the checklist MUST include `src/index.css`

## Red Flags — STOP

| Thought | Reality |
|---------|---------|
| "Too simple to plan" | Surprises hide in "simple" changes. Plan takes 2 minutes. |
| "I already know what to build" | You know what, not how. |
| "I'll plan as I go" | That's no plan. |
