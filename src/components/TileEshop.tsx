import React, { useEffect, useMemo, useState } from "react";
// Components
import ButtonUniversal from "./ButtonUniversal";
// Enums
import { ButtonColor, ButtonSide } from "../enums";
// Forms
import FormSubmitReport from "../forms/FormSubmitReport";
// MUI
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import { CardMedia, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
// Redux + RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setLikes } from "../redux-rtk/dataSlice";
// Router
import {  useNavigate } from "react-router-dom";
// TypeScript
import IEshop from "../ts/IEshop";
// Utils
import { getBackendImageUrl } from "../utils/image";

// Icons
import IconExclamationMark from "../icons/warning-box.png";
import IconLightningPurple from "../icons/icon-lightning-purple.png";
import IconLightningWhite from "../icons/icon-lightning-white.png"
import IconLightningNumber from "../icons/IconLightningNumber";

const containerOuterStyle = {
    padding: '10px 16px 10px 16px !important',
    borderRadius: '16px',
    opacity: '0px',
    backgroundColor: 'white',
    margin: '0px 0px 10px 0px',
};

const containerInnerStyle = {
    bgcolor: '#ffffff',
    gap: '20px',
    opacity: '0px',
};

type TileEshopProps = {
    likes: string;
    tile: IEshop;
    showReportButton?: boolean;
    handleLikeChange?: (vendorid: string, change: number) => Promise<void>;
};

const TileEshop: React.FC<TileEshopProps> = ({ likes, tile, showReportButton = true, handleLikeChange = async () => {} }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const user = useSelector((state: RootState) => state.misc.user);
    //
    const rawLikes = useSelector((state: RootState) => state.data.likes);
    const [voted, setVoted] = useState<boolean>(false);
    //
    const likesArr = useMemo(
        () => rawLikes ?? [],
        [rawLikes]
    );

    useEffect(() => {
        if (!user) return;

        setVoted(false);
        const found = likesArr.find(
            (like) =>
                like.entityId === tile.id &&
                like.entityType === "eshop" &&
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
                    like.entityType === "eshop" &&
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
                    console.log(`[like] -1 (y) eshop (id=${tile.id}) by user '${user.id}'`);
                }
                setVoted(false);
                handleLikeChange(tile.id, -1);
                dispatch(setLikes(likesArr.filter(like => like.id !== existingLike.id)));
            } else {
                const res = await fetch(`${apiBaseUrl}/likes/cud`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        owner: user.id,
                        entityId: tile.id,
                        entityType: "eshop",
                    }),
                });
                if (!res.ok) {
                    const txt = await res.text().catch(() => "");
                    throw new Error(`Failed to like: ${res.status} ${txt}`);
                }
                const newLike = await res.json();
                if (DEBUG) {
                    console.log(`[like] +1 (y) eshop (id=${tile.id}) by user '${user.id}'`);
                }
                setVoted(true);
                handleLikeChange(tile.id, 1);
                dispatch(setLikes([...likesArr, newLike]));
            }
        } catch (err) {
            console.error("SwapLike error:", err);
            alert("Error: " + ((err as Error).message || err));
        }
    };

    const FuncReport = (): Promise<void> => {
        console.log("Report merchant");
        if(!user) {
            navigate('/login')
          }
          else {
            console.log("logged in")
            handleOpenReportE()
          }
        return Promise.resolve();
    };

    // Modal State
    const [openReportE, setOpenReportE] = React.useState(false);
    const handleOpenReportE = () => setOpenReportE(true);
    const handleCloseReportE = () => setOpenReportE(false);
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={{ ...containerOuterStyle }}>
                <Box sx={{ ...containerInnerStyle }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {showReportButton && (
                                <ButtonUniversal
                                    icon={IconExclamationMark}
                                    side={ButtonSide.Left}
                                    title="R."
                                    color={ButtonColor.White}
                                    hoverColor={ButtonColor.ReportHover}
                                    textColor="#BEBEBE"
                                    actionDelegate={FuncReport}
                                    scale={0.75}
                                />
                            )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                        {showReportButton ? (
                            <ButtonUniversal
                                icon={voted ? IconLightningWhite : IconLightningPurple}
                                side={ButtonSide.Left}
                                title={likes}
                                color={voted ? ButtonColor.LightningActive : ButtonColor.LightningDefault}
                                hoverColor={ButtonColor.LightningHover}
                                textColor={voted ? ButtonColor.White : ButtonColor.Black}
                                actionDelegate={SwapLike}
                                scale={0.75}
                            />) : <IconLightningNumber number={likes} scale={1} /> }
                        </div>
                    </div>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",
                            width: "100%",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={getBackendImageUrl(
                                tile.logo,
                                apiBaseUrl || "",
                                "eshop",        // category
                                false           // original? false => preview
                            )}
                            alt={tile.name}
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                    <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                        {tile.name}
                    </Typography>
                    <p style={{ textAlign: 'left', fontSize: '16px', marginTop:'10px', color: '#6B7280' }}>
                        {tile.description}
                    </p>
                </Box>
            </Container>
            <Modal
                open={openReportE}
                onClose={handleCloseReportE}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <Box>
                    <FormSubmitReport
                        closeModal={handleCloseReportE}
                        tile={tile}
                    />
                </Box>
              </Modal>
        </React.Fragment>
    );
};

export default TileEshop;
