import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2EVrwSGGXGoOHNE_xcsyhndEKEWZpric",
  authDomain: "taskmanager-78c9a.firebaseapp.com",
  projectId: "taskmanager-78c9a",
  storageBucket: "taskmanager-78c9a.firebasestorage.app",
  messagingSenderId: "293154372619",
  appId: "1:293154372619:web:56bc08cb6beee17b0a5b0e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { db, auth, messaging, getToken, onMessage };
