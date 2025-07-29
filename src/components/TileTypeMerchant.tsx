import React from "react"
//MUI
import Box from '@mui/material/Box';
import { CardMedia } from '@mui/material';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
//Router
import { Link } from 'react-router-dom';
//
import { Pwnspinner } from "pwnspinner";

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
                        {numPlaces ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '16px',
                                    height: '16px',
                                    //border: '1px solid #fff', // Optional: adds a border to the box
                                    borderRadius: '50%', // Optional: to make it circular if it's a circle you're aiming for
                                }}
                            >
                            {numPlaces}
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '16px',
                                    height: '16px',
                                }}
                            >
                                <div style={{ transform: 'scale(0.6)', transformOrigin: 'center' }}>
                                    <Pwnspinner color="white" speed={0.7} thickness={3} />
                                </div>
                            </Box>
                        )}
                        </Typography>

                        {/* Text - Bottom left */}
                        <Typography variant="h2" component="h2" sx={textBottomLeftStyle}>
                            {caption}
                        </Typography>
                    </Box>
                </Container>
            </Link>
        </React.Fragment>
    );
};

export default TileTypeMerchant;