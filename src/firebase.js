import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA5rnfQaM8nTRa5wlbXp__UUa-hZ01VlFw",

  authDomain: "mepload-cd4b3.firebaseapp.com",

  projectId: "mepload-cd4b3",

  storageBucket: "mepload-cd4b3.appspot.com",

  messagingSenderId: "722933437286",

  appId: "1:722933437286:web:28192a68adee6432592ea7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
