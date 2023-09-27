import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBybyfybyGPD6j_QQC8wzfTTnAymn6lC3U",
  authDomain: "photofolio-916c0.firebaseapp.com",
  projectId: "photofolio-916c0",
  storageBucket: "photofolio-916c0.appspot.com",
  messagingSenderId: "920525085559",
  appId: "1:920525085559:web:9f216e30837f9c333adf72"
};

const app = initializeApp(firebaseConfig);
// export const auth=getAuth(app);
export const storage = getStorage();
export const db =getFirestore(app);