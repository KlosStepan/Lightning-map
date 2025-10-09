import React, { useRef, useState } from "react";
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
    const [editMode, setEditMode] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    // Get user from Redux
    const user = useSelector((state: RootState) => state.misc.user);

    // Refs for editing
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    //
    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    
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
                            {/* Display avatar value */}
                            <Typography variant="h2" component="h5">
                                Avatar:  {user?.avatar || "No avatar"}
                            </Typography>
                            {user?.avatar ? (
                                <Box sx={{ 
                                width: 100, 
                                height: 100, 
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '2px solid #eee'
                                }}>
                                    <img 
                                        src={`/avatars/${user.avatar}.png`}
                                        alt="User Avatar" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                            ) : (
                                <div>No avatar selected</div>
                            )}
                            <Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    First Name
                                </Typography>
                                <TextField
                                    //variant="outlined"
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
                                    //variant="outlined"
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
                                    //variant="outlined"
                                    fullWidth
                                    inputRef={emailRef}
                                    value={user?.email || ""}
                                    disabled
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: 'rgba(0, 0, 0, 0.23)', // Standard grey border
                                            },
                                            '&.Mui-disabled:hover fieldset': {
                                                borderColor: 'rgba(0, 0, 0, 0.23)', // Standard grey border for disabled state
                                                opacity: 0.5, // Keep opacity
                                            }
                                        },
                                    }}
                                />
                            </Box>
                            {/* Always show Password field (always disabled) */}


                            {/* Show these fields only in edit mode */}
                            {!editMode ?
                                                        <Box mt={2}>
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
                            </Box>
                            : (
                                <>
                                    <Box mt={2}>
                                        <Typography variant="h2" component="h5">
                                            Current password
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            inputRef={currentPasswordRef}
                                            type={showCurrentPassword ? "text" : "password"}
                                            InputProps={{
                                                endAdornment: (
                                                    <span
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => setShowCurrentPassword((v) => !v)}
                                                        title={showCurrentPassword ? "Hide" : "Show"}
                                                    >
                                                        {showCurrentPassword ? "🙈" : "👁️"}
                                                    </span>
                                                ),
                                            }}
                                        />
                                    </Box>
                                    <Box mt={2}>
                                        <Typography variant="h2" component="h5">
                                            New password
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            inputRef={newPasswordRef}
                                            type={showNewPassword ? "text" : "password"}
                                            InputProps={{
                                                endAdornment: (
                                                    <span
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => setShowNewPassword((v) => !v)}
                                                        title={showNewPassword ? "Hide" : "Show"}
                                                    >
                                                        {showNewPassword ? "🙈" : "👁️"}
                                                    </span>
                                                ),
                                            }}
                                        />
                                    </Box>
                                </>
                            )}

                            {/* Only show delete account when not in edit mode */}
                            {!editMode && (
                                <>
                                    <span>&nbsp;</span>
                                    <p><u>Delete my account</u></p>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADMyAccount;