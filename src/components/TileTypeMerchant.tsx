import React from "react"
import Box from '@mui/material/Box';
import { Card, CardMedia, Grid } from '@mui/material';
import { Container, CssBaseline, Paper } from "@mui/material";



import mapofspots from '../img/Interface-Essential-Map--Streamline-Pixel.png';
import eshops from '../img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';

import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';


// Define the style for the new purple box
const purpleBoxStyle = {
    borderRadius: '24px',
    backgroundColor: '#8000FF',
    padding: '20px',
    position: 'relative', // Add position relative to the box
};

const textTopRightStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'white',
};

const textBottomLeftStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    color: 'white',
};

type TileTypeMerchantProps = {
    caption: string;
    numPlaces: number | undefined;
    imageSrc: string;
    path: string;
};

//This is either E-shop or Merchant on Homepage / ADHome
const TileTypeMerchant: React.FC<TileTypeMerchantProps> = ({ caption, numPlaces, imageSrc, path }) => {
    return (
        <React.Fragment>
            <Link style={{ color: "inherit", textDecoration: "inherit"/*, fontSize: '18px' */ }} to={path}>
                <Container maxWidth="sm">
                    {/*RODO width tuning goes here*/}
                    <Box sx={{ ...purpleBoxStyle, /*width: '236px', height: '150px',*/ width: '120%', height: '158px', position: 'relative' }}>
                        {/* Image */}
                        <div style={{ width: '77px', height: '77px', position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <CardMedia
                                component="img"
                                image={imageSrc}
                                alt="Map of Spots"
                                style={{ width: '100%', height: '100%', objectFit: 'cover'/*, borderRadius: '50%'*/ }} // Adjusted to make the image circular
                            />
                        </div>
                        {/* Text - Top right */}
                        <Typography variant="h3" component="h3" sx={textTopRightStyle}>
                            {numPlaces ? numPlaces : 'X'}
                        </Typography>
                        {/* Text - Bottom left */}
                        <Typography variant="h2" component="h2" sx={textBottomLeftStyle}>
                            {caption}
                        </Typography>
                    </Box>
                </Container>
            </Link>
        </React.Fragment>
    )
}

export default TileTypeMerchant;