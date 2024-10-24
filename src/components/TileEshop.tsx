import React from "react";
import Box from '@mui/material/Box';
import { CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

//
import ButtonUniversal from "./ButtonUniversal";
import IconExclamationMark from "../icons/warning-box.png";
import IconLightningNumber from "../icons/IconLightningNumber";
import IEshop from "../ts/IEeshop";

const containerOuterStyle = {
    padding: '10px 10px 10px 10px !important',
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

//TODO - tile: IEshop, in props
//TODO - logo be base64
type TileEshopProps = {
    likes: string;
    //logo: string;
    //title: string;
    //caption: string;
    tile: IEshop
}

const TileEshop: React.FC<TileEshopProps> = ({ likes, tile /*, logo, title, caption*/ }) => {
    //
    const FuncReport = (): Promise<void> => {
        console.log("Report");
        return Promise.resolve();
    };

    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={{ ...containerOuterStyle }}>
                <Box sx={{  ...containerInnerStyle }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                        <div style={{ display: "flex", alignItems: "center", }}>
                        <ButtonUniversal
                                    icon={IconExclamationMark}
                                    side="L"
                                    title="R."
                                    color="white"
                                    textColor="#BEBEBE"
                                    actionDelegate={FuncReport} // Placeholder action; replace as needed
                                />
                        </div>
                        <IconLightningNumber number={likes} scale={0.85}/>
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
                    <p style={{ textAlign: 'left', fontSize: '12px' }}>
                        {tile.description}
                    </p>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default TileEshop;