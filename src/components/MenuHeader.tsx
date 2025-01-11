import React from "react"
//MUI
//import Box from '@mui/material/Box';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//MUI prolly del
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

//Images imports
import logo from '../img/lightning-everywhere.png';
import IconKey from "../icons/IconKey"; //Key for login account
//Router
import { Link } from 'react-router-dom';
//Redux
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";
//TypeScript
import ILink from "../ts/ILink";
//Icons
import hamburger from '../icons/hamburger.png';
import closeIcon2 from '../icons/close2.png';

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
            {/*<Typography
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
            </Typography>*/}

            {/* Mobile logo sizing here vv */}
            <Box
                sx={{
                    display: { /*xs: "none", md: "none"*/ },
                    color: "inherit",
                    textDecoration: "inherit",
                }}
            >
                <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
                    <CardMedia
                        component="img"
                        image={logo}
                        alt="Lightning Everywhere"
                        width="118"
                        height="40"
                    />
                </Link>
            </Box>

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
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 2,
                    //display: { xs: 'flex', md: 'none' },
                    display: { xs: 'none', md: 'none' },
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
                                /&nbsp;{page.title}
                            </Link>
                        </Button>
                    );
                })}

            </Box>

            <Box sx={{ flexGrow: 0, color: 'black' }}>
                <div style={{ fontFamily: 'PixGamer' }}>
                    {user ? (
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
            
            <Box>&nbsp;</Box>

            {/* here only on mobile vv */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 0 }}>
                {/* If anchorElUser is not null, show a CloseIcon */}
                {anchorElUser ? (
                    <Tooltip title="Close settings">
                        <IconButton onClick={handleCloseUserMenu} sx={{ p: 0 }}>
                            <Box
                                component="img"
                                src={closeIcon2}
                                alt="Open menu"
                            />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Box
                                component="img"
                                src={hamburger}
                                alt="Open menu"
                            />
                        </IconButton>
                    </Tooltip>
                )}
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
                    {pages.map((page) => (
                        <MenuItem key={page.title} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">/{page.title}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            {/* here only on mobile ^^ */}

        </Toolbar>
    )
};

export default MenuHeader;