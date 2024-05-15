import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import CssBaseline from '@mui/material/CssBaseline';
//import Container from '@mui/material/Container';
import { Container, CssBaseline } from "@mui/material";
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
// Import your TTF font file
import myPixgamerFont from './myPixgamerFont';
import PixgamerRegularWoff from './fonts/PixgamerRegular-PKxO2.ttf';
//
import { theme } from "./theme"
//
const pages = ['Map', 'E-shops', 'Why Lightning', 'Blog', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
//
/*const theme = createTheme({
    typography: {
        fontFamily: 'PixGamer',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
          @font-face {
            font-family: 'PixGamer';
            font-style: normal;
            font-weight: normal;
            src: local('PixGamer'), local('PixGamer-Regular'), url(${PixgamerRegularWoff}) format('woff');
          }
        `,
        },
    },
});*/
// Define your custom theme
//https://stackoverflow.com/questions/57108085/self-host-font-added-in-material-ui-not-working
/*const theme = createTheme({
    typography: {
        fontFamily: 'PixGamer', // Ensure font family matches the font face name
        h1: {
            fontFamily: 'PixGamer', // Apply Pixgamer font to h1
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@global': {
                    '@font-face': [...myPixgamerFontArray],
                },
            },
        },
    },
    palette: {
        background: {
            default: '#F0F0F0', // Set your desired grey color
        },
    },
});*/


// Define the style for the new purple box
const purpleBoxStyle = {
    borderRadius: '24px',
    backgroundColor: '#8000FF',
    padding: '20px',
    position: 'relative', // Add position relative to the box
};

const textTopRightStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
};

const textBottomLeftStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
};

//Down 3 boxes for LN info
const containerOuterStyle = {
    //width: '315px',
    //height: '478px',
    padding: '32px 0px 0px 0px',
    gap: '10px',
    borderRadius: '24px 24px 24px 24px',
    opacity: '0px',
    backgroundColor: 'white', // Adding background color
};

const containerInnerStyle = {
    //width: '251px',
    //height: '414px',
    gap: '20px',
    opacity: '0px',
};

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

    return (
        <React.Fragment>
            {/*<CssBaseline />*/}
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
                                    {pages.map((page) => (
                                        <Button
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'grey', display: 'block' }}
                                        >
                                            / {page}
                                        </Button>
                                    ))}
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
                            <CssBaseline />
                            <Box sx={{ /*bgcolor: '#cfe8fc',*/ height: '20vh' }}>

                                <h1>Experience the Power of
                                    Lightning Network Everywhere </h1>
                                <p>Discover spots and e-shops accepting payments via the Lightning Networkand enjoy instant transactions without unnecessary waiting or high fees.</p>

                            </Box>
                            <Grid container spacing={2}>
                                {/* First container */}
                                <Grid item xs={6}>
                                    <Container maxWidth="sm">
                                        <Box sx={{ ...purpleBoxStyle, width: '236px', height: '150px', position: 'relative' }}>
                                            {/* Image */}
                                            <div style={{ width: '77px', height: '77px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                                <CardMedia
                                                    component="img"
                                                    image={mapofspots}
                                                    alt="Map of Spots"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover'/*, borderRadius: '50%'*/ }} // Adjusted to make the image circular
                                                />
                                            </div>
                                            {/* Text - Top right */}
                                            <Typography variant="subtitle1" sx={textTopRightStyle}>
                                                12
                                            </Typography>
                                            {/* Text - Bottom left */}
                                            <Typography variant="subtitle1" sx={textBottomLeftStyle}>
                                                Map of spots
                                            </Typography>
                                        </Box>
                                    </Container>
                                </Grid>

                                {/* Second container */}
                                <Grid item xs={6}>
                                    <Container maxWidth="sm">
                                        <Box sx={{ ...purpleBoxStyle, width: '236px', height: '150px', position: 'relative' }}>
                                            {/* Image */}
                                            <div style={{ width: '77px', height: '77px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                                <CardMedia
                                                    component="img"
                                                    image={eshops}
                                                    alt="E-shops"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover'/*, borderRadius: '50%'*/ }} // Adjusted to make the image circular
                                                />
                                            </div>
                                            {/* Text - Top right */}
                                            <Typography variant="subtitle1" sx={textTopRightStyle}>
                                                7
                                            </Typography>
                                            {/* Text - Bottom left */}
                                            <Typography variant="subtitle1" sx={textBottomLeftStyle}>
                                                E-shops
                                            </Typography>
                                        </Box>
                                    </Container>
                                </Grid>
                            </Grid>
                            <p>&nbsp;</p>
                        </Container>
                    </React.Fragment>
                    <React.Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                {/* Content for the first column */}
                                <h1>Why Lightning?</h1>
                            </Grid>
                            <Grid item xs={3}>
                                {/* Content for the second column */}
                                <Container maxWidth="sm" sx={containerOuterStyle}>
                                    <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
                                        <div style={{ width: 60, height: 60 }}>
                                            <CardMedia
                                                component="img"
                                                image={transactionspeed}
                                                alt="Transaction Speed"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h2 style={{ border: '1px solid black', padding: '10px' }}>Transaction Speed</h2>
                                        <p style={{ border: '1px solid black', padding: '10px' }}>
                                            Bitcoin Lightning enables instant microtransactions off the main Bitcoin blockchain. This means users can make payments practically instantly, which is much faster than traditional blockchain transactions that can take several minutes to hours.
                                        </p>
                                    </Box>
                                </Container>
                            </Grid>
                            <Grid item xs={3}>
                                <Container maxWidth="sm" sx={containerOuterStyle}>
                                    <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
                                        <div style={{ width: 60, height: 60 }}>
                                            <CardMedia
                                                component="img"
                                                image={lowfees}
                                                alt="Low Fees"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h2 style={{ border: '1px solid black', padding: '10px' }}>Low Fees</h2>
                                        <p style={{ border: '1px solid black', padding: '10px' }}>
                                            Transaction fees with Bitcoin Lightning are typically much lower than with traditional on-chain transactions. This means that even when conducting frequent and small transactions, you can save on fees.
                                        </p>
                                    </Box>
                                </Container>
                            </Grid>
                            <Grid item xs={3}>
                                <Container maxWidth="sm" sx={containerOuterStyle}>
                                    <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
                                        <div style={{ width: 60, height: 60 }}>
                                            <CardMedia
                                                component="img"
                                                image={privacyanddecentralization}
                                                alt="Privacy and Decentralization"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h2 style={{ border: '1px solid black', padding: '10px' }}>Privacy & Decentralization</h2>
                                        <p style={{ border: '1px solid black', padding: '10px' }}>
                                            Bitcoin Lightning enhances privacy and decentralization by allowing users to make more anonymous payments off the main blockchain. This boosts security and trust while reducing reliance on central authorities, making it more resistant to censorship and manipulation.
                                        </p>
                                    </Box>
                                </Container>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default App;
