import { initializeApp, FirebaseApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    Auth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    Firestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "PUT_IN_A_DUMMY_API_KEY",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "PUT_IN_A_DUMMY_AUTH_DOMAIN",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "PUT_IN_A_DUMMY_PROJECT_ID",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "PUT_IN_A_DUMMY_STORAGE_BUCKET",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "PUT_IN_A_DUMMY_MESSAGING_SENDER_ID",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "PUT_IN_A_DUMMY_APP_ID",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "PUT_IN_A_DUMMY_MEASUREMENT_ID"
};

// Declare variables with types (no null allowed)
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let googleProvider: GoogleAuthProvider;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase Services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app); // Initialize Firebase Storage
  googleProvider = new GoogleAuthProvider();

  console.log("Firebase initialized successfully");
} catch (error) {
  // Throw a runtime error if initialization fails
  throw new Error("Error initializing Firebase: " + error);
}

// Firebase Authentication & Firestore Functions

const signInWithGoogle = async () => {
    try {
        if (auth && db && googleProvider) {
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
        } else {
            throw new Error("Firebase not initialized properly.");
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        if (auth) {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            throw new Error("Firebase Authentication not initialized.");
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
        if (auth && db) {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });
        } else {
            throw new Error("Firebase Authentication or Firestore not initialized.");
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email: string) => {
    try {
        if (auth) {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!");
        } else {
            throw new Error("Firebase Authentication not initialized.");
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    if (auth) {
        signOut(auth);
    } else {
        console.error("Firebase Authentication not initialized.");
    }
};

export {
    auth,
    db,
    storage, // Export storage
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
};
