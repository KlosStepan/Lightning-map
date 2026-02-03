import React, { useEffect, useState } from "react";
// Components
import ADMenu from "../components/ADMenu";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
// TypeScript
import IReport from "../ts/IReport";
import IEshop from "../ts/IEshop";
import IMerchant from "../ts/IMerchant";

type ADReportsProps = {
    //
};

const ADReports: React.FC<ADReportsProps> = () => {
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    //
    const [reports, setReports] = useState<IReport[]>([]);
    const [merchants, setMerchants] = useState<IMerchant[]>([]);
    const [eshops, setEshops] = useState<IEshop[]>([]);
    //
    useEffect(() => {
        /*const fetchReports = async () => {
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
        };*/
        //fetchReports();
        const fetchAll = async () => {
            try {
                const [reportsRes, merchantsRes, eshopsRes] = await Promise.all([
                    fetch(`${apiBaseUrl}/reports`),
                    fetch(`${apiBaseUrl}/merchants`),
                    fetch(`${apiBaseUrl}/eshops`),
                ]);
                if (!reportsRes.ok || !merchantsRes.ok || !eshopsRes.ok) throw new Error("Failed to fetch data");
                const reportsData = await reportsRes.json();
                const merchantsData = await merchantsRes.json();
                const eshopsData = await eshopsRes.json();
                setReports(reportsData.map((r: any) => ({
                    id: r.id,
                    vendorid: r.entityId,
                    userid: r.owner,
                    entityType: r.entityType,
                    reason: r.reason,
                    timestamp: r.createdAt,
                    report: r.reason,
                })));
                setMerchants(merchantsData);
                setEshops(eshopsData);
            } catch (error) {
                console.error("Error fetching reports/merchants/eshops:", error);
            }
        };
        fetchAll();
    }, [apiBaseUrl]);

    // Lookup maps
    const merchantMap = React.useMemo(() => new Map(merchants.map(m => [m.properties.id, m.properties.name])), [merchants]);
    const eshopMap = React.useMemo(() => new Map(eshops.map(e => [e.id, e.name])), [eshops]);
    const getVendorName = (vendorid: string, entityType: string) => {
        if (entityType === "merchant") return merchantMap.get(vendorid) || vendorid;
        if (entityType === "eshop") return eshopMap.get(vendorid) || vendorid;
        return vendorid;
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
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Reports ( ! ) &nbsp; Listing
                                </Typography>
                            </Grid>
                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Vendor name</b></TableCell>
                                        <TableCell><b>User ID</b></TableCell>
                                        <TableCell><b>Type</b></TableCell>
                                        <TableCell><b>Timestamp vv</b></TableCell>
                                        <TableCell><b>Report</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...reports]
                                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                                        .map((report, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{getVendorName(report.vendorid, report.entityType)}</TableCell>
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
            {/* Menu down - for phone */}
            {isPhone && <ADMenu />}
        </React.Fragment>
    );
};

export default ADReports;