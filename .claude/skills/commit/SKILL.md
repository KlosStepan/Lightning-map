---
name: commit
description: Create a git commit for Lightning Everywhere using the project's commit message convention (type(Scope): summary). Use only when the user asks to commit.
argument-hint: "[optional message hint]"
disable-model-invocation: true
---

# Commit

1. `git status` and `git diff` (staged + unstaged). Never stage `.envrc`, `build/` output, `node_modules/`, or files with secrets.
2. Make sure `verify` passed for code changes (at least `npx tsc --noEmit`).
3. Stage specific paths (`git add <files>`), not `git add -A`, unless every change belongs to the commit.
4. Message format, matching history:

   ```
   type(Scope): short lowercase summary of what and why
   ```

   - **type**: `feat` (new capability), `fix` (bug), `refactor` (no behavior change), `ui` (visual/content/layout), `docs` (README/CLAUDE/.claude), `debug` (temporary diagnostics), `cicd` (workflow/Docker/k8s). Combine with `+` when truly mixed: `feat+cicd(analytics): ...`.
   - **Scope**: the main component/file/area names, comma-separated: `fix(TileEshop, TileMerchant): ...`, `fix(mapFiltering): ...`, `feat(user-limits): ...`.
   - Keep the subject under ~100 chars; add a body only when the why isn't obvious.

   Examples from history:
   - `fix(mapFiltering): close selected tile when all filters are turned off or unselected`
   - `refactor(ProtectedRoute, useFetchAll): replace fetch with axios for authentication check`
   - `ui(README): update image display for desktop and mobile views`

5. End the message with the attribution trailer configured for this session (if any).
6. Don't push unless asked. Default branch is `main`; if the user wants a PR, branch first.
