---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Code style (src/)

Match the existing idiom — this is how every file in `src/` is written.

## Component file skeleton

```tsx
import React, { useState } from "react";
// Components
import ButtonUniversal from "../components/ButtonUniversal";
// enums
import { ButtonColor } from "../enums";
// MUI
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
// Redux + RTK
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
// Router
import { useNavigate } from "react-router-dom";
// TypeScript
import IMerchant from "../ts/IMerchant";
// Utils
import { getBackendImageUrl } from "../utils/image";
// Icons
import IconPlus from "../icons/ico-btn-plus.png";

type MyThingProps = {
    //
};

const MyThing: React.FC<MyThingProps> = ({}) => {
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    // ...hooks, state, handlers...
    return <React.Fragment>...</React.Fragment>;
};

export default MyThing;
```

- One component per file, **default export**, file name = component name (PascalCase).
- Props typed as `type XProps = { ... }` right above the component; empty props use the `//` placeholder comment.
- `React.FC<XProps>`; wrap multi-root output in `<React.Fragment>`.
- Imports grouped under comment headers (`// Components`, `// enums`, `// MUI`, `// Redux + RTK`, `// Router`, `// TypeScript`, `// Utils`, `// Icons`). Keep the order roughly as above.
- Relative imports only (no path aliases configured).

## Naming

- Pages for the dashboard are prefixed `AD` (`ADMyEshops.tsx`), their components too (`ADMenu`, `ADMenuButton`).
- Card components are `Tile*` (`TileMerchant`, `TileEshop`, `TileAddedMerchant` = owner's editable version).
- Callbacks passed to `ButtonUniversal.actionDelegate` / drilled to children: `Func<Verb>` (`FuncAddSpot`, `FuncFilt`, `FuncDrillIncrDecrLike`) returning `Promise<void>`.
- Async actions inside forms: PascalCase verbs (`AddSpot`, `UpdateSpot`, `UploadImage`, `WrapSpotData`).
- Interfaces live in `src/ts/I<Name>.ts`, default-export the main interface, `export type { ... }` for helpers.
- Unused vars must be prefixed `_` (ESLint `argsIgnorePattern/varsIgnorePattern: ^_`).

## Debug logging

```tsx
const DEBUG = useSelector((state: RootState) => state.misc.debug);
if (DEBUG) {
    console.log("<DEBUG> FileName.tsx");
    console.log("thing", thing);
    console.log("</DEBUG> FileName.tsx");
}
```

- Non-debug errors: `console.error("[ComponentName] what failed:", err)`.
- Debug-only UI (e.g. showing `documentid`) is gated with `{ DEBUG ? (...) : null }`.

## Formatting & lint

- Prettier: 4 spaces, double quotes, semicolons, trailing comma es5, width 100. Some older files use 2 spaces/single quotes — **match the file you are in**, never reformat untouched code.
- ESLint: `react-hooks/rules-of-hooks` is an error; `exhaustive-deps` warns — fix deps rather than disabling. Wrap fetchers passed to effects in `useCallback`.
- `any` is allowed but prefer domain types from `src/ts/`.
- TypeScript `strict` is on; keep `npx tsc --noEmit` clean.
- Don't leave large blocks of commented-out code in new work (older files have plenty; don't add more).
