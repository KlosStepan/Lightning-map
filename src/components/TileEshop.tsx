import React from "react";
import Box from '@mui/material/Box';
import { CardMedia, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import ButtonUniversal from "./ButtonUniversal";
import IconExclamationMark from "../icons/warning-box.png";
import IconLightningNumber from "../icons/IconLightningNumber";
import IEshop from "../ts/IEeshop";

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
    showReportButton?: boolean; // Optional prop, defaults to true
};

const TileEshop: React.FC<TileEshopProps> = ({ likes, tile, showReportButton = true }) => {
    const FuncReport = (): Promise<void> => {
        console.log("Report");
        return Promise.resolve();
    };

    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={{ ...containerOuterStyle }}>
                <Box sx={{ ...containerInnerStyle }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {showReportButton && (
                                <ButtonUniversal
                                    icon={IconExclamationMark}
                                    side="L"
                                    title="R."
                                    color="white"
                                    textColor="#BEBEBE"
                                    actionDelegate={FuncReport}
                                />
                            )}
                        </div>
                        <IconLightningNumber number={likes} scale={0.85} />
                    </div>
                    <CardMedia
                        component="img"
                        style={{ margin: '24px 0px' }}
                        image={tile.logo}
                        alt={tile.name}
                    />
                    <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                        {tile.name}
                    </Typography>
                    <p  style={{ textAlign: 'left', fontSize: '16px', marginTop:'10px', color: '#6B7280' }}>
                        {tile.description}
                    </p>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default TileEshop;
