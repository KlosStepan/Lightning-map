import React from "react";
import Grid from '@mui/material/Grid';
import Footer from "../components/Footer";
import { Container, CssBaseline, Paper } from "@mui/material";
import Typography from '@mui/material/Typography';
import ButtonUniversal from "../components/ButtonUniversal";


//
import SearchFiddle from "../components/SearchFiddle";
import SearchFiddle2 from "../components/SearchFiddle2";
//
import TileEshop from "../components/TileEshop";

import IconPlus from '../icons/ico-btn-plus.png';


function Eshops() {
    const FuncAddEshop = (): Promise<void> => {
        console.log("AddEshop")
        return Promise.resolve();
    }
    return (
        <React.Fragment>
            <div style={{ textAlign: 'center' }}>



                {/*<SearchFiddle2 />*/}
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
                        </Grid>
                        <Grid item xs={2}>
                            {/*2/12*/}
                            <ButtonUniversal icon={IconPlus} side="L" title="Add e-shop" color="red" textColor="white" actionDelegate={FuncAddEshop} />
                        </Grid>
                    </Grid>
                </Container>
                <div>
                    <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>
                        12 results
                    </p>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                        <Grid item xs={2}>
                            <TileEshop likes="7" logo="https://cdn.alza.cz/images/web-static/eshop-logos/alza_cz.svg" title="Alza.cz" caption="Nejvetsi prodejce elektroniky v CR" />
                        </Grid>
                    </Grid>                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}
export default Eshops;