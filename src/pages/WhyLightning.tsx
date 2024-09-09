import React from "react";
import { Grid, Typography, CardMedia, Box } from "@mui/material";
import Footer from "../components/Footer";
//import MiddleOfHomepage from "../components/MiddleOfHomepage";
import TileExplainer from "../components/TileExplainer";
//
import transactionspeed from '../img/Interface-Essential-Flash--Streamline-Pixel.png';
import lowfees from '../img/Business-Products-Cash-User-Man-Message--Streamline-Pixel.png';
import scalability from '../img/Business-Product-Startup-1--Streamline-Pixel.png';
import security from '../img/Interface-Essential-Lock--Streamline-Pixel-2.png';
import privacy from '../img/Coding-Apps-Websites-Shield-Lock--Streamline-Pixel.png'

// Importing images
import img1_magnet from '../img/Interface-Essential-Magnet--Streamline-Pixel.png';
import imgs2Overlap1 from '../img/rectangle_145.png'; // Image 145
import imgs2Overlap2 from '../img/rectangle_147.png'; // Image 147
import img3Comeback from '../img/Hand-Love--Streamline-Pixel.png';


// Define the common height
const COMMON_HEIGHT = '450px';

type WhyLightningProps = {};

const WhyLightning: React.FC<WhyLightningProps> = () =>{
//function WhyLightning() {
    return (
        <React.Fragment>
        <Box sx={{ minHeight: COMMON_HEIGHT, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
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
                alt="Magnet Image"
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
            Bitcoin Lightning Network is a <br/>
            second-layer technology <br/>
            designed to facilitate faster and <br/>
            cheaper transactions on the <br/>
            Bitcoin blockchain. <br/>
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
                alt="Image 145"
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
                alt="Image 147"
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
                alt="Comeback Image"
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
        </Grid>
        </Box>
        <React.Fragment>
            <div>&nbsp;</div>
        </React.Fragment>
        <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="h1" component="h2">
                            How it works
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <TileExplainer
                            //image={transactionspeed}
                            title="Opening a Channel"
                            paragraph="Two parties open a payment channel by creating a multi-signature address on the Bitcoin blockchain. This address holds a certain amount of Bitcoin deposited by both parties."
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TileExplainer
                            //image={lowfees}
                            title="Conducting Transactions"
                            paragraph="Once the channel is open, the parties can conduct an unlimited number of transactions off-chain. These transactions are almost instantaneous and incur negligible fees since they do not need to be recorded on the blockchain immediately."
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TileExplainer
                            //image={privacyanddecentralization}
                            title="Closing the Channel"
                            paragraph="When the parties decide to close the channel, the final balance of each party is recorded on the Bitcoin blockchain. This ensures that the integrity and security of the transactions are maintained."
                        />
                    </Grid>
                </Grid>
        </React.Fragment>
        <React.Fragment>
            <div>&nbsp;</div>
        </React.Fragment>
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h1" component="h2">
                        Benefits of Lightning <br/>
                        Bitcoin Lightning Bitcoin <br/>
                        offers several advantages <br/>
                        over traditional Bitcoin <br/>
                        transactions <br/>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TileExplainer
                            image={transactionspeed}
                            title="Speed"
                            breakImageAndTitle={false}
                            paragraph="When the parties decide to close the channel, the final balance of each party is recorded on the Bitcoin blockchain. This ensures that the integrity and security of the transactions are maintained."
                    />
                    <TileExplainer
                            image={lowfees}
                            title="Low Fees"
                            breakImageAndTitle={false}
                            paragraph="By minimizing the number of transactions recorded on the blockchain, Lightning Bitcoin reduces transaction fees, making microtransactions feasible."
                    />
                    <TileExplainer
                            image={scalability}
                            title="Scalability"
                            breakImageAndTitle={false}
                            paragraph="The Lightning Network can handle a significantly higher number of transactions per second compared to the Bitcoin blockchain, making it more scalable for widespread use."
                    />
                    <TileExplainer
                            image={security}
                            title="Security"
                            breakImageAndTitle={false}
                            paragraph="Despite being conducted off-chain, Lightning Bitcoin transactions retain the security features of the Bitcoin blockchain. The final settlement on the blockchain ensures the integrity and immutability of transactions."
                    />
                    <TileExplainer
                            image={privacy}
                            title="Privacy"
                            breakImageAndTitle={false}
                            paragraph="Since most transactions occur off-chain, users enjoy a higher degree of privacy compared to on-chain transaction."
                    />
                </Grid>
            </Grid>
        </React.Fragment>
        <Footer />
        </React.Fragment>
    )
}
export default WhyLightning;