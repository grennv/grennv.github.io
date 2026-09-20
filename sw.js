const CACHE_NAME = 'nav-pwa-v1';
const assets = [
  'index.html',
  'manifest.json'
];

// Yükleme aşamasında dosyaları önbelleğe al
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(assets);
        })
    );
});

// İnternet kesildiğinde önbellekten çalıştır
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});