---
paths:
  - "src/pages/**"
  - "src/components/**"
  - "src/forms/**"
  - "src/hooks/**"
  - "src/utils/**"
---

# Backend API contract (as used by this frontend)

Base: `const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);` — always guard `if (!apiBaseUrl)`.

**Auth is an HTTP-only session cookie.** Every authenticated request must send it:
`fetch(url, { credentials: "include" })` or `axios(..., { withCredentials: true })`. Never store tokens in localStorage.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/merchants` | – | All merchants (GeoJSON features) |
| GET | `/eshops` | – | All e-shops |
| GET | `/likes` | – | All likes |
| GET | `/reports` | – | All reports (admin view) |
| GET | `/logintest` | cookie | 200 + `IUser` if logged in, else 401 |
| POST | `/auth/google` | – | `{ token: <Google ID token> }` → sets cookie |
| POST | `/users/login` | – | `{ email, password }` → sets cookie |
| POST | `/users/register` | – | sign up |
| POST | `/users/reset-password` | – | forgot password |
| POST/PUT/DELETE | `/merchants/cud[?id=]` | cookie | create / update / delete merchant |
| POST/PUT/DELETE | `/eshops/cud[?id=]` | cookie | create / update / delete e-shop |
| POST/DELETE | `/likes/cud[?id=]` | cookie | like `{owner, entityId, entityType}` / unlike |
| POST | `/reports/cud` | cookie | `{entityId, entityType, owner, reason}` |
| POST | `/upload` | cookie | multipart `file` + `category` → `{ url, fileName, size }` |
| DELETE | `/upload?file=&category=` | cookie | delete stored image |
| GET | `/image?file=&category=[&original=true]` | – | serve image — build with `getBackendImageUrl()` |
| POST | `/test-aws-ses` | cookie | debug page only |

## CUD pattern

```ts
const res = await fetch(`${apiBaseUrl}/merchants/cud${id ? `?id=${encodeURIComponent(id)}` : ""}`, {
    method,                                   // "POST" | "PUT" | "DELETE"
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
});
if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Failed to <verb> <thing>: ${res.status} ${txt}`);
}
```

Payload asymmetry (backend expects it this way — don't "fix" one side only):
- **Create merchant**: `{ name, description, address, coordinates: [lon, lat], tags, socials, imageFiles: string[], visible: true }` — no `id`/`owner`, backend fills them.
- **Update merchant**: `{ ...existingProperties, ...editedFields, images: string[], coordinates, visible: true }`.
- **Create e-shop**: `{ name, description, logoFile, country: "CZ", url, visible: true }`.
- **Update e-shop**: `{ ...existing, name, description, url, logo, visible: true }`.

## Image upload

1. Compress with `browser-image-compression` (`PrepImage` / `PrepLogo`).
2. `POST /upload` with the prepared file, `category: "merchant"` (stored under `merchant-photos/`) or `"eshop"` (`eshop-logos/`). Response `fileName` includes the folder — strip it: `fileName.split("/").pop()`.
3. Also upload the untouched original as `o-<name>` with `category: "original"`.
4. Persist only the **bare file names** on the entity. On replace/delete, `DELETE /upload?file=<name>&category=<merchant|eshop>` for the old ones *after* the entity update succeeds.

## Error handling conventions

- Network/HTTP errors: `console.error("[Component] ...", err)` + `alert("Error <doing x>: " + message)`.
- Normalize list responses: `Array.isArray(data) ? data : []` (backend may return `null` for empty).
- Not-logged-in user hitting a gated action → `navigate("/login")`.
- Ownership checks on the client (`user.id === entity.owner`) are UX only; the backend is the authority.
