import React from 'react';
import ADMenuButton from "../components/ADMenuButton";
import { Link } from 'react-router-dom';

//MUI
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

//Redux+RTK
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";

// 4x icon
import IcoADHome from '../icons/ad-home.png';
import IcoADPin from '../icons/ad-pin.png';
import IcoADShoppingBag from '../icons/ad-shopping-bag.png';
import IcoADUser from '../icons/ad-user.png';
//
import HrGreyCustomSeparator from "./HrGreyCustomSeparator";

type ADMenuProps = { 
    //ADMenuProps
}

const linkStyle = {
    color: "inherit",
    textDecoration: "inherit",
    //fontSize: '18px',
};

const iconStyle = {
    width: 24,
    height: 24,
    //marginRight: 2,
};

const ADMenu: React.FC<ADMenuProps> = ({ }) => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
        // Array to store link data
    const menuLinks = [
        { icon: IcoADHome, title: "Dashboard", path: "/admin/dashboard" },
        { icon: IcoADPin, title: "My spots", path: "/admin/my-spots" },
        { icon: IcoADShoppingBag, title: "My e-shops", path: "/admin/my-eshops" },
        { icon: IcoADUser, title: "My account", path: "/admin/my-account" }
    ];
    const menuAdminLinks = [
        { icon: IcoADUser, title: "Manage users", path: "/admin/manage-users"},
        { icon: IcoADUser, title: "Approve new entries", path: "/admin/new-entries"},
        { icon: IcoADUser, title: "Likes (🗲)", path:"/admin/likes"},
        { icon: IcoADUser, title: "Reports ( ! )", path:"/admin/reports"}
        //{ icon: null, title: "XXX", path:"/admin/xxx"}
    ];
    //
    const user = useSelector((state: RootState) => state.misc.user);
    return (
        <React.Fragment>
        {!isPhone ?  (
            <React.Fragment>
                {/*<ADMenuButton icon={IcoADHome} title="Dashboard" path="/admin/dashboard" />
                <ADMenuButton icon={IcoADPin} title="My spots" path="/admin/my-spots" />
                <ADMenuButton icon={IcoADShoppingBag} title="My e-shops" path="/admin/my-eshops" />
                <ADMenuButton icon={IcoADUser} title="My account" path="/admin/my-account" />*/}
                {menuLinks.map(({ icon, title, path }, index) => (
                    <ADMenuButton icon={icon} title={title} path={path} />
                ))}
                
                {/* Only show admin menu if user is logged in and has the specific email */}
                {user && user.email === "stepanklos@gmail.com" && (
                    <>
                        <span>&nbsp;</span>
                        {menuAdminLinks.map(({ icon, title, path }, index) => (
                            <ADMenuButton key={index} icon={icon} title={title} path={path} />
                        ))}
                    </>
                )}
            </React.Fragment>)
            : (
                <Box
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: 24,
                        maxWidth: 600,
                        paddingBottom: 2,
                        outline: 'none',
                        border: 'none',
                    }}
                >
                    <Grid container spacing={2}>
                        {/* Show admin menu at the top if user is admin */}
                        {user && user.email === "stepanklos@gmail.com" && (
                            <>
                                {menuAdminLinks.map(({ icon, title, path }, index) => (
                                    <Grid item xs={3} key={index}>
                                        <Link to={path} style={{ textDecoration: 'none' }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Box component="img" src={icon} alt={title} sx={{ width: 24, height: 24 }} />
                                            </Box>
                                        </Link>
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <HrGreyCustomSeparator marginTop="0px" marginBottom="0px" />
                                </Grid>
                            </>
                        )}
    
                        {/* Normal menu below admin menu */}
                        {menuLinks.map(({ icon, title, path }, index) => (
                            <Grid item xs={3} key={index}>
                                <Link to={path} style={{ textDecoration: 'none' }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Box component="img" src={icon} alt={title} sx={{ width: 24, height: 24 }} />
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </React.Fragment>   
    )
}

export default ADMenu;
