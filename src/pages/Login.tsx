import React, { useEffect, useState } from "react";
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
import { auth, /*logInWithEmailAndPassword,*/ signInWithGoogle } from "../components/Firebase";

//Login buttons stuff
//import LoginApple from '../img/login-apple.png';
import LoginGoogle from '../img/login-google.png';
import LoginEmail from '../img/login-mail.png';
//import { isNullishCoalesce } from 'typescript';
import { useAuthState } from "react-firebase-hooks/auth";

// ✅ Path to your image
import mapWorldImage from '../img/map-world.jpg'; // adjust path if neede
import Footer from "../components/Footer";

// TODO remove, this demo shouldn't need to reset the theme.
//const defaultTheme = createTheme();

//TODO signIns
/*const signInWithApple = (): Promise<void> => {
    console.log("TODO - signInWithApple");
    return Promise.resolve();
};*/

//TODO - LoginProxy in TODO new Login/ folder w/ image
//Will be stepped: Login general || Login e-mail/pass || Create Account || Password reset
export default function SignInSide() {
    /*const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };*/
    const [user, loading /*, error*/] = useAuthState(auth);
    const navigate = useNavigate();
    const [loginWithEmail, setLoginWithEmail] = useState(false);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/admin/dashboard");
    }, [user, loading, navigate]);

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
                            <ContinueWithButton icon={LoginGoogle} title="Google" actionDelegate={signInWithGoogle} />
                            {/*<ContinueWithButton icon={LoginApple} title="Apple" actionDelegate={signInWithApple} />*/}
                            <ContinueWithButton icon={LoginEmail} title="e-mail" actionDelegate={signInWithEmail} />
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
                                <Typography variant="h1" component="h1">
                                    Login with Email
                                </Typography>
                                <Box component="form" onSubmit={async (e) => {
                                    e.preventDefault();
                                    //const data = new FormData(e.currentTarget);
                                    //const email = data.get("email") as string;
                                    //const password = data.get("password") as string;
                                    //await logInWithEmailAndPassword(email, password);
                                }} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                    <Button onClick={() => setLoginWithEmail(false)} fullWidth>
                                        ← Back
                                    </Button>
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