// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Configuration for Firestore
const firestoreConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: "farmer-buddy-35a78.firebaseapp.com",
  projectId: "farmer-buddy-35a78",
  storageBucket: "farmer-buddy-35a78.appspot.com",
  messagingSenderId: "691215544786",
  appId: "1:691215544786:web:3a1d8e789ffa86bcd8980b",
  measurementId: "G-J16TMTTPF3"
};

// Configuration for Realtime Database
const realtimeDatabaseConfig = {
  apiKey: "AIzaSyDWKgwJXKQQyDgJSV7RHNeIxeVvPcXUZJs",
  authDomain: "sihagrifinal.firebaseapp.com",
  databaseURL: "https://sihagrifinal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sihagrifinal",
  storageBucket: "sihagrifinal.appspot.com",
  messagingSenderId: "489611707099",
  appId: "1:489611707099:android:68d032a192be889403c2fe"
};

// Initialize Firebase App for Firestore
const firestoreApp = initializeApp(firestoreConfig, "firestoreApp");

// Initialize Firestore
const db = getFirestore(firestoreApp);

// Initialize Firebase App for Realtime Database
const realtimeDatabaseApp = initializeApp(realtimeDatabaseConfig, "realtimeDatabaseApp");

// Initialize Realtime Database
const realTimeDatabase = getDatabase(realtimeDatabaseApp);

export { db, realTimeDatabase };

