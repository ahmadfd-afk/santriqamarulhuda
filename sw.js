
// SMS PWA Service Worker
const CACHE_NAME = 'sms-pwa-v1.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-152.png',
  './icon-167.png',
  './icon-120.png',
  './icon-96.png',
  './icon-72.png',
  './icon-48.png',
  './icon-32.png',
  './icon-16.png',
  './icon-maskable-512.png',
  './favicon-32.png',
  './favicon-16.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

// ─── INSTALL: Pre-cache static assets ───
self.addEventListener('install', (event) => {
  console.log('[SMS PWA] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SMS PWA] Caching static assets...');
        // Use addAll with fail-safe (skip failures for external CDN)
        return Promise.allSettled(
          STATIC_ASSETS.map(url => 
            cache.add(url).catch(err => console.warn('[SMS PWA] Skip cache:', url, err))
          )
        );
      })
      .then(() => {
        console.log('[SMS PWA] Install complete');
        return self.skipWaiting();
      })
  );
});

// ─── ACTIVATE: Clean old caches ───
self.addEventListener('activate', (event) => {
  console.log('[SMS PWA] Activating Service Worker...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('[SMS PWA] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SMS PWA] Activation complete');
        return self.clients.claim();
      })
  );
});

// ─── FETCH: Network-first for dynamic, cache-first for static ───
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // Skip cross-origin API calls (Supabase, etc.)
  if (requestUrl.origin !== self.location.origin && 
      !requestUrl.href.includes('cdnjs.cloudflare.com') &&
      !requestUrl.href.includes('unpkg.com')) {
    return;
  }

  // For navigation requests: Network-first with offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cached => cached || caches.match('./index.html'));
        })
    );
    return;
  }

  // For static assets: Cache-first with network update
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached and update in background
          fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }
        // Not in cache: fetch from network
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type === 'opaque') {
              return response;
            }
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            return response;
          })
          .catch(() => {
            // Offline fallback
            console.warn('[SMS PWA] Offline and no cache for:', event.request.url);
          });
      })
  );
});

// ─── MESSAGE: Handle skip waiting ───
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
