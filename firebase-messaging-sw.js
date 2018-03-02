
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
        action : payload.data.action
    };
    return self.registration.showNotification('sw' + title,options);
});
