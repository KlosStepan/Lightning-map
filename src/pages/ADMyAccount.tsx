import React, { useRef, useState } from "react";
//Components
import ADMenu from "../components/ADMenu";
import AvatarCircle from "../components/AvatarCircle";
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
    //
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const DEBUG = useSelector((state: RootState) => state.misc.debug);

    // Get user from Redux
    const user = useSelector((state: RootState) => state.misc.user);
    // Avatar stuff
    const avatarList = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    const [avatar, setAvatar] = useState<number>(user?.avatar || 1);


    // Refs for editing
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    // Two extra passwords - Edit
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    //const currentPasswordRef = useRef<HTMLInputElement>(null);
    //const newPasswordRef = useRef<HTMLInputElement>(null);
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    // Add these state hooks at the top of your component
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");

    // Modal Delete
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    //
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            // TODO: Call your API to delete the account
            // await fetch(...);
            // Optionally, log out or redirect the user
            setOpenDeleteModal(false);
        } catch (error) {
            // Handle error
        } finally {
            setIsDeleting(false);
        }
    };
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
                    {/*
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
                                            actionDelegate={() => {
                                                setFirstName(user?.firstName || "");
                                                setLastName(user?.lastName || "");
                                                setAvatar(user?.avatar || 1);
                                                setEditMode(false);
                                            }}
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
                                        actionDelegate={() => {
                                            setAvatar(user?.avatar || 1); // Reset avatar picker to current user avatar
                                            setEditMode(true);
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ padding: 3 }}>
                        <Box mb={2}>
                        {editMode ? (
                            <>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                                    {avatarList.map((avNum) => (
                                    <AvatarCircle
                                        key={avNum}
                                        n={avNum}
                                        fnct={setAvatar}
                                        selected={avatar === avNum}
                                    />
                                    ))}
                                </Box>
                            </>
                        ) : (
                            user?.avatar ? (
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
                            )
                        )}
                        </Box>
                            <Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    First Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    disabled={!editMode}
                                />
                            </Box>
                            <Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    Last Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
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
                            {!editMode && (
                                <>
                                    <div>&nbsp;</div>
                                    <span style={{ cursor: "pointer" }} onClick={handleOpenDeleteModal}><u>Delete my account</u></span>
                                </>
                            )}
                            {DEBUG && editMode && (
                                <>
                                    <div>&nbsp;</div>
                                    <div>&lt;DEBUG&gt;</div>
                                    <span style={{ color: "#888" }}>/api/logintest</span>
                                    <div>
                                        {`{email: ${user?.email}, password: ${currentPasswordRef.current?.value || ""}}`}
                                    </div>
                                    <div>&nbsp;</div>
                                    <span style={{ color: "#888" }}>/api/users</span>
                                    <div>
                                        {`{firstName: ${firstName}, lastName: ${lastName}, email: ${user?.email}, avatar: ${avatar}, newPassword: ${newPasswordRef.current?.value || ""}}`}
                                    </div>
                                    <div>&lt;/DEBUG&gt;</div>
                                </>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        THIS THIS THIS THIS
                    </Grid>
                    */}
                <Box sx={{ padding: 3 }}>
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
                                            actionDelegate={() => {
                                                setFirstName(user?.firstName || "");
                                                setLastName(user?.lastName || "");
                                                setAvatar(user?.avatar || 1);
                                                setEditMode(false);
                                            }}
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
                                        actionDelegate={() => {
                                            setAvatar(user?.avatar || 1); // Reset avatar picker to current user avatar
                                            setEditMode(true);
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container spacing={2} alignItems="flex-start">
                        {/* Left: Main form */}
                        <Grid item xs={12} md={6}>
                   <Box sx={{ padding: 3 }}>
                        <Box mb={2}>
                        {editMode ? (
                            <>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                                    {avatarList.map((avNum) => (
                                    <AvatarCircle
                                        key={avNum}
                                        n={avNum}
                                        fnct={setAvatar}
                                        selected={avatar === avNum}
                                    />
                                    ))}
                                </Box>
                            </>
                        ) : (
                            user?.avatar ? (
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
                            )
                        )}
                        </Box>
                            <Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    First Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    disabled={!editMode}
                                />
                            </Box>
                            <Box mt={2}>
                                <Typography variant="h2" component="h5">
                                    Last Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
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
                                            value={currentPassword}
                                            onChange={e => setCurrentPassword(e.target.value)}
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
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
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
                            {!editMode && (
                                <>
                                    <div>&nbsp;</div>
                                    <span style={{ cursor: "pointer" }} onClick={handleOpenDeleteModal}><u>Delete my account</u></span>
                                </>
                            )}
                            </Box>
                        </Grid>
                        {/* Right: Debug/info panel */}
                        {DEBUG && editMode ? (
                            <Grid item xs={12} md={6}>
                                <Box sx={{ padding: 3, borderRadius: 2, minHeight: 300 }}>
                                    {/*<div>&lt;DEBUG&gt;</div>
                                    <div>&nbsp;</div>*/}
                                    1. Validate `Current password` <Box
                                        style={{
                                            border: "1px solid #333333",
                                            borderRadius: 4,
                                            padding: "2px 10px",
                                            margin: 16,
                                        }}
                                    >
                                        <span style={{ color: "#888" }}>POST -&gt; <u>/api/logintest</u></span>
                                        <div style={{ fontFamily: "monospace", marginTop: 8 }}>
                                            {`{email: ${user?.email}, password: ${currentPassword}}`}
                                        </div>
                                    </Box>
                                    2. Update User Profile Information <Box
                                        style={{
                                            border: "1px solid #333333",
                                            borderRadius: 4,
                                            padding: "2px 10px",
                                            margin: 16,
                                        }}
                                    >
                                        <span style={{ color: "#888" }}>POST -&gt; <u>/api/users</u></span>
                                        <div style={{ fontFamily: "monospace", marginTop: 8 }}>
                                            {`{firstName: ${firstName}, lastName: ${lastName}, email: ${user?.email}, avatar: ${avatar}, newPassword: ${newPassword}}`}
                                        </div>
                                    </Box>
                                    {/*<div>&lt;/DEBUG&gt;</div>*/}
                                </Box>
                            </Grid>
                        ) : null}
                    </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-delete-account"
                aria-describedby="modal-delete-account-description"
                style={{ overflow: 'scroll' }}
            >
                <Box
                    sx={{
                        borderRadius: '20px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: 'white',
                        p: 4,
                    }}
                >
                    <Typography id="modal-delete-account" variant="h1" component="h2">
                        Delete My Account
                    </Typography>
                    <Typography id="modal-delete-account-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
                        <ButtonUniversal
                            title="Cancel"
                            color={ButtonColor.Purple}
                            hoverColor={ButtonColor.PurpleHover}
                            textColor="white"
                            actionDelegate={handleCloseDeleteModal}
                        />
                        <ButtonUniversal
                            title={isDeleting ? "Deleting..." : "Delete"}
                            color={ButtonColor.Pink}
                            hoverColor={ButtonColor.PinkHover}
                            textColor="white"
                            actionDelegate={handleDeleteAccount}
                            disabled={isDeleting}
                        />
                    </Box>
                </Box>
            </Modal>
            {isPhone && <ADMenu/>}
        </React.Fragment>
    );
};

export default ADMyAccount;