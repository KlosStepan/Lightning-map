import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import CssBaseline from '@mui/material/CssBaseline';
//import Container from '@mui/material/Container';
import { Container, CssBaseline, Paper } from "@mui/material";
//import ThemeProvider from '@mui/material/styles/ThemeProvider'
//import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import MenuC from './components/MenuHeader';

//Pages
import Homepage from './pages/Homepage';
import Map from './pages/Map';
import Eshops from './pages/Eshops';
import WhyLightning from './pages/WhyLightning';
import Blog from './pages/Blog';
import About from './pages/About';

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
import MenuHeader from './components/MenuHeader';
//
const pages = ["Map", "E-shops", "Why Lightning", "Blog", "About"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function App() {
    const theme = useTheme();
    console.log(theme)
    //const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    //const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    /*const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };*/
    /*const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };*/

    /*const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };*/

    /*const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };*/

    // Dummy image URLs
    const dummyImageURL = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg';

    return (
        <Router>
            <CssBaseline />
            <Grid container justifyContent="center">
                <Grid item xs={10} md={8} lg={6}>
                    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <Container maxWidth="xl">
                            <MenuHeader pages={pages} settings={settings} />
                        </Container>
                    </AppBar>
                    <React.Fragment>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/eshops" element={<Eshops />} />
                            <Route path="/whylightning" element={<WhyLightning />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </React.Fragment>
                </Grid>
            </Grid>
        </Router >
    );
}
export default App;
