const CACHE_NAME = "uhi-skill-share-v1";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/DefaultProfile.png",
  "/icon-192.png",
  "/favicon.ico",
  "/app.css",
  "/globals.css",
];

// Cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve from cache if offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
