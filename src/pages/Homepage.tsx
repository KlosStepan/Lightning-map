import React from "react";
import { Container, CssBaseline, Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardMedia, Grid } from '@mui/material';
import Footer from "../components/Footer";
// New Components
import MenuHeader from '../components/MenuHeader';
import TileBlogpost from '../components/TileBlogpost';
import TileExplainer from '../components/TileExplainer';
import TileTypeMerchant from '../components/TileTypeMerchant';
import MiddleOfHomepage from "../components/MiddleOfHomepage";
//
import transactionspeed from '../img/Interface-Essential-Flash--Streamline-Pixel.png';
import lowfees from '../img/Business-Products-Cash-User-Man-Message--Streamline-Pixel.png';
import privacyanddecentralization from '../img/Interface-Essential-Lock--Streamline-Pixel.png';
//
import mapofspots from '../img/Interface-Essential-Map--Streamline-Pixel.png';
import eshops from '../img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';

import { Link } from 'react-router-dom';

import dummyImg from '../img/dummy512x288.png';
import dummyImg1 from '../img/rectangle_149.png';
import dummyImg2 from '../img/rectangle_150.png';
import dummyImg3 from '../img/rectangle_151.png';

type HomepageProps = {

};

const Homepage: React.FC<HomepageProps> = ({ }) => {
    // Dummy image URLs
    const dummyImageURL = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg';
    //import dummyImg from '../img/dummy512x288.png';

    return (
        <React.Fragment>
            <React.Fragment>
                {/*<CssBaseline />*/}
                <Container maxWidth="sm">
                    {/*<CssBaseline />*/}
                    <Box sx={{ /*bgcolor: '#cfe8fc', height: '20vh'*/ }}>
                        <Typography variant="h1" component="h1">
                            Experience the Power of
                            Lightning Network Everywhere </Typography>
                        <p>Discover spots and e-shops accepting payments via the Lightning Network and enjoy instant transactions without unnecessary waiting or high fees.</p>

                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TileTypeMerchant caption="Map of Places" numPlaces="12" imageSrc={mapofspots} path="/map" />
                        </Grid>
                        <Grid item xs={6}>
                            <TileTypeMerchant caption="E-shops" numPlaces="7" imageSrc={eshops} path="/e-shops" />
                        </Grid>
                    </Grid>
                    <p>&nbsp;</p>
                </Container>
            </React.Fragment>
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="h1" component="h2">
                            Why Lightning?
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <TileExplainer
                            image={transactionspeed}
                            title="Transaction Speed"
                            paragraph="Bitcoin Lightning enables instant microtransactions off the main Bitcoin blockchain. This means users can make payments practically instantly, which is much faster than traditional blockchain transactions that can take several minutes to hours."
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TileExplainer
                            image={lowfees}
                            title="Low Fees"
                            paragraph="Transaction fees with Bitcoin Lightning are typically much lower than with traditional on-chain transactions. This means that even when conducting frequent and small transactions, you can save on fees."
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TileExplainer
                            image={privacyanddecentralization}
                            title="Privacy and Decentralization"
                            paragraph="Bitcoin Lightning enhances privacy and decentralization by allowing users to make more anonymous payments off the main blockchain. This boosts security and trust while reducing reliance on central authorities, making it more resistant to censorship and manipulation."
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
            <React.Fragment>
                <MiddleOfHomepage />
            </React.Fragment>
            <React.Fragment>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <Typography variant="h1" component="h2">
                            Latest Blog Posts
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                        <Typography variant="h2" component="h2">
                            See all &nbsp;
                            <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/blog" >
                                -&gt;
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TileBlogpost
                            title="How Bitcoin Lightning Revolutionizes Transaction Times"
                            date="Jan 8, 2024"
                            image={dummyImg1}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TileBlogpost
                            title="Exploring the Growing Ecosystem of Lightning-Enabled Businesses"
                            date="Jan 8, 2024"
                            image={dummyImg2}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TileBlogpost
                            title="The Role of Bitcoin Lightning in Financial Inclusion"
                            date="Jan 8, 2024"
                            image={dummyImg3}
                        />
                    </Grid>
                </Grid>
                <div>&nbsp;</div>
            </React.Fragment>
            <Footer />
        </React.Fragment>
    )
}
export default Homepage;