---
name: subagent-dev
description: "Execute plans using fresh subagents per task with two-stage review on the Vibe Makers codebase. Auto-triggered for plans with 3+ independent tasks."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
---

# Subagent-Driven Development

Execute a plan by dispatching a fresh subagent per task, with two-stage review after each.

## When to Use

Automatically when:
- Plan has 3+ tasks AND tasks are mostly independent (don't tightly depend on each other's file output)

Fall back to sequential implementation when tasks are tightly coupled or the plan has fewer than 3 tasks.

## Why Fresh Subagents

- **No context pollution**: each agent gets only what its task needs
- **Focus**: agent sees its task spec, not your full conversation
- **Preserved orchestrator context**: you keep context for coordination, not implementation details

## Process

### 1. Setup

- **Read the plan file ONCE.** Extract every task with full text, file paths, context upfront. When dispatching each subagent, pass the full task text directly — never make the subagent re-read the plan.
- Note cross-task dependencies and shared files
- Create a task list to track progress

### 2. Per Task

```
For each task:
  a. Dispatch IMPLEMENTATION subagent (developer agent) with:
     - Full task text (exact file paths, expected behavior, test requirements)
     - Project context: "npm test / npm run lint, design tokens only, cn() for classes,
       <Layout>+<Helmet> on pages, @/... imports, no edits to src/integrations/supabase/client.ts"
     - Instruction: follow TDD (RED-GREEN-REFACTOR)

  b. If implementer asks questions → answer, re-dispatch.
     If BLOCKED → assess: missing context? too big? plan wrong?

  c. Dispatch SPEC-REVIEW subagent (haiku) with:
     - The task spec
     - The git diff of changes made
     - Question: "Does this match the spec? Missing anything? Extra code not requested?"

  d. If spec review fails → implementer fixes → spec review again.

  e. Dispatch CODE-QUALITY review (sonnet, reviewer agent) with:
     - The changed files
     - Question: "Bugs? Security? Convention violations per .claude/rules/? Test quality?"

  f. If quality review fails → implementer fixes → quality review again.

  g. Mark task complete.
```

### 3. Completion

- Run `npm test` on the FULL suite, not individual tests
- Run `npm run lint`
- Verify build with `npm run build` if the change touches Vite config or top-level app wiring
- Trigger `/finish` to land the work (merge / PR / keep / discard)

## Model Selection

| Role | Model | Why |
|------|-------|-----|
| Implementation, 1-2 files, clear spec | haiku | Mechanical |
| Implementation, multi-file or auth/admin | sonnet | Judgment |
| Spec review | haiku | Comparison task |
| Code-quality review | sonnet | Judgment |

## Subagent Status Handling

- **DONE**: proceed to spec review
- **DONE_WITH_CONCERNS**: read concerns. If correctness-related, address before review. If observations, note and proceed.
- **NEEDS_CONTEXT**: provide the missing context, re-dispatch
- **BLOCKED**: do NOT force retry with same input. More context? Smaller task? Plan wrong?

## Rules

- Never skip reviews — both spec compliance AND code quality
- Spec compliance BEFORE code quality — wrong order wastes time
- Never dispatch parallel implementation subagents writing to the same file
- Don't make subagents read the full plan — pass the task text directly
- Fix issues before moving on
- Never start work on `main` — create a feature branch first

## Red Flags — STOP

| Thought | Reality |
|---------|---------|
| "Close enough to spec" | Not done. Spec reviewer decides. |
| "Skip review just this once" | The one you skip breaks prod. |
| "Force retry, same approach" | Change something — context, model, task size. |
| "I can review my own code" | Self-review ≠ external review. |
