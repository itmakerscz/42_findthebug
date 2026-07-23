var CACHE = "find-the-bug-v1";
var ASSETS = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/ui.js",
    "/round.js",
    "/manifest.json",
    "/data/easy.json",
    "/data/medium.json",
    "/data/hard.json"
];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
