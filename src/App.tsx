import React, { useEffect } from "react";
//Components
import MenuHeader from './components/MenuHeader';
import ProtectedRoute from './components/ProtectedRoute';
import LoginProxyForgotPassword from "./pages/LoginProxyForgotPassword";
//Pages
import Homepage from './pages/Homepage';
import MerchantsMap from './pages/MerchantsMap';
import Eshops from './pages/Eshops';
import WhyLightning from './pages/WhyLightning';
import Blog from './pages/Blog';
import About from './pages/About';
import Login from './pages/Login';
//Pages - AD
import ADHome from './pages/ADHome';
import ADMyMerchants from './pages/ADMyMerchants';
import ADMyEShops from './pages/ADMyEShops';
import ADMyAccount from './pages/ADMyAccount';
//Pages - AD Admin
import ADManageUsers from "./pages/ADManageUsers";
import ADApproveNewEntries from "./pages/ADApproveNewEntries";
import ADLikes from "./pages/ADLikes";
import ADReports from "./pages/ADReports";
//MUI
import AppBar from '@mui/material/AppBar';
import { Container, CssBaseline } from "@mui/material";
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
//Redux+RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "./redux-rtk/store";
import { setMerchants, setEshops, setLikes } from './redux-rtk/dataSlice';
import { setUser } from "./redux-rtk/miscSlice";
//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//TypeScript
import ILink from './ts/ILink';
import UIKit from "./pages/UIKit";
import SignUp from "./pages/SignUp";

// Website menu
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
    const DEBUG = useSelector((state: RootState) => state.misc.debug)    
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    //
    const merchants = useSelector((state: RootState) => state.data.merchants);
    const eshops = useSelector((state: RootState) => state.data.eshops);
    const likes = useSelector((state: RootState) => state.data.likes);
    //
    const dispatch = useDispatch();
    const theme = useTheme();

    if (DEBUG) {
        console.log("<DEBUG> App.tsx");
        console.log("theme", theme);
        console.log("merchants", merchants);
        console.log("eshops", eshops);
        console.log("likes", likes);
        console.log("</DEBUG> App.tsx")
    }

    useEffect(() => {
        const getMerchants = async () => {
            const res = await fetch(`${apiBaseUrl}/merchants`);
            const merchants = await res.json();
            dispatch(setMerchants(merchants));
        };
        const getEshops = async () => {
            const res = await fetch(`${apiBaseUrl}/eshops`);
            const eshops = await res.json();
            dispatch(setEshops(eshops));
        };
        const getLikes = async () => {
            const res = await fetch(`${apiBaseUrl}/likes`);
            const likes = await res.json();
            dispatch(setLikes(likes));
        };
        //
        const checkAuth = async () => {
            try {
                const res = await fetch(`${apiBaseUrl}/logintest`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    const user = await res.json();
                    dispatch(setUser(user));
                } else {
                    dispatch(setUser(null));
                }
            } catch (err) {
                dispatch(setUser(null));
            }
        };

        getMerchants();
        getEshops();
        getLikes();
        //
        checkAuth();
    }, [dispatch, apiBaseUrl]);

    return (
        <Router>
            <CssBaseline />
            <Grid container justifyContent="center">
                <Grid item xs={10} md={11} lg={7}>
                    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <Container maxWidth="xl">
                            <MenuHeader pages={pages} settings={settings} />
                        </Container>
                    </AppBar>
                    <React.Fragment>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/map" element={<MerchantsMap />} />
                            {/*<Route path="/map" element={<MapDummy/>} />*/}
                            <Route path="/e-shops" element={<Eshops />} />
                            <Route path="/why-lightning" element={<WhyLightning />} />
                            <Route path="/blog" element={<Blog />} /> {/*TODO blog enable/disable */}
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            {/*<Route path="/login-test" element={<LoginProxyTest/>} /> */}
                            {/**/}
                            <Route path="/sign-up" element={<SignUp />} />
                            {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
                            <Route path="/forgot-password" element={<LoginProxyForgotPassword />} />
                            {/*Admin Dashboard*/}
                            <Route path="/admin/dashboard" element={<ProtectedRoute> <ADHome /> </ProtectedRoute>} />
                            <Route path="/admin/my-spots" element={<ProtectedRoute> <ADMyMerchants /> </ProtectedRoute>} />
                            <Route path="/admin/my-eshops" element={<ProtectedRoute> <ADMyEShops /> </ProtectedRoute>} />
                            <Route path="/admin/my-account" element={<ProtectedRoute> <ADMyAccount /> </ProtectedRoute>} />
                            {/*Administration of Lightning Everywhere for admin*/}
                            <Route path="/admin/manage-users" element={<ProtectedRoute> <ADManageUsers/> </ProtectedRoute>} />
                            <Route path="/admin/new-entries" element={<ProtectedRoute> <ADApproveNewEntries/> </ProtectedRoute>} />
                            <Route path="/admin/likes" element={<ProtectedRoute> <ADLikes/> </ProtectedRoute>} />
                            <Route path="/admin/reports" element={<ProtectedRoute> <ADReports/> </ProtectedRoute>} />
                            {/*Mics*/}
                            <Route path="/uikit" element={<UIKit propFromApptsx={true}/>}/>
                        </Routes>
                    </React.Fragment>
                </Grid>
            </Grid>
        </Router >
    );
};

export default App;
