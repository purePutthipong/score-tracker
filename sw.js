const CACHE_NAME = 'score-tracker-v17';
const BASE = self.location.pathname.replace(/sw\.js$/, '');

const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'css/style.css',
  BASE + 'css/onboarding.css',
  BASE + 'css/enhancements.css',
  BASE + 'js/constants.js',
  BASE + 'js/state.js',
  BASE + 'js/lang.js',
  BASE + 'js/mobile.js',
  BASE + 'js/crud.js',
  BASE + 'js/calculate.js',
  BASE + 'js/ui.js',
  BASE + 'js/dashboard.js',
  BASE + 'js/export.js',
  BASE + 'js/sync.js',
  BASE + 'js/init.js',
  BASE + 'js/onboarding.js',
  BASE + 'js/pwa.js',
  BASE + 'js/share.js',
  BASE + 'js/grade-goal.js',
  BASE + 'js/enhancements.js',
  BASE + 'js/analytics.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => {
      // แจ้ง client ทุกหน้าว่ามี version ใหม่
      self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
        clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }));
      });
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});