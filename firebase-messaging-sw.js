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
//messaging.usePublicVapidKey("BC38NtDGBrwHcy3rELmRwA4whdxaRXGaKHzAxOAfWwbhobsgBLzbVXgfkztXfFi2zX-c14IOwPsUaKiQjfdE49I");

messaging.requestPermission().then(function () {
    console.log('Have permission');
    return messaging.getToken();
}).catch(function (err) {
    console.log(err);
});