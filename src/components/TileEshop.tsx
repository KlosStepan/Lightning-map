import React from "react";
import Box from '@mui/material/Box';
import { CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

//
import IconExclamationMark from "../icons/IconExclamationMark";
import IconLightningNumber from "../icons/IconLightningNumber";

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
    logo: string;
    title: string;
    caption: string;
}

const TileEshop: React.FC<TileEshopProps> = ({ likes, logo, title, caption }) => {
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={{ ...containerOuterStyle }}>
                <Box sx={{  ...containerInnerStyle }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                        <div style={{ display: "flex", alignItems: "center", }}>
                            <IconExclamationMark />
                        </div>
                        <IconLightningNumber number={likes} scale={0.85}/>
                    </div>
                    <CardMedia
                        component="img"
                        style={{ margin: '24px 0px' }}
                        image={logo}
                        alt={title}
                    />
                    <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                        {title}
                    </Typography>
                    <p style={{ textAlign: 'left', fontSize: '12px' }}>
                        {caption}
                    </p>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default TileEshop;