---
paths:
  - "src/redux-rtk/**"
  - "src/hooks/**"
  - "src/ts/**"
  - "src/App.tsx"
---

# State & data model

## Store (`src/redux-rtk/store.ts`)

```
RootState = {
  misc: {
    debug: boolean          // REACT_APP_DEBUG === "true"
    blog: boolean           // REACT_APP_BLOG !== "false"  (hides Blog menu/section)
    apiBaseUrl: string|null // REACT_APP_API_BASE_URL
    user: IUser | null      // set from GET /logintest
    userMerchants: IMerchantADWrapper[] | null  // dashboard: entries owned/edited by user
    userEshops:    IEshopADWrapper[]    | null
  }
  data: {                   // undefined = not loaded yet (show spinner); [] = loaded empty
    merchants: IMerchant[] | undefined
    eshops:    IEshop[]    | undefined
    likes:     ILike[]     | undefined
  }
  mapFiltering: {
    filters: { All, "Food & Drinks", Shops, Services: boolean }
    selected: IMerchant | null   // merchant opened on the map page
  }
}
```

- Slices are plain `createSlice` with setter reducers (`setMerchants`, `setUser`, …). No thunks / RTK Query — fetching happens in components or hooks, then `dispatch(setX(...))`.
- Use `useSelector((state: RootState) => state.slice.field)`; `useDispatch()` untyped (fine).
- When adding a slice: create `src/redux-rtk/<name>Slice.ts`, export actions + default reducer, register in `store.ts`.
- `setFiltering("All")` toggles all; toggling the last individual filter off clears `selected` (keep that behavior).

## Loading flow

1. `App.tsx` on mount (once `apiBaseUrl` exists) calls `useFetchAll().fetchAll()` → parallel `GET /merchants`, `/eshops`, `/likes`, `/logintest` → dispatches data + user.
2. `ProtectedRoute` re-checks `/logintest` for every `/admin/*` route and redirects to `/login` on failure.
3. Dashboard pages refetch `/merchants` or `/eshops` and filter client-side by `owner === user.id` (or `editor`) into `misc.userMerchants/userEshops`.
4. Likes: counts are derived client-side into a `Map<entityId, count>`; like/unlike updates local state optimistically, then `setLikes`.

## Domain types (`src/ts/`)

- `IBaseEntity`: `id, owner, editor?, visible, name, description, createdAt?`.
- `IMerchant` is a **GeoJSON Feature**: `{ type: "Feature", geometry: { type: "Point", coordinates: [lon, lat] }, properties: IMerchantTile }`. Most UI works with `merchant.properties` (`IMerchantTile`: `images[], address{address,city,postalCode}, tags[], socials[]`).
- `IEshop extends IBaseEntity`: `logo, country, url` (flat — no GeoJSON).
- `ILike`: `owner, entityId, entityType: "merchant"|"eshop"`.
- `IReport`: frontend shape; `useFetchReports` maps backend `{entityId, owner, createdAt}` → `{vendorid, userid, timestamp}`.
- `IUser`: `id, email, firstName, lastName, role`, Google fields (`avatarUrl, googleId, authSource`), caps `maxEshops?, maxMerchants?` (enforced in UI before opening the add modal).
- `ISocial.network`: `'web'|'facebook'|'instagram'|'twitter'|'threads'`.
- `*ADWrapper` = `{ documentid, merchant|eshop }` used by dashboard tiles; `documentid` = the entity `id`.

When the backend contract changes, update the interface in `src/ts/` first, then let `tsc` find usages.
