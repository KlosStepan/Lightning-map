import React, { useEffect, useState } from "react";
// Components
import ADMenu from "../components/ADMenu";
//Redux+RTK
import { useSelector } from "react-redux";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// TypeScript
import ILike from "../ts/ILike";
import { RootState } from "../redux-rtk/store";
//
import dummyLikes from '../dummy/likes.json';

const ADLikes: React.FC = () => {
    // Phone detection
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);

    const [likes, setLikes] = useState<ILike[]>([]);

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
        fetchLikes();
    }, [apiBaseUrl]);

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
                            Likes (🗲) - Listing
                        </Typography>
                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>User ID</b></TableCell>
                                        <TableCell><b>Vendor ID</b></TableCell>
                                        <TableCell><b>Type</b></TableCell>
                                        <TableCell><b>Timestamp</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {likes.map((like, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{like.owner}</TableCell>
                                            <TableCell>{like.entityId}</TableCell>
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
