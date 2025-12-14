const CACHE = "br-portfolio-v1";
const ASSETS = [
    "./",
    "./index.html",
    "./assets/styles.css",
    "./assets/app.js",
    "./data/profile.json",
    "./data/projects.json"
];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(hit => hit || fetch(e.request))
    );
});
