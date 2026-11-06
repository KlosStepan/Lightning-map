import React, { useEffect } from "react";
//Components
import TileExplainer from "../components/TileExplainer";
import ButtonUniversal from "../components/ButtonUniversal";
import Footer from "../components/Footer";
//MUI
import { Grid, Typography, CardMedia, Box, useMediaQuery, useTheme } from "@mui/material";
//enums
import { ButtonColor } from "../enums";
//Router
import { useLocation } from "react-router-dom";

//Images for body - funky
import img1_magnet from '../img/Interface-Essential-Magnet--Streamline-Pixel.png';
import imgs2Overlap1 from '../img/rectangle_145.png'; // Image 145
import imgs2Overlap2 from '../img/rectangle_147.png'; // Image 147
import img3Comeback from '../img/Hand-Love--Streamline-Pixel.png';
//Images for Explainer Tile
import transactionspeed from '../img/Interface-Essential-Flash--Streamline-Pixel.png';
import lowfees from '../img/Business-Products-Cash-User-Man-Message--Streamline-Pixel.png';
import scalability from '../img/Business-Product-Startup-1--Streamline-Pixel.png';
import security from '../img/Interface-Essential-Lock--Streamline-Pixel-2.png';
import privacy from '../img/Coding-Apps-Websites-Shield-Lock--Streamline-Pixel.png'
import worksEverywhere from '../img/Interface-Essential-Map--Streamline-Pixel.png';

const WHITEPAPER_URL = "https://lightning.network/lightning-network-paper.pdf";
const NETWORK_STATS_URL = "https://mempool.space/lightning";

// Define the common height
const COMMON_HEIGHT = '450px';
const COMMON_HEIGHT_2 = '225px';

type WhyLightningProps = {
  //
};

const WhyLightning: React.FC<WhyLightningProps> = () =>{
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
    // Scroll to an #anchor (e.g. /why-lightning#whitepaper from the homepage)
    const location = useLocation();
    useEffect(() => {
      if (!location.hash) return;
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, [location.hash]);

    return (
      <React.Fragment>
        <Box sx={{ minHeight: COMMON_HEIGHT, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
        {isPhone ? (
            <>
              <div>&nbsp;</div>
              {/* Row 3: Typography */}
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: '2.5rem', // Adjust font size for phone screens
                    textAlign: 'left',
                  }}
                >
                  Lightning Network is Bitcoin's layer 2 for everyday payments: instant, nearly
                  free and secured by Bitcoin itself.
                </Typography>
              </Grid>
              {/* Row 1: First column images (img1_magnet and imgs2Overlap2) */}
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={5} sx={{ position: 'relative', top:'-20px'}}>
                  <CardMedia
                    component="img"
                    image={img1_magnet}
                    alt=""
                    style={{
                      width: '90px',
                      height: '90px',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <CardMedia
                    component="img"
                    image={imgs2Overlap2}
                    alt=""
                    style={{
                      width: '199px',
                      height: '308px',
                      objectFit: 'cover',
                      //top: '100px',
                      //top: 0,
                      //left: 0,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Row 2: Second column images (imgs2Overlap1 and img3Comeback) */}
              <Grid container item xs={12} spacing={2} sx={{ position: 'relative', top:'-125px'}}>
                <Grid item xs={7}>
                  <CardMedia
                    component="img"
                    image={imgs2Overlap1}
                    alt=""
                    style={{
                      width: '242px',
                      height: '385px',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item xs={5} sx={{ position: 'relative', height: '100%' }}>
                  <div
                    style={{
                      position: 'relative',
                      height: COMMON_HEIGHT_2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={img3Comeback}
                      alt=""
                      style={{
                        width: '90px',
                        height: '90px',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </Grid>

              </Grid>

            </>
          ) : (
          <>
          {/* First 1 unit */}
          <Grid item xs={1}>
            <div
              style={{
                position: "relative",
                height: COMMON_HEIGHT,
              }}
            >
              <CardMedia
                component="img"
                image={img1_magnet}
                alt=""
                style={{
                  width: '90px', // 77% of 90px
                  height: '90px', // 77% of 90px
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  objectFit: 'cover',
                }}
              />
            </div>
          </Grid>

          {/* First x/2 units */}
          <Grid item xs={5}>
            <div style={{ /*backgroundColor: "#90caf9", height: "100px"*/ }}>
            <Typography variant="h1" component="h1" sx={{ fontSize: '2.5rem' }}>
            Lightning Network is Bitcoin&apos;s <br/>
            layer 2 for everyday payments: <br/>
            instant, nearly free and <br/>
            secured by Bitcoin itself. <br/>
            </Typography>
            </div>
          </Grid>


          {/* Second x/2 units */}
          <Grid item xs={5}>
            <div style={{ position: "relative", height: COMMON_HEIGHT }}>
              {/* Image 145 (imgs2Overlap1) scaled to 77% of original size */}
              <CardMedia
                component="img"
                image={imgs2Overlap1}
                alt=""
                style={{
                  width: '242px', // 77% of 315px
                  height: '385px', // 77% of 500px
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  objectFit: 'cover',
                  zIndex: 2, // Ensures this image is on top of the other where they overlap
                }}
              />
              {/* Image 147 (imgs2Overlap2) scaled to 77% of original size */}
              <CardMedia
                component="img"
                image={imgs2Overlap2}
                alt=""
                style={{
                  width: '199px', // 77% of 259px
                  height: '308px', // 77% of 400px
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  objectFit: 'cover',
                  zIndex: 1, // This will be under Image 145 in overlapping areas
                }}
              />
            </div>
          </Grid>

          {/* Last 1 unit */}
          <Grid item xs={1}>
            <div
              style={{
                position: "relative",
                height: COMMON_HEIGHT,
              }}
            >
              <CardMedia
                component="img"
                image={img3Comeback}
                alt=""
                style={{
                  width: '90px', // 77% of 90px
                  height: '90px', // 77% of 90px
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  objectFit: 'cover',
                }}
              />
            </div>
          </Grid>
          </>
            )}
        </Grid>
        </Box>
        {/* How it works */}
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <Typography variant="h1" component="h2">
                    How it works
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TileExplainer
                    title="1. Open a channel"
                    paragraph="You and another person set aside some bitcoin in a shared account on the Bitcoin blockchain. That takes one regular Bitcoin transaction."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TileExplainer
                    title="2. Pay off-chain"
                    paragraph="From then on you just update who owns how much, without touching the blockchain. Payments can pass through other people's channels to reach anyone, in about a second."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TileExplainer
                    title="3. Close & settle"
                    paragraph="When you're done, the final balances are written to the blockchain. If someone tries to cheat with an old balance, the other side can claim everything in the channel."
                />
            </Grid>
        </Grid>

        <div>&nbsp;</div>
        {/* Where it came from - the whitepaper */}
        <Grid container spacing={2} id="whitepaper" sx={{ scrollMarginTop: "16px" }}>
            <Grid item xs={12} md={3}>
                <Typography variant="h1" component="h2">
                    Where it came from
                </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
                <TileExplainer
                    title="The whitepaper (2016)"
                    paragraph={
                        <React.Fragment>
                            <p>
                                In January 2016, Joseph Poon and Thaddeus Dryja published the final version of
                                &quot;The Bitcoin Lightning Network&quot;. Their idea: instead of recording
                                every coffee on the blockchain, people open shared channels and pay each
                                other instantly inside them. Channels connect into a network, so you can pay
                                almost anyone. People started using it with real money in 2018.
                            </p>
                            <Box sx={{ display: "inline-block", mb: 1 }}>
                                <ButtonUniversal
                                    title="Read the whitepaper (PDF) >"
                                    color={ButtonColor.Pink}
                                    hoverColor={ButtonColor.PinkHover}
                                    textColor="white"
                                    actionDelegate={() => {
                                        window.open(WHITEPAPER_URL, "_blank", "noopener,noreferrer");
                                    }}
                                />
                            </Box>
                        </React.Fragment>
                    }
                />
            </Grid>
        </Grid>

        <div>&nbsp;</div>
        {/* What you get */}
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography variant="h1" component="h2">
                    What you get <br/>
                    as a user
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TileExplainer
                    image={transactionspeed}
                    title="Speed"
                    breakImageAndTitle={false}
                    paragraph="Payments go through in about a second. Scan, pay, done."
                />
                <TileExplainer
                    image={lowfees}
                    title="Low Fees"
                    breakImageAndTitle={false}
                    paragraph="Fees are usually less than a cent, far below the 1-3% many card processors charge shops."
                />
                <TileExplainer
                    image={scalability}
                    title="Scalability"
                    breakImageAndTitle={false}
                    paragraph="Most payments never touch the blockchain, so a single channel can handle thousands of payments, and Bitcoin only steps in to record the final result."
                />
                <TileExplainer
                    image={security}
                    title="Security"
                    breakImageAndTitle={false}
                    paragraph="Every channel is backed by real bitcoin. If you hold your own keys (your own wallet, not an exchange), nobody can freeze your money, and you can always close the channel and get your bitcoin back, even if the other side disappears."
                />
                <TileExplainer
                    image={privacy}
                    title="Privacy"
                    breakImageAndTitle={false}
                    paragraph="Your coffee isn't recorded on the public blockchain forever. And each stop along the payment's route only sees the stop before and after it, never the whole path."
                />
                <TileExplainer
                    image={worksEverywhere}
                    title="Works everywhere"
                    breakImageAndTitle={false}
                    paragraph="Lightning is an open network: any standard Lightning wallet can pay any Lightning shop, in any country, any time, with no bank or card company in between."
                />
            </Grid>
        </Grid>

        <div>&nbsp;</div>
        {/* See it live - network stats */}
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <Typography variant="h1" component="h2">
                    See it live
                </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
                <TileExplainer
                    title="Live network stats"
                    paragraph={
                        <React.Fragment>
                            <p>
                                See how many public nodes (computers running Lightning) and channels there are,
                                and how much bitcoin is in the network right now.
                            </p>
                            <Box sx={{ display: "inline-block", mb: 1 }}>
                                <ButtonUniversal
                                    title="Open mempool.space >"
                                    color={ButtonColor.Pink}
                                    hoverColor={ButtonColor.PinkHover}
                                    textColor="white"
                                    actionDelegate={() => {
                                        window.open(NETWORK_STATS_URL, "_blank", "noopener,noreferrer");
                                    }}
                                />
                            </Box>
                        </React.Fragment>
                    }
                />
            </Grid>
        </Grid>
        <div>&nbsp;</div>
        <Footer />
      </React.Fragment>
    );
};

export default WhyLightning;