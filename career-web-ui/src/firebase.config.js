// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "web-scraping-67540.firebaseapp.com",
  projectId: "web-scraping-67540",
  storageBucket: "web-scraping-67540.appspot.com",
  messagingSenderId: "599525850148",
  appId: "1:599525850148:web:76660db62f1f63f13decb1",
  measurementId: "G-5H8ZGPL9JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
