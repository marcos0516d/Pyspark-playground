const CACHE_NAME = 'pyspark-playground-v8';
const PYODIDE_CACHE = 'pyodide-v0.26.4';
const MONACO_CACHE = 'monaco-v0.45.0';
const PYTHON_PKG_CACHE = 'python-packages-v1';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './principiante.html',
  './intermedio.html',
  './avanzado.html',
  './desafio.html',
  './lecciones_principiante.html',
  './lecciones_intermedio.html',
  './lecciones_avanzado.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME && key !== PYODIDE_CACHE && key !== MONACO_CACHE && key !== PYTHON_PKG_CACHE)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  if (url.includes('pyodide') && (url.endsWith('.wasm') || url.includes('/pyodide/'))) {
    event.respondWith(
      caches.open(PYODIDE_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  if (url.includes('monaco-editor')) {
    event.respondWith(
      caches.open(MONACO_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  if (url.includes('.whl') || url.includes('micropip') || url.includes('pypi.org')) {
    event.respondWith(
      caches.open(PYTHON_PKG_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (response.ok && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
