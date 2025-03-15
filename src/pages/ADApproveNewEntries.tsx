import React, { useEffect, useState } from "react";
//MUI
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import { Grid, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from '@mui/material';
//Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
import TileTypeMerchant from '../components/TileTypeMerchant';

type ADApproveNewEntriesProps = {
//
};

const ADApproveNewEntries: React.FC<ADApproveNewEntriesProps> = ({ }) => {
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
                                    Approve New Entries
                                </Typography>
                            </Grid>
                            {/*<Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal title="Edit" color="#F23CFF" textColor="white" actionDelegate={()=>{}} />
                            </Grid>*/}
                        </Grid>
                        <Grid>
                            <div>-list of places with <u>|0|</u>(on top) or <u>|1|</u> switch-</div>
                            <div>&nbsp;</div>
                        </Grid>
                        <Grid container spacing={2}>
                        {/* Left List: Spots */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h1" component="h1">Spots</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="🔴 Café Blue" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="🔴 Library Spot" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="🔴 Artisan Bakery" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="✅ Crypto Market" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="✅ Vegan Deli" />
                                </ListItem>
                            </List>
                        </Grid>

                        {/* Right List: E-Shops */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h1" component="h1">E-Shops</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="🔴 Green Groceries" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="🔴 Digital Bookstore" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="✅ Artisan Crafts" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="✅ Vegan Snacks" />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/* <span>ADApproveNewEntries.tsx</span> */}
        </React.Fragment>     
    )
}
export default ADApproveNewEntries