import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import ADMenu from "../components/ADMenu";
//import ADMenuButton from "../components/ADMenuButton";
import ButtonUniversal from "../components/ButtonUniversal";
import { auth, db } from "../components/Firebase";

import TileTypeMerchant from '../components/TileTypeMerchant';
//
import mapofspotsimg from '../img/Interface-Essential-Map--Streamline-Pixel.png';
import eshopsimg from '../img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';

//Redux
import { useDispatch, useSelector } from 'react-redux';
//
import { RootState } from "../redux-rtk/store";
// 4x icon
//import IcoADHome from '../icons/ad-home.png';
//import IcoADPin from '../icons/ad-pin.png';
//import IcoADShoppingBag from '../icons/ad-shopping-bag.png';
//import IcoADUser from '../icons/ad-user.png';

import Modal from "@mui/material/Modal";

type ADHomeProps = {

};

const ADHome: React.FC<ADHomeProps> = ({ }) => {
    // State
    const user = useSelector((state: RootState) => state.misc.user)
    const merchants = useSelector((state: RootState) => state.data.merchants)
    const eshops = useSelector((state: RootState) => state.data.eshops)

    // Data slicing
    let uid = user?.uid
    const myMerchants = merchants?.filter((merchant) => merchant.properties.owner === uid);
    const myEshops = eshops?.filter((eshop) => eshop.owner === uid);

    console.log("cnt(myMerchants): " + myMerchants?.length)
    console.log("cnt(myMerchants): " + myEshops?.length)

    const FuncAdd = (): Promise<void> => {
        console.log("Add");
        handleOpen();
        return Promise.resolve();
    }
    
    const items = [
        { caption: "My spots", numPlaces: myMerchants?.length, imageSrc: mapofspotsimg, path: "/admin/my-spots" },
        { caption: "My e-shops", numPlaces: myEshops?.length, imageSrc: eshopsimg, path: "/admin/my-eshops" },
        //{ caption: "My stores", numPlaces: 5, imageSrc: eshops, path: "" },
        //{ caption: "My e-shops", numPlaces: 7, imageSrc: eshops, path: "" },
        //{ caption: "My stores", numPlaces: 5, imageSrc: eshops, path: "" },
        // Add additional items here as needed
      ];
      
    //Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                    //imageSrc={"null"}
                                    path={item.path}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/*MODAL ZONE*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <span>FormADAdd: |E| |M|</span>
            </Modal>
        </React.Fragment>
    );
}

export default ADHome;
