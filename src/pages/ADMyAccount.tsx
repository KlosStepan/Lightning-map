import React, { useRef, useState } from "react";
// Components
import ADMenu from "../components/ADMenu";
import AvatarCircle from "../components/AvatarCircle";
import ButtonUniversal from "../components/ButtonUniversal";
// enums
import { ButtonColor } from "../enums";
// MUI
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import { Grid, Box, useMediaQuery, useTheme, TextField } from '@mui/material';
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";

type ADMyAccountProps = {
    //
};

const ADMyAccount: React.FC<ADMyAccountProps> = () => {
    //const [open, setOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    //const handleOpen = () => setOpen(true);
    //const handleClose = () => setOpen(false);
    const theme = useTheme();
    //
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const DEBUG = useSelector((state: RootState) => state.misc.debug);

    // Get user + owned entities from Redux
    const user = useSelector((state: RootState) => state.misc.user);
    const myMerchants = useSelector((state: RootState) => state.misc.userMerchants);
    const myEshops = useSelector((state: RootState) => state.misc.userEshops);

    // Avatar stuff
    const avatarList = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    const [avatar, setAvatar] = useState<number>(user?.avatar || 1);
    // Add this flag:
    const isGoogleUser = user?.authSource === "google";

    // Add these state hooks at the top of your component
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const emailRef = useRef<HTMLInputElement>(null);
    // Passwords - Current, New
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    // Eye Show Password - Current, New
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

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
            console.error("[ADMyAccount] handleDeleteAccount failed:", error);
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
                <Box sx={{ padding: 3 }}>
                    <Box sx={{ padding: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    My Account
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                {isGoogleUser ? (
                                    <Typography variant="h3" component="h3" sx={{ color: "#888" }}>
                                        You have SSO Google account
                                    </Typography>
                                ) : editMode ? (
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
                                            setAvatar(user?.avatar || 1);
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
                                {isGoogleUser ? (
                                    <>
                                        {/* Avatar only (Google avatarUrl or fallback) */}
                                        <Box mb={2}>
                                            {user?.avatarUrl ? (
                                                <Box
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        borderRadius: "50%",
                                                        overflow: "hidden",
                                                        border: "2px solid #eee",
                                                    }}
                                                >
                                                    <img
                                                        src={user.avatarUrl}
                                                        alt="User Avatar"
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    />
                                                </Box>
                                            ) : (
                                                <div>No avatar</div>
                                            )}
                                        </Box>

                                        <Box mt={2}>
                                            <Typography variant="h2" component="h5">
                                                Account type
                                            </Typography>
                                            <Typography sx={{ mt: 0.5, color: "#555" }}>
                                                You have SSO Google account.
                                            </Typography>
                                        </Box>

                                        <Box mt={2}>
                                            <Typography variant="h2" component="h5">
                                                Name
                                            </Typography>
                                            <Typography sx={{ mt: 0.5, color: "#555" }}>
                                                {user?.firstName} {user?.lastName}
                                            </Typography>
                                        </Box>

                                        <Box mt={2}>
                                            <Typography variant="h2" component="h5">
                                                Email
                                            </Typography>
                                            <Typography sx={{ mt: 0.5, color: "#555" }}>
                                                {user?.email}
                                            </Typography>
                                        </Box>

                                        {user?.googleId && (
                                            <Box mt={2}>
                                                <Typography variant="h2" component="h5">
                                                    Google ID
                                                </Typography>
                                                <Typography sx={{ mt: 0.5, color: "#888", fontFamily: "monospace" }}>
                                                    {user.googleId}
                                                </Typography>
                                            </Box>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {/* existing non-Google form, unchanged */}
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
                                                    <Box sx={{ /* box styles */ }}>
                                                        <img
                                                            src={`/avatars/${user.avatar}.png`}
                                                            alt="User Avatar"
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        />
                                                    </Box>
                                                ) : user?.avatarUrl ? (
                                                    <Box
                                                        sx={{
                                                            width: 100,
                                                            height: 100,
                                                            borderRadius: "50%",
                                                            overflow: "hidden",
                                                            border: "2px solid #eee",
                                                        }}
                                                    >
                                                        <img
                                                            src={user.avatarUrl}
                                                            alt="User Avatar"
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        />
                                                    </Box>
                                                ) : (
                                                    <div>No avatar selected</div>
                                                )
                                            )}
                                        </Box>
                                        {/* ...First Name, Last Name, Email, password fields as you have... */}
                                    </>
                                )}
                            </Box>
                        </Grid>
                        {/* Right: Debug/info panel */}
                        <>
                            <Box mt={3}>
                                <Typography variant="h2" component="h5">
                                    Limits
                                </Typography>
                                <Typography sx={{ mt: 0.5, color: "#555" }}>
                                    Spots / merchants:&nbsp;
                                    <b>
                                    {myMerchants?.length ?? 0}
                                        {" / "}
                                    {user?.maxMerchants}
                                    </b>
                                </Typography>
                                <Typography sx={{ mt: 0.5, color: "#555" }}>
                                    E-shops:&nbsp;
                                        <b>
                                        {myEshops?.length}
                                        {" / "}
                                        {user?.maxEshops}
                                        </b>
                                </Typography>
                            </Box>
                        {DEBUG && editMode ? (
                            <Grid item xs={12} md={6}>
                                <Box sx={{ padding: 3, borderRadius: 2, minHeight: 300 }}>
                                    <span>1. Validate `Current password`</span>
                                    <Box
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
                                    <span>2. Update User Profile Information</span>
                                    <Box
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
                                </Box>
                            </Grid>
                        ) : null}
                        </>
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