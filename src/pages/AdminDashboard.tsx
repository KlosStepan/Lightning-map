import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import ADMenu from "../components/ADMenu";
//import ADMenuButton from "../components/ADMenuButton";
import ButtonUniversal from "../components/ButtonUniversal";

import TileTypeMerchant from '../components/TileTypeMerchant';
//
import mapofspots from '../img/Interface-Essential-Map--Streamline-Pixel.png';
import eshops from '../img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';


// 4x icon
//import IcoADHome from '../icons/ad-home.png';
//import IcoADPin from '../icons/ad-pin.png';
//import IcoADShoppingBag from '../icons/ad-shopping-bag.png';
//import IcoADUser from '../icons/ad-user.png';

function AdminDashboard() {
    const FuncAdd = (): Promise<void> => {
        console.log("Add")
        return Promise.resolve();
    }
    return (
        <React.Fragment>
            <Grid container>
                {/* Sidebar */}
                <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>

                {/* Main Content */}
                <Grid item xs={9}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Typography variant="h1" component="h1">
                                    Welcome back
                                </Typography>
                                <Typography variant="h1" component="h1">
                                    Stepan Klos
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <ButtonUniversal title="+ Add" color="#F23CFF" actionDelegate={FuncAdd} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    {/* First tile content */}
                                    <TileTypeMerchant caption="Map of Places" numPlaces="12" imageSrc={mapofspots} path="" />

                                </Box>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, marginTop: 2, height: '100%' }}>
                                    {/* Second tile content */}
                                    Tile 2
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    {/* Third tile content */}
                                    <TileTypeMerchant caption="E-shops" numPlaces="7" imageSrc={eshops} path="" />

                                </Box>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, marginTop: 2, height: '100%' }}>
                                    {/* Fourth tile content */}
                                    Tile 4
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    {/* Fifth tile content */}
                                    Tile 5
                                </Box>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, marginTop: 2, height: '100%' }}>
                                    {/* Sixth tile content */}
                                    Tile 6
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AdminDashboard;
