import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContinueWithButton from '../components/ContinueWithButton';

//
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../components/Firebase";

//Login buttons stuff
import LoginApple from '../img/login-apple.png';
import LoginGoogle from '../img/login-google.png';
import LoginEmail from '../img/login-mail.png';
import { isNullishCoalesce } from 'typescript';
import { useAuthState } from "react-firebase-hooks/auth";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

//TODO signIns
const signInWithApple = (): Promise<void> => {
    console.log("TODO - signInWithApple");
    return Promise.resolve();
};

const signInWithEmail = (): Promise<void> => {
    console.log("TODO - signInWithEmail");
    return Promise.resolve();
};

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
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/admin/dashboard");
    }, [user, loading]);

    return (
        < /*theme={defaultTheme}*/>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        /*backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],*/
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
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}