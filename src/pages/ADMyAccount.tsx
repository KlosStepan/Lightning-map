import React, { useRef } from "react";
//Components
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
//MUI
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import { Grid, Box, useMediaQuery, useTheme, TextField } from '@mui/material';
//Redux+RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
import { ButtonColor } from "../enums";

type ADMyAccountProps = {
    //
};

const ADMyAccount: React.FC<ADMyAccountProps> = () => {
    const [open, setOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false); // <-- Add here .... Edit changes it -> then img pick & different buttons.
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    // Get user from Redux
    const user = useSelector((state: RootState) => state.misc.user);

    // Refs for editing (optional, for future edit functionality)
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return (
        <React.Fragment>
            <Grid container>
                {!isPhone && (
                    <Grid item xs={3}>
                        <Box sx={{ padding: 2 }}>
                            <ADMenu />
                        </Box>
                    </Grid>
                )}
                <Grid item md={9} xs={12}>
                    <Box sx={{ padding: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    My Account
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                {editMode ? (
                                    <>
                                        <ButtonUniversal
                                            title="Cancel changes"
                                            color={ButtonColor.Purple}
                                            hoverColor={ButtonColor.PurpleHover}
                                            textColor="white"
                                            actionDelegate={() => setEditMode(false)}
                                            //style={{ marginRight: 8 }}
                                        />
                                        <ButtonUniversal
                                            title="Save changes"
                                            color={ButtonColor.Pink}
                                            hoverColor={ButtonColor.PinkHover}
                                            textColor="white"
                                            actionDelegate={() => {
                                                // TODO: Save logic here
                                                setEditMode(false);
                                            }}
                                        />
                                    </>
                                ) : (
                                    <ButtonUniversal
                                        title="Edit"
                                        color={ButtonColor.Pink}
                                        hoverColor={ButtonColor.PinkHover}
                                        textColor="white"
                                        actionDelegate={() => setEditMode(true)}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ padding: 3 }}>
                            {/*<Grid container spacing={2} alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="h1" component="h1">
                                        My Account
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} container justifyContent="flex-end">
                                    <ButtonUniversal
                                        title="Edit"
                                        color={ButtonColor.Pink}
                                        hoverColor={ButtonColor.PinkHover}
                                        textColor="white"
                                        actionDelegate={handleOpen}
                                    />
                                </Grid>
                            </Grid>*/}
                            <Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    First Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputRef={firstNameRef}
                                    value={user?.firstName || ""}
                                    disabled={!editMode}
                                />
                            </Box>
                            <Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    Last Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputRef={lastNameRef}
                                    value={user?.lastName || ""}
                                    disabled={!editMode}
                                />
                            </Box>
                            <Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    Email
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputRef={emailRef}
                                    value={user?.email || ""}
                                    disabled
                                />
                            </Box>
                            {!editMode? (<Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputRef={passwordRef}
                                    value="********"
                                    type="password"
                                    disabled
                                />
                            </Box>) : (<>
                            <div>Current password</div>
                            <div>New password</div>
                            </>
                            )}
                            <span>&nbsp;</span>
                            <p><u>Delete my account</u></p>
                        </Box>
                    </Grid>
                </Grid>
                
            </Grid>
            {/* Modal */}
            {/*<Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <Box>
                    <div>Edit Modal stuff</div>
                </Box>
            </Modal>*/}
            {/* Menu down - for phone */}
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADMyAccount;