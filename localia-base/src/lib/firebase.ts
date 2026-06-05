import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9YffUgIrUZ5-lMdI_48ghdr0mE7RtuTc",
  authDomain: "interactivas-a180c.firebaseapp.com",
  projectId: "interactivas-a180c",
  storageBucket: "interactivas-a180c.firebasestorage.app",
  messagingSenderId: "845748557529",
  appId: "1:845748557529:web:201da81ec1d4e323eb90c8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();