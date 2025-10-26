import React, { useEffect, useState } from "react";
//Components
import ADMenu from "../components/ADMenu";
// Firebase
//import { collection, getDocs } from "firebase/firestore";
//import { db } from "../components/Firebase"; // Ensure you have Firebase configured properly
//Redux+RTK
import { useSelector } from "react-redux";
//MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
//TypeScript
import IReport from "../ts/IReport";
import { RootState } from "../redux-rtk/store";

type ADReportsProps = {
//
};

const ADReports: React.FC<ADReportsProps> = () => {
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const [reports, setReports] = useState<IReport[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch(`${apiBaseUrl}/reports`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch reports");
                const data = await res.json();
                // Map backend fields to IReport shape for table
                setReports(data.map((r: any) => ({
                    id: r.id,
                    vendorid: r.entityId,
                    userid: r.owner,
                    entityType: r.entityType,
                    reason: r.reason,
                    timestamp: r.createdAt,
                    report: r.reason, // for compatibility with old code
                })));
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchReports();
    }, [apiBaseUrl]);

    return (
        <React.Fragment>
            <Grid container>
                {!isPhone && <Grid item xs={3}>
                    <Box sx={{ padding: 2 }}>
                        <ADMenu />
                    </Box>
                </Grid>}
                <Grid item md={9} xs={12}>
                    <Box sx={{ padding: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Reports ( ! )  - listing
                                </Typography>
                            </Grid>
                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Vendor ID</b></TableCell>
                                        <TableCell><b>User ID</b></TableCell>
                                        <TableCell><b>Type</b></TableCell>
                                        <TableCell><b>Timestamp</b></TableCell>
                                        <TableCell><b>Report</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reports.map((report, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{report.vendorid}</TableCell>
                                            <TableCell>{report.userid}</TableCell>
                                            <TableCell>{report.entityType}</TableCell>
                                            <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                                            <TableCell>{report.reason}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADReports;