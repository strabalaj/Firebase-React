// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// images/files: import { getStorage } from 'firebase/storage';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLcwQC8iaER7_D6XZdVUqhVqqn9gjn3jI",
  authDomain: "clarityai-8d562.firebaseapp.com",
  projectId: "clarityai-8d562",
  storageBucket: "clarityai-8d562.firebasestorage.app",
  messagingSenderId: "315016782530",
  appId: "1:315016782530:web:28efb99e340e9d550b115b",
  measurementId: "G-B815V2N3SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// images/files: export const storage = getStorage(app);
const analytics = getAnalytics(app);