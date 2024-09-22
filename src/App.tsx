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
//Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./components/Firebase";
//Pages
import Homepage from './pages/Homepage';
import Map from './pages/Map';
import Eshops from './pages/Eshops';
import WhyLightning from './pages/WhyLightning';
import Blog from './pages/Blog';
import About from './pages/About';
import Login from './pages/Login';
//
import ADHome from './pages/ADHome';
import ADMySpots from './pages/ADMySpots';
import ADMyEShops from './pages/ADMyEShops';
import ADMyAccount from './pages/ADMyAccount';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setMerchants, setEshops } from './redux-rtk/dataSlice';
//
import TileBlogpost from './components/TileBlogpost';
import TileExplainer from './components/TileExplainer';
import TileMerch from './components/TileTypeMerchant';
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
import ILink from './ts/ILink';
//
//const pages = ["Map", "E-shops", "Why Lightning", "Blog", "About"];
const pages: ILink[] = [
    { title: "Home", link: "/" },
    { title: "Map", link: "/map" },
    { title: "E-shops", link: "/e-shops" },
    { title: "Why Lightning", link: "/why-lightning" },
    { title: "Blog", link: "/blog" },
    { title: "About", link: "/about" }
];
//TODO change to ILink[] too for administration etc.
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function App() {
    const dispatch = useDispatch()
    /*const theme = useTheme();
    console.log("theme")
    console.log(theme)*/
    const merchants = useSelector((state: any) => state.merchants)
    console.log("merchants")
    console.log(merchants)
    const eshops = useSelector((state: any) => state.eshopscz)
    console.log("eshops")
    console.log(eshops)
    // Dummy image URLs
    const dummyImageURL = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg';

    React.useEffect(() => {
        const getMerchants = async (db: any) => {
            const merchantsSnapshot: any = await getDocs(query(collection(db, 'merchants'), where('properties.visible', '==', true)));
            const merchantsList = merchantsSnapshot.docs.map((doc: any) => doc.data());
            dispatch(setMerchants(merchantsList));
        }
        const getEshopsCZ = async (db: any) => {
            const eshopsCZSnapshot: any = await getDocs(query(collection(db, 'eshops'), where('visible', '==', true)));
            const listsEshopsCZ = eshopsCZSnapshot.docs.map((doc: any) => doc.data());
            dispatch(setEshops(listsEshopsCZ));
        }
        getMerchants(db);
        getEshopsCZ(db);
    }, [])
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
                            <Route path="/e-shops" element={<Eshops />} />
                            <Route path="/why-lightning" element={<WhyLightning />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin/dashboard" element={<ADHome />} />
                            <Route path="/admin/my-spots" element={<ADMySpots />} />
                            <Route path="/admin/my-eshops" element={<ADMyEShops />} />
                            <Route path="/admin/my-account" element={<ADMyAccount />} />
                        </Routes>
                    </React.Fragment>
                </Grid>
            </Grid>
        </Router >
    );
}
export default App;
