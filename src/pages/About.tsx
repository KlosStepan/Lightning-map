import React from 'react';
//MUI
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
//Components
import Footer from '../components/Footer';
//Images for funky body of Our Mission
import img1Magnet from '../img/Interface-Essential-Magnet--Streamline-Pixel-2.png';
import img2Comeback from '../img/Hand-Love--Streamline-Pixel-2.png';
//
import about1rossulbricht from '../img/about/about1rossulbricht.jpg';
import about2paralelnipolis from '../img/about/about2paralelnipolis.jpeg';
import about3bluepigveganshop from '../img/about/about3bluepigveganshop.jpg';
import about4lightningeverywhere from '../img/lightning-everywhere.png'; // NEW IMAGE

// Define the common height
const COMMON_HEIGHT = '250px';

type AboutProps = {
    //
};

const About: React.FC<AboutProps> = ({ }) => {
    const tiles = [
        {
          title: "Ross Ulbricht",
          description: "Bitcoin icon/symbol, illegal, in prison, pardoned.",
          image: about1rossulbricht,
        },
        {
          title: "Paralelní Polis",
          description: "Lightning symbol, 1st institutional attempt in CZ.",
          image: about2paralelnipolis,
        },
        {
          title: "Blue Pig Vegan Shop",
          description: "Indie donut maker, active in adoption.",
          image: about3bluepigveganshop,
        },
        {
            title: "Lightning Everywhere",
            description: "Adoption beyond borders, empowering global commerce.",
            image: about4lightningeverywhere,
        }
      ];
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
                    {/*Tiles for motivation*/}
                    <Grid container spacing={3} sx={{ textAlign: "center" }}>
                        <Grid item xs={12}>
                            <Typography variant="h2" gutterBottom>
                            Pioneering usage throughout the industry &gt; &gt; &gt;
                            </Typography>
                        </Grid>

                        {tiles.map((tile, index) => (
                            <Grid item xs={12} sm={3} key={index}>
                            <Card sx={{ height: "100%" }}>
                                <CardMedia
                                component="img"
                                height="160"
                                image={tile.image}
                                alt={tile.title}
                                />
                                <CardContent>
                                <Typography variant="h6">{tile.title}</Typography>
                                <Typography variant="body2">{tile.description}</Typography>
                                </CardContent>
                            </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid>
                        <Box>
                            Something else maybe
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </React.Fragment>
    );
};

export default About;
