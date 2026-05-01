---
name: clarify
description: "Turn vague requests into structured, testable specs for the Vibe Makers site. Auto-triggered when requirements are ambiguous. Also /clarify."
allowed-tools: Read, Grep, Glob, Write
---

# Clarify: Idea → Design → Spec

Transform vague requests into implementation-ready specifications through structured dialogue.

## When This Triggers

Automatically when:
- Request is ambiguous or has multiple valid interpretations
- Request spans multiple pages / subsystems (frontend + Supabase schema + edge function)
- You'd have to guess at brand voice, audience (parent vs school vs student), or SEO intent

Skip when the request is already clear and specific.

## Process

### 1. Explore Context First

Before asking a single question:
- Read `CLAUDE.md` (brand voice, audience, business context)
- Read `ARCHITECTURE.md` (system map)
- Grep the area — is there an existing pattern? (e.g., is this essentially another enquiry form?)
- Check `git log` for related recent work

Don't ask things you can answer by reading.

### 2. Clarify Intent (max 3 questions)

One at a time. Prefer multiple choice.

Good: "Which audience does this page target? (a) schools / administrators (b) parents (c) students (d) all three"
Good: "Should this route appear in the main nav, or only be linked from another page?"
Bad: "What tech stack?" (read the code)
Bad: 5 questions at once

Focus on: **who is this for, what's the success criterion, what's the edge of scope**. Save implementation questions for `/plan`.

### 3. Propose Approaches

For non-trivial work, propose 2-3:
- Lead with your recommendation
- Trade-offs: complexity, time, SEO, brand risk, infrastructure impact
- YAGNI ruthlessly

### 4. Write the Spec

```markdown
# Spec: [Feature Name]

## Problem
<1-2 sentences: what pain point this solves, for whom>

## Solution
<Chosen approach, 2-3 sentences>

## Audience
<schools / parents / students / admins>

## Acceptance Criteria
- [ ] Given <context>, when <action>, then <result>
- [ ] Edge case: <scenario> → <expected behavior>
- [ ] Error case: <failure mode> → <expected handling>

## Assumptions
<What we assumed that wasn't explicit>

## Technical Notes
- Extends: <existing page/section/helper to build on>
- Changes: <what needs to be modified>
- New: <new page / new Supabase column / new edge function>
- SEO: <title, description, canonical, sitemap entry?>

## Out of Scope
<What this explicitly does NOT include>
```

### 5. Save and (optionally) Review

- Save the spec to `docs/specs/YYYY-MM-DD-<topic>.md` (create the directory if missing)
- For substantial specs, dispatch a haiku subagent to review for completeness / testability / contradictions / scope creep
- If the reviewer finds issues, fix and re-dispatch (max 2 iterations)

### 6. User Gate

Present: "Spec saved to `<path>`. Review and let me know if you'd like changes before we proceed to `/plan`."

**Wait for approval before planning or implementing.**

If the spec covers multiple independent subsystems, suggest splitting into one spec per subsystem.

## Rules

- No vague language. "Fast" → "p99 < 200ms under X". "Engaging" → describe the specific interaction.
- Every acceptance criterion is independently testable
- Don't over-process clear requests
- Specs under 40 lines
- One question per message — don't overwhelm

## Red Flags — STOP

| Thought | Reality |
|---------|---------|
| "Obvious what they want" | 3 questions take 30 seconds. Ask anyway. |
| "Just build it" | Rebuild costs 10x clarification. |
| "User seems impatient" | Shipping wrong content wastes more time than questions. |
