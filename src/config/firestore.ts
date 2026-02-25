// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  saltRounds: import.meta.env.VITE_FIREBASE_SALT_ROUNDS,
  serviceId: import.meta.env.VITE_FIREBASE_SERVICE_ID,
  templateId: import.meta.env.VITE_FIREBASE_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_FIREBASE_PUBLIC_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Initialize Cloude Firestore
export const db = getFirestore(app);