# Known issues, tech debt & gotchas

Snapshot as of 2026-10-02 (commit 37d7469). Verify before relying on any item — fix them only when asked, but don't trip over them.

## Functional gaps

- `ADApproveNewEntries` loads `src/dummy/*.json`; visibility toggles are local state only (no backend call).
- `ADManageUsers` is a placeholder (`-list of users-`).
- Admin-only menu items (`ADMenu` → Manage users / Approve / Likes / Reports) are shown to **any** logged-in user; the email check is commented out. There's no role check on the client (`IUser.role` exists but is unused).
- Mobile dashboard bottom bar shows only the normal menu (admin links commented out).
- `UIKit` page is partially maintained and excluded from lint.
- **No logout** in the UI: `settings` in `App.tsx` lists "Logout" but nothing calls a logout endpoint or clears the cookie.
- E-shop `country` is hard-coded to `"CZ"` on create.
- Map center and new-spot pin default to Prague.

## Code-level gotchas

- **Coordinate order**: backend `[lon, lat]`, Leaflet `[lat, lon]`. `LeafletMapTwo` swaps `coordinates[1], coordinates[0]`; `ModifFormSpot` converts `position` back before sending.
- Category tag list duplicated in `mapFilteringSlice.ts`, `MerchantsMap.tsx`, `ModifFormSpot.tsx`.
- `LeafletMapTwo` uses array index as `key` and compares selection by `properties.name` (not `id`) — two merchants with the same name both highlight.
- `IBaseEntity.editor` is typed `string` but dashboards also handle it as an array.
- Mixed HTTP clients: `fetch` almost everywhere, `axios` in `ProtectedRoute` and `Login`. Follow whatever the surrounding file uses.
- `useFetchAll` doesn't check `res.ok` for list endpoints before `.json()`.
- After create/update/delete the UI does `window.location.reload()` instead of updating Redux.
- `MerchantsMap` injects Swiper CSS from unpkg via `GlobalStyles @import` (external runtime dependency).
- `App.tsx` logs `apiBaseUrl` with `console.log` even when DEBUG is off.
- Mixed indentation (2 vs 4 spaces) and quote styles across files.
- Upload "original" naming is a hotfix: `o-<baseFileName>` composed client-side.

## Tooling

- `npm install` needs `--legacy-peer-deps` (`@mui/system` v7 alongside `@mui/material` v5).
- TypeScript is 4.9 (CRA 5 constraint) — no TS 5-only syntax (`satisfies` is OK in 4.9, `const` type params are not).
- `src/App.test.tsx` is an empty placeholder. `@testing-library/react` is only present transitively (via `pwnspinner`), not declared in `package.json`. There is no real test suite.
- Lint baseline: 0 errors, ~18 warnings (mostly unused vars / exhaustive-deps).
- `build/` is gitignored but `build/manifest.json` and `build/robots.txt` are tracked.
- `.envrc` is gitignored but exists locally with real (public) client IDs; README shows a template.
- CI workflow is manual-only (push/PR triggers commented out) — there is no automated lint/typecheck on PRs.
