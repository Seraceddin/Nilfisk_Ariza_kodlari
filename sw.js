const CACHE_NAME = 'nilfisk-ariza-v7'; // Her güncellemede burayı v4, v5 yapabilirsin
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Yeni dosyaları yükle ve beklemeden aktif et
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// 2. Eski versiyon hafızasını TELEFONDAN OTOMATİK SİL
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Eski sürümleri temizler
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Ağı kontrol et, yenisi varsa hemen getir
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});