import React from "react";
import Box from '@mui/material/Box';
import { CardMedia, Container, Typography } from '@mui/material';
//
import IconExclamationMark from "../icons/IconExclamationMark";
import IconLightningNumber from "../icons/IconLightningNumber";

import TagMerchant from "./TagMerchant";

const containerOuterStyle = {
    padding: '0px 0px 0px 0px !important',
    gap: '10px',
    borderRadius: '16px',
    backgroundColor: 'white',
    margin: '0px 0px 10px 0px',
};

//Upper part of Tile
const containerInnerStyleUp = {
    position: 'relative',
    height: '50%',
    width: '100%',
};

const topRight = {
    position: 'absolute',
    top: 8,
    right: 8,
}

const leftBottom = {
    position: 'absolute',
    bottom: 8,
    left: 8,
}

//Bottom part of Tile
const containerInnerStyleDown = {
    padding: '6px 10px 2px 10px',
    textAlign: 'left',
};

type TileMerchantProps = {
    image: string;
    title: string;
    address: string;
    likes: string;
};

const TileMerchant: React.FC<TileMerchantProps> = ({ image, title, address, likes }) => {
    return (
        <Container maxWidth="sm" sx={containerOuterStyle}>
            <Box sx={{ ...containerInnerStyleUp}}>
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                />
                <Box sx={{ ...topRight }}>
                    <IconLightningNumber number={likes} />
                </Box>
                <Box sx={{ ...leftBottom }}>
                <TagMerchant tag={"Food & Drinks"}/>
                </Box>
            </Box>
            <Box sx={{ ...containerInnerStyleDown }}>
                <Typography variant="h3" component="h2" >
                    {title}
                </Typography>
                <p style={{ fontSize: '12px' }}>{address}</p>
            </Box>
        </Container>
    );
};

export default TileMerchant;
