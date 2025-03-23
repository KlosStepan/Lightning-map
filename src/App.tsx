import React, { useEffect, useState } from "react";
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
import { User, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./components/Firebase";
//Pages
import Homepage from './pages/Homepage';
import Map from './pages/Map';
//import MapDummy from "./pages/MapDummy";
import Eshops from './pages/Eshops';
import WhyLightning from './pages/WhyLightning';
import Blog from './pages/Blog';
import About from './pages/About';
import Login from './pages/Login';
//
import ADHome from './pages/ADHome';
import ADMyMerchants from './pages/ADMyMerchants';
import ADMyEShops from './pages/ADMyEShops';
import ADMyAccount from './pages/ADMyAccount';
//ReduxManage Users of Lightning Everywhere
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "./redux-rtk/store";
import { setDebug, setBlog, setUser } from "./redux-rtk/miscSlice";
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
import ADManageUsers from "./pages/ADManageUsers";
import ADApproveNewEntries from "./pages/ADApproveNewEntries";
import ADLikes from "./pages/ADLikes";
import ADReports from "./pages/ADReports";
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
    const dispatch = useDispatch();

    // DEBUG
    const debug = useSelector((state: RootState) => state.misc.debug)    
    // Call all hooks at the top level, outside the conditional block
    const theme = useTheme();
    const merchants = useSelector((state: RootState) => state.data.merchants);
    const eshops = useSelector((state: RootState) => state.data.eshops);
    // Conditionally log debug information
    if (debug) {
        console.log("<DEBUG> App.tsx");
        console.log("theme", theme);
        console.log("merchants", merchants);
        console.log("eshops", eshops);
        console.log("</DEBUG> App.tsx")
    }

    useEffect(() => {
        const getMerchants = async (db: any) => {
            const merchantsSnapshot: any = await getDocs(query(collection(db, 'merchants'), where('properties.visible', '==', true)));
            const merchantsList = merchantsSnapshot.docs.map((doc: any) => doc.data());
            //console.log("merchantsList");
            //console.log(merchantsList);
            dispatch(setMerchants(merchantsList));
        }
        const getEshopsCZ = async (db: any) => {
            const eshopsCZSnapshot: any = await getDocs(query(collection(db, 'eshops'), where('visible', '==', true)));
            const listsEshopsCZ = eshopsCZSnapshot.docs.map((doc: any) => doc.data());
            //console.log("listsEshops");
            //console.log(listsEshopsCZ);
            dispatch(setEshops(listsEshopsCZ));
        }
        getMerchants(db);
        getEshopsCZ(db);

        // Listen for changes in Firebase auth state
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                // User is signed in, set the user in Redux state
                dispatch(setUser(user));
            } else {
                // User is signed out, unset the user in Redux state
                dispatch(setUser(null));
            }
        });

        return () => unsubscribe();
    }, [dispatch])
    //}, [])

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
                            {/*<Route path="/map" element={<MapDummy/>} />*/}
                            <Route path="/e-shops" element={<Eshops />} />
                            <Route path="/why-lightning" element={<WhyLightning />} />
                            <Route path="/blog" element={<Blog />} /> {/*TODO blog enable/disable */}
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin/dashboard" element={<ADHome />} />
                            <Route path="/admin/my-spots" element={<ADMyMerchants />} />
                            <Route path="/admin/my-eshops" element={<ADMyEShops />} />
                            <Route path="/admin/my-account" element={<ADMyAccount />} />
                            {/*Admin only*/}
                            <Route path="/admin/manage-users" element={<ADManageUsers/>} />
                            <Route path="/admin/new-entries" element={<ADApproveNewEntries/>} />
                            <Route path="/admin/likes" element={<ADLikes/>} />
                            <Route path="/admin/reports" element={<ADReports/>} />
                        </Routes>
                    </React.Fragment>
                </Grid>
            </Grid>
        </Router >
    );
}
export default App;
