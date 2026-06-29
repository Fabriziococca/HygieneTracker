self.addEventListener('install', (e) => {
    console.log('[Service Worker] LifeCycle Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] LifeCycle Activated');
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    // Interceptor para modo offline
});

// Escuchar notificaciones Push
self.addEventListener('push', (event) => {
    let data = { title: 'LifeCycle', body: 'Nueva notificación' };
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data = { title: 'LifeCycle', body: event.data.text() };
        }
    }

    const options = {
        body: data.body,
        icon: '/icon.png',
        badge: '/icon.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Manejar clic en la notificación
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    let url = '/';
    if (event.notification.data && event.notification.data.url) {
        url = event.notification.data.url;
    }
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes(url) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});