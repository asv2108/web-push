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

// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     };
//
//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });
