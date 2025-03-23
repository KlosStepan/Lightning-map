import React, { useEffect, useState } from "react";
//MUI
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
//Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
import TileTypeMerchant from '../components/TileTypeMerchant';
//TypeScript
import IReport from "../ts/IReport";

type ADReportsProps = {
//
};

const ADReports: React.FC<ADReportsProps> = ({ }) => {
    //Phone detection 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
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
                            {/*<Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal title="Edit" color="#F23CFF" textColor="white" actionDelegate={()=>{}} />
                            </Grid>*/}
                        </Grid>
                        <div>-list of reports by users-</div>
                    </Box>
                </Grid>
            </Grid>
            {/* <span>ADApproveNewEntries.tsx</span> */}
        </React.Fragment>     
    )
}
export default ADReports