import { initializeApp } from "firebase/app";
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	getAuth,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "interactivas-a180c.firebaseapp.com",
	projectId: "interactivas-a180c",
	storageBucket: "interactivas-a180c.firebasestorage.app",
	messagingSenderId: "845748557529",
	appId: "1:845748557529:web:201da81ec1d4e323eb90c8",
	measurementId: "G-GVEP756JL3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// https://firebase.google.com/docs/auth/web/start:

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   // ...
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

// import { GoogleAuthProvider } from "firebase/auth";

// const provider = new GoogleAuthProvider();

// import { FacebookAuthProvider } from "firebase/auth";

// const provider = new FacebookAuthProvider();
