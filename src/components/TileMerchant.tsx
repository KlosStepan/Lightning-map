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
    padding: '10px 10px 10px 10px',
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
            <Box sx={{ ...containerInnerStyleUp, position: 'relative', height: '50%', width: '100%' }}>
                <CardMedia
                    component="img"
                    style={{
                        height: '100%', // Fill the container height
                        width: '100%',  // Fill the width of the container
                        objectFit: 'cover', // Adjust image scaling
                        margin: 0,
                        padding: 0,
                    }}
                    image={image}
                    alt={title}
                />
                {/* Icon in the top right corner */}
                <Box sx={{ ...topRight }}> {/* Adjust positioning as needed */}
                    <IconLightningNumber number={likes} />
                </Box>
                {/* Text in the bottom left corner */}
                <Box sx={{ ...leftBottom /*color: 'white', fontWeight: 'bold'*/ }}> {/* Adjust positioning and styles as needed */}
                <TagMerchant tag={"Food & Drinks"}/>
                </Box>
            </Box>
            <Box sx={{ ...containerInnerStyleDown }}> {/* Adjust padding as needed */}
                <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                    {title}
                </Typography>
                <p style={{ textAlign: 'left', fontSize: '12px' }}>{address}</p>
            </Box>
        </Container>
    );
};

export default TileMerchant;
