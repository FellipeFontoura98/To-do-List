const CACHE_NAME = 'todo-list-cache-v2'; // Mudei a versão para forçar a atualização
const urlsToCache = [
  '/',
  'index.html',
  'css/style.css',
  'javascript/script.js',
  'manifest.json',
  'images/icon-192.png',
  'images/icon-512.png'
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
        // Se o recurso estiver no cache, retorna ele. Senão, busca na rede.
        return response || fetch(event.request);
      })
  );
});
