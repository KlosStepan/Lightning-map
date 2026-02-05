////typescript
// filepath: /home/stepo/projects/Lightning-map/src/components/TileMerchantBig.tsx
import React, { useEffect, useMemo, useState } from "react";
// Components
import ButtonUniversal from "./ButtonUniversal";
import TagMerchant from "./TagMerchant";
import TagSocialLink from "./TagSocialLink";
// enums
import { ButtonColor, ButtonSide } from "../enums";
// Forms
import FormSubmitReport from "../forms/FormSubmitReport";
// MUI
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import { CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme, IconButton } from "@mui/material";
// MUI | Gallery impl.
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// Redux + RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setSelected } from "../redux-rtk/mapFilteringSlice";
import { setLikes } from "../redux-rtk/dataSlice";
// Router
import { useNavigate } from "react-router-dom";
// TypeScript
import { IMerchantTile } from "../ts/IMerchant";
import ISocial from "../ts/ISocial";
// Utils
import { getBackendImageUrl } from "../utils/image";

// Icons
import closeIcon from '../icons/close.png';
import WarningBox from "../icons/warning-box.png";
// Icons | Like / Unlike
import IconLightningPurple from "../icons/icon-lightning-purple.png";
import IconLightningWhite from "../icons/icon-lightning-white.png";

const containerOuterStyle = {
    padding: '16px 12px',
    gap: '10px',
    borderRadius: '16px',
    backgroundColor: 'white',
    margin: '0px 0px 10px 0px',
    maxWidth: '100% !important'
};

const containerInnerStyle = {
    bgcolor: '#ffffff',
    gap: '20px',
};

const iconStyle = {
    width: 18,
    height: 18,
};

type TileMerchantBigProps = {
    likes: string;
    tile: IMerchantTile;
    handleLikeChange?: (vendorid: string, change: number) => Promise<void>;
};

const TileMerchantBig: React.FC<TileMerchantBigProps> = ({ likes, tile, handleLikeChange = async () => {} }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const user = useSelector((state: RootState) => state.misc.user);

    // Gallery impl.
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tile.images.length);
    };
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? tile.images.length - 1 : prevIndex - 1
        );
    };
    // Reset gallery position whenever merchant / images change
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [tile.id, tile.images]);
    // Gallery impl.

    const rawLikes = useSelector((state: RootState) => state.data.likes);

    const likesArr = useMemo(
        () => rawLikes ?? [],
        [rawLikes]
    );

    const [voted, setVoted] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;

        setVoted(false);
        const found = likesArr.find(
            (like) =>
                like.entityId === tile.id &&
                like.entityType === "merchant" &&
                like.owner === user.id
        );
        if (found) setVoted(true);
    }, [user, tile.id, likesArr]);

    const SwapLike = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        try {
            const existingLike = likesArr.find(
                (like) =>
                    like.entityId === tile.id &&
                    like.entityType === "merchant" &&
                    like.owner === user.id
            );
            if (existingLike && existingLike.id) {
                const res = await fetch(`${apiBaseUrl}/likes/cud?id=${existingLike.id}`, {
                    method: "DELETE",
                    credentials: "include",
                });
                if (!res.ok) {
                    const txt = await res.text().catch(() => "");
                    throw new Error(`Failed to unlike: ${res.status} ${txt}`);
                }
                if (DEBUG) {
                    console.log(`[like] -1 (y) merchant (id=${tile.id}) by user '${user.id}'`);
                }
                setVoted(false);
                handleLikeChange(tile.id, -1);
                // Remove like locally
                dispatch(setLikes(likesArr.filter(like => like.id !== existingLike.id)));
            } else {
                const res = await fetch(`${apiBaseUrl}/likes/cud`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        owner: user.id,
                        entityId: tile.id,
                        entityType: "merchant",
                    }),
                });
                if (!res.ok) {
                    const txt = await res.text().catch(() => "");
                    throw new Error(`Failed to like: ${res.status} ${txt}`);
                }
                const newLike = await res.json();
                if (DEBUG) {
                    console.log(`[like] +1 (y) merchant (id=${tile.id}) by user '${user.id}'`);
                }
                setVoted(true);
                handleLikeChange(tile.id, 1);
                // Add like locally
                dispatch(setLikes([...likesArr, newLike]));
            }
        } catch (err) {
            console.error("SwapLike error:", err);
            alert("Error: " + ((err as Error).message || err));
        }
    };

    const FuncReport = (): Promise<void> => {
        console.log("Report merchant");
        if (!user) {
            navigate('/login');
        } else {
            console.log("logged in");
            handleOpenReport();
        }
        return Promise.resolve();
    };

    // Modal State
    const [openReport, setOpenReport] = React.useState(false);
    const handleOpenReport = () => setOpenReport(true);
    const handleCloseReport = () => setOpenReport(false);

    // Inside the component
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={containerOuterStyle}>
                <Box sx={{ ...containerInnerStyle }}>
                    <Grid container spacing={2}>
                        {/* LEFT - Image section */}
                        <Grid item xs={12} sm={6}>
                            {tile.images.length > 1 ? (
                                <>
                                    <div
                                        style={{
                                            position: "relative",
                                            height: 216,
                                            overflow: "hidden",
                                            borderRadius: 4,
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={getBackendImageUrl(
                                                tile.images[currentImageIndex],
                                                apiBaseUrl || ""
                                            )}
                                            alt={tile.name}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: 4,
                                            }}
                                        />
                                        <IconButton
                                            onClick={handlePrevImage}
                                            sx={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "10px",
                                                transform: "translateY(-50%)",
                                                color: "white",
                                                backgroundColor: "rgba(0,0,0,0.5)",
                                            }}
                                        >
                                            <ArrowBackIos />
                                        </IconButton>
                                        <IconButton
                                            onClick={handleNextImage}
                                            sx={{
                                                position: "absolute",
                                                top: "50%",
                                                right: "10px",
                                                transform: "translateY(-50%)",
                                                color: "white",
                                                backgroundColor: "rgba(0,0,0,0.5)",
                                            }}
                                        >
                                            <ArrowForwardIos />
                                        </IconButton>
                                    </div>

                                    {/* Informational indicator under photo (1/n segments, current is darker) */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            mt: 1,
                                            gap: 0.5,
                                        }}
                                    >
                                        {tile.images.map((_, index) => (
                                            <Box
                                                key={index}
                                                onClick={index === currentImageIndex ? undefined : () => setCurrentImageIndex(index)}
                                                sx={{
                                                    flex: 1, // each segment gets 1/n of the width
                                                    height: 4,
                                                    borderRadius: 999,
                                                    backgroundColor:
                                                        index === currentImageIndex
                                                            ? "#4B5563" // darker for current (e.g. gray-700)
                                                            : "#E5E7EB", // lighter for others (e.g. gray-200)
                                                    transition: "background-color 0.2s ease",
                                                    cursor: index === currentImageIndex ? "default" : "pointer",
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </>
                            ) : (
                                <CardMedia
                                    component="img"
                                    image={getBackendImageUrl(tile.images[0], apiBaseUrl || "")}
                                    alt={tile.name}
                                    sx={{
                                        height: 216,
                                        objectFit: "cover",
                                        borderRadius: 4,
                                    }}
                                />
                            )}
                        </Grid>
                        {/* RIGHT - Content section */}
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    {tile.tags.map((tag: string) => (
                                        <TagMerchant key={tag} tag={tag} />
                                    ))}
                                </div>
                                {!isMobile && (
                                    <div onClick={() => dispatch(setSelected(null))}>
                                        <Box
                                            component="img"
                                            src={closeIcon}
                                            alt="Close Icon"
                                            sx={iconStyle}
                                            style={{ cursor: 'pointer', opacity: 1 }}
                                        />
                                    </div>
                                )}
                            </div>
                            <Typography variant="h1" component="h2" sx={{ textAlign: 'left', mt: 1 }}>
                                {tile.name}
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontFamily: 'IBM Plex Sans Condensed', fontSize: '16px', mt: 1, color: '#737373' }}>
                                {`${tile.address.address} ${tile.address.city} ${tile.address.postalCode}`}
                            </Typography>
                            <Typography sx={{ fontSize: '16px', fontFamily: 'IBM Plex Sans Condensed', color: '#404040' }}>
                                {tile.description}
                            </Typography>
                            <div>
                                <Typography variant="subtitle1" sx={{ fontFamily: 'PixGamer', fontSize: 24, color: '#737373', display: 'inline' }}>
                                    Socials
                                </Typography>
                                &nbsp;
                                {tile.socials.map((social: ISocial, index: number) => (
                                    <TagSocialLink key={index} social={social} scale={0.8} />
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                <ButtonUniversal
                                    icon={WarningBox}
                                    side={ButtonSide.Left}
                                    title="Report"
                                    color={ButtonColor.White}
                                    hoverColor={"null"}
                                    textColor={ButtonColor.ReportDefault}
                                    hoverTextColor={ButtonColor.ReportHover}
                                    actionDelegate={FuncReport}
                                />
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ButtonUniversal
                                        icon={voted ? IconLightningWhite : IconLightningPurple}
                                        side={ButtonSide.Left}
                                        title={likes}
                                        color={voted ? ButtonColor.LightningActive : ButtonColor.LightningDefault}
                                        hoverColor={ButtonColor.LightningHover}
                                        textColor={voted ? ButtonColor.White : ButtonColor.Black}
                                        hoverTextColor={voted ? ButtonColor.Black : ButtonColor.Black}
                                        actionDelegate={SwapLike}
                                    />
                                    <span>&nbsp; &nbsp;</span>
                                    <ButtonUniversal
                                        side={ButtonSide.Left}
                                        title="Navigate"
                                        color={ButtonColor.Pink}
                                        hoverColor={ButtonColor.PinkHover}
                                        textColor="white"
                                        actionDelegate={() => console.log("TODO NAVIGATE funct()")}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Modal
                open={openReport}
                onClose={handleCloseReport}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: 'scroll' }}
            >
                <Box>
                    <FormSubmitReport
                        closeModal={handleCloseReport}
                        tile={tile}
                    />
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default TileMerchantBig;