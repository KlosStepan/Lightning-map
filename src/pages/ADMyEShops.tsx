import React, { useEffect, useMemo, useState } from "react";
//Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
import TileAddedEshop from "../components/TileAddedEshop";
//enums
import { ButtonColor, ButtonSide } from "../enums";
//Firebase
//import { Firestore, QuerySnapshot, DocumentData, collection, getDocs, query, where } from "firebase/firestore";
//import { db } from "../components/Firebase";
//Forms
import FormAddEshop from "../forms/FormAddEshop";
//MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import Modal from "@mui/material/Modal";
//Redux+RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setUserEshops } from "../redux-rtk/miscSlice";
//TypeScript
import IEshop from "../ts/IEshop";
import { IEshopADWrapper } from "../ts/IEshop";

//Icons
import IconPlus from '../icons/ico-btn-plus.png';
//
import dummyEshops from '../dummy/eshops.json';
//
type ADMyEShopsProps = {
    //
};

const ADMyEShops: React.FC<ADMyEShopsProps> = () => {
    const dispatch = useDispatch();

    //State
    const user = useSelector((state: RootState) => state.misc.user);
    //let uid = user?.uid
    let uid = 9999; //TODO remove
    //
    const myEshops = useSelector((state: RootState) => state.misc.userEshops);
    //const likes = useSelector((state:RootState) => state.data.likes) ?? [];
    const rawLikes = useSelector((state: RootState) => state.data.likes);
    const likes = useMemo(() => rawLikes ?? [], [rawLikes]);
    //
    const [likeCountsMap, setLikeCountsMap] = useState(new Map());
    //Debug
    const debug = useSelector((state: RootState) => state.misc.debug);
    if (debug) {
        console.log("cnt(myMerchants): " + myEshops?.length);
    }
    //Functions for Eshops
    const FuncAddEshop = (): Promise<void> => {
        console.log("AddEshop")
        handleOpen()
        return Promise.resolve();
    }
    useEffect(() => {
        /*
        if (!uid) return; // Ensure uid is available before querying
    
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
        getEshops(db);
        //
        const newMap = new Map();
        likes.forEach(({ vendorid }) => {
            newMap.set(vendorid, (newMap.get(vendorid) || 0) + 1);
        });
        setLikeCountsMap(newMap); 
        */
        // Load from dummy JSON instead of Firebase
        const eshopsList = (dummyEshops as IEshop[]).map(eshop => ({
            documentid: eshop.id,
            eshop
        }));
        dispatch(setUserEshops(eshopsList));

        // Likes mapping logic remains unchanged
        const newMap = new Map();
        likes.forEach(({ entityId }) => {
            newMap.set(entityId, (newMap.get(entityId) || 0) + 1);
        });
        setLikeCountsMap(newMap);
    }, [uid, likes, dispatch]);
    //Function for dynamicPadding(index)
    const dynamicPadding = (index: number) => {
        const spaceBetween = 8; // Up and Down space
        const spaceTile = 8; // Between tiles space
        switch (index % 6) {
            case 0:
                return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px 0px !important` }; // Left-most tile
            case 5:
                return { padding: `${spaceBetween}px 0px ${spaceBetween}px ${spaceTile}px !important` }; // Right-most tile
            default:
                return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px ${spaceTile}px !important` }; // Middle tiles
        }
    };
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
                <Grid item md={9} xs={12}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Added {isPhone?"":"e-shops"}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal
                                    icon={IconPlus}
                                    side={ButtonSide.Left}
                                    title={isPhone?"Add":"Add e-shop"}
                                    color={ButtonColor.Pink}
                                    //color="#F23CFF"
                                    hoverColor={ButtonColor.PinkHover}
                                    //hoverColor="#DA16E3"
                                    textColor="white"
                                    actionDelegate={FuncAddEshop}
                                />
                            </Grid>
                        </Grid>
                        <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer', color: '#6B7280', paddingBottom:'2px' }}>
                            {/*eshops?.length ? eshops?.length : 'X'*/} {/*results*/}
                        </p>
                        <Grid container spacing={2} sx={{ marginRight: 0, marginLeft: 0 }}>
                        {myEshops?.map((eshop: IEshopADWrapper, index) => (
                            <Grid xs={12} sm={4} key={index} sx={isPhone ? {} : { ...dynamicPadding(index) }}>  {/* Apply padding only if not on a phone*/}
                                <TileAddedEshop likes={likeCountsMap.get(eshop.eshop.id) || 0} eshop={eshop} />
                            </Grid>
                        ))}
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <Box>
                    <FormAddEshop closeModal={handleClose}/>
                </Box>
            </Modal>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADMyEShops;