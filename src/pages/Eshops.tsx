import React from "react";
import {  Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
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
                        {eshops?.length} results
                    </p>
                    <Grid container spacing={2}>
                        {eshops?.map((eshop: IEshop) => (
                            <Grid item xs={2} key={"34"}>
                                <TileEshop 
                                likes={"7"} 
                                tile={eshop}
                            />
                            </Grid>
                        ))}
                    </Grid>
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
                </div>
                <Footer />
            </div>
            {/*MODAL ATTEMPT*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  style={{
                    borderRadius: '20px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 450,
                    backgroundColor: 'white',
                    padding: '16px',
                  }}
                >
                  <Typography id="modal-modal-title" variant="h1" component="h2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    New e-shop
                    <span
                        onClick={() => handleClose()}
                    >
                        <Box
                            component="img"
                            src={closeIcon}
                            alt="Custom Search Icon"
                            sx={iconStyle}
                            style={{
                                cursor: 'pointer',    // Shows pointer cursor on hover
                                //transition: 'opacity 0.3s ease', // Smooth transition effect for hover
                                opacity: 1,
                            }}
                          />
                    </span>
                  </Typography>
                  {/*<div>&nbsp;</div>*/}
                  <Typography id="modal-modal-description" style={{ marginTop: '16px' }}>
                  <Box mt={2}>
                      <Typography variant="h2" component="h5">Title</Typography>
                      <Input placeholder="Title" fullWidth />
                    </Box>
                    <Box mt={2}>
                      <Typography variant="h2" component="h5">Description</Typography>
                      <Input placeholder="Description" fullWidth />
                    </Box>
                    <Box mt={2}>
                      <Typography variant="h2" component="h5">Web</Typography>
                      <Input placeholder="Web" fullWidth />
                    </Box>
                    <Box mt={2} sx={{ width: '100%', border: '1px solid #000' }}>Upload Img</Box>
                    {/* Action Buttons */}
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <ButtonUniversal title="Cancel changes" color="#8000FF" textColor="white" actionDelegate={FuncCancel} />
                      <ButtonUniversal title="Save changes" color="#F23CFF" textColor="white" actionDelegate={FuncSave} />
                    </Box>
                  </Typography>
                </Box>
              </Modal>
        </React.Fragment>
    )
}
export default Eshops;