import React, { useState } from "react";
//Components
import ButtonUniversal from "./ButtonUniversal";
//enums
import { ButtonSide } from "../enums";
//Forms
import FormSubmitReport from "../forms/FormSubmitReport";
//MUI
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import { CardMedia, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//Router
import {  useNavigate } from "react-router-dom";
//TypeScript
import IEshop from "../ts/IEshop";

//Icons
import IconExclamationMark from "../icons/warning-box.png";
import IconLightningPurple from "../icons/icon-lightning-purple.png";
import IconLightningNumber from "../icons/IconLightningNumber"; //Icon w/ number Comp.

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
};
const TileEshop: React.FC<TileEshopProps> = ({ likes, tile, showReportButton = true }) => {
    const navigate = useNavigate();
    //
    const user = useSelector((state: RootState) => state.misc.user);

    //tmp debug; mby TODO clicked other - reset state of this to default false
    const [voted, setVoted] = useState<boolean>(false);

    const SwapLike = (): Promise<void> => {
        //if not logged in, redirect to login
        setVoted(prev => !prev);
        return Promise.resolve();
    };
    //
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
                                    color="white"
                                    textColor="#BEBEBE"
                                    actionDelegate={FuncReport}
                                />
                            )}
                        </div>
                        {/*<IconLightningNumber number={likes} scale={0.85} />*/}
                        <ButtonUniversal
                            icon={IconLightningPurple}
                            side={ButtonSide.Left}
                            title="7"
                            //color={voted ? "#D9D9D9" : "#F0F0F0"} // Darker when clicked
                            color={voted ? "#7f7f7f" : "#F0F0F0"} // Darker when clicked
                            textColor="black"
                            actionDelegate={SwapLike}
                        />
                    </div>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",  // ✅ Set height to control vertical centering
                            width: "100%",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={tile.logo}
                            alt={tile.name}
                            sx={{
                                maxWidth: "100%",  // ✅ Adjust width if needed
                                maxHeight: "100%", // ✅ Prevent overflow
                                objectFit: "contain", // ✅ Ensure the image fits inside
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
