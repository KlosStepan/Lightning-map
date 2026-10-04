# Lightning Everywhere — frontend

Public map + directory of **Merchants** ("spots", physical places) and **E-shops** that accept Bitcoin Lightning payments, with a logged-in dashboard where users add/edit their own entries. Live at https://lightningeverywhere.com.

This repo is **frontend only** (React SPA). The backend (REST API, cookie session, image storage) lives elsewhere and is reached via `REACT_APP_API_BASE_URL` (e.g. `https://lightningeverywhere.com/api`, or `http://localhost:8080/api` locally).

## Stack

- **React 18 + TypeScript 4.9**, bootstrapped with **Create React App** (`react-scripts` 5) — no Vite, no custom webpack.
- **MUI v5** (`@mui/material`, `sx` prop, theme in `src/theme.ts`) + Emotion.
- **Redux Toolkit** (`src/redux-rtk/`) for global state; plain `useSelector` / `useDispatch`.
- **react-router-dom v6** (`BrowserRouter`, routes all declared in `src/App.tsx`).
- **Leaflet / react-leaflet v4** for maps (CARTO light tiles), **Swiper** for filter chips, `react-slick` carousels.
- **Google SSO** via `@react-oauth/google`; **GA4** via `react-ga4` (`src/utils/ga.ts`).
- HTTP: native `fetch` (most code) and `axios` (auth paths). Always with `credentials: "include"` / `withCredentials: true` for anything authenticated.
- Ships as static build in **nginx-unprivileged** Docker image → DigitalOcean Kubernetes.

## Commands

```bash
npm install --legacy-peer-deps   # peer-dep conflicts exist (MUI system v7 vs material v5); Dockerfile uses this flag
npm start                        # dev server on :3000 (needs env vars, see below)
npx tsc --noEmit                 # typecheck — currently clean, keep it that way
npm run lint                     # ESLint flat config — baseline is 0 errors, ~18 warnings
npm run format                   # Prettier write over src/ (avoid on files you didn't touch)
npm run build                    # production build into build/
CI=true npm test                 # Jest via react-scripts; only a placeholder test exists
```

Env vars are **read at build time** (CRA inlines `process.env.REACT_APP_*`). Locally they come from `.envrc` via direnv (gitignored):
`REACT_APP_API_BASE_URL`, `REACT_APP_DEBUG`, `REACT_APP_BLOG`, `REACT_APP_GOOGLE_CLIENT_ID`, `REACT_APP_GA_MEASUREMENT_ID`. Restart `npm start` after changing them.

## Directory map

```
src/
  index.tsx            Providers: GoogleOAuthProvider > ThemeProvider > Redux Provider > App
  App.tsx              Router, ALL routes, top menu config, initial fetchAll(), GA page views
  theme.ts             MUI theme (PixGamer headings/buttons, IBM Plex Sans Condensed body, palette)
  enums.ts             ButtonColor (brand hex colors), ButtonSide, ButtonLayout
  pages/               One file per route. AD* = logged-in dashboard (/admin/*)
  components/          Reusable UI: Tile* cards, ButtonUniversal, LeafletMapTwo, MenuHeader, ADMenu, Footer…
  forms/               Modal forms. Form{Add,Edit}{Spot,Eshop} = modal shell; ModifForm{Spot,Eshop} = real logic
    stylesForm.ts      Shared modal sx styles
    mobilecontentcards/  Bottom-sheet cards shown on phones
  redux-rtk/           store.ts + slices: misc (env/user), data (merchants/eshops/likes), mapFiltering
  hooks/index.ts       useFetchAll, useFetchReports
  ts/                  Domain interfaces, one per file: I{BaseEntity,Merchant,Eshop,Like,Report,User,Social,Link}
  utils/               ga.ts (analytics), image.ts (getBackendImageUrl)
  icons/ img/ fonts/   Imported assets (webpack). public/ = static files served from / (dummy-*.png fallbacks)
  dummy/               Sample JSON (only ADApproveNewEntries still uses it)
config/deployment.yaml K8s Service+Deployment with <PLACEHOLDER> tokens filled by CI
.github/workflows/     build-push-deploy.yaml (manual workflow_dispatch)
```

## Must-know rules

1. **Coordinates**: backend/GeoJSON is `[lon, lat]`; Leaflet wants `[lat, lon]`. Convert explicitly at every boundary.
2. **Category tags** `"Food & Drinks" | "Shops" | "Services"` are hard-coded in 3 places (`mapFilteringSlice.ts`, `MerchantsMap.tsx`, `ModifFormSpot.tsx`) — change all together.
3. Read config from Redux (`state.misc.apiBaseUrl`, `state.misc.debug`, `state.misc.blog`), not `process.env`, inside components.
4. Debug logging goes behind `if (DEBUG)`; never log secrets or tokens.
5. Use `ButtonUniversal` + `ButtonColor` enum for buttons, theme typography (`variant="h1"` etc.) for headings — don't hand-roll hex colors.
6. Responsive split is `useMediaQuery(theme.breakpoints.down('sm'))` → `isPhone`. Check both layouts.
7. Keep diffs surgical: the codebase has mixed 2/4-space indentation; don't reformat whole files.
8. Before declaring done: `npx tsc --noEmit` clean and `npm run lint` with no new errors/warnings in touched files.

## Steering files & skills

Path-scoped rules in `.claude/rules/` load automatically when you touch matching files:

| Rule | Applies to | Covers |
|---|---|---|
| `code-style.md` | `src/**` | File skeleton, import grouping, naming, DEBUG pattern, Prettier |
| `ui-styling.md` | pages/components/forms | MUI + theme, brand colors, fonts, layouts, modals, responsive |
| `state-and-data.md` | redux-rtk, hooks, ts | Slices, store shape, domain types, data flow |
| `backend-api.md` | pages/components/forms/hooks/utils | Endpoints, auth cookie, CUD pattern, image upload |
| `deployment.md` | Dockerfile, config, .github, nginx | Build args, CI, K8s |

Skills in `.claude/skills/` (invoke via `/name`): `new-page`, `new-component`, `api-integration`, `verify`, `commit`, `deploy`.

Reference (read on demand): `.claude/docs/architecture.md` (data flow, auth flow, route table), `.claude/docs/known-issues.md` (tech debt, gotchas, stubbed pages).

## Git

Conventional-ish commits: `type(Scope): lowercase summary` — types used: `feat`, `fix`, `refactor`, `ui`, `docs`, `debug`, combined like `feat+cicd`. Scope = component/file names, comma-separated if several. Work on `main` historically; see `/commit` skill.
