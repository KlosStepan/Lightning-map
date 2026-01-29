import React, { useEffect } from "react";
//MUI
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
//Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
import TileTypeMerchant from '../components/TileTypeMerchant';
//Firebase
//import { collection, DocumentData, Firestore, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
//import { db } from "../components/Firebase";
//Forms
import FormADAdd from "../forms/FormADAdd";
//Redux+RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setMerchants, setEshops, setLikes } from '../redux-rtk/dataSlice';
import { setUserMerchants, setUserEshops } from "../redux-rtk/miscSlice";
//TypeScript
import IEshop from "../ts/IEshop";
import { IEshopADWrapper } from "../ts/IEshop";
import IMerchant from "../ts/IMerchant";
import { IMerchantADWrapper } from "../ts/IMerchant";
import IUser from "../ts/IUser"
//Images
import mapofspotsimg from '../img/Interface-Essential-Map--Streamline-Pixel.png';
import eshopsimg from '../img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';
import { ButtonColor } from "../enums";

type ADHomeProps = {
    //
};

const ADHome: React.FC<ADHomeProps> = () => {
    const dispatch = useDispatch();

    //State
    const user = useSelector((state: RootState) => state.misc.user);
    //let uid = user?.uid
    //let uid = user?.id;
    const merchants = useSelector((state: RootState) => state.data.merchants);
    const eshops = useSelector((state: RootState) => state.data.eshops);
    //
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);

    // Direct access to Redux store
    const myMerchants = useSelector((state: RootState) => state.misc.userMerchants);
    const myEshops = useSelector((state: RootState) => state.misc.userEshops);

    //Debug
    const debug = useSelector((state: RootState) => state.misc.debug);
    if (debug) {
        console.log("cnt(myMerchants): " + myMerchants?.length)
        console.log("cnt(myEshops): " + myEshops?.length)
    }

    useEffect(() => {
        // Fetch data first
        const getMerchants = async () => {
            const res = await fetch(`${apiBaseUrl}/merchants`);
            const merchants = await res.json();
            dispatch(setMerchants(merchants));
            
            // Filter and convert merchants for the current user
            const filteredMerchants = merchants.filter((merchant: IMerchant) => 
                merchant.properties.owner === user?.id || 
                (Array.isArray(merchant.properties.editor) && merchant.properties.editor.includes(user?.id)) ||
                merchant.properties.editor === user?.id
            );
            
            // Convert to IMerchantADWrapper format
            const userMerchantsList = filteredMerchants.map((merchant: IMerchant) => ({
                documentid: merchant.properties.id,
                merchant
            }));
            
            // Update user's merchants in Redux
            dispatch(setUserMerchants(userMerchantsList));
        };
        
        const getEshops = async () => {
            const res = await fetch(`${apiBaseUrl}/eshops`);
            const eshops = await res.json();
            dispatch(setEshops(eshops));
            
            // Filter and convert eshops for the current user
            const filteredEshops = eshops.filter((eshop: IEshop) => 
                eshop.owner === user?.id || 
                (Array.isArray(eshop.editor) && eshop.editor.includes(user?.id)) ||
                eshop.editor === user?.id
            );
            
            // Convert to IEshopADWrapper format
            const userEshopsList = filteredEshops.map((eshop: IEshop) => ({
                documentid: eshop.id,
                eshop
            }));
            
            // Update user's eshops in Redux
            dispatch(setUserEshops(userEshopsList));
        };
        
        getMerchants();
        getEshops();
    }, [user, dispatch, apiBaseUrl]); // Include user as dependency
    
    
    //Functions
    const FuncAdd = (): Promise<void> => {
        //console.log("Add");
        handleOpen();
        return Promise.resolve();
    }
    const items = [
        { caption: "My spots", numPlaces: myMerchants?.length, imageSrc: mapofspotsimg, path: "/admin/my-spots" },
        { caption: "My e-shops", numPlaces: myEshops?.length, imageSrc: eshopsimg, path: "/admin/my-eshops" },
        //{ caption: "My stores", numPlaces: 5, imageSrc: eshops, path: "" },
        //{ caption: "My e-shops", numPlaces: 7, imageSrc: eshops, path: "" },
        //{ caption: "My stores", numPlaces: 5, imageSrc: eshops, path: "" },
      ];
    //Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //Phone detection 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    return (
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

                {/* Main Content */}
                <Grid item xs={12} md={9}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Typography variant="h1" component="h1">
                                    Welcome back { user?.firstName }
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                {/*<ButtonUniversal
                                    title="+ Add"
                                    color={ButtonColor.Purple}
                                    hoverColor={ButtonColor.PurpleHover}
                                    textColor="white"
                                    actionDelegate={FuncAdd}
                                />*/}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                        {items.map((item, index) => (
                            <Grid item md={4} xs={6} key={index}>
                                <Box sx={{ /* border: '1px solid #ddd', padding: 2,*/ height: '100%' }}>
                                    <TileTypeMerchant
                                    caption={item.caption}
                                    numPlaces={item.numPlaces || 0}
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
            {/* Modal - ESC Closable */}
            <Modal
                open={open}
                onClose={handleClose} // Ensures ESC works
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: 'scroll' }}
            >
                <Box>
                    <FormADAdd closeModal={handleClose} />
                </Box>
            </Modal>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};  

export default ADHome;
