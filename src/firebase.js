// Ganti config di bawah dengan punyamu dari Firebase Console
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8iRBtc7mAbBhtDJKxHzPYl331LnSVxEE",
  authDomain: "karangtaruna-dashboard.firebaseapp.com",
  projectId: "karangtaruna-dashboard",
  storageBucket: "karangtaruna-dashboard.firebasestorage.app",
  messagingSenderId: "509731053218",
  appId: "1:509731053218:web:ad0b9d49060062ea79c1fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
