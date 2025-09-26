import React, { useEffect } from "react";
//Components
import MenuHeader from './components/MenuHeader';
//Firebase
//import { User, onAuthStateChanged } from "firebase/auth";
//import { collection, DocumentData, Firestore, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
//import { auth, db } from "./components/Firebase";
import dummyEshops from './dummy/eshops.json';
import dummyMerchants from './dummy/merchants.json';
import dummyLikes from './dummy/likes.json';
import dummyReports from './dummy/reports.json';
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
//Redux
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
import LoginProxyTest from "./pages/LoginProxyTest";
import LoginProxyForgotPassword from "./pages/LoginProxyForgotPassword";
import IMerchant from "./ts/IMerchant";

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
    //Debug
    const debug = useSelector((state: RootState) => state.misc.debug)    
    //Call all hooks at the top level of the website
    const theme = useTheme();
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const merchants = useSelector((state: RootState) => state.data.merchants);
    const eshops = useSelector((state: RootState) => state.data.eshops);
    const likes = useSelector((state: RootState) => state.data.likes);
    //
    if (debug) {
        console.log("<DEBUG> App.tsx");
        console.log("theme", theme);
        console.log("merchants", merchants);
        console.log("eshops", eshops);
        console.log("likes", likes);
        console.log("</DEBUG> App.tsx")
    }

    useEffect(() => {
        //dispatch(setMerchants(dummyMerchants as IMerchant[]));
        //dispatch(setEshops(dummyEshops));
        //dispatch(setLikes(dummyLikes)); // Optionally, provide dummy likes array

        //const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";
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
        getMerchants();
        getEshops();
        getLikes();

        /*
        const getMerchants = async (db: Firestore) => {
            const merchantsSnapshot: QuerySnapshot<DocumentData> = await getDocs(query(collection(db, 'merchants'), where('properties.visible', '==', true)));
            const merchantsList = merchantsSnapshot.docs.map((doc: any) => doc.data());
            //console.log("merchantsList");
            //console.log(merchantsList);
            dispatch(setMerchants(merchantsList));
        }
        const getEshopsCZ = async (db: Firestore) => {
            const eshopsCZSnapshot: QuerySnapshot<DocumentData> = await getDocs(query(collection(db, 'eshops'), where('visible', '==', true)));
            const listsEshopsCZ = eshopsCZSnapshot.docs.map((doc: any) => doc.data());
            //console.log("listsEshops");
            //console.log(listsEshopsCZ);
            dispatch(setEshops(listsEshopsCZ));
        }
        const getLikes = async (db: Firestore) => {
            const likesSnapshot: QuerySnapshot<DocumentData> = await getDocs(query(collection(db, "likes"))); // No filters
            const likesList = likesSnapshot.docs.map((doc: any) => doc.data());
            //console.log("likesList");
            //console.log(likesList);
            dispatch(setLikes(likesList));
        };

        getMerchants(db);
        getEshopsCZ(db);
        getLikes(db);

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
        */
    }, [dispatch, apiBaseUrl])
    //}, [])

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
                            <Route path="/login-test" element={<LoginProxyTest/>} />
                            {/**/}
                            <Route path="/sign-up" element={<SignUp />} />
                            {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
                            <Route path="/forgot-password" element={<LoginProxyForgotPassword />} />
                            {/*Admin Dashboard*/}
                            <Route path="/admin/dashboard" element={<ADHome />} />
                            <Route path="/admin/my-spots" element={<ADMyMerchants />} />
                            <Route path="/admin/my-eshops" element={<ADMyEShops />} />
                            <Route path="/admin/my-account" element={<ADMyAccount />} />
                            {/*Administration of Lightning Everywhere for admin*/}
                            <Route path="/admin/manage-users" element={<ADManageUsers/>} />
                            <Route path="/admin/new-entries" element={<ADApproveNewEntries/>} />
                            <Route path="/admin/likes" element={<ADLikes/>} />
                            <Route path="/admin/reports" element={<ADReports/>} />
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
