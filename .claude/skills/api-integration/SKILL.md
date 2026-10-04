---
name: api-integration
description: Wire a Lightning Everywhere frontend feature to the backend REST API — reading lists, authenticated create/update/delete via /<entity>/cud, image upload via /upload, likes/reports — with correct cookie auth, error handling and Redux updates.
argument-hint: "<what to fetch or mutate>"
---

# Backend integration

Task: `$ARGUMENTS`

Full contract: `.claude/rules/backend-api.md`. Data model: `.claude/rules/state-and-data.md`. The backend is **not in this repo** — if an endpoint you need isn't listed there, stop and ask the user rather than inventing one.

## Steps

1. **Type it.** Add/extend the interface in `src/ts/I<Thing>.ts`. If backend field names differ from the UI shape, map them at the fetch site (see `useFetchReports` mapping `entityId → vendorid`).

2. **Get config from Redux.**
   ```ts
   const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
   const user = useSelector((state: RootState) => state.misc.user);
   const DEBUG = useSelector((state: RootState) => state.misc.debug);
   ```

3. **Read (public lists).** If it's global data loaded at startup, extend `useFetchAll` in `src/hooks/index.ts` and add a setter to `dataSlice`. If it's page-local, write a hook like `useFetchReports` (returns `{ data, loading, error, fetchX }`, `fetchX` wrapped in `useCallback([apiBaseUrl])`). Normalize: `Array.isArray(data) ? data : []`.

4. **Mutate (auth required).**
   - Gate: `if (!user) { navigate("/login"); return; }`
   - Request: `credentials: "include"`, JSON body, `?id=${encodeURIComponent(id)}` for PUT/DELETE.
   - Check `res.ok`; on failure throw `Error(\`Failed to X: ${res.status} ${txt}\`)`.
   - Wrap in `try/catch/finally` with a busy flag (`isSaving`, `isDeleting`) that disables the button (`ButtonUniversal disabled`).
   - Success: update Redux locally when cheap (likes do this: `dispatch(setLikes(...))`), otherwise follow existing pattern `window.location.reload()`.

5. **Images.** Reuse the `UploadImage` / `PrepImage` / `GetBaseFileName` functions from `src/forms/ModifFormSpot.tsx` (or `UploadLogo`/`PrepLogo` in `ModifFormEshop.tsx`): compress → upload prepared + `o-` original → store bare file name. Delete replaced files only after the entity update succeeds.

6. **Display images** with `getBackendImageUrl(name, apiBaseUrl, "merchant" | "eshop")` and a dummy fallback.

7. **Coordinates**: send `[lon, lat]`, render `[lat, lon]`.

8. **Debug**: log request/response under `if (DEBUG)` with a `[feature]` prefix; never log the Google ID token or passwords.

9. Run the `verify` skill. If you can, test against a running backend (`REACT_APP_API_BASE_URL=http://localhost:8080/api`) — note in your summary if you couldn't.
