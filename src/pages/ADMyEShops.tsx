import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import ADMenu from "../components/ADMenu";
import Button from '@mui/material/Button';
import ButtonUniversal from "../components/ButtonUniversal";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";

import TileAddedEshop from "../components/TileAddedEshop";

import IconPlus from '../icons/ico-btn-plus.png';
import Modal from "@mui/material/Modal";

type ADMyEShopsProps = {

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

    return (
        <React.Fragment>
            <Grid container>
                {/* Sidebar */}
                <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>

                {/* Main Content */}
                <Grid item xs={9}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Added e-shops
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal icon={IconPlus} side="L" title="Add e-shop" color="#F23CFF" textColor="white" actionDelegate={FuncAddEshop} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            {myEshops?.map((eshop, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                        {/*<TileAddedEshop
                                            image={eshop.logo} 
                                            likes={"12"} 
                                            title={eshop.name} 
                                            desc={eshop.description} 
                                        />*/}
                                        <TileAddedEshop
                                            likes={"12"}
                                            tile={eshop}
                                        />
                                    </Box>
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
              >
                <span>FormAdd Eshop</span>
            </Modal>
        </React.Fragment>
    )
}
export default ADMyEShops;