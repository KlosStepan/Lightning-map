import React from "react";
import { Box, Grid } from '@material-ui/core';
import { Container, CssBaseline } from "@mui/material";
//
import ButtonUniversal from "../components/ButtonUniversal";

import SearchFiddle from "../components/SearchFiddle";
import Footer from "../components/Footer";
// OUT vv
import TileBlogpost from "../components/TileBlogpost";
//
import TileMerchantBig from "../components/TileMerchantBig";
import TileMerchant from "../components/TileMerchant";

//
import IconPlus from '../icons/ico-btn-plus.png';
// Prepare types, push object into component
function Map() {
    const dummyImageURL = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg';

    const FuncAll = (): Promise<void> => {
        console.log("All")
        return Promise.resolve();
    }
    const FuncFD = (): Promise<void> => {
        console.log("Food&Drinks")
        return Promise.resolve();
    }
    const FuncShops = (): Promise<void> => {
        console.log("Shops")
        return Promise.resolve();
    }
    const FuncServices = (): Promise<void> => {
        console.log("Services")
        return Promise.resolve();
    }
    const FuncAddSpot = (): Promise<void> => {
        console.log("AddSpot")
        return Promise.resolve();
    }

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

                        <ButtonUniversal title="All" color="#8000FF" textColor="white" actionDelegate={FuncAll} />
                        <ButtonUniversal title="Food & Drinks" color="#FFFFFF" textColor="black" actionDelegate={FuncFD} />
                        <ButtonUniversal title="Shops" color="#FFFFFF" textColor="black" actionDelegate={FuncShops} />
                        <ButtonUniversal title="Services" color="#FFFFFF" textColor="black" actionDelegate={FuncServices} />
                    </Grid>
                    <Grid item xs={2}>
                        {/*2/12*/}
                        <ButtonUniversal icon={IconPlus} side="L" title="Add spot" color="#F23CFF" textColor="white" actionDelegate={FuncAddSpot} />
                    </Grid>
                </Grid>
            </Container>            <Grid container spacing={3}>
                {/* 7/12 width column */}

                <Grid item xs={7}>
                    <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>
                        12 results
                    </p>
                    <Grid container spacing={2}>
                        <TileMerchantBig
                            title="How Bitcoin Lightning Revolutionizes Transaction Times"
                            image={dummyImageURL}
                            categories={["Finance", "Technology"]} // Add categories here
                            address="123 Bitcoin St."
                            socials={["twitter.com/example", "facebook.com/example"]}
                            likes="1024"
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TileBlogpost
                                title="How Bitcoin Lightning Revolutionizes Transaction Times"
                                date="Jan 8, 2024"
                                image={dummyImageURL}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileMerchant
                                image={dummyImageURL}
                                title="Blue pig vegan shop"
                                address="Vrsovice"
                                likes="7"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileMerchant
                                image={dummyImageURL}
                                title="Palalelni polis"
                                address="Holesovice"
                                likes="7"
                            />
                        </Grid>

                    </Grid>
                </Grid>
                {/* 5/12 width column */}
                <Grid item xs={5}>
                    <Box style={{ height: 100, textAlign: 'center' }}>
                        {/*<div>Content 5/12</div>*/}
                        <div>https://snazzymaps.com/style/151/ultra-light-with-labels</div>
                        <div>&nbsp;</div>
                        <div>https://javascript.plainenglish.io/add-a-google-map-to-your-react-app-with-a-snazzy-maps-style-38781edcdc7a</div>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    )
}
export default Map;