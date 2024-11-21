// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBi-WHkSsWLWX_BpirEkv-to9RgqUpPWIo",
    authDomain: "potfolio01.firebaseapp.com",
    projectId: "potfolio01",
    storageBucket: "potfolio01.firebasestorage.app",
    messagingSenderId: "741357676213",
    appId: "1:741357676213:web:8b510200ea40aff66e40fc",
    measurementId: "G-KY89S28ZQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);