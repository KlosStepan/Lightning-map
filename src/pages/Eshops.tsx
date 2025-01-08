import React from "react";
//import {  Grid } from '@material-ui/core';
//import Box from '@mui/material/Box';
import { Grid, Box } from "@mui/material";
import Footer from "../components/Footer";
import { Container, CssBaseline, Paper } from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import ButtonUniversal from "../components/ButtonUniversal";
import { Link, useNavigate } from "react-router-dom";
import Input from '@mui/material/Input';
//Redux
import { RootState } from "../redux-rtk/store";
import { useDispatch, useSelector } from 'react-redux';

import IEshop from "../ts/IEeshop";
//
import SearchFiddle from "../components/SearchFiddle";
import SearchFiddle2 from "../components/SearchFiddle2";
//
import TileEshop from "../components/TileEshop";

import IconPlus from '../icons/ico-btn-plus.png';
//
import closeIcon from '../icons/close.png';
//
import FormAddEshop from "../forms/FormAddEshop";
import ExampleGrid from "../components/_ExampleGrid";
const iconStyle = {
  width: 18, // Adjust icon size as needed
  height: 18,
};

//
type EshopsProps = {

};

const Eshops: React.FC<EshopsProps> = ({ }) => {
    const navigate = useNavigate();
    //
    const user = useSelector((state: RootState) => state.misc.user)
    //
    const eshops = useSelector((state: RootState) => state.data.eshops)
    //Mby to put blog flag check and write if debug
    ////console.log("eshops")
    ////console.log(eshops)
    const FuncAddEshop = (): Promise<void> => {
        console.log("AddEshop")
        if(!user) {
            navigate('/login')
        }
        else {
            console.log("logged in")
            handleOpen()
        }
        return Promise.resolve();
    }
    //Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //
    const FuncCancel = (): Promise<void> => {
      handleClose()
      return Promise.resolve();
    };
    const FuncSave = (): Promise<void> => {
      console.log("Saving")
      return Promise.resolve();
    };
    //
    const dynamicPadding = (index: number) => {
        const spaceBetween = 8; // Hardcoded padding value
        const spaceTile = 8;
        switch (index % 6) {
          case 0:
            return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px 0px !important` }; // Left tile
          case 5:
            return { padding: `${spaceBetween}px 0px ${spaceBetween}px ${spaceTile}px !important` }; // Right tile
          default:
            return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px ${spaceTile}px !important` }; // Middle tile
        }
      };
    return (
        <React.Fragment>
            <div style={{ textAlign: 'center' }}>
                <Container>
                    <div>&nbsp;</div>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <SearchFiddle />
                        </Grid>
                        <Grid item xs={4}>
                            <div>&nbsp;</div>
                        </Grid>
                        <Grid item xs={4}>
                            <ButtonUniversal icon={IconPlus} side="L" title="Add e-shop" color="#F23CFF" textColor="white" actionDelegate={FuncAddEshop} />
                        </Grid>
                    </Grid>
                </Container>
                <div>
                    <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer' }}>
                        {eshops?.length ? eshops?.length : 'X'} results
                    </p>
                    <Grid
                        container
                        spacing={2}
                        sx={{ marginRight: 0, marginLeft: 0 }} // Ensure no margins on the container
                    >
                        {eshops?.map((eshop: IEshop, index) => (
                            <Grid
                            //item
                            xs={12}
                            sm={2}
                            key={index}
                            sx={{
                                ...dynamicPadding(index), // Apply dynamic margins based on index
                            }}
                            >
                                <TileEshop 
                                    likes={"7"} 
                                    tile={eshop}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {/* tile={eshop} */}
                    {/*<Grid container spacing={2}>
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
                    </Grid>*/}
                    <ExampleGrid/>
                </div>
                <Footer />
            </div>
            {/*MODAL ATTEMPT*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
            >
                <FormAddEshop closeModal={handleClose} />
            </Modal>
        </React.Fragment>
    )
}
export default Eshops;