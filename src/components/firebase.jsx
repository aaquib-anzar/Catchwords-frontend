// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyA0vDPZYBJNYWDyual9blT2gB8aOV8UisA",
    authDomain: "catchwords-f92e8.firebaseapp.com",
    projectId: "catchwords-f92e8",
    storageBucket: "catchwords-f92e8.firebasestorage.app",
    messagingSenderId: "680992177917",
    appId: "1:680992177917:web:e4a2130fdba34ce7ea4894",
    measurementId: "G-REJMH5D99X"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
