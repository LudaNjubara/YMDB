// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ymdb-c2e08.firebaseapp.com",
  projectId: "ymdb-c2e08",
  storageBucket: "ymdb-c2e08.appspot.com",
  messagingSenderId: "196013896928",
  appId: "1:196013896928:web:bcbdefc9a5a33761468c85",
  measurementId: "G-YB8SXBQXNE",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth();

export {
  auth,
  database,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
};
