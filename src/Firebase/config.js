// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcCPtWVrqjbqf5rjh1_3XeIFisp165jzg",
  authDomain: "the-crew-a41a5.firebaseapp.com",
  projectId: "the-crew-a41a5",
  storageBucket: "the-crew-a41a5.appspot.com",
  messagingSenderId: "956090319475",
  appId: "1:956090319475:web:26b7a01b257d4ba5822006",
  measurementId: "G-L624NZKEDF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);