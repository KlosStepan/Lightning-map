import React from "react";
//MUI
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
//Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
//Redux+RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";

type ADMyAccountProps = {
    //
};

const ADMyAccount: React.FC<ADMyAccountProps> = ({ }) => {
    //Debug
    //const debug = useSelector((state: RootState) => state.misc.debug);
    //if (debug) {
    //    console.log("debug")
    //}
    //Functions for MyAccount
    const FuncEdit = (): Promise<void> => {
        console.log("Edit")
        return Promise.resolve();
    }
    //Modal Stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //Phone detection
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <React.Fragment>
            <Grid container>
                {!isPhone && <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>}
                <Grid item md={9} xs={12}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    My Account
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <ButtonUniversal title="Edit" color="#F23CFF" textColor="white" actionDelegate={handleOpen} />

                            </Grid>
                        </Grid>
                        <div>Some user stuff goes here (depending on auth method I would say)</div>
                    </Box>
                </Grid>
            </Grid>
            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <div>Edit Modal stuff</div>
            </Modal>
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    )
}
export default ADMyAccount;