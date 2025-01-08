import React from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Card, CardMedia, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

//Images imports
import logo from '../img/lightning-everywhere.png';
//
import IconKey from "../icons/IconKey";
//
import { Link } from 'react-router-dom';
import ILink from "../ts/ILink";
//Redux
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";

type MenuHeaderProps = {
    pages: ILink[];
    settings: string[];
};

const MenuHeader: React.FC<MenuHeaderProps> = ({ pages, settings }) => {
    // DEBUG
    const debug = useSelector((state: RootState) => state.misc.debug)
    // BLOG 
    const blogEnabled = useSelector((state: RootState) => state.misc.blog); // Get blog state from Redux

    //
    const user = useSelector((state: RootState) => state.misc.user)
    //
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    
    const handleCloseNavMenu = () => {
        console.log("handleCloseNavMenu");
        setAnchorElNav(null);
    };
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log("handleOpenNavMenu");
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log("handleOpenUserMenu");
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        console.log("handleCloseUserMenu");
        setAnchorElUser(null);
    };


    // Conditionally log debug information
    if (debug) {
        console.log("<DEBUG> MenuHeader.tsx");
        console.log("user", user);
        console.log("</DEBUG> MenuHeader.tsx")
    }

    return (
        <Toolbar disableGutters>
            {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    //: 'inherit',
                    textDecoration: 'none',
                }}
            >
                <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
                    <CardMedia
                        component="img"
                        image={logo}
                        alt="Lightning Everywhere"
                    />
                </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    {/*<MenuIcon />*/}
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {pages.map((page) => {
                        // Conditionally render the Blog item
                        if (page.title === "Blog" && !blogEnabled) return null;

                        return (
                            <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page.title}</Typography>
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Box>
            {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                <CardMedia
                    component="img"
                    width="164"
                    height="51"
                    image={logo}
                    alt="Lightning Everywhere"
                />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {pages.map((page) => {
                    // Conditionally render the Blog item
                    if (page.title === "Blog" && !blogEnabled) return null;
                    
                    return (
                        <Button
                            key={page.title}
                            onClick={handleCloseNavMenu}
                        >
                            <Link style={{ color: "inherit", textDecoration: "inherit", textTransform: "none", fontFamily: "PixGamer", fontSize: "24px" }} to={page.link}>
                                / {page.title}
                            </Link>
                        </Button>
                    );
                })}

            </Box>

            {/*<Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>*/}

            <Box sx={{ flexGrow: 0, color: 'black' }}>
                <div style={{ fontFamily: 'PixGamer' }}>
                    {user ? (
                        // Render user displayName if user is logged in
                        //<Link style={{ color: "inherit", textDecoration: "inherit", fontSize: '18px' }} to="/login">
                        //    {user.photoURL && <img src={user.photoURL} alt={user.displayName ?? 'User'} />} &nbsp;
                        //    {user.displayName}
                        //</Link>
                        <Link style={{ color: "inherit", textDecoration: "inherit", fontSize: '18px', display: 'flex', alignItems: 'center' }} to="/login">
                            {user.photoURL && (
                                <img 
                                    src={user.photoURL} 
                                    alt={user.displayName ?? 'User'} 
                                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                                />
                            )}
                            &nbsp;
                            {' ' + user.displayName}
                        </Link>
                    ) : (
                        // Otherwise, render the IconKey and LOGIN
                        <Link style={{ color: "inherit", textDecoration: "inherit", fontSize: '18px' }} to="/login">
                            <IconKey /> LOGIN
                        </Link>
                    )}
                </div>
            </Box>
        </Toolbar>
    )
}
export default MenuHeader;