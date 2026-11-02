const CACHE = 'claw2-shell-v2';
const CORE = ['./', './Claw2.html', './Claw2.js', './Claw2.wasm', './manifest.webmanifest', './icons/claw-192.png', './icons/claw-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const results = await Promise.allSettled(CORE.map(path =>
      cache.add(new Request(path, {cache: 'reload'}))));
    results.forEach((result, index) => {
      if (result.status === 'rejected') console.warn('PWA cache will retry on use:', CORE[index], result.reason);
    });
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('claw2-shell-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const path = url.pathname;
  if (path.includes('/assets/') || path.includes('/api/') || path.includes('/auth/')) return;
  // Revalidation is only useful for safe, bodyless requests. In particular,
  // streaming/range requests may already have a consumer attached to the body.
  if (request.headers.has('range')) return;
  const cacheResponse = response => {
    if (!response.ok || response.type === 'opaque' || response.bodyUsed) return;
    const copy = response.clone();
    return caches.open(CACHE).then(cache => cache.put(request, copy));
  };
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      event.waitUntil(Promise.resolve().then(() => cacheResponse(response)).catch(error => {
        console.warn('PWA cache update failed:', request.url, error);
      }));
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match(new URL('Claw2.html', self.registration.scope).href))));
    return;
  }
  if (!/\.(?:html|js|wasm|webmanifest|png)$/.test(path)) return;
  event.respondWith(fetch(request).then(response => {
    event.waitUntil(Promise.resolve().then(() => cacheResponse(response)).catch(error => {
      console.warn('PWA cache update failed:', request.url, error);
    }));
    return response;
  }).catch(async () => await caches.match(request) || Response.error()));
});
