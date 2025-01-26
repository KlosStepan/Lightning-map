import React from 'react';
import ADMenuButton from "../components/ADMenuButton";
import { Link } from 'react-router-dom';

//MUI
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

// 4x icon
import IcoADHome from '../icons/ad-home.png';
import IcoADPin from '../icons/ad-pin.png';
import IcoADShoppingBag from '../icons/ad-shopping-bag.png';
import IcoADUser from '../icons/ad-user.png';

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
                        {menuLinks.map(({ icon, title, path }, index) => (
                            <Grid item xs={3} key={index}>
                                <Link to={path} style={{ textDecoration: 'none' }}>
                                    <Box
                                        sx={{
                                            backgroundColor: 'white',
                                            //paddingBottom: 2,
                                            textAlign: 'center',
                                        }}
                                    >
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
