const CACHE_NAME = 'ariza-kodlari-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Dosyaları Önbelleğe Alma (Yükleme Aşaması)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// İnternet Olmadığında Önbellekten Çalıştırma
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});