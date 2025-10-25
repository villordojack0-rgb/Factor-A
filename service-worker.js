const CACHE_NAME = "factor-a-v1";
const ASSETS = [
  "home.html",
  "escuela.html",
  "medico.html",
  "personal.html",
  "config.html",
  "styles.css",
  "js/storage.js",
  "js/ui.js",
  "app.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
