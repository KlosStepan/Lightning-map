////typescript
// filepath: /home/stepo/projects/Lightning-map/src/pages/ADMyEshops.tsx
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
import Tooltip from "@mui/material/Tooltip";
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

    // NEW: compute whether user reached cap
    const maxEshops = user?.maxEshops; // undefined => no limit
    const currentEshopsCount = myEshops?.length ?? 0;
    const hasReachedEshopLimit =
        typeof maxEshops === "number" && currentEshopsCount >= maxEshops;

    if (DEBUG) {
        console.log("cnt(myEshops): " + myEshops?.length, "maxEshops:", maxEshops);
    }

    //Functions for Eshops
    const FuncAddEshop = (): Promise<void> => {
        console.log("AddEshop");
        if (hasReachedEshopLimit) {
            alert(
              `You reached the maximum number of e-shops (${maxEshops}). ` +
              `Please contact support if you need a higher limit.`
            );
            return Promise.resolve();
        }
        handleOpen();
        return Promise.resolve();
    };

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
                    <Box sx={{ padding: 2 }}>
                        <ADMenu />
                    </Box>
                </Grid>}
                {/* Main Content */}
                <Grid item md={9} xs={12}>
                    <Box sx={{ padding: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Tooltip
                                    arrow
                                    title={
                                        <span style={{ fontSize: "0.8rem" }}>
                                            Hit {" "}
                                            <b>{maxEshops ?? "your current"}</b>{" "}
                                            e‑shops limit? This is a safety cap to prevent abuse.
                                            <br />
                                            <br />
                                            For higher limits, please contact{" "}
                                            <b>stepan(at)lightningeverywhere.com</b>.
                                            <br />
                                            Thank you for understanding.
                                        </span>
                                    }
                                >
                                    <Typography
                                        variant="h1"
                                        component="h1"
                                        sx={{ cursor: "help" }}
                                    >
                                        Added {isPhone ? "" : "e-shops"}{" "}
                                        {typeof maxEshops === "number" && (
                                            <span
                                                style={{
                                                    fontSize: "0.8em",
                                                    color: "#6B7280",
                                                }}
                                            >
                                                (avail. limit {currentEshopsCount}/{maxEshops})
                                            </span>
                                        )}
                                    </Typography>
                                </Tooltip>
                                {/* REMOVE this extra div – it adds odd space */}
                                {/* <div>&nbsp;</div> */}
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal
                                    icon={IconPlus}
                                    side={ButtonSide.Left}
                                    title={isPhone ? "Add" : "Add e-shop"}
                                    color={ButtonColor.Pink}
                                    hoverColor={ButtonColor.PinkHover}
                                    textColor="white"
                                    actionDelegate={FuncAddEshop}
                                    disabled={hasReachedEshopLimit}
                                />
                            </Grid>
                        </Grid>

                        {/* Move the limit message OUTSIDE the tiles grid, but still under header */}
                        {hasReachedEshopLimit && (
                            <Typography sx={{ mt: 1, color: "#888" }}>
                                You have reached your e-shop limit ({maxEshops}).
                            </Typography>
                        )}

                        {/* Tiles grid */}
                        <Grid container spacing={2} sx={{ marginRight: 0, marginLeft: 0, mt: 1 }}>
                            {myEshops && myEshops.length > 0 ? (
                                myEshops.map((eshop: IEshopADWrapper, index: number) => (
                                    <Grid
                                        xs={12}
                                        sm={4}
                                        key={index}
                                        sx={isPhone ? {} : { ...dynamicPadding(index) }}
                                    >
                                        <TileAddedEshop
                                            likes={likeCountsMap.get(eshop.eshop.id) || 0}
                                            eshop={eshop}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h2"
                                        sx={{ color: "#888", textAlign: "center", mt: 4 }}
                                    >
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
                style={{ overflow: "scroll" }}
            >
                <Box>
                    <FormAddEshop closeModal={handleClose} />
                </Box>
            </Modal>
            {/* Menu Down - For phone */}
            {isPhone && <ADMenu />}
        </React.Fragment>
    );
};

export default ADMyEShops;