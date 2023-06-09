import React, { useEffect, useState } from "react";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../components/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
//TODO import functions from Firebase.js that has to be done as well
//Move imports and stuff out into Firebase.js
//https://blog.logrocket.com/user-authentication-firebase-react-apps/

function Login() {
    //console.log(auth)
    //const email = "stepanklos@gmail.com"
    //const password = "passwd"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <>
            <style type="text/css">
                {`
                .authForm_page {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .authForm_container {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    padding: 30px;
                }
                .authForm_textBox {
                    background: white;
                    padding: 8px 8px 8px 8px !important;
                    margin-bottom: 10px;
                    color: black !important;
                }
                a {
                    transition: all 0.35s;
                    color: black;
                }
                `}
            </style>
            <div className="authForm_page">
                <div className="authForm_container boxed">
                    <input
                        type="text"
                        className="authForm_textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="authForm_textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        className="boxed btnStyle ptHover"
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >
                        Login
                    </button>
                    <button className="boxed btnStyle ptHover" onClick={signInWithGoogle}>
                        Login with Google
                    </button>
                    <div>
                        <Link to="/reset">Forgot Password</Link>
                    </div>
                    <div>
                        Don't have an account? <Link to="/register">Register</Link> now.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;