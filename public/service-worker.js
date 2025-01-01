const VERSION = "V1"; // Force version update here
const CACHE_NAME = `SKIN_DETECTION_${VERSION}`;
const DB_NAME = "SkinDetection";
const DB_VERSION = 1;
const DB_STORE_NAME = "myStore";

// Cache core assets
async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return await cache.addAll([
    "/detection",
    "/sign-in",
    "/sign-up",
    "/profile",
    "/history",
    "/offline", // Offline fallback page
  ]);
}

// Install event: cache core assets and force activate new SW version
self.addEventListener("install", (event) => {
  console.log(`Service Worker installed. Version: ${VERSION}`);
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting(); // Force activation immediately
});

// Clear old caches when activating new Service Worker version
async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME) // Keep only the current version cache
      .map((name) => caches.delete(name))
  );
}

self.addEventListener("activate", (event) => {
  console.log(`Service Worker activated. Clearing old caches.`);
  event.waitUntil(clearOldCaches().then(async () => {
     // Unregister old Service Workers
     const registrations = await self.registration.unregister();
     console.log("Old Service Worker unregistered:", registrations);

     self.clients.claim();
  }));
});

// IndexedDB functions remain unchanged
function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(DB_STORE_NAME, { keyPath: "url" });
    };
  });
}

async function addData(url, jsonData) {
  const db = await openDb();
  const transaction = db.transaction(DB_STORE_NAME, "readwrite");
  const store = transaction.objectStore(DB_STORE_NAME);

  const data = { url, response: JSON.stringify(jsonData) };
  const request = store.put(data);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function getData(url) {
  try {
    const db = await openDb();
    const transaction = db.transaction(DB_STORE_NAME, "readonly");
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.get(url);

    const result = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return result ? JSON.parse(result.response) : null;
  } catch (error) {
    console.error("Error retrieving from IndexedDB:", error);
    return null;
  }
}

// Strategies
async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;

    const networkResponse = await fetch(request);
    await cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.error("Cache first strategy failed:", error);
    return caches.match("/offline");
  }
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await addData(request.url, await networkResponse.clone().json());
      return networkResponse;
    }
    throw new Error("Network response not OK");
  } catch (error) {
    console.error("Network first strategy failed:", error);
    const cachedResponse = await getData(request.url);
    if (cachedResponse) {
      return new Response(JSON.stringify(cachedResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("[]", { status: 200 });
  }
}

async function dynamicCaching(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.error("Dynamic caching failed:", error);
    return caches.match(request);
  }
}

// Fetch event
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Bypass POST and PUT requests
  if (request.method === "POST" || request.method === "PUT") {
    console.log(`Bypassing caching for ${request.method} request: ${request.url}`);
    return;
  }

  const url = new URL(request.url);

  if (url.origin === "http://localhost:4000") {
    event.respondWith(networkFirstStrategy(request));
  } else if (request.mode === "navigate") {
    event.respondWith(cacheFirstStrategy(request));
  } else {
    event.respondWith(dynamicCaching(request));
  }
});
