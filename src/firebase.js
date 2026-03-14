import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNG7K6qlRmeeqMW3tytXOold8IqmrveAM",
  authDomain: "ai-directory-252a8.firebaseapp.com",
  projectId: "ai-directory-252a8",
  storageBucket: "ai-directory-252a8.firebasestorage.app",
  messagingSenderId: "1052094039569",
  appId: "1:1052094039569:web:e74c9b80f1c38dd5e013b0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
