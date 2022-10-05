import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA6fTQVyO005g4xnx7JCJu6DdrRuBUyeBg",
  authDomain: "oryzapp-f0fc0.firebaseapp.com",
  projectId: "oryzapp-f0fc0",
  storageBucket: "oryzapp-f0fc0.appspot.com",
  messagingSenderId: "262215532517",
  appId: "1:262215532517:web:bd92f092137650977c390c",
  measurementId: "G-FH3LVG8ZQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();