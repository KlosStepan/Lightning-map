import React from "react";
import { Box, Grid } from '@material-ui/core';
import { Container } from "@mui/material";
import ButtonUniversal from "../components/ButtonUniversal";
import SearchFiddle from "../components/SearchFiddle";
import Footer from "../components/Footer";
import TileMerchantBig from "../components/TileMerchantBig";
import TileMerchant from "../components/TileMerchant";
import IconPlus from '../icons/ico-btn-plus.png';
import GMap from "../components/GMap";
import { useDispatch, useSelector } from 'react-redux';
import { setFiltering } from "../redux-rtk/mapFilteringSlice";
import { RootState } from "../redux-rtk/store";  // Assuming you have a RootState type defined in your Redux store
import IMerchant from "../ts/IMerchant";

const filters = ["Food & Drinks", "Shops", "Services"];
const merchants: IMerchant[] = [
    {
      "geometry": {
        "coordinates": [14.4483471, 50.1033561],
        "type": "Point"
      },
      "properties": {
        "owner": "OxMuB2PyqsM3pUtwTEmB86EzM9p1",
        "visible": true,
        "image": "dummyImgTile1",
        "title": "Paralelní Polis",
        "description": "lorem ipsum2",
        address: {
          address: "Dělnická 43",
          city: "Praha 7",
          postalCode: "170 00",
        },
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
        "owner": "7G9IT4IfBBV2JV8UJDhiMPzYWOq2",
        "visible": true,
        "image": "dummyImgTile2",
        "title": "Blue Vegan Pig Shop",
        "description": "lorem ipsum",
        address: {
          address: "Štefánikova 6",
          city: "Praha 5",
          postalCode: "150 00",
        },
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
const Map: React.FC = () => {
    const dispatch = useDispatch();
    const activeFilters = useSelector((state: RootState) => state.mapFiltering.filters);  // Get active filters from Redux state

    const FuncFilt = (filter: string): Promise<void> => {
        dispatch(setFiltering(filter));
        return Promise.resolve();
    };

    const FuncAddSpot = (): Promise<void> => {
        console.log("AddSpot");
        return Promise.resolve();
    };

    return (
        <React.Fragment>
            <Container>
                <div>&nbsp;</div>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <SearchFiddle />
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonUniversal
                            title="All"
                            color={activeFilters["All"] ? "#8000FF" : "#FFFFFF"}  // Purple if All is active
                            textColor={activeFilters["All"] ? "white" : "black"}
                            actionDelegate={() => FuncFilt("All")}
                        />

                        {filters.map((filter) => (
                            <ButtonUniversal
                                key={filter}
                                title={filter}
                                color={activeFilters[filter] ? "#8000FF" : "#FFFFFF"}  // Purple if filter is active
                                textColor={activeFilters[filter] ? "white" : "black"}
                                actionDelegate={() => FuncFilt(filter)}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={2}>
                        <ButtonUniversal
                            icon={IconPlus}
                            side="L"
                            title="Add spot"
                            color="#F23CFF"
                            textColor="white"
                            actionDelegate={FuncAddSpot}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>12 results</p>
                    <Grid container spacing={2}>
                        <TileMerchantBig tile={merchants[0].properties} />
                    </Grid>
                    <Grid container spacing={2}>
                        {merchants.map((merchant) => (
                            <Grid item xs={4} key={merchant.properties.owner}>
                                <TileMerchant tile={merchant.properties} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Box style={{ height: 100, textAlign: 'center' }}>
                        <GMap />
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    );
};

export default Map;
