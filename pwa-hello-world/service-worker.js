// Cache name and files to cache
const cacheName = 'pwa-hello-world-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json'
];

// Install the service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Caching app shell');
                return cache.addAll(filesToCache);
            })
    );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

// Serve files from cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
