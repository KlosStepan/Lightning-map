import React from "react";
import { Box, Grid } from '@material-ui/core';
import { Container, CssBaseline } from "@mui/material";
import ButtonFiltering from "../components/ButtonFiltering";
import Footer from "../components/Footer";
import TileBlogpost from "../components/TileBlogpost";
import SearchFiddle from "../components/SearchFiddle";

//
function Map() {
    const dummyImageURL = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg';

    return (
        <React.Fragment>
            <Container>
                {/*<span >Search</span> || (1 Add e-shop)*/}
                <div>&nbsp;</div>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {/* 4/12 */}
                        <SearchFiddle />
                    </Grid>
                    <Grid item xs={6}>
                        {/*6/12*/}
                        <ButtonFiltering title="All" /> &nbsp;
                        <ButtonFiltering title="Food&Drinks" /> &nbsp;
                        <ButtonFiltering title="Shops" /> &nbsp;
                        <ButtonFiltering title="Services" /> &nbsp;
                    </Grid>
                    <Grid item xs={2}>
                        {/*2/12*/}
                        <ButtonFiltering title="+ Add spot" />
                    </Grid>
                </Grid>
            </Container>            <Grid container spacing={3}>
                {/* 7/12 width column */}

                <Grid item xs={7}>
                    <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>
                        12 results
                    </p>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TileBlogpost
                                title="How Bitcoin Lightning Revolutionizes Transaction Times"
                                date="Jan 8, 2024"
                                image={dummyImageURL}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileBlogpost
                                title="Exploring the Growing Ecosystem of Lightning-Enabled Businesses"
                                date="Jan 8, 2024"
                                image={dummyImageURL}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileBlogpost
                                title="The Role of Bitcoin Lightning in Financial Inclusion"
                                date="Jan 8, 2024"
                                image={dummyImageURL}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileBlogpost
                                title="How Bitcoin Lightning Revolutionizes Transaction Times"
                                date="Jan 8, 2024"
                                image={dummyImageURL}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileBlogpost
                                title="Exploring the Growing Ecosystem of Lightning-Enabled Businesses"
                                date="Jan 8, 2024"
                                image={dummyImageURL}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileBlogpost
                                title="The Role of Bitcoin Lightning in Financial Inclusion"
                                date="Jan 8, 2024"
                                image={dummyImageURL}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileBlogpost
                                title="How Bitcoin Lightning Revolutionizes Transaction Times"
                                date="Jan 8, 2024"
                                image={dummyImageURL}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/* 5/12 width column */}
                <Grid item xs={5}>
                    <Box style={{ height: 100, textAlign: 'center' }}>
                        {/*<div>Content 5/12</div>*/}
                        <div>https://snazzymaps.com/style/151/ultra-light-with-labels</div>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    )
}
export default Map;