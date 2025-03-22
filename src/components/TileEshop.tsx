import React from "react";
//Components
import ButtonUniversal from "./ButtonUniversal";
//enums
import { ButtonSide } from "../enums"; // Adjust the path as needed
//MUI
import Box from '@mui/material/Box';
import { CardMedia, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
//TypeScript
import IEshop from "../ts/IEeshop";

//Icons
import IconExclamationMark from "../icons/warning-box.png";
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
};

const TileEshop: React.FC<TileEshopProps> = ({ likes, tile, showReportButton = true }) => {
    const FuncReport = (): Promise<void> => {
        console.log("Report eshop");
        return Promise.resolve();
    };
    const FunctRate = (): Promise<void> => {
        console.log("Rating eshop");
        return Promise.resolve();
    }
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
                        <IconLightningNumber number={likes} scale={0.85} />
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
        </React.Fragment>
    );
};

export default TileEshop;
