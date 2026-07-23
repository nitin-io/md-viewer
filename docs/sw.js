self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('markdown-viewer-cache').then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(['/index.html']);
    }),
  );
});