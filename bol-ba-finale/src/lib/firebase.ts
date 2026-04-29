import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDe89pW8QGSLEZLI8DAFCieKIw63xZVmUc",
  authDomain: "siti-ristoranti.firebaseapp.com",
  projectId: "siti-ristoranti",
  storageBucket: "siti-ristoranti.firebasestorage.app",
  messagingSenderId: "1040982710454",
  appId: "1:1040982710454:web:258e9aab18e5e55d972e17"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
