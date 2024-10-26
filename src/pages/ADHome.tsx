import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import ADMenu from "../components/ADMenu";
//import ADMenuButton from "../components/ADMenuButton";
import ButtonUniversal from "../components/ButtonUniversal";

import TileTypeMerchant from '../components/TileTypeMerchant';
//
import mapofspots from '../img/Interface-Essential-Map--Streamline-Pixel.png';
import eshops from '../img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';

//Redux
import { useDispatch, useSelector } from 'react-redux';
//
import { RootState } from "../redux-rtk/store";
// 4x icon
//import IcoADHome from '../icons/ad-home.png';
//import IcoADPin from '../icons/ad-pin.png';
//import IcoADShoppingBag from '../icons/ad-shopping-bag.png';
//import IcoADUser from '../icons/ad-user.png';
type ADHomeProps = {

};

const ADHome: React.FC<ADHomeProps> = ({ }) => {
    //
    const user = useSelector((state: RootState) => state.misc.user)
    //
    const FuncAdd = (): Promise<void> => {
        console.log("Add")
        return Promise.resolve();
    }
    const items = [
        { caption: "My spots", numPlaces: 12, imageSrc: mapofspots, path: "" },
        { caption: "My e-shops", numPlaces: 7, imageSrc: eshops, path: "" },
        { caption: "My stores", numPlaces: 5, imageSrc: eshops, path: "" },
        { caption: "My e-shops", numPlaces: 7, imageSrc: eshops, path: "" },
        { caption: "My stores", numPlaces: 5, imageSrc: eshops, path: "" },
        // Add additional items here as needed
      ];
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
                                    {user?.displayName}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <ButtonUniversal title="+ Add" color="#F23CFF" textColor="white" actionDelegate={FuncAdd} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                        {items.map((item, index) => (
                            <Grid item xs={4} key={index}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    <TileTypeMerchant
                                    caption={item.caption}
                                    numPlaces={item.numPlaces}
                                    imageSrc={item.imageSrc}
                                    path={item.path}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ADHome;
