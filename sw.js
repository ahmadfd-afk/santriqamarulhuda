// SMS PWA Service Worker v2.0
const CACHE = 'sms-v4'; // <-- Ubah versi ini agar HP otomatis mengunduh pembaruan
const ASSETS = [
  './', './index.html', './manifest.json',
  './icon-192.png', './icon-512.png', './icon-180.png',
  './icon-maskable-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  
  // Masukkan file library lokal Anda di sini:
  './qrcode.min.js',
  './html5-qrcode.min.js',
  './JsBarcode.all.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(ASSETS.map(u => c.add(u).catch(() => {})))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Skip Supabase & external APIs
  if (url.href.includes('supabase.co') || url.href.includes('unpkg.com')) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
