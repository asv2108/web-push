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

messaging.usePublicVapidKey("BC38NtDGBrwHcy3rELmRwA4whdxaRXGaKHzAxOAfWwbhobsgBLzbVXgfkztXfFi2zX-c14IOwPsUaKiQjfdE49I");


// кнопки подиски/отписки
var subscribeButton = document.querySelector('#subscribe');
var unSubscribeButton = document.querySelector('#unSubscribe');

// проверяем возможность разрешения подписки
messaging.requestPermission().then(function () {
    console.log('Есть возможность подписаться');
    subscribeButton.disabled = false;
    unSubscribeButton.disabled = true;
}).catch(function (err) {
    alert('You need put on web notification in your browser!');
    console.log(err);
    // по таймауту перегрузить страницу?
    // location.reload();
});

// получаем флаг подписки/не подписки
var statusSubscribe = localStorage.getItem('subscribe');

// TODO проверить чтобы времени отсрочки хватало
// если пользователь не подписан делаем кнопку подписки активной иначе - не активной, тоже с кнопкой отписки
setTimeout(function(){
    if(statusSubscribe === 'on'){
        subscribeButton.disabled = true;
        unSubscribeButton.disabled = false;
    }else{
        subscribeButton.disabled = false;
        unSubscribeButton.disabled = true;
    }
},500);


// подписаться на уведомления и получить токен
function subscribe() {
    messaging.getToken()
        .then(function (currentToken) {
            if (currentToken) {
                // внешнее отображение
                console.log(currentToken);
                showToken(currentToken);
                subscribeButton.disabled = true;
                unSubscribeButton.disabled = false;
                localStorage.setItem('subscribe', 'on');
                // сохранение токена в бд
                sendTokenToServer(currentToken,'set');
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
            }
        })
        .catch(function (err) {
            console.log(err);
            showToken(err);
            subscribeButton.disabled = false;
        })
}

function unSubscribe() {
    messaging.getToken()
        .then(function (currentToken) {
            messaging.deleteToken(currentToken)
                .then(function () {
                    localStorage.setItem('subscribe', 'out');
                    subscribeButton.disabled = false ;
                    unSubscribeButton.disabled = true;
                    console.log('Token deleted.');
                    // убиваем ключ в бд
                    sendTokenToServer('-','delete');
                    //location.reload();
                })
                .catch(function (err) {
                    console.log('Unable to delete token. ', err);
                    subscribeButton.disabled = false;
                    unSubscribeButton.disabled = true;
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}

// отображаем на сайте, если он открыт в текущей вкладке
messaging.onMessage(function (payload) {
    console.log(payload)
    var options = {
        body: payload.data.message + " " + payload.data.key,
        icon: 'firebase/firebase-logo.png',
        action : payload.data.action
    };
    var n = new Notification('add.js '+payload.data.title,options);
    setTimeout(n.close.bind(n), 20000);
});


function sendTokenToServer(currentToken,type) {
    // TODO(developer): Send the current token to your server.
    var url;
    if(type==='set'){
        url = 'API/save.php';
    }else{
        url = 'API/delete.php';
    }
    $.ajax({
        method:'POST',
        url:url,
        data:{token:currentToken}
    }).done(function(res){
        console.log(res);
    });
}

//выводим кюч подписанного устройства
function showToken(currentToken) {
    var tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
}
