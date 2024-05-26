import React from "react";
import Box from '@mui/material/Box';
import { Card, CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
//
import IconExclamationMark from "../icons/IconExclamationMark";
import IconLightningNumber from "../icons/IconLightningNumber";

const containerOuterStyle = {
    //width: '315px',
    //height: '478px',
    //padding: '32px 0px 10px 0px',
    //padding: '16px 12px 16px 12px',
    padding: '16px 12px',
    gap: '10px',
    //borderRadius: '24px 24px 24px 24px',
    borderRadius: '16px',
    opacity: '0px',
    backgroundColor: 'white', // Adding background color
    margin: '0px 0px 10px 0px',
};

const containerInnerStyle = {
    gap: '20px',
    opacity: '0px',
};

type TileMerchantBigProps = {
    image: string;
    categories: string[];
    title: string;
    address: string;
    socials: string[];
    likes: string;
}
const TileMerchantBig: React.FC<TileMerchantBigProps> = ({ image, categories, title, address, socials, likes }) => {
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={containerOuterStyle}>
                <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
                    <div style={{ display: "flex" }}>
                        <IconExclamationMark />
                        &nbsp;
                        <IconLightningNumber number={likes} />
                    </div>
                    {/*<div><u>|A alza.cz|</u></div>*/}
                    <CardMedia
                        component="img"
                        //width="100"
                        style={{
                            //width: '100px',
                            margin: '24px 0' // 20px top and bottom margin, 0 left and right margin
                        }}
                        //height="100"
                        image={image}
                        alt={title}
                    />
                    <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                        {title}
                    </Typography>
                    <p style={{ textAlign: 'left', fontSize: '12px' }}>{address}</p>
                </Box>
            </Container>
        </React.Fragment>
    )
}
export default TileMerchantBig;