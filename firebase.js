import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn3g_xEkUYjkVgMJny17nK-4-rFHfWiT4",
  authDomain: "princelimon-82519.firebaseapp.com",
  projectId: "princelimon-82519",
  storageBucket: "princelimon-82519.firebasestorage.app",
  messagingSenderId: "592674052413",
  appId: "1:592674052413:web:ecf15ed03747d1552f8d54",
  measurementId: "G-FGH83L9F80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
