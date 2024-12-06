// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyCSkqwHEErbUdOed7xYWi_p7pf7lvPwomA",
    authDomain: "potfolio01-4d5ca.firebaseapp.com",
    projectId: "potfolio01-4d5ca",
    storageBucket: "potfolio01-4d5ca.firebasestorage.app",
    messagingSenderId: "13183100640",
    appId: "1:13183100640:web:0d525b01f7507f0ce59285",
    measurementId: "G-N8JNX4Z99Q"
};

const firebaseimgConfig = {
    apiKey: "AIzaSyBbCL-mb2Q-VTEt79fWjOPPKOiQ_6xRHtE",
    authDomain: "projectwtelogin-b9a23.firebaseapp.com",
    databaseURL: "https://projectwtelogin-b9a23-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectwtelogin-b9a23",
    storageBucket: "projectwtelogin-b9a23.appspot.com",
    messagingSenderId: "450276017058",
    appId: "1:450276017058:web:bcbba6579f13645c9ca8fb",
    measurementId: "G-L1JD3CM4P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const authdb = getAuth(app)


const appimg = initializeApp(firebaseimgConfig, "appimg");
export const storageimg = getStorage(appimg)
