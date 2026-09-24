const CACHE_NAME = "findout-v1";

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    // Let the browser handle all requests normally.
    // We are not caching API/private data at this stage.
});