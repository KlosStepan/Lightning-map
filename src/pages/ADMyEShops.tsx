import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import ADMenu from "../components/ADMenu";
import Button from '@mui/material/Button';
import ButtonUniversal from "../components/ButtonUniversal";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import TileEshop from "../components/TileEshop";

import TileAddedEshop from "../components/TileAddedEshop";
import FormAddEshop from "../forms/FormAddEshop";

import IconPlus from '../icons/ico-btn-plus.png';
import Modal from "@mui/material/Modal";
//TypeScript
import IEshop from "../ts/IEeshop";

type ADMyEShopsProps = {
    //
};

const ADMyEShops: React.FC<ADMyEShopsProps> = ({ }) => {
    // State
    const user = useSelector((state: RootState) => state.misc.user)
    const eshops = useSelector((state: RootState) => state.data.eshops)
    
    // Data slicing
    let uid = user?.uid
    const myEshops = eshops?.filter((eshop) => eshop.owner === uid);
    
    console.log("cnt(myMerchants): " + myEshops?.length)
    
    const FuncAddEshop = (): Promise<void> => {
        console.log("AddEshop")
        handleOpen()
        return Promise.resolve();
    }

    //Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
    //Phone detect section 
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
    return (
        <React.Fragment>
            <Grid container>
                {/* Sidebar */}
                {!isPhone && <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>}

                {/* Main Content */}
                <Grid item md={9} xs={12}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Added {isPhone?"":"e-shops"}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal icon={IconPlus} side="L" title={isPhone?"Add":"Add e-shop"} color="#F23CFF" textColor="white" actionDelegate={FuncAddEshop} />
                            </Grid>
                        </Grid>
                        {/*<Grid container spacing={2}>
                            {myEshops?.map((eshop, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                        <TileAddedEshop likes={"12"} tile={eshop} />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>*/}
                        <p style={{ textAlign: 'left', marginLeft: '0px', fontFamily: 'Pixgamer', color: '#6B7280', paddingBottom:'2px' }}>
                            {/*eshops?.length ? eshops?.length : 'X'*/} {/*results*/}
                        </p>
                        <Grid container spacing={2} sx={{ marginRight: 0, marginLeft: 0 }}>
                        {eshops?.map((eshop: IEshop, index) => (
                            <Grid xs={12} sm={4} key={index} sx={isPhone ? {} : { ...dynamicPadding(index) }}>  {/* Apply padding only if not on a phone*/}
                                <TileAddedEshop likes="7" tile={eshop} />
                            </Grid>
                        ))}
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <FormAddEshop closeModal={handleClose}/>
            </Modal>
            {isPhone && <ADMenu/>}
        </React.Fragment>
    )
}
export default ADMyEShops;