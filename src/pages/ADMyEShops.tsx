import React, { useEffect, useState } from "react";
//MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import Modal from "@mui/material/Modal";
//Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
import TileAddedEshop from "../components/TileAddedEshop";
//Firebase
import { Firestore, QuerySnapshot, DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../components/Firebase";
//Forms
import FormAddEshop from "../forms/FormAddEshop";
//TypeScript
import IEshop from "../ts/IEeshop";
//Redux+RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setUserMerchants, setUserEshops } from "../redux-rtk/miscSlice";
//Icons
import IconPlus from '../icons/ico-btn-plus.png';

type ADMyEShopsProps = {
    //
};

const ADMyEShops: React.FC<ADMyEShopsProps> = ({ }) => {
    const dispatch = useDispatch();

    //State
    const user = useSelector((state: RootState) => state.misc.user);
    let uid = user?.uid
    const myEshops = useSelector((state: RootState) => state.misc.userEshops);

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
        if (!uid) return; // Ensure uid is available before querying

        const getEshops = async (db: Firestore) => {
            const eshopsCZSnapshot: QuerySnapshot<DocumentData> = await getDocs(
                query(
                    collection(db, 'eshops'),
                    where('owner', '==', uid) // Filter by owner only
                )
            );
            const listsEshopsCZ = eshopsCZSnapshot.docs.map((doc: DocumentData) => doc.data());
            dispatch(setUserEshops(listsEshopsCZ));
        };
        getEshops(db); 
    }, [uid])
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
                                <ButtonUniversal icon={IconPlus} side="L" title={isPhone?"Add":"Add e-shop"} color="#F23CFF" textColor="white" actionDelegate={FuncAddEshop} />
                            </Grid>
                        </Grid>
                        <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer', color: '#6B7280', paddingBottom:'2px' }}>
                            {/*eshops?.length ? eshops?.length : 'X'*/} {/*results*/}
                        </p>
                        <Grid container spacing={2} sx={{ marginRight: 0, marginLeft: 0 }}>
                        {myEshops?.map((eshop: IEshop, index) => (
                            <Grid xs={12} sm={4} key={index} sx={isPhone ? {} : { ...dynamicPadding(index) }}>  {/* Apply padding only if not on a phone*/}
                                <TileAddedEshop likes="7" tile={eshop} />
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
    )
}

export default ADMyEShops;