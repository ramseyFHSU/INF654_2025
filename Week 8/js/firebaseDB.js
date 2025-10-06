// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDztDzM2PVtz837A6Ti1WpUDo_DfcBewNE",
  authDomain: "ts-manager-ef3ee.firebaseapp.com",
  projectId: "ts-manager-ef3ee",
  storageBucket: "ts-manager-ef3ee.appspot.com",
  messagingSenderId: "60015661850",
  appId: "1:60015661850:web:3f9888b00053aa3aec12a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a task
export async function addTaskToFirebase(task) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return { id: docRef.id, ...task };
  } catch (e) {
    console.error("Error adding task: ", e);
  }
}

export async function getTasksFromFirebase() {
  const tasks = [];
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error retrieving tasks: ", e);
  }
  return tasks;
}
w;
export async function deleteTaskFromFirebase(id) {
  try {
    await deleteDoc(doc(db, "tasks", id));
  } catch (e) {
    console.error("Error deleting task: ", e);
  }
}

export async function updateTaskInFirebase(id, updatedData) {
  try {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updatedData);
  } catch (e) {
    console.error("Error updating task: ", e);
  }
}
