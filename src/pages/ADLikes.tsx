import React, { useEffect, useState } from "react";
// Components
import ADMenu from "../components/ADMenu";
//Firebase
//import { collection, getDocs } from "firebase/firestore";
//import { db } from "../components/Firebase";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// TypeScript
import ILike from "../ts/ILike";
//
import dummyLikes from '../dummy/likes.json';

const ADLikes: React.FC = () => {
    // Phone detection
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const [likes, setLikes] = useState<ILike[]>([]);

    useEffect(() => {
        /*
        const fetchLikes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "likes"));
                const fetchedLikes: ILike[] = querySnapshot.docs.map(doc => ({
                    userid: doc.data().userid,
                    vendorid: doc.data().vendorid,
                    timestamp: doc.data().timestamp instanceof Object
                        ? doc.data().timestamp.seconds * 1000  // Convert Firestore Timestamp
                        : doc.data().timestamp || 0, // Raw number fallback
                }));
                setLikes(fetchedLikes);
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
        */
        //setLikes(dummyLikes as ILike[]);
    }, []);

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
                                        <TableCell><b>Timestamp</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {likes.map((like, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{like.id}</TableCell>
                                            <TableCell>{like.entityId}</TableCell>
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
