import React, { useEffect, useState } from "react";
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
                .login {
                    height: 100vh;
                    /* width: 100vw; */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  .login__container {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    background-color: #dcdcdc;
                    padding: 30px;
                  }
                  .login__textBox {
                    padding: 10px;
                    font-size: 18px;
                    margin-bottom: 10px;
                  }
                  .login__btn {
                    padding: 10px;
                    font-size: 18px;
                    margin-bottom: 10px;
                    border: none;
                    color: white;
                    background-color: black;
                  }
                  .login__google {
                    background-color: #4285f4;
                  }
                  .login div {
                    margin-top: 7px;
                  }
                `}
            </style>
            <div className="login">
                <div className="login__container">
                    <input
                        type="text"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        className="login__btn"
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >
                        Login
                    </button>
                    <button className="login__btn login__google" onClick={signInWithGoogle}>
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
    );
}
export default Login;