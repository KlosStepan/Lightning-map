import React, { useState, useRef } from "react";
// Axios
import axios from 'axios';
// Components
import ContinueWithButton from '../components/ContinueWithButton';
import ButtonUniversal from "../components/ButtonUniversal";
import Footer from "../components/Footer";
import Tooltip from "@mui/material/Tooltip";

// enums
import { ButtonColor, ButtonLayout, ButtonSide } from "../enums";
// MUI
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Router
import { useNavigate } from "react-router-dom";
// SSO w/ Google
import { GoogleLogin } from '@react-oauth/google';

// Icons
import LoginGoogle from '../img/login-google.png';
import LoginEmail from '../img/login-mail.png';
import ArrowRight from '../img/arrow-right.png';
import mapWorldImage from '../img/map-world.jpg'; 

type LoginProps = {
    // 
};

const Login: React.FC<LoginProps> = ({ }) => {
    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    //
    const [loginWithEmail, setLoginWithEmail] = useState(false);
    //
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    // Aux. ContinueWithButton(Google) -> &GoogleLogin | ref "hack"
    const googleButtonRef = useRef<HTMLDivElement | null>(null);

    // Login via SSO Google
    const handleGoogleLogin = async (credentialResponse: any) => {
        console.log("[GoogleLogin] credentialResponse:", credentialResponse);
        const idToken = credentialResponse?.credential;
        if (!idToken) {
            alert("Google login failed: missing ID token");
            return;
        }
        try {
            const res = await axios.post(
                `${apiBaseUrl}/auth/google`,
                { token: idToken },
                { withCredentials: true }
            );
            console.log("[GoogleLogin] backend response:", res);
            navigate("/admin/dashboard");
        } catch (err: any) {
            if (err.response) {
                console.error("[GoogleLogin] backend error:", err.response.data);
                alert(
                    "Google login failed: " +
                    (err.response.data?.message || err.response.status)
                );
            } else {
                console.error("[GoogleLogin] network error:", err);
                alert("Google login failed: backend not reachable (is it running?)");
            }
        }
    };

    // Login via Email
    const loginUsingEmail = async () => {
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        console.log("[Login] Attempting login with:", { email });

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"  // Important for HttpOnly cookies
            });
            const data = await response.json();
            
            console.log("[Login] Login response:", data);
            
            if (response.ok) {
                // Successful login
                navigate("/admin/dashboard");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("[Login] Network error:", error);
            alert("Network error");
        }
    };

    return (
        <React.Fragment>
            <Grid container component="main" sx={{ height: '70vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: `url(${mapWorldImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? '#f0f0f0' : '#121212',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid /*item*/ xs={12} sm={8} md={5} /*component={Paper} elevation={6} square*/>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                    {!loginWithEmail ? (
                        <>
                            <Typography variant="h1" component="h1">
                                Login
                            </Typography>
                            <span style={{ paddingTop: "12px" }} />
                            <div
                                ref={googleButtonRef}
                                style={{ width: 0, height: 0, overflow: "hidden" }}
                            >
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() =>
                                        alert(
                                            "Google sign-in failed or was cancelled. Check browser pop-up/cookie settings and try again."
                                        )
                                    }
                                />
                            </div>
                            {/* Styled button: Triggers the hidden GoogleLogin (^ above) */}
                            <ContinueWithButton
                                icon={LoginGoogle}
                                title="Google"
                                disabled={!process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                actionDelegate={() => {
                                    const root = googleButtonRef.current;
                                    if (!root) {
                                        alert("Google login is not ready yet. Please try again.");
                                        return;
                                    }
                                    // Google renders a div[role=button] inside
                                    const btn = root.querySelector(
                                        "div[role=button], button"
                                    ) as HTMLElement | null;
                                    if (!btn) {
                                        console.warn(
                                            "[Login] Could not find inner Google button to click"
                                        );
                                        alert("Google login is not available. Please refresh and try again.");
                                        return;
                                    }
                                    btn.click();
                                }}
                            />
                            {/*<ContinueWithButton icon={LoginApple} title="Apple" actionDelegate={signInWithApple} />*/}
                            <Tooltip
                                title={
                                <span style={{ fontSize: "0.8rem" }}>
                                    E-mail login is temporarily unavailable.
                                    <br />
                                    We’re currently setting up a new mailing service mechanism due to AWS SES crypto restrictions.
                                </span>
                                }
                                placement="right"
                                arrow
                            >
                                <span style={{width:"100%"}}>
                                    <ContinueWithButton icon={LoginEmail} title="e-mail" disabled={true} actionDelegate={async () => setLoginWithEmail(true)} />
                                    <span style={{ paddingTop: "12px" }} />
                                    
                                    <div style={{ fontFamily: "PixGamer", fontSize: "20px", color:"grey", textAlign: "center" }}>
                                        <span /*onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer" }}*/>
                                            <u>I forgot my password</u>
                                        </span>
                                    </div>
                                    <span style={{ paddingTop: "12px" }} />
                                    <div style={{ fontFamily: "PixGamer", fontSize: "20px", color:"grey", textAlign: "center" }}>
                                        <span>
                                            Don't you have an account?{" "}
                                            <span /*onClick={() => navigate("/sign-up")} style={{ cursor: "pointer" }}*/>
                                                <u>Sign up</u>
                                            </span>
                                        </span>
                                    </div>
                                </span>
                            </Tooltip>
                        </>
                        ) : (
                            <>
                                <Typography variant="h1" component="h1">
                                    Login {/*Login using Email*/}
                                </Typography>
                                <span style={{ paddingTop: "12px" }} />

                                <Box component="form" onSubmit={async (e: React.FormEvent) => {
                                    e.preventDefault();
                                    await loginUsingEmail();
                                }} noValidate sx={{ mt: 1 }}>
                                    <Box mt={1}>
                                        <TextField
                                        fullWidth
                                        type="email"
                                        name="username"
                                        placeholder="E-mail"
                                        autoComplete="username"
                                        required
                                        inputRef={emailRef}
                                        />
                                    </Box>
                                    <Box mt={1}>
                                        <TextField
                                            fullWidth
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            autoComplete="off"
                                            required
                                            inputRef={passwordRef}
                                        />
                                    </Box>
                                    <Box mt={2} display="flex" flexDirection="column" alignItems="center" width="100%">
                                        <div style={{ fontFamily: "PixGamer", fontSize: "20px" }}>
                                            <span onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer" }}>
                                                <u>I forgot my password</u>
                                            </span>
                                        </div>
                                        <span style={{ paddingTop: "12px" }} />
                                        <Box width="100%">
                                            <ButtonUniversal
                                                icon={ArrowRight}
                                                side={ButtonSide.Right}
                                                title={"Login"}
                                                color={ButtonColor.Pink}
                                                hoverColor={ButtonColor.PinkHover}
                                                textColor="white"
                                                actionDelegate={loginUsingEmail}
                                                type="submit"
                                                fullWidth={true} // <-- This makes the button stretch
                                                layout={ButtonLayout.Expand}
                                            />
                                        </Box>
                                        <span style={{ paddingTop: "12px" }} />
                                        <div style={{ fontFamily: "PixGamer", fontSize: "20px" }}>
                                            <span>
                                                Don't you have an account?{" "}
                                                <span onClick={async () => setLoginWithEmail(false)} style={{ cursor: "pointer" }}>
                                                    <u>Sign up</u>
                                                </span>
                                            </span>
                                        </div>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Footer/>
        </React.Fragment>
    );
};

export default Login;