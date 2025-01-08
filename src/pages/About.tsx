import React from 'react';
//MUI
import { Grid, Typography, CardMedia, Box } from "@mui/material";
//Components
import Footer from '../components/Footer';
//Images for funky body of Our Mission
import img1Magnet from '../img/Interface-Essential-Magnet--Streamline-Pixel-2.png';
import img2Comeback from '../img/Hand-Love--Streamline-Pixel-2.png';

// Define the common height
const COMMON_HEIGHT = '250px';

type AboutProps = {
    //
};

const About: React.FC<AboutProps> = ({ }) => {
    return (
        <React.Fragment>
            <div style={{ backgroundColor: "#F23CFF" }}>
                <Typography variant="h1" component="h1" align="center">
                    OUR MISSION &#9889; OUR MISSION &#9889; OUR MISSION &#9889; OUR MISSION &#9889; OUR MISSION
                </Typography>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    {/* First 1 unit: Left upper img1Magnet */}
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                position: "relative",
                                height: COMMON_HEIGHT,
                                display: 'flex',
                                alignItems: 'flex-start',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={img1Magnet}
                                alt="Magnet Image"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* 10 units: Middle Section */}
                    <Grid item xs={6}>
                        <p>Our goal is to compile a comprehensive and up-to-date list of all establishments in Czechia that accept Lightning payments. Whether you're looking to enjoy a coffee, have a beer, or purchase goods and services, we've got you covered. We also include e-shops in our directory to support the broader adoption of Lightning, recognizing that not all businesses accepting Lightning are cafés or similar establishments.</p>
                    </Grid>

                    {/* Second 1 unit: Right down img2Comeback */}
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                position: "relative",
                                height: COMMON_HEIGHT,
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={img2Comeback}
                                alt="Comeback Image"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </React.Fragment>
    );
};

export default About;
