import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Card, CardMedia, createTheme, Grid, ThemeProvider } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
//import AdbIcon from '@mui/icons-material/Adb';
import logo from './img/lightning-everywhere.png';
import transactionspeed from './img/Interface-Essential-Flash--Streamline-Pixel.png';
import lowfees from './img/Business-Products-Cash-User-Man-Message--Streamline-Pixel.png';
import privacyanddecentralization from './img/Interface-Essential-Lock--Streamline-Pixel.png';
// Import your TTF font file
import PixgamerRegularWoff from './fonts/PixgamerRegular-PKxO2.ttf';
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
const theme = createTheme({
    typography: {
        fontFamily: 'PixGamer Regular', // Ensure font family matches the font face name
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@global': {
                    '@font-face': {
                        fontFamily: 'PixGamer Regular', // Font family name defined in your custom theme
                        src: `url('${PixgamerRegularWoff}') format('ttf')`,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                    },
                },
            },
        },
    },
});

const containerOuterStyle = {
    //width: '315px',
    //height: '478px',
    padding: '32px 0px 0px 0px',
    gap: '10px',
    borderRadius: '24px 0px 0px 0px',
    opacity: '0px',
};

const containerInnerStyle = {
    //width: '251px',
    //height: '414px',
    gap: '20px',
    opacity: '0px',
};

function App() {
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
        <ThemeProvider theme={theme}>
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
                <CssBaseline />
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: '#cfe8fc', height: '20vh' }}>
                        <h1>Experience the Power of
                            Lightning Network Everywhere </h1>
                        <p>Discover spots and e-shops accepting payments via the Lightning Networkand enjoy instant transactions without unnecessary waiting or high fees.</p>
                    </Box>
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
                            <Box sx={{ bgcolor: '#cfe8fc', ...containerInnerStyle }}>
                                <div style={{ width: '100%', height: '100%' }}>
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
                        {/* Content for the third column */}
                        <div style={{ width: 60, height: 60 }}>
                            <CardMedia
                                component="img"
                                image={lowfees}
                                alt="Low Fees"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h2>Low Fees</h2>
                        <p>Transaction fees with Bitcoin Lightning are typically much lower than with traditional on-chain transactions. This means that even when conducting frequent and small transactions, you can save on fees.</p>
                    </Grid>
                    <Grid item xs={3}>
                        {/* Content for the fourth column */}
                        <div style={{ width: 60, height: 60 }}>

                            <CardMedia
                                component="img"
                                image={privacyanddecentralization}
                                alt="Privacy and Decentralization"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h2>Privacy & Decentralization</h2>
                        <p>Bitcoin Lightning enhances privacy and decentralization by allowing users to make more anonymous payments off the main blockchain. This boosts security and trust while reducing reliance on central authorities, making it more resistant to censorship and manipulation.</p>
                    </Grid>
                </Grid>
            </React.Fragment>
        </ThemeProvider>
    );
}
export default App;
