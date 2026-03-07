const CACHE_NAME = 'score-tracker-v4'; // เปลี่ยนเวอร์ชันเพื่อบังคับล้างของเก่า
const ASSETS = [
  '/score-tracker/',
  '/score-tracker/index.html',
  '/score-tracker/style.css',
  '/score-tracker/script.js',
  '/score-tracker/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // บังคับอัปเดตทันที
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 🚀 เปลี่ยนเป็น Network First (โหลดของใหม่จากเน็ตก่อนเสมอ)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // ถ้าต่อเน็ตได้และโหลดสำเร็จ ให้จำไฟล์ใหม่ลง Cache
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // ถ้าไม่มีเน็ต (ออฟไลน์) ค่อยดึงของเก่าจาก Cache มาแสดง
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('/score-tracker/index.html');
          }
        });
      })
  );
});