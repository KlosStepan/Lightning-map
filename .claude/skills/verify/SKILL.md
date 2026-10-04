---
name: verify
description: Run Lightning Everywhere's quality gates (TypeScript typecheck, ESLint, optional production build and tests) and report results against the known baseline. Use after any code change before calling work done.
argument-hint: "[--build]"
allowed-tools: Bash(npx tsc --noEmit*), Bash(npm run lint*), Bash(npm run build*), Bash(CI=true npm test*), Bash(git diff*), Bash(git status*)
---

# Verify

Run from the repo root.

1. **Typecheck** — must be clean (baseline: 0 errors).
   ```bash
   npx tsc --noEmit
   ```
2. **Lint** — baseline is **0 errors, ~18 warnings**. Zero errors required; no *new* warnings in files you touched.
   ```bash
   npm run lint
   ```
   To scope to changed files: `npx eslint $(git diff --name-only --diff-filter=d HEAD -- 'src/*.ts' 'src/*.tsx')`.
3. **Build** (when `$ARGUMENTS` contains `--build`, or when you changed config, env handling, imports of assets, or dependencies):
   ```bash
   npm run build
   ```
   CRA treats warnings as errors only when `CI=true`; plain build is fine locally. Note `build/` output is gitignored.
4. **Tests**: `CI=true npm test -- --watchAll=false` — only a placeholder test exists; run it if you added tests.
5. **Manual check** suggestion: UI changes should be eyeballed with `npm start` at desktop and phone widths; say explicitly in the summary if this wasn't done.

Report: each command, pass/fail, and any new warnings with `file:line`. Don't "fix" pre-existing warnings in unrelated files unless asked.
