---
name: new-component
description: Create a reusable React component (tile, button variant, form, modal card) in Lightning Everywhere that matches the MUI theme, brand colors and file conventions. Use when adding UI pieces under src/components or src/forms.
argument-hint: "<ComponentName> [what it does]"
---

# Add a component

Arguments: `$ARGUMENTS`.

## 0. Reuse first

Check whether an existing piece already does it:

| Need | Use |
|---|---|
| Button / chip / CTA | `ButtonUniversal` + `ButtonColor` enum |
| Merchant card / big detail | `TileMerchant`, `TileMerchantBig`, phone: `forms/mobilecontentcards/CardSpot` |
| E-shop card | `TileEshop` |
| Owner's editable card | `TileAddedMerchant`, `TileAddedEshop` |
| Category tag toggle | `TagMerchant`; social link chip `TagSocialLink`; social input `ToggleSocialInput` |
| Divider | `HrGreyCustomSeparator` |
| Search input | `SearchBarVendors` |
| Image dropzone | `UploadingImagesSpot` (multi), `UplImgTile` |
| Map with markers | `LeafletMapTwo` |
| Modal frame | `modalContainerStyle` / `modalTitleStyle` / `closeIconStyle` from `forms/stylesForm.ts` |
| Spinner | `Pwnspinner` from `pwnspinner` |
| Avatar | `AvatarCircle` |

## 1. Where it goes

- Generic/presentational → `src/components/<Name>.tsx`.
- Form or modal with submit logic → `src/forms/`. Modal shell + logic split: `Form<Verb><Entity>.tsx` (title bar, close icon) wraps `ModifForm<Entity>.tsx` (fields + API).
- Dashboard-only → prefix `AD`.
- New icons/images → `src/icons/` or `src/img/` and import them; files served by URL → `public/`.

## 2. Template

```tsx
import React from "react";
// MUI
import { Box, Typography } from "@mui/material";
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
// TypeScript
import { IMerchantTile } from "../ts/IMerchant";

type <Name>Props = {
    tile: IMerchantTile;
    onSomething?: () => Promise<void> | void;
};

const <Name>: React.FC<<Name>Props> = ({ tile, onSomething }) => {
    const DEBUG = useSelector((state: RootState) => state.misc.debug);

    return (
        <Box sx={{ backgroundColor: "white", borderRadius: "20px", p: 2 }}>
            <Typography variant="h2" component="h2">{tile.name}</Typography>
        </Box>
    );
};

export default <Name>;
```

## 3. Styling checklist (`.claude/rules/ui-styling.md`)

- Colors from `ButtonColor` / theme palette; headings via Typography variants (PixGamer), body inherits IBM Plex Sans Condensed.
- Rounded white cards (`borderRadius: "20px"`) on the `#F0F0F0` background are the house look.
- Handle phone via `useMediaQuery(theme.breakpoints.down("sm"))`.
- Images from backend via `getBackendImageUrl(...)` with `/dummy-merchant.png` / `/dummy-eshop.png` fallback.

## 4. Optional: showcase

If it's a general-purpose UI primitive, consider adding an example to `src/pages/UIKit.tsx` (`/uikit`).

## 5. Verify

Run the `verify` skill.
