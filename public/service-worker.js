const CACHE_NAME = "uhi-skill-share-v3";

const urlsToCache = [
  "/", // root page
  "/manifest.json",
  "/DefaultProfile.png",
  "/icon-192.png",
  "/favicon.ico",
  "/offline.html",
  "/global.css", // added to fix ERR_FAILED when offline
];

// Pre-cache core static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.all(
        urlsToCache.map(async (url) => {
          try {
            const response = await fetch(url, { cache: "no-store" });
            if (response.ok) {
              await cache.put(url, response.clone());
              console.log(`✅ Cached: ${url}`);
            } else {
              console.warn(`⚠️ Response not OK for ${url}:`, response.status);
            }
          } catch (err) {
            console.warn(`❌ Failed to cache: ${url}`, err);
          }
        })
      );
    })
  );
  self.skipWaiting();
});

// Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log(`🧹 Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Cache-first for static + dynamic cache fallback for others
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Only cache successful, same-origin responses
          if (
            networkResponse &&
            networkResponse.ok &&
            event.request.url.startsWith(self.location.origin)
          ) {
            const clonedResponse = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clonedResponse).catch((err) => {
                console.error("❌ cache.put() failed:", err);
              });
            });
          }
          return networkResponse;
        })
        .catch((error) => {
          console.warn("❌ fetch failed:", error);

          // Show fallback if it's a navigation request (e.g. full page load)
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        });
    })
  );
});
