// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   databaseURL: "",
//   apiKey: "AIzaSyAPyLmPlEFZ6SR9h7MtMsKL1Lc2-p15e9c",
//   authDomain: "yiqichi-b784d.firebaseapp.com",
//   projectId: "yiqichi-b784d",
//   storageBucket: "yiqichi-b784d.appspot.com",
//   messagingSenderId: "241273755972",
//   appId: "1:241273755972:web:c8d8d290a5ea07524b1f11"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBVbOo6qOjIubOZw0v8pk0ilhe-JPwvbco",
  authDomain: "help-a95e1.firebaseapp.com",
  projectId: "help-a95e1",
  storageBucket: "help-a95e1.appspot.com",
  messagingSenderId: "804537078908",
  appId: "1:804537078908:web:4ab7a75f06e9765e06e5f9",
  measurementId: "G-RN4YYS0XPV"

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app);
export default app;

