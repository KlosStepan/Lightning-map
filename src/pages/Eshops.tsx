import React from "react";
//MUI
import { Container, Grid } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';
import Modal from "@mui/material/Modal";
//Components
import SearchFiddle from "../components/SearchFiddle";
import ButtonUniversal from "../components/ButtonUniversal";
import TileEshop from "../components/TileEshop";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import Footer from "../components/Footer";
//Router
import { useNavigate } from "react-router-dom";
//Redux
import { useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//TypeScript
import IEshop from "../ts/IEeshop";
//Forms - our custom
import FormAddEshop from "../forms/FormAddEshop";
//Icons
import IconPlus from '../icons/ico-btn-plus.png';

type EshopsProps = {
    //
};

const Eshops: React.FC<EshopsProps> = ({ }) => {
    const navigate = useNavigate();
    //
    const user = useSelector((state: RootState) => state.misc.user)
    //
    const eshops = useSelector((state: RootState) => state.data.eshops)
    //
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
    const FuncLoadMore = (): Promise<void> => {
        console.log("Load More");
        return Promise.resolve();
    }
    //Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //
    const dynamicPadding = (index: number) => {
        const spaceBetween = 8; // up and down space
        const spaceTile = 8; // between tiles space
        switch (index % 6) {
          case 0:
            return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px 0px !important` }; // Left-most tile
          case 5:
            return { padding: `${spaceBetween}px 0px ${spaceBetween}px ${spaceTile}px !important` }; // Right-most tile
          default:
            return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px ${spaceTile}px !important` }; // Middle tiles
        }
    };
    //
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm')); // true for xs and sm screens  
    //
    return (
        <React.Fragment>
            <div style={{ textAlign: 'center' }}>
                <Container>
                    <div>&nbsp;</div>
                    <Grid container spacing={2}>
                        <HrGreyCustomSeparator marginTop="0px" marginBottom="0px" />
                        <Grid item xs={12}  sm={4}>
                            <SearchFiddle />
                        </Grid>
                        <Grid item xs={12} sm={8}
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'center', sm: 'flex-end' }, // Center on mobile, align right on larger screens
                            }}
                        >
                            <ButtonUniversal 
                                icon={IconPlus} 
                                side="L" 
                                title="Add e-shop" 
                                color="#F23CFF" 
                                textColor="white" 
                                actionDelegate={FuncAddEshop} 
                                fullWidth={isPhone ? true :  false }
                            />
                        </Grid>
                        <HrGreyCustomSeparator marginTop="16px" marginBottom="16px" />
                    </Grid>
                </Container>
                <div>
                    <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer', color: '#6B7280' }}>
                        {eshops?.length ? eshops?.length : 'X'} results
                    </p>
                    <Grid container spacing={2} sx={{ marginRight: 0, marginLeft: 0 }}>
                        {eshops?.map((eshop: IEshop, index) => (
                            <Grid xs={12} sm={2} key={index} sx={isPhone ? {} : { ...dynamicPadding(index) }}>  {/* Apply padding only if not on a phone*/}
                                <TileEshop likes="7" tile={eshop} />
                            </Grid>
                        ))}
                    </Grid>
                    {/* Ready |Load More| btn for partial loding other stuff */}
                    {/*<div>
                        <ButtonUniversal 
                            title="Load more" 
                            color="#F23CFF" 
                            textColor="white" 
                            actionDelegate={FuncLoadMore} 
                            //fullWidth={isPhone ? true :  false }
                        />
                    </div>*/}
                </div>
            <Footer />
            </div>
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
};

export default Eshops;