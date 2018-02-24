'use strict';

self.addEventListener('push', function(event) {
    console.log('Received a push message', event);
    // console.log(event.data);
    
    event.waitUntil(
        fetch('./notification-body.json').then(function (response) {
            if (response.status !== 200) {
                console.log('notification-body.json request error: ' + response.status);
                throw new Error();
            }

            return response.json().then(function (data) {
                if (data.error || !data.notification) {
                    console.error('notification-body.json Format Error.', data.error);
                    throw new Error();
                }

                var title = data.notification.title;
                var body = data.notification.body;
                var icon = './icon.png';

                return self.registration.showNotification(title, {
                    body: body,
                    icon: icon,
                    data: {
                        url: data.notification.url
                    }
                });
            }).catch(function (err) {
                console.error('Retrieve data Error', err);
            });
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn’t close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === '/' && 'focus' in client) {
                return client.focus();
            }
        }
        if (clients.openWindow) {
            return clients.openWindow('/');
        }
    }));
});
