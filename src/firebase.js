import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Tambahkan ini karena kita akan butuh autentikasi nanti

const firebaseConfig = {
  apiKey: "AIzaSyAKoNWn0PijVwJhOGlBsVcoRwlhhkZsqJg",
  authDomain: "family-hub-e7148.firebaseapp.com",
  projectId: "family-hub-e7148",
  storageBucket: "family-hub-e7148.firebasestorage.app",
  messagingSenderId: "243462126338",
  appId: "1:243462126338:web:fff9cbf4dd8173e6a2e01b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Ekspor fungsi autentikasi