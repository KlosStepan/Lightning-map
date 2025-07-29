import React, { useEffect, useState } from "react";
//Components
import ADMenu from "../components/ADMenu";
// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase"; // Ensure you have Firebase configured properly
//MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
//TypeScript
import IReport from "../ts/IReport";

type ADReportsProps = {
//
};

const ADReports: React.FC<ADReportsProps> = () => {
    //Phone detection 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const [reports, setReports] = useState<IReport[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "reports"));
                const fetchedReports: IReport[] = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        vendorid: data.vendorid,
                        userid: data.userid,
                        timestamp: data.timestamp instanceof Object
                            ? data.timestamp.seconds * 1000  // Firestore Timestamp -> JS Date
                            : data.timestamp || 0, // Raw number fallback
                        report: data.report || "",
                    };
                });
                setReports(fetchedReports);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        

        fetchReports();
    }, []);
    return(
        <React.Fragment>
            <Grid container>
                {!isPhone && <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>}
                <Grid item md={9} xs={12}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Reports ( ! )  - listing
                                </Typography>
                            </Grid>
                        {/* MUI Table */}
                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Vendor ID</b></TableCell>
                                        <TableCell><b>User ID</b></TableCell>
                                        <TableCell><b>Timestamp</b></TableCell>
                                        <TableCell><b>Report</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reports.map((report, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{report.vendorid}</TableCell>
                                            <TableCell>{report.userid}</TableCell>
                                            <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                                            <TableCell>{report.report}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                            {/*<Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal
                                    title="Edit"
                                    color={ButtonColor.Pink}
                                    //color="#F23CFF"
                                    hoverColor={ButtonColor.PinkHover}
                                    //hoverColor="#DA16E3"
                                    textColor="white"
                                    actionDelegate={()=>{}}
                                />
                            </Grid>*/}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>     
    );
};

export default ADReports;