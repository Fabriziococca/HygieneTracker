self.addEventListener('install', (e) => {
    console.log('[Service Worker] Hygiene Installed');
});

self.addEventListener('fetch', (e) => {
    // Interceptor para modo offline
});