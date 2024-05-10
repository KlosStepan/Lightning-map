import React, { useEffect, useState } from "react";
import '../_App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../components/Firebase";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <>
            <style type="text/css">
                {`
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                    />
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
                    <button className="boxed btnStyle ptHover" onClick={register}>
                        Register
                    </button>
                    <button
                        className="boxed btnStyle ptHover"
                        onClick={signInWithGoogle}
                    >
                        Register with Google
                    </button>
                    <div>
                        Already have an account? <Link to="/">Login</Link> now.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;