import React from "react";
import Grid from '@mui/material/Grid';
import Footer from "../components/Footer";
//
import SearchFiddle from "../components/SearchFiddle";
import SearchFiddle2 from "../components/SearchFiddle2";
//
import TileEshop from "../components/TileEshop";

function Eshops() {
    return (
        <React.Fragment>
            <div style={{ textAlign: 'center' }}>
                {/*
                <SearchFiddle />
                <SearchFiddle2 />*/}
                <div>
                    Search || (1 Add e-shop)
                </div>
                <div>
                    <div>12 results</div>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <p>Item 2</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>Item 3</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>Item 4</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>Item 5</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>Item 6</p>
                        </Grid>
                    </Grid>
                    <div>B7 (1/6) | B8 (1/6) | B9 (1/6) | B10 (1/6) | B11 (1/6) | B12 (1/6)</div>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}
export default Eshops;