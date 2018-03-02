
importScripts('firebase/firebase.js');
var config = {
    apiKey: "AIzaSyBaaV8jUe_6oHafyAHLGiN2uO-Tfi7bFcg",
    authDomain: "vasilyev-e6d1e.firebaseapp.com",
    databaseURL: "https://vasilyev-e6d1e.firebaseio.com",
    projectId: "vasilyev-e6d1e",
    storageBucket: "",
    messagingSenderId: "709625869743"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

//отрабатывает если слать не notification а data section  и при свернутой текущей вкладке
messaging.setBackgroundMessageHandler(function(payload) {
    const title = 'Из сервис воркера';
    const options = {
        body: payload.data.message,
        icon: 'firebase/firebase-logo.png',
        click_action : payload.data.action
    };
    return self.registration.showNotification('sw' + title,options);
});

// обработка клика на уведомлении
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
            .then(function(clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow(payload.data.action);
                }
            })
    );
});