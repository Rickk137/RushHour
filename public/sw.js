const CACHE_NAME = 'CarCache';

self.addEventListener('fetch', function (event) {
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        if (response) {
          fetch(event.request)
            .then(function (response) {
              cache.put(event.request, response.clone());
              return response;
            })
            .catch((e) => e);
          return response;
        } else {
          return fetch(event.request)
            .then(function (response) {
              cache.put(event.request, response.clone());
              return response;
            })
            .catch((e) => e);
        }
      });
    })
  );
});
