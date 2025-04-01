import React, { useEffect, useState } from "react";
// Components
import ADMenu from "../components/ADMenu";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// TypeScript
interface ILike {
    userid: string;
    vendorid: string;
    timestamp: number;
}

const ADLikes: React.FC = () => {
    // Phone detection
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const [likes, setLikes] = useState<ILike[]>([]);

    useEffect(() => {
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
    }, []);

    return (
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
                                        <TableCell>{like.userid}</TableCell>
                                        <TableCell>{like.vendorid}</TableCell>
                                        <TableCell>{new Date(like.timestamp).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ADLikes;
