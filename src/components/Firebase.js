import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }