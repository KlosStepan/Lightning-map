---
paths:
  - "src/pages/**"
  - "src/components/**"
  - "src/forms/**"
  - "src/theme.ts"
  - "src/enums.ts"
---

# UI & styling

Design source: Figma "LightningEverywhere" (link in README). Pixel-art accents + condensed sans body.

## Theme (`src/theme.ts`)

- Headings `h1`–`h6` and MUI `Button` use **PixGamer** (pixel font, loaded via `@font-face` in `MuiCssBaseline`).
- Body / `p` uses **IBM Plex Sans Condensed** (`@fontsource`).
- Palette: `primary #F23CFF` (pink), `secondary #8000FF` (purple), background `#F0F0F0`.
- Inputs (`MuiOutlinedInput`) are white, 10px radius, PixGamer 18px — use plain `<TextField>` and you get this.
- `MuiModal` is globally flex-centered.
- Use `<Typography variant="h1" component="h1">` for page titles; don't set font families inline unless replicating an existing pattern (e.g. the PixGamer "N results" counter).

## Colors & buttons

- Brand colors live in `ButtonColor` enum (`src/enums.ts`): `Pink/PinkHover`, `Purple/PurpleHover`, `LightningDefault/Hover/Active`, `ReportDefault/Hover`. Add new ones there rather than inlining hex.
- Other recurring hex: text grey `#6B7280`, separator `#DEDEDE`.
- **Buttons = `ButtonUniversal`** (`title`, `color`, `hoverColor`, `textColor`, `actionDelegate`, optional `icon` + `side={ButtonSide.Left|Right}`, `fullWidth`, `type`, `layout`). Primary CTA: Pink bg + white text. Active filter chip: Purple; inactive: White/Grey + black text.
- Separators: `<HrGreyCustomSeparator marginTop=".." marginBottom=".." />`.
- Loading: `<Pwnspinner color="#8000FF" speed={0.7} thickness={2} />`.

## Layout

- `App.tsx` wraps everything in a centered `Grid item xs={10} md={11} lg={7}`; pages render inside it.
- Public pages end with `<Footer />`.
- Dashboard (`AD*`) pages: `Grid container` → left `Grid item xs={3}` with `<ADMenu />` (hidden on phone) + right `Grid item md={9} xs={12}` with content; on phone render `<ADMenu />` at the bottom (fixed bottom bar).
- Tile grids use `Grid xs={12} sm={4}` with the `dynamicPadding(index)` helper (3 columns, 24px vertical gap) — copy it from `MerchantsMap.tsx` if needed.
- Use MUI `sx` for styling. `stylesForm.ts` holds shared modal styles (`modalContainerStyle`, `modalTitleStyle`, `closeIconStyle`, `cardStyle`).

## Responsive

```tsx
const theme = useTheme();
const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
```

Phone variants are common: map moves above the list (80vw × 30vh), the selected merchant opens as a bottom-sheet `Modal` with `CardSpot` instead of `TileMerchantBig`, dashboard menu becomes a bottom bar. Always verify both layouts.

## Modals / forms

- Pattern: page holds `open` state → `<Modal open onClose>` → `<Box>` → `Form{Add,Edit}X` shell (title + close icon, `modalContainerStyle`) → `ModifFormX` (fields + submit logic).
- `ModifFormX` uses a discriminated-union props type: `{ edit: true; entity; documentid }` vs add mode.
- Inputs are uncontrolled (`useRef<HTMLInputElement>`), tags/socials/files are state.
- Feedback to the user is via `alert()` / `window.confirm()` today; after successful mutations the code does `window.location.reload()`.

## Images

- Imported assets (`src/icons`, `src/img`) via `import x from "../icons/x.png"`.
- Backend-hosted images: `getBackendImageUrl(fileName, apiBaseUrl, "merchant" | "eshop")`. Fallbacks when missing: `/dummy-merchant.png`, `/dummy-eshop.png` (in `public/`).
- Map markers: `LeafletMapTwo` builds `L.divIcon`s with inline HTML (pin png + name pill); selected = purple.
