self.addEventListener('install', (event) => {
    console.log('Service Worker Installed');
    event.waitUntil(
        caches.open('bingo-cache-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/script.js',
                '/manifest.json',
                '/icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
