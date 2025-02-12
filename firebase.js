// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
