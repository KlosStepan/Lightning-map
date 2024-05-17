import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import CssBaseline from '@mui/material/CssBaseline';
//import Container from '@mui/material/Container';
import { Container, CssBaseline, Paper } from "@mui/material";
//import ThemeProvider from '@mui/material/styles/ThemeProvider'
//import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

//import createTheme from "@mui/material/styles/createTheme";
//
//import { ThemeProvider, createTheme } from "@mui/material/styles"
//import { createTheme } from '@mui/material';
//
import { useTheme } from '@mui/material/styles';

import { Card, CardMedia, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// New Components
import MenuC from './components/MenuC';
import TileBlogpost from './components/TileBlogpost';
import TileExplainer from './components/TileExplainer';
import TileMerch from './components/TileMerch';
//import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
//import AdbIcon from '@mui/icons-material/Adb';
//Images imports
import logo from './img/lightning-everywhere.png';
//
import transactionspeed from './img/Interface-Essential-Flash--Streamline-Pixel.png';
import lowfees from './img/Business-Products-Cash-User-Man-Message--Streamline-Pixel.png';
import privacyanddecentralization from './img/Interface-Essential-Lock--Streamline-Pixel.png';
//
import mapofspots from './img/Interface-Essential-Map--Streamline-Pixel.png';
import eshops from './img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';
//
import { theme } from "./theme"
import MiddleOfHomepage from './components/MiddleOfHomepage';
//
const pages = ["Map", "E-shops", "Why Lightning", "Blog", "About"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function App() {
    const theme = useTheme();
    console.log(theme)
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Dummy image URLs
    const dummyImageURL = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg';

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container justifyContent="center">
                <Grid item xs={10} md={8} lg={6}>
                    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <Container maxWidth="xl">
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
                                    <CardMedia
                                        component="img"
                                        image={logo}
                                        alt="Lightning Everywhere"
                                    />
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
                                        {pages.map((page) => (
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center">{page}</Typography>
                                            </MenuItem>
                                        ))}
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
                                    <MenuC pages={pages} />
                                    {/*
                                    {pages.map((page) => (
                                        <Button
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                            sx={{}}
                                        >
                                            / {page}
                                        </Button>
                                    ))}
                                */}
                                </Box>

                                <Box sx={{ flexGrow: 0 }}>
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
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <React.Fragment>
                        {/*<CssBaseline />*/}
                        <Container maxWidth="sm">
                            {/*<CssBaseline />*/}
                            <Box sx={{ /*bgcolor: '#cfe8fc', height: '20vh'*/ }}>
                                <Typography variant="h1" component="h1">
                                    Experience the Power of
                                    Lightning Network Everywhere </Typography>
                                <p>Discover spots and e-shops accepting payments via the Lightning Networkand enjoy instant transactions without unnecessary waiting or high fees.</p>

                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TileMerch caption="Map of Places" numPlaces="12" imageSrc={mapofspots} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TileMerch caption="E-shops" numPlaces="7" imageSrc={eshops} />
                                </Grid>
                            </Grid>
                            <p>&nbsp;</p>
                        </Container>
                    </React.Fragment>
                    <React.Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography variant="h1" component="h2">
                                    Why Lightning?
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <TileExplainer
                                    image={transactionspeed}
                                    title="Transaction Speed"
                                    paragraph="Bitcoin Lightning enables instant microtransactions off the main Bitcoin blockchain. This means users can make payments practically instantly, which is much faster than traditional blockchain transactions that can take several minutes to hours."
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TileExplainer
                                    image={lowfees}
                                    title="Low Fees"
                                    paragraph="Transaction fees with Bitcoin Lightning are typically much lower than with traditional on-chain transactions. This means that even when conducting frequent and small transactions, you can save on fees."
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TileExplainer
                                    image={privacyanddecentralization}
                                    title="Privacy and Decentralization"
                                    paragraph="Bitcoin Lightning enhances privacy and decentralization by allowing users to make more anonymous payments off the main blockchain. This boosts security and trust while reducing reliance on central authorities, making it more resistant to censorship and manipulation."
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                    <React.Fragment>
                        <MiddleOfHomepage />
                    </React.Fragment>
                    <React.Fragment>
                        <Typography variant="h1" component="h2">
                            Latest Blog Posts || See all -&gt;
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TileBlogpost
                                    title="Sample Blog Title 3"
                                    date="May 18, 2024"
                                    image={dummyImageURL}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TileBlogpost
                                    title="Sample Blog Title 2"
                                    date="Apr 18, 2024"
                                    image={dummyImageURL}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TileBlogpost
                                    title="Sample Blog Title 1"
                                    date="Mar 18, 2024"
                                    image={dummyImageURL}
                                />
                            </Grid>
                        </Grid>
                        <div>&nbsp;</div>
                    </React.Fragment>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}
export default App;
