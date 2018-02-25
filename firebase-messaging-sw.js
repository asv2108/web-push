importScripts('/__/firebasejs/4.10.1/firebase-app.js');
importScripts('/__/firebasejs/4.10.1/firebase-messaging.js');


var config = {
    messagingSenderId: "709625869743"
};
firebase.initializeApp(config);

firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
