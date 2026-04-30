const CACHE_NAME = "tv-hispanas-v1-4";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style-v1-4.css",
  "./app-v1-4.js",
  "./icon.svg",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  // Never cache external playlists, video streams, or CDN scripts.
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // Network-first for local app files so updates appear quickly on GitHub Pages.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
