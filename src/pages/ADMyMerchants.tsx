////typescript
// filepath: /home/stepo/projects/Lightning-map/src/pages/ADMyMerchants.tsx
import React, { useEffect, useMemo, useState } from "react";
// Components
import ADMenu from "../components/ADMenu";
import TileAddedMerchant from "../components/TileAddedMerchant";
import ButtonUniversal from "../components/ButtonUniversal";
// enums
import { ButtonColor, ButtonSide } from "../enums";
// Forms
import FormAddSpot from "../forms/FormAddSpot";
// MUI
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
// Redux + RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setMerchants, } from '../redux-rtk/dataSlice';
import { setUserMerchants } from "../redux-rtk/miscSlice";
// TypeScript
import IMerchant from "../ts/IMerchant";
import { IMerchantADWrapper } from "../ts/IMerchant";

// Icons
import IconPlus from '../icons/ico-btn-plus.png';

type ADMyMerchantsProps = {
    //
};

const ADMyMerchants: React.FC<ADMyMerchantsProps> = () => {
    const dispatch = useDispatch();
    //
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const user = useSelector((state: RootState) => state.misc.user);
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    //
    const myMerchants = useSelector((state: RootState) => state.misc.userMerchants);
    const rawLikes = useSelector((state: RootState) => state.data.likes);
    const likes = useMemo(() => rawLikes ?? [], [rawLikes]);
    //
    const [likeCountsMap, setLikeCountsMap] = useState(new Map());
    
    // NEW: caps
    const maxMerchants = user?.maxMerchants;
    const currentMerchantsCount = myMerchants?.length ?? 0;
    const hasReachedMerchantLimit =
        typeof maxMerchants === "number" && currentMerchantsCount >= maxMerchants;

    if (DEBUG) {
        console.log("cnt(myMerchants): " + myMerchants?.length, "maxMerchants:", maxMerchants);
    }

    // Functions for Merchants
    const FuncAddSpot = (): Promise<void> => {
        console.log("AddSpot");
        if (hasReachedMerchantLimit) {
            alert(
              `You reached the maximum number of spots/merchants (${maxMerchants}). ` +
              `Please contact support if you need a higher limit.`
            );
            return Promise.resolve();
        }
        handleOpen();
        return Promise.resolve();
    }

    useEffect(() => {
        const getMerchants = async () => {
            const res = await fetch(`${apiBaseUrl}/merchants`);
            const data = await res.json();

            // Normalize to array to avoid `.filter` on null/undefined
            const merchants: IMerchant[] = Array.isArray(data) ? data : [];

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
            // Update User's Merchants in Redux
            dispatch(setUserMerchants(userMerchantsList));
        };
        getMerchants();

        // Likes mapping logic remains unchanged
        const newMap = new Map();
        likes.forEach(({ entityId }) => {
            newMap.set(entityId, (newMap.get(entityId) || 0) + 1);
        });
        setLikeCountsMap(newMap);
    }, [apiBaseUrl, user?.id, likes, dispatch]);

    // Function for dynamicPadding(index) || TODO maybe fix/repolish
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
                                <Tooltip
                                    arrow
                                    title={
                                        <span style={{ fontSize: "0.8rem" }}>
                                            Hit {" "}
                                            <b>{maxMerchants ?? "your current"}</b>{" "}
                                            merchants limit? This is a safety cap to prevent abuse.
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
                                        Added spots{" "}
                                        {typeof maxMerchants === "number" && (
                                            <span
                                                style={{
                                                    fontSize: "0.8em",
                                                    color: "#6B7280",
                                                }}
                                            >
                                                (avail. limit {currentMerchantsCount}/{maxMerchants})
                                            </span>
                                        )}
                                    </Typography>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal
                                    icon={IconPlus}
                                    side={ButtonSide.Left}
                                    title="Add spot"
                                    color={ButtonColor.Pink}
                                    hoverColor={ButtonColor.PinkHover}
                                    textColor="white"
                                    actionDelegate={FuncAddSpot}
                                    disabled={hasReachedMerchantLimit}
                                />
                            </Grid>
                        </Grid>
                        {hasReachedMerchantLimit && (
                            <Typography sx={{ mt: 1, color: "#888" }}>
                                You have reached your spots/merchants limit ({maxMerchants}).
                            </Typography>
                        )}
                        <Grid container spacing={2}>
                            {myMerchants && myMerchants.length > 0 ? (
                                myMerchants.map((merchant: IMerchantADWrapper, index: number) => (
                                <Grid xs={12} sm={4} key={index} sx={{ ...dynamicPadding(index) }}>
                                    <TileAddedMerchant likes={likeCountsMap.get(merchant.merchant.properties.id) || 0} merchant={merchant} />
                                </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                <Typography variant="h2" sx={{ color: "#888", textAlign: "center", mt: 4 }}>
                                    No merchants found
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
                    <FormAddSpot closeModal={handleClose}/>
                </Box>
            </Modal>
            {/* Menu Down - For phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADMyMerchants;