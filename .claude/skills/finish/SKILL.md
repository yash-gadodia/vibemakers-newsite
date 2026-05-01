---
name: finish
description: "Land completed Vibe Makers work — verify tests + build, present merge/PR/keep/discard options, execute with safety checks. Auto-triggered after implementation and review pass."
allowed-tools: Read, Bash, Glob, Grep
---

# Finish: Land Your Work

Verify → present options → execute → clean up.

## When This Triggers

Automatically after all implementation tasks pass review and verification.

## Process

### 1. Verify

Run the FULL check:
```bash
npm test
npm run lint
```

If ANY test or lint check fails, STOP. Fix before proceeding.

For structural changes (new route, new Vite config, new dep), also:
```bash
npm run build
```

### 2. Determine Base Branch

```bash
git log --oneline --graph -10
git branch --show-current
```

Usually `main`. Ask if unclear.

### 3. Present Options

Show exactly these four choices:

1. **Commit to current branch (push + PR later)** — stage, commit with co-author trailer, push, no PR yet
2. **Push & create PR** — push branch, create PR via `gh pr create` with summary + test plan
3. **Keep local only** — stage and commit, don't push
4. **Discard** — permanently delete changes (requires typed "discard" confirmation)

Memory note for this user: they prefer committing and pushing after completing work unless told otherwise — so option 1 or 2 is usually correct, and it's OK to proceed without re-asking if the user previously said "just ship it".

### 4. Execute

**Commit + push (option 1):**
```bash
git status
git diff --stat
git add <specific files, not -A>
git commit -m "$(cat <<'EOF'
<Subject in imperative mood>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push
```

**Push & create PR (option 2):**
- Same as above, then:
```bash
gh pr create --title "<short, under 70 chars>" --body "$(cat <<'EOF'
## Summary
- <bullet>
- <bullet>

## Test plan
- [ ] <how to verify>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

**Keep local (option 3):**
- Commit locally, don't push. Note branch name for the user.

**Discard (option 4):**
- Require user to type "discard" literally
- `git stash` or `git checkout -- <files>` depending on intent
- Confirm nothing was pushed before destroying

### 5. Clean Up

- Delete any worktree created for this task
- Summarize what landed (files changed, tests added, PR URL if any)

## Rules

- NEVER merge / push without passing tests + lint
- NEVER delete work without typed "discard" confirmation
- Never force-push to `main`
- Never squeeze unrelated changes into one commit
- If this user hasn't said otherwise, default to option 1 (commit + push) — they've memorized this preference
- If on `main` with no feature branch, still commit and push per user preference; offer PR only if there's a feature-branch workflow in play
