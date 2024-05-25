import React from "react";
import { Box, Grid } from '@material-ui/core';
import { Container, CssBaseline } from "@mui/material";
import ButtonFiltering from "../components/ButtonFiltering";
import Footer from "../components/Footer";

import SearchFiddle from "../components/SearchFiddle";

//
function Map() {
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
                    <Box style={{ height: 100, textAlign: 'center' }}>
                        <div>Content 7/12</div>
                        <div>Stuff tiles etc.</div>
                        <div>
                            Big tile - chosen //TODO Component <br />
                            Small tile x3 0 not chosen  //TODO Component<br />
                        </div>
                    </Box>
                </Grid>
                {/* 5/12 width column */}
                <Grid item xs={5}>
                    <Box style={{ height: 100, textAlign: 'center' }}>
                        <div>Content 5/12</div>
                        <div>https://snazzymaps.com/style/151/ultra-light-with-labels</div>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    )
}
export default Map;