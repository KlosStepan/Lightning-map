import React, { useEffect, useState, useRef } from "react";
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
//import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { /*createTheme, ThemeProvider*/ } from '@mui/material/styles';
import ContinueWithButton from '../components/ContinueWithButton';

//
import { useNavigate } from "react-router-dom";
//import { auth, /*logInWithEmailAndPassword,*/ signInWithGoogle } from "../components/Firebase";

//Login buttons stuff
//import LoginApple from '../img/login-apple.png';
import LoginGoogle from '../img/login-google.png';
import LoginEmail from '../img/login-mail.png';
//import { isNullishCoalesce } from 'typescript';

//import { useAuthState } from "react-firebase-hooks/auth";

// ✅ Path to your image
import mapWorldImage from '../img/map-world.jpg'; // adjust path if neede
import Footer from "../components/Footer";
import { ButtonColor } from "../enums";
import ButtonUniversal from "../components/ButtonUniversal";

// TODO remove, this demo shouldn't need to reset the theme.
//const defaultTheme = createTheme();

//TODO signIns
/*const signInWithApple = (): Promise<void> => {
    console.log("TODO - signInWithApple");
    return Promise.resolve();
};*/
type LoginProps = {
    // Add props here if needed in the future
};

//TODO - LoginProxy in TODO new Login/ folder w/ image
//Will be stepped: Login general || Login e-mail/pass || Create Account || Password reset
const Login: React.FC<LoginProps> = ({}) => {
    /*const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };*/
    //const [user, loading /*, error*/] = useAuthState(auth);
    const navigate = useNavigate();
    const [loginWithEmail, setLoginWithEmail] = useState(false);
    
    // Add refs for email and password
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // Function to handle login
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
    /*
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/admin/dashboard");
    }, [user, loading, navigate]);
    */
    const signInWithEmail = async () => {
        setLoginWithEmail(true);
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
                            <div>&nbsp;</div>
                            {/*<ContinueWithButton
                                icon={LoginGoogle}
                                title="Google"
                                //actionDelegate={signInWithGoogle}
                            />*/}
                            {/*<ContinueWithButton icon={LoginApple} title="Apple" actionDelegate={signInWithApple} />*/}
                            <ContinueWithButton icon={LoginEmail} title="e-mail" actionDelegate={async () => setLoginWithEmail(true)} />
                            <div>&nbsp;</div>
                            <div>
                                <span onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer" }}>
                                    <u>I forgot my password</u>
                                </span>
                            </div>
                            <div>
                                <span>
                                    Don't you have an account?{" "}
                                    <span onClick={() => navigate("/sign-up")} style={{ cursor: "pointer" }}>
                                        <u>Sign up</u>
                                    </span>
                                </span>
                            </div>
                        </> 
                        ) : (
                            <>
                                <Box display="flex" justifyContent="flex-start" alignItems="left" width="100%" mb={2}>
                                    <ButtonUniversal
                                        title="← Back"
                                        color={ButtonColor.White}
                                        //color="#8000FF"
                                        hoverColor={ButtonColor.ReportDefault}
                                        //hoverColor="#6603C9"
                                        textColor="black"
                                        actionDelegate={() => setLoginWithEmail(false)}
                                    />
                                </Box>
                                <Typography variant="h1" component="h1">
                                    Login using Email
                                </Typography>

                                <Box component="form" onSubmit={async (e: React.FormEvent) => {
                                    e.preventDefault();
                                    await loginUsingEmail();
                                }} noValidate sx={{ mt: 1 }}>
                                    <Box mt={2}>
                                        <Typography variant="h2" component="h5">Email</Typography>
                                            <TextField
                                                fullWidth
                                                inputRef={emailRef}
                                            />
                                    </Box>
                                    <Box mt={2}>
                                        <Typography variant="h2" component="h5">Password</Typography>
                                        <TextField
                                            fullWidth
                                            type="password"
                                            inputRef={passwordRef}
                                        />
                                    </Box>
                                    {/*<FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />*/}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                //checked={keepPhotos}
                                                //onChange={(e) => setKeepPhotos(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="Remember me"
                                        sx={{ mr: 2 }}
                                    />
                                    {/*<Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>*/}
                                    {/*<Box display="flex" justifyContent="middle" mt={2}>*/}
                                    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                                        <ButtonUniversal
                                            title={"Sign In"}
                                            color={ButtonColor.Pink}
                                            hoverColor={ButtonColor.PinkHover}
                                            textColor="white"
                                            actionDelegate={loginUsingEmail}
                                        />
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