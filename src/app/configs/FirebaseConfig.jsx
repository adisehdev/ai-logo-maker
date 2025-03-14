// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-logo-maker-ddd97.firebaseapp.com",
  projectId: "ai-logo-maker-ddd97",
  storageBucket: "ai-logo-maker-ddd97.firebasestorage.app",
  messagingSenderId: "546471007562",
  appId: "1:546471007562:web:d33372ae176359b70c1db3",
  measurementId: "G-47L2H246NS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)