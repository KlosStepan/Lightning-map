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
import { setUserMerchants, setUserEshops } from "../redux-rtk/miscSlice";
//TypeScript
import IEshop from "../ts/IEshop";
import { IEshopADWrapper } from "../ts/IEshop";
import IMerchant from "../ts/IMerchant";
import { IMerchantADWrapper } from "../ts/IMerchant";
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
    let uid = 9999; //TODO remove
    const myMerchants = useSelector((state: RootState) => state.misc.userMerchants);
    const myEshops = useSelector((state: RootState) => state.misc.userEshops);
    //Data slicing
    //const myMerchants = merchants?.filter((merchant) => merchant.properties.owner === uid);
    //const myEshops = eshops?.filter((eshop) => eshop.owner === uid);
    //Debug
    const debug = useSelector((state: RootState) => state.misc.debug);
    if (debug) {
        console.log("cnt(myMerchants): " + myMerchants?.length)
        console.log("cnt(myEshops): " + myEshops?.length)
    }
    useEffect(() => {
        /*
        if (!uid) return; // Ensure uid is available before querying
    
        const getMerchants = async (db: Firestore) => {
            const merchantsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
                query(
                    collection(db, 'merchants'),
                    where('properties.owner', '==', uid) // Filter by owner only
                )
            );
            const merchantsList: IMerchantADWrapper[] = merchantsSnapshot.docs.map((doc) => ({
                documentid: doc.id,
                merchant: doc.data() as IMerchant
            }));
            dispatch(setUserMerchants(merchantsList));
        };
    
        const getEshops = async (db: Firestore) => {
            const eshopsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
                query(
                    collection(db, 'eshops'),
                    where('owner', '==', uid) // Filter by owner only
                )
            );
            const eshopsList: IEshopADWrapper[] = eshopsSnapshot.docs.map((doc) => ({
                documentid: doc.id,
                eshop: doc.data() as IEshop
            }));
            dispatch(setUserEshops(eshopsList));
        };
    
        getMerchants(db);
        getEshops(db);
        */
    }, [uid, dispatch]); // Re-run when `uid` changes
    
    
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
                                    Welcome back
                                </Typography>
                                <Typography variant="h1" component="h1">
                                    {/* user?.displayName */}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <ButtonUniversal
                                    title="+ Add"
                                    color={ButtonColor.Purple}
                                    //color="#F23CFF"
                                    hoverColor={ButtonColor.PurpleHover}
                                    //hoverColor="#DA16E3"
                                    textColor="white"
                                    actionDelegate={FuncAdd}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                        {items.map((item, index) => (
                            <Grid item md={4} xs={6} key={index}>
                                <Box sx={{ border: '1px solid #ddd', /*padding: 2,*/ height: '100%' }}>
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
