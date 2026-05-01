---
description: Git workflow conventions for Vibe Makers
---

# Git Rules

## Commit message style (from `git log`)
- Imperative mood, sentence case, no conventional-commits prefixes
- Single concise subject line. Extend with a body only when "why" needs explanation.
- Typical openers: `Add …`, `Update …`, `Fix …`, `Remove …`, `Re-enable …`
- Occasionally longer descriptive subjects (e.g. `Site overhaul: trust, MOE alignment, authenticity, and code quality`) — fine when the change truly spans multiple areas
- Do NOT squeeze unrelated changes into one commit to get a fancy subject — split them

## Branching
- `main` is the deployed branch (Lovable pushes to `vibemakerz.lovable.app`)
- Feature work: `feat/<slug>` · bug fixes: `fix/<slug>` · chores: `chore/<slug>`

## Rules
- Never force push to `main`
- Never commit `.env*`, Supabase service keys, or anything under `*.pem`, `*.key`, `*.cert`
- Never commit large binaries — assets go in `src/assets/` (images), not random files at the repo root
- Run `npm test` and `npm run lint` before committing — don't push broken code
- Keep PRs focused — one feature or fix per PR
- When the user asks to commit, include the standard co-author trailer

## Lovable-bot commits
- Commits authored by `Lovable` or `gpt-engineer-app[bot]` are from the Lovable platform
- They may contain plan markers (`Save plan in Lovable`, `Update plan`) — treat as checkpoints, don't rewrite their history
