import React, { useEffect, useMemo, useState } from "react";
// Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
import TileAddedEshop from "../components/TileAddedEshop";
// enums
import { ButtonColor, ButtonSide } from "../enums";
// Forms
import FormAddEshop from "../forms/FormAddEshop";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import Modal from "@mui/material/Modal";
// Redux + RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setEshops } from '../redux-rtk/dataSlice';
import { setUserEshops } from "../redux-rtk/miscSlice";
// TypeScript
import IEshop from "../ts/IEshop";
import { IEshopADWrapper } from "../ts/IEshop";

// Icons
import IconPlus from '../icons/ico-btn-plus.png';

type ADMyEShopsProps = {
    //
};

const ADMyEShops: React.FC<ADMyEShopsProps> = () => {
    const dispatch = useDispatch();
    //
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const user = useSelector((state: RootState) => state.misc.user);
    //
    const myEshops = useSelector((state: RootState) => state.misc.userEshops);
    const rawLikes = useSelector((state: RootState) => state.data.likes);
    const likes = useMemo(() => rawLikes ?? [], [rawLikes]);
    //
    const [likeCountsMap, setLikeCountsMap] = useState(new Map());

    if (DEBUG) {
        console.log("cnt(myMerchants): " + myEshops?.length);
    }

    //Functions for Eshops
    const FuncAddEshop = (): Promise<void> => {
        console.log("AddEshop")
        handleOpen()
        return Promise.resolve();
    }

    useEffect(() => {
        const getEshops = async () => {
            const res = await fetch(`${apiBaseUrl}/eshops`);
            const data = await res.json();

            // Ensure we always work with an array
            const eshops: IEshop[] = Array.isArray(data) ? data : [];

            dispatch(setEshops(eshops));
            
            // Filter E-shops for the Current User
            const filteredEshops = eshops.filter((eshop: IEshop) => 
                eshop.owner === user?.id || 
                (Array.isArray(eshop.editor) && eshop.editor.includes(user?.id)) ||
                eshop.editor === user?.id
            );
            // Convert to IEshopADWrapper Format
            const userEshopsList = filteredEshops.map((eshop: IEshop) => ({
                documentid: eshop.id,
                eshop
            }));
            // Update User's E-shops in Redux
            dispatch(setUserEshops(userEshopsList));
        };
        getEshops();

        // Likes mapping logic remains unchanged
        const newMap = new Map();
        likes.forEach(({ entityId }) => {
            newMap.set(entityId, (newMap.get(entityId) || 0) + 1);
        });
        setLikeCountsMap(newMap);
    }, [apiBaseUrl, user?.id, likes, dispatch]);

    // Function for dynamicPadding(index) || TODO maybe fix/repolish
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
                                    Added {isPhone?"":"e-shops"}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal
                                    icon={IconPlus}
                                    side={ButtonSide.Left}
                                    title={isPhone?"Add":"Add e-shop"}
                                    color={ButtonColor.Pink}
                                    hoverColor={ButtonColor.PinkHover}
                                    textColor="white"
                                    actionDelegate={FuncAddEshop}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginRight: 0, marginLeft: 0 }}>
                            {myEshops && myEshops.length > 0 ? (
                                myEshops.map((eshop: IEshopADWrapper, index: number) => (
                                <Grid xs={12} sm={4} key={index} sx={isPhone ? {} : { ...dynamicPadding(index) }}>
                                    <TileAddedEshop likes={likeCountsMap.get(eshop.eshop.id) || 0} eshop={eshop} />
                                </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography variant="h2" sx={{ color: "#888", textAlign: "center", mt: 4 }}>
                                        No e-shops found
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
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
            {/* Menu Down - For phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADMyEShops;