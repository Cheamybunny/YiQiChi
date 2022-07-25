// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL: "",
  apiKey: "AIzaSyAPyLmPlEFZ6SR9h7MtMsKL1Lc2-p15e9c",
  authDomain: "yiqichi-b784d.firebaseapp.com",
  projectId: "yiqichi-b784d",
  storageBucket: "yiqichi-b784d.appspot.com",
  messagingSenderId: "241273755972",
  appId: "1:241273755972:web:c8d8d290a5ea07524b1f11"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app);
export default app;

