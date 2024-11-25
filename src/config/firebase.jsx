// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCSkqwHEErbUdOed7xYWi_p7pf7lvPwomA",
    authDomain: "potfolio01-4d5ca.firebaseapp.com",
    projectId: "potfolio01-4d5ca",
    storageBucket: "potfolio01-4d5ca.firebasestorage.app",
    messagingSenderId: "13183100640",
    appId: "1:13183100640:web:0d525b01f7507f0ce59285",
    measurementId: "G-N8JNX4Z99Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const authdb = getAuth(app)
