const CACHE_NAME = "uhi-skill-share-v2";

const urlsToCache = [
  "/",
  "/manifest.json",
  "/DefaultProfile.png",
  "/icon-192.png",
  "/favicon.ico",
  "/offline.html",
];

// Cache only essential static assets on install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Remove old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy: Cache-first with dynamic caching & offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          // Clone and store in cache
          return caches.open(CACHE_NAME).then((cache) => {
            if (
              event.request.method === "GET" &&
              networkResponse.status === 200 &&
              event.request.url.startsWith(self.location.origin)
            ) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
        .catch(() => {
          // fallback for navigation requests (pages)
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        });
    })
  );
});
