import React, { useEffect, useState } from "react";
//Components
import ADMenu from "../components/ADMenu";
//MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
//Redux+RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
//TypeScript
import ILike from "../ts/ILike";
import IEshop from "../ts/IEshop";
import IMerchant from "../ts/IMerchant";

type ADLikesProps = {
//
};

const ADLikes: React.FC<ADLikesProps> = () => {
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const [likes, setLikes] = useState<ILike[]>([]);
    const [merchants, setMerchants] = useState<IMerchant[]>([]);
    const [eshops, setEshops] = useState<IEshop[]>([]);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const res = await fetch(`${apiBaseUrl}/likes`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch likes");
                const data = await res.json();
                setLikes(data.map((l: any) => ({
                    id: l.id,
                    owner: l.owner,
                    entityId: l.entityId,
                    entityType: l.entityType,
                    createdAt: l.createdAt,
                })));
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };
        //fetchLikes();
        const fetchAll = async () => {
            try {
                const [likesRes, merchantsRes, eshopsRes] = await Promise.all([
                    fetch(`${apiBaseUrl}/likes`),
                    fetch(`${apiBaseUrl}/merchants`),
                    fetch(`${apiBaseUrl}/eshops`),
                ]);
                if (!likesRes.ok || !merchantsRes.ok || !eshopsRes.ok) throw new Error("Failed to fetch data");
                const likesData = await likesRes.json();
                const merchantsData = await merchantsRes.json();
                const eshopsData = await eshopsRes.json();
                setLikes(likesData.map((l: any) => ({
                    id: l.id,
                    owner: l.owner,
                    entityId: l.entityId,
                    entityType: l.entityType,
                    createdAt: l.createdAt,
                })));
                setMerchants(merchantsData);
                setEshops(eshopsData);
            } catch (error) {
                console.error("Error fetching likes/merchants/eshops:", error);
            }
        };
        fetchAll();
    }, [apiBaseUrl]);

    // Lookup maps
    const merchantMap = React.useMemo(() => new Map(merchants.map(m => [m.properties.id, m.properties.name])), [merchants]);
    const eshopMap = React.useMemo(() => new Map(eshops.map(e => [e.id, e.name])), [eshops]);
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
                                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
