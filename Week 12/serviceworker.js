// Import Firebase libraries using importScripts
importScripts(
  "https://www.gstatic.com/firebasejs/12.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging-compat.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyC2EVrwSGGXGoOHNE_xcsyhndEKEWZpric",
  authDomain: "taskmanager-78c9a.firebaseapp.com",
  projectId: "taskmanager-78c9a",
  storageBucket: "taskmanager-78c9a.firebasestorage.app",
  messagingSenderId: "293154372619",
  appId: "1:293154372619:web:56bc08cb6beee17b0a5b0e",
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("[serviceworker.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/img/icons/icon-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// serviceworker.js
const CACHE_NAME = "task-manager-v5";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/profile.html",
  "/pages/auth.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/ui.js",
  "/img/icons/task.png",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching files...");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => console.error("Caching failed:", error))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Deleting old cache...");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
    // Only handle GET requests
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request)
            .then((networkResponse) => {
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
            })
            .catch((error) => {
              console.error("Network fetch failed:", error);
              // Optionally, return a fallback offline page if desired
            })
        );
      })
    );
  }
});

// Listen for messages from ui.js
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FCM_TOKEN") {
    const fcmToken = event.data.token;
    console.log("Received FCM token in service worker:", fcmToken);
    // Here you might store or use the token as needed for push notifications
  }
});

// // Display notification for background messages
// self.addEventListener("push", (event) => {
//   if (event.data) {
//     const payload = event.data.json();
//     const { title, body, icon } = payload.notification;
//     const options = {
//       body,
//       icon: icon || "/img/icons/icon-192x192.png",
//     };
//     event.waitUntil(self.registration.showNotification(title, options));
//   }
// });
