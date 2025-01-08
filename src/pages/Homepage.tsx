import React from "react";
//MUI
import { Container, Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Components
import HomepageEvidenceSection from "../components/HomepageEvidenceSection";
import WhyLightning from "../components/WhyLightning";
import MiddleOfHomepage from "../components/MiddleOfHomepage";
import TileBlogpost from '../components/TileBlogpost';
import Footer from "../components/Footer";
//Redux
import { RootState } from "../redux-rtk/store";
import { useSelector } from 'react-redux';
//
import { Link } from 'react-router-dom';
//Fake images
import dummyImg1 from '../img/rectangle_149.png';
import dummyImg2 from '../img/rectangle_150.png';
import dummyImg3 from '../img/rectangle_151.png';

type HomepageProps = {

};

const Homepage: React.FC<HomepageProps> = ({ }) => {
    //BLOG
    const blogEnabled = useSelector((state: RootState) => state.misc.blog) 

    const merchants = useSelector((state: RootState) => state.data.merchants)
    ////console.log("merchants")
    ////console.log(merchants)
    const eshops = useSelector((state: RootState) => state.data.eshops)
    ////console.log("eshops")
    ////console.log(eshops)

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
                    <HomepageEvidenceSection
                        merchants={merchants ? merchants.length : undefined}
                        eshops={eshops ? eshops.length : undefined}
                    />
                    <p>&nbsp;</p>
                </Container>
            </React.Fragment>
            <React.Fragment>
                <WhyLightning/>
            </React.Fragment>
            <React.Fragment>
                <MiddleOfHomepage />
            </React.Fragment>
            
            {blogEnabled && (
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
                                <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/blog">
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
            )}
            <Footer />
        </React.Fragment>
    );
};

export default Homepage;