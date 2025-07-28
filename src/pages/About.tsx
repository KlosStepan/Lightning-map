import React from 'react';
//MUI
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
//Components
import Footer from '../components/Footer';
//Images for funky body of Our Mission
import img1Magnet from '../img/Interface-Essential-Magnet--Streamline-Pixel-2.png';
import img2Comeback from '../img/Hand-Love--Streamline-Pixel-2.png';
//Router
import { useNavigate } from "react-router-dom";
//
import about0pizzaguy from '../img/about/9566-960-1492.jpg';
import about1rossulbricht from '../img/about/about1rossulbricht.jpg';
import about2paralelnipolis from '../img/about/about2paralelnipolis.jpeg';
import about3bluepigveganshop from '../img/about/about3bluepigveganshop.jpg';
import about4lightningeverywhere from '../img/lightning-everywhere.png'; // NEW IMAGE
//
import lightningconnects from '../img/mempool-space-ln-stats-worldmap-channels.jpg';

// Define the common height
const COMMON_HEIGHT = '250px';

type AboutProps = {
    //
};

const About: React.FC<AboutProps> = ({ }) => {
    const navigate = useNavigate();

    const tiles = [
    {
        title: "The Pizza Guy",
        year: "2010",
        meanOfPayment: ["₿"],
        description:
        "Laszlo Hanyecz made the first Bitcoin purchase, buying two pizzas for 10,000 BTC.",
        image: about0pizzaguy,
    },
    {
        title: "Ross Ulbricht Silk Road",
        year: "2011",
        meanOfPayment: ["₿"],
        description:
        "Ross created Silk Road, demonstrating Bitcoin’s use for anonymous online commerce.",
        image: about1rossulbricht,
    },
    {
        title: "Paralelní Polis",
        year: "2014",
        meanOfPayment: ["₿", "🗲"],
        description:
        "This Czech hub promoted Bitcoin and Lightning payments alongside education and art.",
        image: about2paralelnipolis,
    },
    {
        title: "Blue Pig Vegan Shop",
        year: "2018",
        meanOfPayment: ["₿", "🗲"],
        description:
        "One of the first shops accepting Bitcoin and Lightning, enabling local crypto spending.",
        image: about3bluepigveganshop,
    },
    {
        title: "Lightning Everywhere",
        year: "2022",
        meanOfPayment: ["₿", "🗲"],
        description:
        "A global push to expand Lightning adoption for faster Bitcoin payments worldwide.",
        image: about4lightningeverywhere,
    },
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
                    <p>
                        We’re here to help you find places that accept Lightning—whether it’s your local café, a cool shop, or an online store. From grabbing a drink to buying everyday stuff, we make it easy to spend Bitcoin where it actually works. It's all about making Lightning useful in real life.
                    </p>
                    <Box sx={{ mt: 2, mb: 4, display: 'flex', justifyContent: 'center' }}>
                        <CardMedia
                            component="img"
                            image={lightningconnects}
                            alt="Lightning Network World Map"
                            sx={{
                                width: '100%',
                                maxWidth: 800,
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Box>
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
  <Grid item xs={12} sm={2} key={index}>
    <Card
      sx={{
        height: "100%",
        backgroundColor: "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={tile.image}
        alt={tile.title}
        sx={{
          objectFit: "cover",
          width: "100%",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {/* First line: Name + Year */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            marginBottom: 0.5,
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
          >
            {tile.title}
          </Typography>

          {tile.year && (
            <Box
              component="span"
              sx={{
                backgroundColor: "#E0E0E0",
                borderRadius: "12px",
                padding: "2px 8px",
                fontSize: "12px",
                color: "#555",
                whiteSpace: "nowrap",
              }}
            >
              {tile.year}
            </Box>
          )}
        </Box>

        {/* Second line: meanOfPayment badges */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 1,
          }}
        >
          {tile.meanOfPayment?.map((mean, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                backgroundColor: "#FFD700",
                borderRadius: "12px",
                padding: "2px 8px",
                fontSize: "12px",
                color: "#333",
                fontWeight: "bold",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
              title={mean === "₿" ? "Bitcoin" : mean === "🗲" ? "Lightning" : ""}
            >
              {mean}
            </Box>
          ))}
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "#666", fontSize: "14px", textAlign: "justify" }}
        >
          {tile.description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
                    ))}
                    <Grid item xs={12} sm={2}>
                    <Card
                        onClick={() => navigate("/login")}
                        sx={{
                        height: "100%",
                        backgroundColor: "#fff9f0",
                        borderRadius: "16px",
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: 2,
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                        '&:hover': {
                            transform: "scale(1.03)",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                        },
                        }}
                    >
                        <Typography variant="h3" sx={{ color: "#F23CFF", fontWeight: 700, fontSize: "48px" }}>
                        +
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
                        Add your business!
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", fontSize: "14px", mt: 1 }}>
                        Join the map of pioneers accepting Lightning.
                        </Typography>
                    </Card>
                    </Grid>

                    </Grid>
                    <Grid>
                        <Box>
                            Something else maybe about author idk.
                            <div>&nbsp;</div>
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </React.Fragment>
    );
};

export default About;
