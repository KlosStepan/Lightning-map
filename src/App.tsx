import React, { useEffect } from "react";
// Components
import MenuHeader from './components/MenuHeader';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from "./pages/ForgotPassword";
// Pages
import Homepage from './pages/Homepage';
import MerchantsMap from './pages/MerchantsMap';
import Eshops from './pages/Eshops';
import WhyLightning from './pages/WhyLightning';
import Blog from './pages/Blog';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import UIKit from "./pages/UIKit"; // aux.
// Pages - AD
import ADHome from './pages/ADHome';
import ADMyMerchants from './pages/ADMyMerchants';
import ADMyEshops from './pages/ADMyEshops';
import ADMyAccount from './pages/ADMyAccount';
// Pages - AD | Admin
import ADManageUsers from "./pages/ADManageUsers";
import ADApproveNewEntries from "./pages/ADApproveNewEntries";
import ADLikes from "./pages/ADLikes";
import ADReports from "./pages/ADReports";
// Pages - AD | Admin Debug
import TestAwsSes from "./pages/ADTestAwsSes"; // aux.
// MUI
import AppBar from '@mui/material/AppBar';
import { Container, CssBaseline } from "@mui/material";
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// Redux + RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "./redux-rtk/store";
// Hooks
import { useFetchAll } from "./hooks";
// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// TypeScript
import ILink from './ts/ILink';


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
    const dispatch = useDispatch();
    const theme = useTheme();
    //
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const DEBUG = useSelector((state: RootState) => state.misc.debug)    
    //
    const merchants = useSelector((state: RootState) => state.data.merchants);
    const eshops = useSelector((state: RootState) => state.data.eshops);
    const likes = useSelector((state: RootState) => state.data.likes);

    const { fetchAll } = useFetchAll();

    if (DEBUG) {
        console.log("<DEBUG> App.tsx");
        console.log("theme", theme);
        console.log("apiBaseUrl", apiBaseUrl);
        console.log("merchants", merchants);
        console.log("eshops", eshops);
        console.log("likes", likes);
        console.log("</DEBUG> App.tsx")
    }

    useEffect(() => {
        if (!apiBaseUrl) {
            if (DEBUG) {
                console.error("[App] apiBaseUrl is null – check REACT_APP_API_BASE_URL");
            }
            return;
        }

        fetchAll().catch((err: unknown) => {
            console.error("[App] fetchAll failed:", err);
        });
    }, [apiBaseUrl, DEBUG, fetchAll, dispatch]);
    
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
                            <Route path="/e-shops" element={<Eshops />} />
                            <Route path="/why-lightning" element={<WhyLightning />} />
                            <Route path="/blog" element={<Blog />} /> {/* BLOG is either 1/0 */}
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            {/* Admin Dashboard */}
                            <Route path="/admin/dashboard" element={<ProtectedRoute> <ADHome /> </ProtectedRoute>} />
                            <Route path="/admin/my-spots" element={<ProtectedRoute> <ADMyMerchants /> </ProtectedRoute>} />
                            <Route path="/admin/my-eshops" element={<ProtectedRoute> <ADMyEshops /> </ProtectedRoute>} />
                            <Route path="/admin/my-account" element={<ProtectedRoute> <ADMyAccount /> </ProtectedRoute>} />
                            {/* Admin Dashboard | for Admin */}
                            <Route path="/admin/manage-users" element={<ProtectedRoute> <ADManageUsers/> </ProtectedRoute>} />
                            <Route path="/admin/new-entries" element={<ProtectedRoute> <ADApproveNewEntries/> </ProtectedRoute>} />
                            <Route path="/admin/likes" element={<ProtectedRoute> <ADLikes/> </ProtectedRoute>} />
                            <Route path="/admin/reports" element={<ProtectedRoute> <ADReports/> </ProtectedRoute>} />
                            {/* Misc. */}
                            <Route path="/uikit" element={<UIKit propFromApptsx={true}/>}/>
                            <Route path="/admin/test-aws-ses" element={<ProtectedRoute> <TestAwsSes /> </ProtectedRoute>} />
                        </Routes>
                    </React.Fragment>
                </Grid>
            </Grid>
        </Router >
    );
};

export default App;
