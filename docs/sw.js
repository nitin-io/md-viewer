document.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('markdown-viewer-cache').then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll([
        '/index.html',
      ]);
    })
  );
});

// for api calls
// document.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });