import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA24sLKJ1V_d8Smj_HW0HbEYwvbMEcLdYE",
    authDomain: "ecoreport-b0c70.firebaseapp.com",
    projectId: "ecoreport-b0c70",
    storageBucket: "ecoreport-b0c70.appspot.com",
    messagingSenderId: "42075252749",
    appId: "1:42075252749:web:ee7b3a27b83ccfee75cd44"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
