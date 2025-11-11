// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCvP2p9gbLhM7pAeRQ39wqePoZNkJ_ZOw",
  authDomain: "asistentep-9f276.firebaseapp.com",
  projectId: "asistentep-9f276",
  storageBucket: "asistentep-9f276.firebasestorage.app",
  messagingSenderId: "673127927073",
  appId: "1:673127927073:web:67da79b6dccc1beb704260"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta autenticación y proveedor de Google
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
