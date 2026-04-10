const CACHE_NAME = 'share-target-cache';

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.searchParams.has('share-target') && event.request.method === 'POST') {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const image = formData.get('image');

      if (image) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put('/shared-image', new Response(image));
      }

      return Response.redirect(`${url.origin}${url.pathname}?share-target`, 303);
    })());
  }
});
