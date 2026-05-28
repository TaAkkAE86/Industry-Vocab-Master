const CACHE_NAME = 'vocab-master-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ติดตั้ง Service Worker และบันทึกไฟล์ลง Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ดึงข้อมูลจาก Cache มาใช้เพื่อให้โหลดเร็วขึ้น/ออฟไลน์ได้
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // ถ้ามีใน Cache ให้ดึงมาใช้เลย
        }
        return fetch(event.request); // ถ้าไม่มีให้โหลดจากเน็ต
      })
  );
});
