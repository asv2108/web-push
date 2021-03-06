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

//обратный вызов срабатывает всякий раз, когда генерируется новый токен, поэтому вызов getToken в его контексте гарантирует,
// что вы получаете доступ к текущему доступному токену регистрации.
messaging.onTokenRefresh(function() {
    messaging.getToken()
        .then(function(refreshedToken) {
            console.log('Token refreshed.');
            showToken(refreshedToken);
            subscribeButton.disabled = true;
            unSubscribeButton.disabled = false;
            localStorage.setItem('subscribe', 'on');
            // сохранение токена в бд
            sendTokenToServer(refreshedToken, 'set');

        })
        .catch(function(err) {
            console.log(err);
            showToken(err);
        });
});

// проверяем возможность разрешения подписки
messaging.requestPermission().then(function () {
    // TODO полученный ранее токен может быть убит пользователем через запред уведомлений в броузере
    // нет метода checkToken  only get and delete
    console.log('Есть возможность подписаться ');
    subscribeButton.disabled = false;
    unSubscribeButton.disabled = true;

}).catch(function (err) {
    alert('You need put on web notification in your browser!');
    subscribeButton.disabled = true;
    unSubscribeButton.disabled = true;
    console.log(err);
    // по таймауту перегрузить страницу?
    // location.reload();
});


// получаем флаг подписки/не подписки
var statusSubscribe = localStorage.getItem('subscribe');

// TODO проверить чтобы времени отсрочки хватало
// если пользователь не подписан делаем кнопку подписки активной иначе - не активной, тоже с кнопкой отписки
setTimeout(function () {
    console.log('localStorage ' + statusSubscribe);
    if (statusSubscribe === 'on') {
        subscribeButton.disabled = true;
        unSubscribeButton.disabled = false;
    } else {
        subscribeButton.disabled = false;
        unSubscribeButton.disabled = true;
    }
}, 500);


// подписаться на уведомления и получить токен
function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
        .then(function () {
            // получаем ID устройства
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
                        sendTokenToServer(currentToken, 'set');
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
        })
        .catch(function (err) {
            console.warn('Не удалось получить разрешение на показ уведомлений.', err);
            console.log('Не удалось получить разрешение на показ уведомлений.')
        });
}

function unSubscribe() {
    messaging.getToken()
        .then(function (currentToken) {
            messaging.deleteToken(currentToken)
                .then(function () {
                    localStorage.setItem('subscribe', 'out');
                    subscribeButton.disabled = false;
                    unSubscribeButton.disabled = true;
                    console.log('Token deleted.');
                    // убиваем ключ в бд
                    sendTokenToServer('-', 'delete');
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
        "click_action": payload.data.action
    };
    var n = new Notification('add.js ' + payload.data.title, options);

    n.onclick =function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open( payload.data.action , '_blank');
    };

});


function sendTokenToServer(currentToken, type) {
    // TODO(developer): Send the current token to your server.
    var url;
    if (type === 'set') {
        url = 'API/save.php';
    } else {
        url = 'API/delete.php';
    }
    $.ajax({
        method: 'POST',
        url: url,
        data: {token: currentToken}
    }).done(function (res) {
        console.log(res);
    });
}

//выводим кюч подписанного устройства
function showToken(currentToken) {
    var tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
}
