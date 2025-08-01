import React, { useEffect, useMemo, useState } from "react";
//Components
import ADMenu from "../components/ADMenu";
import TileAddedMerchant from "../components/TileAddedMerchant";
import ButtonUniversal from "../components/ButtonUniversal";
//enums
import { ButtonColor, ButtonSide } from "../enums";
//Firebase
import { Firestore, QuerySnapshot, DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../components/Firebase";
//Forms
import FormAddSpot from "../forms/FormAddSpot";
//MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import Modal from "@mui/material/Modal";
//Redux+RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setUserMerchants } from "../redux-rtk/miscSlice";
//TypeScript
import IMerchant from "../ts/IMerchant";
import { IMerchantADWrapper } from "../ts/IMerchant";

//Icons
import IconPlus from '../icons/ico-btn-plus.png';

type ADMyMerchantsProps = {
    //
};

const ADMyMerchants: React.FC<ADMyMerchantsProps> = () => {
    const dispatch = useDispatch();
    // State
    const user = useSelector((state: RootState) => state.misc.user)
    let uid = user?.uid
    //
    const myMerchants = useSelector((state: RootState) => state.misc.userMerchants);
    //const likes = useSelector((state: RootState) => state.data.likes) ?? [];
    const rawLikes = useSelector((state: RootState) => state.data.likes);
    const likes = useMemo(() => rawLikes ?? [], [rawLikes]);
    //
    const [likeCountsMap, setLikeCountsMap] = useState(new Map());
    // Debug
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    if (DEBUG) {
        console.log("cnt(myMerchants): " + myMerchants?.length)
    }
    // Functions for Merchants
    const FuncAddSpot = (): Promise<void> => {
        console.log("AddSpot")
        handleOpen();
        return Promise.resolve();
    }
    // useEffect
    useEffect(() => {
        if (!uid) return; // Ensure uid is available before querying
        //
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
        getMerchants(db);
        //
        const newMap = new Map();
        likes.forEach(({ vendorid }) => {
            newMap.set(vendorid, (newMap.get(vendorid) || 0) + 1);
        });
        setLikeCountsMap(newMap);
    }, [uid, likes, dispatch]);
    // Function for dynamicPadding(index)
    const dynamicPadding = (index: number) => {
        const paddingValue = 24; // Between tiles space
        switch (index % 3) {
          case 0:
            return { padding: `${paddingValue}px 8px ${paddingValue}px 0px !important` }; // Left tile
          case 1:
            return { padding: `${paddingValue}px 4px ${paddingValue}px 4px !important` }; // Middle tile
          case 2:
            return { padding: `${paddingValue}px 0px ${paddingValue}px 8px !important` }; // Right tile
          default:
            return { };
        }
    };
    // Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // Phone detection 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <React.Fragment>
            <Grid container>
                {/* Sidebar */}
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
                <Grid item md={9} xs={12}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Added spots
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal
                                    icon={IconPlus}
                                    side={ButtonSide.Left}
                                    title="Add spot"
                                    color={ButtonColor.Pink}
                                    //color="#F23CFF"
                                    hoverColor={ButtonColor.PinkHover}
                                    //hoverColor="#DA16E3"
                                    textColor="white"
                                    actionDelegate={FuncAddSpot}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            {myMerchants?.map((merchant: IMerchantADWrapper, index: number) => (
                            <Grid xs={12} sm={4} key={index} sx={{ ...dynamicPadding(index) }}>
                                <TileAddedMerchant likes={likeCountsMap.get(merchant.merchant.properties.id) || 0} merchant={merchant} />
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
                    <FormAddSpot closeModal={handleClose}/>
                </Box>
            </Modal>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADMyMerchants;