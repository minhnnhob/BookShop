// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyLbC-ohMJ11HK7GTm-c3osG2rJlK4FLI",
  authDomain: "bookvite.firebaseapp.com",
  projectId: "bookvite",
  storageBucket: "bookvite.appspot.com",
  messagingSenderId: "401980579267",
  appId: "1:401980579267:web:e8f8cfe7c9e580b970f176",
  measurementId: "G-9NLPS8543N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);

export const api_endpoint = "https://localhost:7014/"