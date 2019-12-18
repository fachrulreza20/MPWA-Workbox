importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

var urlsToCache = [
  { url: '/', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/favteam.html', revision: '1' },
  { url: '/pages/ligainggris.html', revision: '1' },
  { url: '/pages/ligaspanyol.html', revision: '1' },
  { url: '/pages/ligajerman.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/materialize.css', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/fetchapi.js', revision: '1' },
  { url: '/js/config.js', revision: '1' },
  { url: '/js/db-controller.js', revision: '1' },  
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: 'js/materialize.min.js', revision: '1' },
  { url: 'js/materialize.js', revision: '1' },
]

if(workbox){
  
  workbox.precaching.precacheAndRoute(urlsToCache);

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.networkFirst({
      cacheName : 'fetch',
    })
  )

  workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );
}

self.addEventListener('push', event => {
  var body;

  if(event.data) {
    body = event.data.text()
  } else {
    body = "Push message"
  }

  var options = {
    body: body,
    icon: '/img/Notification.png',
    vibrate: [500, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});


self.addEventListener('install', event => {
  const urls = [
    'https://cdn.ampproject.org/v0.js',
    'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
    'https://cdn.ampproject.org/shadow-v0.js',
    'index.html',
    '/'
  ];
  const cacheName = workbox.core.cacheNames.runtime;
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(urls)));
});