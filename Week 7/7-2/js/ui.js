import { openDB } from "https://unpkg.com/idb?module";

// Initialize Sidenav and Forms
document.addEventListener("DOMContentLoaded", function () {
  const menus = document.querySelector(".sidenav");
  M.Sidenav.init(menus, { edge: "right" });

  const forms = document.querySelector(".side-form");
  M.Sidenav.init(forms, { edge: "left" });

  // Load tasks from the IndexedDB
  loadTasks();

  // Check storage usage
  checkStorageUsage();

  // Request persistent storage
  requestPersistentStorage();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceworker.js")
    .then((req) => console.log("Service Worker Registered!", req))
    .catch((err) => console.log("Service Worker registration failed", err));
}

// Create the IndexedDB database
async function createDB() {
  const db = await openDB("taskManager", 1, {
    upgrade(db) {
      const store = db.createObjectStore("tasks", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("status", "status");
    },
  });
  return db;
}

// Add Task with Transaction
async function addTask(task) {
  const db = await createDB();

  // Start a transaction
  const tx = db.transaction("tasks", "readwrite");
  const store = tx.objectStore("tasks");

  // Add task to store
  await store.add(task);

  // Complete transaction
  await tx.done;

  // Update storage usage
  checkStorageUsage();
}

// Delete Task with Transaction
async function deleteTask(id) {
  const db = await createDB();

  // Start a transaction
  const tx = db.transaction("tasks", "readwrite");
  const store = tx.objectStore("tasks");

  // Delete task by id
  await store.delete(id);

  // Complete transaction
  await tx.done;

  // Remove task from UI
  const taskCard = document.querySelector(`[data-id="${id}"]`);
  if (taskCard) {
    taskCard.remove();
  }

  // Update storage usage
  checkStorageUsage();
}

// Load Tasks with Transaction
async function loadTasks() {
  const db = await createDB();

  // Start a transaction (read-only)
  const tx = db.transaction("tasks", "readonly");
  const store = tx.objectStore("tasks");

  // Get all tasks
  const tasks = await store.getAll();

  // Complete transaction
  await tx.done;

  const taskContainer = document.querySelector(".tasks");
  taskContainer.innerHTML = ""; // Clear current tasks

  tasks.forEach((task) => {
    displayTask(task);
  });
}

// Display Task using the existing HTML structure
function displayTask(task) {
  const taskContainer = document.querySelector(".tasks");
  const html = `
    <div class="card-panel white row valign-wrapper" data-id="${task.id}">
      <div class="col s2">
        <img
          src="/img/icons/task.png"
          class="circle responsive-img"
          alt="Task icon"
          style="max-width: 100%; height: auto"
        />
      </div>
      <div class="task-detail col s8">
        <h5 class="task-title black-text">${task.title}</h5>
        <div class="task-description">${task.description}</div>
      </div>
      <div class="col s2 right-align">
        <button class="task-delete btn-flat" aria-label="Delete task">
          <i class="material-icons black-text text-darken-1" style="font-size: 30px">delete</i>
        </button>
      </div>
    </div>
  `;
  taskContainer.insertAdjacentHTML("beforeend", html);

  // Attach delete event listener
  const deleteButton = taskContainer.querySelector(
    `[data-id="${task.id}"] .task-delete`
  );
  deleteButton.addEventListener("click", () => deleteTask(task.id));
}

// Add Task Button Listener
const addTaskButton = document.querySelector(".btn-small");
addTaskButton.addEventListener("click", async () => {
  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");

  const task = {
    title: titleInput.value,
    description: descriptionInput.value,
    status: "pending",
  };

  await addTask(task); // Add task to IndexedDB

  displayTask(task); // Add task to the UI

  // Clear input fields after adding
  titleInput.value = "";
  descriptionInput.value = "";

  // Close the side form after adding
  const forms = document.querySelector(".side-form");
  const instance = M.Sidenav.getInstance(forms);
  instance.close();
});

// Function to check storage usage
async function checkStorageUsage() {
  if (navigator.storage && navigator.storage.estimate) {
    const { usage, quota } = await navigator.storage.estimate();
    const usageInMB = (usage / (1024 * 1024)).toFixed(2); // Convert to MB
    const quotaInMB = (quota / (1024 * 1024)).toFixed(2); // Convert to MB

    console.log(`Storage used: ${usageInMB} MB of ${quotaInMB} MB`);

    // Update the UI with storage info
    const storageInfo = document.querySelector("#storage-info");
    if (storageInfo) {
      storageInfo.textContent = `Storage used: ${usageInMB} MB of ${quotaInMB} MB`;
    }

    // Warn the user if storage usage exceeds 80%
    if (usage / quota > 0.8) {
      const storageWarning = document.querySelector("#storage-warning");
      if (storageWarning) {
        storageWarning.textContent =
          "Warning: You are running low on storage space. Please delete old tasks to free up space.";
        storageWarning.style.display = "block";
      }
    } else {
      const storageWarning = document.querySelector("#storage-warning");
      if (storageWarning) {
        storageWarning.textContent = "";
        storageWarning.style.display = "none";
      }
    }
  }
}

// Function to request persistent storage
async function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    const isPersistent = await navigator.storage.persist();
    console.log(`Persistent storage granted: ${isPersistent}`);

    // Update the UI with a message
    const storageMessage = document.querySelector("#persistent-storage-info");
    if (storageMessage) {
      if (isPersistent) {
        storageMessage.textContent =
          "Persistent storage granted. Your data is safe!";
        storageMessage.classList.remove("red-text");
        storageMessage.classList.add("green-text");
      } else {
        storageMessage.textContent =
          "Persistent storage not granted. Data might be cleared under storage pressure.";
        storageMessage.classList.remove("green-text");
        storageMessage.classList.add("red-text");
      }
    }
  }
}
