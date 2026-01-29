import React from "react"
//MUI
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
//Redux
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";
//Router
import { Link } from 'react-router-dom';
//TypeScript
import ILink from "../ts/ILink";

//Icons
import hamburger from '../icons/hamburger.png';
import closeIcon2 from '../icons/close2.png';
//Images imports
import logo from '../img/lightning-everywhere.png';
import IconKey from "../icons/IconKey"; //Key for login account

type MenuHeaderProps = {
    pages: ILink[];
    settings: string[];
};

const MenuHeader: React.FC<MenuHeaderProps> = ({ pages, settings }) => {
    // DEBUG
    const debug = useSelector((state: RootState) => state.misc.debug)
    // BLOG 
    const blogEnabled = useSelector((state: RootState) => state.misc.blog);

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

    // Small Avatar link component: prefer local avatar -> google avatarUrl -> default
    const AvatarLink: React.FC = () => {
        if (!user) {
            return (
                <Link style={{ color: "inherit", textDecoration: "inherit", fontSize: '18px' }} to="/login" aria-label="Login">
                    <IconKey /> LOGIN
                </Link>
            );
        }
        const src = user.avatar ? `/avatars/${user.avatar}.png` : (user.avatarUrl ?? '/avatars/default.png');
        return (
            <Link style={{ color: "inherit", textDecoration: "inherit", fontSize: '18px', display: 'flex', alignItems: 'center' }} to="/admin/dashboard" aria-label="Open dashboard">
                <img src={src} alt={user.firstName ?? 'User'} style={{ width: 28, height: 28, borderRadius: '50%' }} />
                <span style={{ marginLeft: 8 }}>{user.firstName}</span>
            </Link>
        );
    };

    // Conditionally log debug information
    if (debug) {
        console.log("<DEBUG> MenuHeader.tsx");
        console.log("user", user);
        console.log("</DEBUG> MenuHeader.tsx")
    }

    return (
        <Toolbar disableGutters>
            {/* Mobile logo sizing here vv */}
            <Box
                sx={{
                    color: "inherit",
                    textDecoration: "inherit",
                }}
            >
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
                        <CardMedia
                            component="img"
                            image={logo}
                            alt="Lightning Everywhere"
                            sx={{
                                height: '100%',
                                width: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
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
                        <Button key={page.title} onClick={handleCloseNavMenu}>
                            <Link style={{ color: "inherit", textDecoration: "inherit", textTransform: "none", fontFamily: "PixGamer", fontSize: "24px" }} to={page.link}>
                                /&nbsp;{page.title}
                            </Link>
                        </Button>
                    );
                })}

            </Box>

            <Box sx={{ flexGrow: 0, color: 'black' }}>
                <div style={{ fontFamily: 'PixGamer' }}>
                    <AvatarLink />
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
                    sx={{
                        mt: '45px',
                        width: { xs: '100%', md: 'auto' },
                        '& .MuiPaper-root': {
                            width: { xs: '100%', md: 'auto' },
                            left: 0,
                            marginTop: { xs: '10px', md: '0' },
                            borderRadius: { xs: 0, md: '4px' },
                        },
                    }}
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
                    {pages.map((page) => {
                        // Conditionally render the Blog item
                        if (page.title === "Blog" && !blogEnabled) return null;

                        return(
                            <MenuItem
                                key={page.title}
                                onClick={handleCloseUserMenu}
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontFamily: 'PixGamer',
                                    textAlign: 'center',
                                    display: 'flex',
                                    height: '100%',
                                }}
                            >
                                <Link style={{ color: "inherit", textDecoration: "inherit", textTransform: "none", fontFamily: "PixGamer", fontSize: "24px" }} to={page.link}>
                                    /&nbsp;{page.title}
                                </Link>
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Box>
            {/* here only on mobile ^^ */}

        </Toolbar>
    )
};

export default MenuHeader;