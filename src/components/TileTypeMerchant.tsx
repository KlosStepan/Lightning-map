import React from "react"
import Box from '@mui/material/Box';
import { Card, CardMedia, Grid } from '@mui/material';
import { Container, CssBaseline, Paper } from "@mui/material";



import mapofspots from '../img/Interface-Essential-Map--Streamline-Pixel.png';
import eshops from '../img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';

import Typography from '@mui/material/Typography';


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
    numPlaces: string;
    imageSrc: string;
};

const TileTypeMerchant: React.FC<TileTypeMerchantProps> = ({ caption, numPlaces, imageSrc }) => {
    return (
        <React.Fragment>
            <Container maxWidth="sm">

                <Box sx={{ ...purpleBoxStyle, width: '236px', height: '150px', position: 'relative' }}>
                    {/* Image */}
                    <div style={{ width: '77px', height: '77px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CardMedia
                            component="img"
                            image={imageSrc}
                            alt="Map of Spots"
                            style={{ width: '100%', height: '100%', objectFit: 'cover'/*, borderRadius: '50%'*/ }} // Adjusted to make the image circular
                        />
                    </div>
                    {/* Text - Top right */}
                    <Typography variant="h3" component="h3" sx={textTopRightStyle}>
                        {numPlaces}
                    </Typography>
                    {/* Text - Bottom left */}
                    <Typography variant="h2" component="h2" sx={textBottomLeftStyle}>
                        {caption}
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default TileTypeMerchant;