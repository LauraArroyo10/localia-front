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

/**
 * Inicializa la conexión con Firebase para habilitar autenticación en la app.
 */
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

