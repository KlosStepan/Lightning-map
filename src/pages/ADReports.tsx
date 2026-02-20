////typescript
// filepath: /home/stepo/projects/Lightning-map/src/pages/ADReports.tsx
import React, { useEffect } from "react";
// Components
import ADMenu from "../components/ADMenu";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
// Hooks
import { useFetchAll, useFetchReports } from "../hooks";
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

    const { fetchAll } = useFetchAll();
    const { reports, loadingReports, reportsError, fetchReports } = useFetchReports();

    // Merchants / eshops from Redux
    const merchants = useSelector((state: RootState) => state.data.merchants) ?? [];
    const eshops = useSelector((state: RootState) => state.data.eshops) ?? [];

    useEffect(() => {
        if (!apiBaseUrl) return;

        fetchAll().catch((err: unknown) => {
            console.error("[ADReports] fetchAll failed:", err);
        });
        fetchReports().catch((err: unknown) => {
            console.error("[ADReports] fetchReports failed:", err);
        });
    }, [apiBaseUrl]);

    // Lookup maps (based on Redux data)
    const merchantMap = React.useMemo(
        () => new Map(merchants.map((m: IMerchant) => [m.properties.id, m.properties.name])),
        [merchants]
    );
    const eshopMap = React.useMemo(
        () => new Map(eshops.map((e: IEshop) => [e.id, e.name])),
        [eshops]
    );

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
                        </Grid>

                        {reportsError && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {reportsError}
                            </Typography>
                        )}

                        <TableContainer
                            component={Paper}
                            sx={{ marginTop: 2, opacity: loadingReports ? 0.6 : 1 }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>User ID</b></TableCell>
                                        <TableCell><b>Vendor name</b></TableCell>
                                        <TableCell><b>Type</b></TableCell>
                                        <TableCell><b>Reason</b></TableCell>
                                        <TableCell><b>Timestamp</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...reports]
                                        .sort(
                                            (a: IReport, b: IReport) =>
                                                new Date(b.timestamp).getTime() -
                                                new Date(a.timestamp).getTime()
                                        )
                                        .map((r, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{r.userid}</TableCell>
                                                <TableCell>{getVendorName(r.vendorid, r.entityType)}</TableCell>
                                                <TableCell>{r.entityType}</TableCell>
                                                <TableCell>{r.reason}</TableCell>
                                                <TableCell>{new Date(r.timestamp).toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu />}
        </React.Fragment>
    );
};

export default ADReports;