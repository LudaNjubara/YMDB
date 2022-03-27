// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr3VMPs7aheoIkBQRNXj0bT87BOoFemgw",
  authDomain: "ymdb-c2e08.firebaseapp.com",
  projectId: "ymdb-c2e08",
  storageBucket: "ymdb-c2e08.appspot.com",
  messagingSenderId: "196013896928",
  appId: "1:196013896928:web:bcbdefc9a5a33761468c85",
  measurementId: "G-YB8SXBQXNE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };
export default database;
