import React from 'react'
import { auth } from "../components/Firebase"
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
//TODO import functions from Firebase.js that has to be done as well
//Move imports and stuff out into Firebase.js
function Login() {
    console.log(auth)
    const email = "stepanklos@gmail.com"
    const password = "passwd"
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    return (
        <div>
            <h1>Login page</h1>
            <p>Login form should go here</p>
        </div>
    )
}
export default Login