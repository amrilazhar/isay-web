const CACHE_NAME = "version-1";
const urlsToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/manifest.webmanifest",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/vendors~main.chunk.js",
  "/message",
  "/notification",
  "/profile",
  "/setting",
];

const self = this;

// installation of service workers
self.addEventListener('install', (event) =>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
});


// listen for request
self.addEventListener('fetch', (event) =>{
  event.respondWith(
    caches.match(event.request)
      .then(()=>{
        return fetch(event.request)
          .catch(()=> caches.match('offline.html'));
      })
  )
});

// activate service workers
self.addEventListener('activate', (event) =>{
  const cachesWhiteList = [];
  cachesWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cachesNames) => Promise.all(
      cachesNames.map((cachesName) => {
        if(!cachesWhiteList.includes(cachesName)) {
          return caches.delete(cachesName);
        }
      })
    ))

  )
});