// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "house-marketplace-app-43e2b.firebaseapp.com",
  projectId: "house-marketplace-app-43e2b",
  storageBucket: "house-marketplace-app-43e2b.appspot.com",
  messagingSenderId: "857538879058",
  appId: "1:857538879058:web:9e316ba784be12323e498b",
  measurementId: "G-Z1SCPC4MQS"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();