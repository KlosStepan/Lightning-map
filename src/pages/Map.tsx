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

//
import dummyImgBigTile from '../img/image-1-3.png';
import dummyImgTile1 from '../img/image-1-4.png';
import dummyImgTile2 from '../img/image-1-5.png';
//
import GMap from "../components/GMap";

type MapProps = {

};

const filters = ["Food & Drinks", "Shops", "Services"];
const merchants = [
    {
      "geometry": {
        "coordinates": [14.4483471, 50.1033561],
        "type": "Point"
      },
      "properties": {
        "description": "lorem ipsum2",
        "owner": "OxMuB2PyqsM3pUtwTEmB86EzM9p1",
        "title": "Paralelní Polis",
        "visible": true,
        "tags": ["Shops", "Services"],
        "socials": [
          {
            "network": "web",
            "label": "Web",
            "link": "https://www.paralelnipolis.com"
          },
          {
            "network": "facebook",
            "label": "FB",
            "link": "https://www.facebook.com/paralelnipolis"
          },
          {
            "network": "instagram",
            "label": "IG",
            "link": "https://www.instagram.com/paralelnipolis"
          },
          {
            "network": "twitter",
            "label": "X",
            "link": "https://www.twitter.com/paralelnipolis"
          }
        ]
      },
      "type": "Feature"
    },
    {
      "geometry": {
        "coordinates": [14.4440644, 50.0719584],
        "type": "Point"
      },
      "properties": {
        "description": "lorem ipsum",
        "owner": "7G9IT4IfBBV2JV8UJDhiMPzYWOq2",
        "title": "Blue Vegan Pig Shop",
        "visible": true,
        "tags": ["Food&Drinks", "Shops"],
        "socials": [
          {
            "network": "web",
            "label": "Web",
            "link": "https://www.blueveganpigshop.com"
          },
          {
            "network": "facebook",
            "label": "FB",
            "link": "https://www.facebook.com/blueveganpigshop"
          },
          {
            "network": "instagram",
            "label": "IG",
            "link": "https://www.instagram.com/blueveganpigshop"
          },
          {
            "network": "twitter",
            "label": "X",
            "link": "https://www.twitter.com/blueveganpigshop"
          }
        ]
      },
      "type": "Feature"
    }
  ]
  
  
const Map: React.FC<MapProps> = ({ }) => {
    const dummyImageURL = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg';

    const FuncAll = (): Promise<void> => {
        console.log("All")
        return Promise.resolve();
    }
    const FuncFilt = (filter: string): Promise<void> => {
        if(filter=="All")
        {
            console.log("All pressed");
        }
        else
        {
            console.log("Filtering pressed: " + filter);
        }
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

                        <ButtonUniversal title="All" color="#8000FF" textColor="white" actionDelegate={() => FuncFilt("All")} />
                        
                        {filters.map((filter) => (
                            <ButtonUniversal
                                key={filter}
                                title={filter}
                                color="#FFFFFF"
                                textColor="black"
                                actionDelegate={() => FuncFilt(filter)}
                            />
                        ))}

                    </Grid>
                    <Grid item xs={2}>
                        {/*2/12*/}
                        <ButtonUniversal icon={IconPlus} side="L" title="Add spot" color="#F23CFF" textColor="white" actionDelegate={FuncAddSpot} />
                    </Grid>
                </Grid>
            </Container>
                <Grid container spacing={3}>
                {/* 7/12 width column */}

                <Grid item xs={7}>
                    <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>
                        12 results
                    </p>
                    <Grid container spacing={2}>
                        <TileMerchantBig
                            image={dummyImgBigTile}
                            categories={["Food & Drinks"]} // Add categories here
                            title="Blue Vegan Pig Shop"
                            address="Francouzská 240/76, 101 00 Praha 10-Vinohrady"
                            description="Nunc diam sed fermentum lectus non. At varius sed non arcu tempor lorem elementum id duis. Justo."
                            socials={["twitter.com/example", "facebook.com/example"]}
                            likes="7"
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TileMerchant
                                image={dummyImgTile1}
                                title="Palalelni Polis"
                                address="475/43, Dělnická, 170 00 Praha 7"
                                likes="12"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TileMerchant
                                image={dummyImgTile2}
                                title="Blue pig vegan shop"
                                address="Francouzská 240/76, 101 00 Praha 10-Vinohrady"
                                likes="7"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/* 5/12 width column */}
                <Grid item xs={5}>
                    <Box style={{ height: 100, textAlign: 'center' }}>
                        {/*<div>Content 5/12</div>*/}
                        <GMap/>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    );
};

export default Map;