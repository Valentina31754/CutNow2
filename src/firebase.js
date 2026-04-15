import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDJ3oPDTQ9LVy1NBGJnDBCetlSEW1tiLGA",
  authDomain: "cutnow-3cadc.firebaseapp.com",
  projectId: "cutnow-3cadc",
  storageBucket: "cutnow-3cadc.firebasestorage.app",
  messagingSenderId: "28319789875",
  appId: "1:28319789875:web:fbb6b32c11a738971f8446"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export default app;