import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCq_ss2DfJPgJxG096h7yYudgB_KcS4mvI",
  authDomain: "taskmanager-f8b23.firebaseapp.com",
  projectId: "taskmanager-f8b23",
  storageBucket: "taskmanager-f8b23.appspot.com",
  messagingSenderId: "1072082620996",
  appId: "1:1072082620996:web:70b432bb54f9979c4b2211",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
