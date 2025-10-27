// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVv2hNH6glQnFSIzsgfIAgFnp2Pt348Bk",
  authDomain: "task-manager-cba7c.firebaseapp.com",
  projectId: "task-manager-cba7c",
  storageBucket: "task-manager-cba7c.appspot.com",
  messagingSenderId: "612800638901",
  appId: "1:612800638901:web:481cc5366be57b9371f3fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Select elements
const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");
const showSignUp = document.getElementById("show-signup");
const showSignIn = document.getElementById("show-signin");
const signInBtn = document.getElementById("sign-in-btn");
const signUpBtn = document.getElementById("sign-up-btn");
const logoutBtn = document.getElementById("logout-btn");

// Show Sign Up form and hide Sign In form
showSignUp.addEventListener("click", () => {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

// Show Sign In form and hide Sign Up form
showSignIn.addEventListener("click", () => {
  signUpForm.style.display = "none";
  signInForm.style.display = "block";
});

// Sign up new users
signUpBtn.addEventListener("click", async () => {
  const email = document.getElementById("sign-up-email").value;
  const password = document.getElementById("sign-up-password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    M.toast({ html: "Sign up successful!" });
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  } catch (error) {
    M.toast({ html: error.message });
  }
});

// Sign in existing users
signInBtn.addEventListener("click", async () => {
  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(email, password);
    M.toast({ html: "Sign in successful!" });
    logoutBtn.style.display = "block";
  } catch (error) {
    M.toast({ html: error.message });
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    M.toast({ html: "Logged out successfully!" });
    logoutBtn.style.display = "none";
  } catch (error) {
    M.toast({ html: error.message });
  }
});
