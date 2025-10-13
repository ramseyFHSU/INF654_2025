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
  apiKey: "AIzaSyBc-lkGjg6rwIvn0YT3bI2ktwGucBOl4aI",
  authDomain: "taskmanager-a6733.firebaseapp.com",
  projectId: "taskmanager-a6733",
  storageBucket: "taskmanager-a6733.appspot.com",
  messagingSenderId: "761617104236",
  appId: "1:761617104236:web:dfbed00b06f9ef9f46c749",
  measurementId: "G-6SGL3XYQD2",
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

export async function deleteTaskFromFirebase(id) {
  if (!id) {
    console.error("Invalid ID passed to deleteTaskFromFirebase.");
    return;
  }
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
