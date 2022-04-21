// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfirsbIgWxorN8HZ5jE8Vhqv8HGXyL7fY",
  authDomain: "sequill-3d3be.firebaseapp.com",
  projectId: "sequill-3d3be",
  storageBucket: "sequill-3d3be.appspot.com",
  messagingSenderId: "966415000495",
  appId: "1:966415000495:web:53cf6c3e97fa86f205c55a",
  measurementId: "G-NGWJESH9FY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
