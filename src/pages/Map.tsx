import React from "react";
import { Grid, Paper } from '@material-ui/core';

import Footer from "../components/Footer";

//
function Map() {
    return (
        <React.Fragment>
            <div>Search //TODO search || <b>(All)</b> (Food & Drinks) (Shops) (Services) //TODO tiles || (+ Add spot)//TODO btn</div>
            <Grid container spacing={3}>
                {/* 7/12 width column */}
                <Grid item xs={7}>
                    <Paper style={{ height: 100, textAlign: 'center' }}>
                        <div>Content 7/12</div>
                        <div>Stuff tiles etc.</div>
                        <div>
                            Big tile - chosen //TODO Component <br />
                            Small tile x3 0 not chosen  //TODO Component<br />
                        </div>
                    </Paper>
                </Grid>
                {/* 5/12 width column */}
                <Grid item xs={5}>
                    <Paper style={{ height: 100, textAlign: 'center' }}>
                        <div>Content 5/12</div>
                        <div>https://snazzymaps.com/style/151/ultra-light-with-labels</div>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    )
}
export default Map;