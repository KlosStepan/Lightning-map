import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
//TODO Prepare Login/Reg here and export it
//https://blog.logrocket.com/user-authentication-firebase-react-apps/
const firebaseConfig = {
    apiKey: "AIzaSyCYmaYxP4zOMdlL3mvLmJi7RdymWGz24Kw",
    authDomain: "lightning-map-be.firebaseapp.com",
    projectId: "lightning-map-be",
    storageBucket: "lightning-map-be.appspot.com",
    messagingSenderId: "922431666121",
    appId: "1:922431666121:web:6ecc0cbe196857e7fb5a18",
    measurementId: "G-4YDZGK2JYT"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};
const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
};