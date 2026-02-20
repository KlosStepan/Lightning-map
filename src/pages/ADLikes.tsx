////typescript
// filepath: /home/stepo/projects/Lightning-map/src/pages/ADLikes.tsx
import React, { useEffect, useState } from "react";
// Components
import ADMenu from "../components/ADMenu";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
// Hooks
import { useFetchAll } from "../hooks";
// TypeScript
import ILike from "../ts/ILike";
import IEshop from "../ts/IEshop";
import IMerchant from "../ts/IMerchant";

type ADLikesProps = {
//
};

const ADLikes: React.FC<ADLikesProps> = () => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const { fetchAll } = useFetchAll();

    // Read from Redux instead of local fetch
    const likes = useSelector((state: RootState) => state.data.likes) ?? [];
    const merchants = useSelector((state: RootState) => state.data.merchants) ?? [];
    const eshops = useSelector((state: RootState) => state.data.eshops) ?? [];

    useEffect(() => {
    fetchAll().catch((err: unknown) => {
        console.error("[ADLikes] fetchAll failed:", err);
    });
    }, [fetchAll]);

    // Lookup maps
    const merchantMap = React.useMemo(
        () => new Map(merchants.map((m: IMerchant) => [m.properties.id, m.properties.name])),
        [merchants]
    );
    const eshopMap = React.useMemo(
        () => new Map(eshops.map((e: IEshop) => [e.id, e.name])),
        [eshops]
    );

    const getVendorName = (entityId: string, entityType: string) => {
        if (entityType === "merchant") return merchantMap.get(entityId) || entityId;
        if (entityType === "eshop") return eshopMap.get(entityId) || entityId;
        return entityId;
    };

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
                            Likes (🗲) &nbsp; Listing
                        </Typography>
                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>User ID</b></TableCell>
                                        <TableCell><b>Vendor name</b></TableCell>
                                        <TableCell><b>Type</b></TableCell>
                                        <TableCell><b>Timestamp vv</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...likes]
                                        .sort(
                                            (a: ILike, b: ILike) =>
                                                new Date(b.createdAt).getTime() -
                                                new Date(a.createdAt).getTime()
                                        )
                                        .map((like, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{like.owner}</TableCell>
                                                <TableCell>{getVendorName(like.entityId, like.entityType)}</TableCell>
                                                <TableCell>{like.entityType}</TableCell>
                                                <TableCell>{new Date(like.createdAt).toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADLikes;