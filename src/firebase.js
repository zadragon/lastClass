//firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyAm9c-5eP02NP4O5w4csTfYnsFfkCUTddk",
    authDomain: "sparta-react-df9f5.firebaseapp.com",
    projectId: "sparta-react-df9f5",
    storageBucket: "sparta-react-df9f5.appspot.com",
    messagingSenderId: "774853878275",
    appId: "1:774853878275:web:1c29ff9f877c34e6b02436",
    measurementId: "G-KDYDGHB9KB",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
