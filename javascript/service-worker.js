const CACHE_NAME = 'todo-list-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'css/style.css',
  'javascript/script.js',
  'manifest/manifest.json',
  'imagens/icon-192.png',
  'imagens/icon-512.png'
  // Adicione aqui os caminhos para os ícones, ex: 'images/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
