// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

import { getAuth } from 'firebase/auth'
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCri3-Dr7VdmIPjh4gfiXnSeVMPrcMGTpM",
  authDomain: "final-project-aeaea.firebaseapp.com",
  databaseURL: "https://final-project-aeaea-default-rtdb.firebaseio.com",
  projectId: "final-project-aeaea",
  storageBucket: "final-project-aeaea.appspot.com",
  messagingSenderId: "898086667129",
  appId: "1:898086667129:web:35a75520513a2e4a14a5a8",
  measurementId: "G-EQGWES7LEL"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const auth = getAuth();

export { app, auth, database }