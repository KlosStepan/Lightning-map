# Architecture reference

## Provider tree (`src/index.tsx`)

```
<React.StrictMode>
  <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
    <ThemeProvider theme={theme}>          // src/theme.ts
      <Provider store={store}>              // src/redux-rtk/store.ts
        <App />                             // Router + routes + fetchAll
```

`App` renders: `<Router>` → `<AnalyticsListener/>` (GA page view on every location change) → `<CssBaseline/>` → centered Grid → `<AppBar><MenuHeader pages=.../></AppBar>` → `<Routes>`.

## Routes (all in `src/App.tsx`)

| Path | Page | Guard | Notes |
|---|---|---|---|
| `/` | `Homepage` | – | hero, explainer tiles, evidence section, blog teaser if `misc.blog` |
| `/map` | `MerchantsMap` | – | search + category chips + tile grid + Leaflet map; "Add spot" (login required) |
| `/e-shops` | `Eshops` | – | e-shop grid + search; "Add e-shop" |
| `/why-lightning` | `WhyLightning` | – | static content |
| `/blog` | `Blog` | – | static `TileBlogpost` list; hidden from menu when `REACT_APP_BLOG=false` (`Blogpost.tsx` exists but is unrouted) |
| `/about` | `About` | – | static content, history tiles |
| `/login` | `Login` | – | Google SSO (official button + custom GIS prompt) and email/password |
| `/sign-up` | `SignUp` | – | email registration |
| `/forgot-password` | `ForgotPassword` | – | |
| `/admin/dashboard` | `ADHome` | Protected | overview of user's spots & e-shops |
| `/admin/my-spots` | `ADMyMerchants` | Protected | CRUD own merchants, cap `maxMerchants` |
| `/admin/my-eshops` | `ADMyEshops` | Protected | CRUD own e-shops, cap `maxEshops` |
| `/admin/my-account` | `ADMyAccount` | Protected | profile, Google account info |
| `/admin/manage-users` | `ADManageUsers` | Protected | **stub** |
| `/admin/new-entries` | `ADApproveNewEntries` | Protected | **uses dummy JSON**, toggles are local only |
| `/admin/likes` | `ADLikes` | Protected | list of likes |
| `/admin/reports` | `ADReports` | Protected | list of reports (`useFetchReports`) |
| `/uikit` | `UIKit` | – | component showcase (excluded from lint) |
| `/admin/test-aws-ses` | `ADTestAwsSes` | Protected | debug: test email sending; menu link only when DEBUG |

Top menu entries are the `pages: ILink[]` array in `App.tsx`; `MenuHeader` renders them (desktop + mobile drawer) and filters out Blog when disabled.

## Auth flow

```
Login page
 ├─ Google: GIS → ID token → POST /auth/google {token} (withCredentials) → cookie set
 │          → GET /logintest (sanity) → navigate("/admin/dashboard")
 └─ Email:  POST /users/login {email,password} (credentials: include) → cookie set → navigate
App mount: fetchAll() includes GET /logintest → misc.user (or null)
/admin/*:  ProtectedRoute → GET /logintest → render children | <Navigate to="/login" />
```

`misc.user` drives: "Add spot/e-shop" (else redirect to login), like buttons, report form, dashboard tiles ownership, caps.

## Map page data flow (`MerchantsMap`)

```
state.data.merchants
  → filter properties.visible
  → filter tags vs state.mapFiltering.filters (All = bypass)
  → filter search text (name, description, owner, tags, socials, address; diacritics-insensitive)
  = filteredMerchants  ──► Tile grid (click → setSelected)
                       └─► LeafletMapTwo (marker click → setSelected)
state.mapFiltering.selected
  desktop → TileMerchantBig above the grid
  phone   → bottom-sheet Modal with CardSpot
likes → Map<entityId,count> (local state, optimistic +/-1 via FuncDrillIncrDecrLike)
```

Map defaults to Prague (50.0755, 14.4378), zoom 13, CARTO `light_all` tiles.

## Add/Edit entity flow

```
Page (open state) → Modal → Form{Add,Edit}{Spot,Eshop} (shell) → ModifForm{Spot,Eshop}
  validate → compress + POST /upload (prepared + original) → Wrap*Data → POST|PUT /<entity>/cud
  → (edit + replaced images) DELETE /upload old files → window.location.reload()
```

`ModifFormSpot` also embeds a mini Leaflet map with a draggable pin to pick coordinates.
