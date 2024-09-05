// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: "farmer-buddy-35a78.firebaseapp.com",
  projectId: "farmer-buddy-35a78",
  storageBucket: "farmer-buddy-35a78.appspot.com",
  messagingSenderId: "691215544786",
  appId: "1:691215544786:web:3a1d8e789ffa86bcd8980b",
  measurementId: "G-J16TMTTPF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)