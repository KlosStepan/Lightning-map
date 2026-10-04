---
name: new-page
description: Add a new route/page to Lightning Everywhere — public page or protected /admin dashboard page — wired into App.tsx routes, top menu or ADMenu, following the project's layout conventions.
argument-hint: "<PageName> [public|admin] [/path]"
---

# Add a page

Arguments: `$ARGUMENTS` (page name, `public` or `admin`, URL path). Ask only if the kind is genuinely ambiguous.

## 1. Create the file in `src/pages/`

- Public: `src/pages/<Name>.tsx`. Admin: `src/pages/AD<Name>.tsx`.
- Follow `.claude/rules/code-style.md` (import groups, `type XProps`, `React.FC`, default export).

### Public page template

```tsx
import React from "react";
// Components
import Footer from "../components/Footer";
// MUI
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

type <Name>Props = {
    //
};

const <Name>: React.FC<<Name>Props> = () => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <React.Fragment>
            <Box sx={{ py: 3 }}>
                <Typography variant="h1" component="h1">
                    Title
                </Typography>
                {/* content */}
            </Box>
            <Footer />
        </React.Fragment>
    );
};

export default <Name>;
```

### Admin page template (copy structure from `src/pages/ADManageUsers.tsx`)

```tsx
import React from "react";
// Components
import ADMenu from "../components/ADMenu";
// MUI
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";

type AD<Name>Props = {
    //
};

const AD<Name>: React.FC<AD<Name>Props> = () => {
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const user = useSelector((state: RootState) => state.misc.user);
    // Phone detection
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <React.Fragment>
            <Grid container>
                {!isPhone && (
                    <Grid item xs={3}>
                        <Box sx={{ padding: 2 }}>
                            <ADMenu />
                        </Box>
                    </Grid>
                )}
                <Grid item md={9} xs={12}>
                    <Box sx={{ padding: 3 }}>
                        <Typography variant="h1" component="h1">
                            Title
                        </Typography>
                        {/* content */}
                    </Box>
                </Grid>
            </Grid>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu />}
        </React.Fragment>
    );
};

export default AD<Name>;
```

## 2. Register the route in `src/App.tsx`

- Import under the matching comment group (`// Pages`, `// Pages - AD`, `// Pages - AD | Admin`).
- Public: `<Route path="/my-path" element={<Name />} />`.
- Admin: `<Route path="/admin/my-path" element={<ProtectedRoute> <AD<Name> /> </ProtectedRoute>} />` — **every `/admin/*` route must be wrapped in `ProtectedRoute`**.
- Paths are kebab-case.

## 3. Navigation

- Public top menu: add `{ title, link }` to the `pages: ILink[]` array in `App.tsx` (`MenuHeader` renders it on desktop and mobile).
- Dashboard: add `{ icon, title, path }` to `menuLinks` (user) or `menuAdminLinks` (admin) in `src/components/ADMenu.tsx`. Icons are 24px PNGs in `src/icons/ad-*.png`.

## 4. Data

If the page needs backend data, read `.claude/rules/backend-api.md` and use the `api-integration` skill. Prefer existing Redux data (`state.data.*`) over refetching when it's already loaded by `fetchAll`.

## 5. Verify

Run the `verify` skill. Check the page at desktop and phone widths (`npm start`, `/map`-style responsive split).
