var subscribeButton = document.querySelector('#subscribe');
var unSubscribeButton = document.querySelector('#unSubscribe');

messaging.requestPermission().then(function () {
    console.log('Есть возможность подписаться');
    subscribeButton.disabled = false;

}).catch(function (err) {
    alert('You need put on web notification in your browser!');
    console.log(err);
    // по таймауту перегрузить страницу?
    // location.reload();
});


//если убить сервис воркер вручную из браузера то он появляется при подписке

function subscribe() {
    messaging.getToken()
        .then(function (currentToken) {
            if (currentToken) {
                // внешнее отображение
                console.log(currentToken);
                showToken(currentToken);
                subscribeButton.disabled = true;
                unSubscribeButton.disabled = false;
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
                    subscribeButton.disabled = false ;
                    unSubscribeButton.disabled = true;
                    console.log('Token deleted.');
                    // убиваем ключ в бд
                    sendTokenToServer(currentToken,'delete');
                    location.reload();
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
    var options = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };
    var n = new Notification(payload.notification.title,options);
    setTimeout(n.close.bind(n), 20000);
});


function sendTokenToServer(currentToken,type) {
    // TODO(developer): Send the current token to your server.
}

//выводим кюч подписанного устройства
function showToken(currentToken) {
    var tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
}


// Add a message to the messages element.
function appendMessage(payload) {
    const messagesElement = document.querySelector('#messages');
    const dataHeaderELement = document.createElement('h5');
    const dataElement = document.createElement('pre');
    dataElement.style = 'overflow-x:hidden;';
    dataHeaderELement.textContent = 'Received message:';
    dataElement.textContent = JSON.stringify(payload, null, 2);
    messagesElement.appendChild(dataHeaderELement);
    messagesElement.appendChild(dataElement);
}

// onTokenRefresh  вызывается только при создании нового токена.              не отрабатывает!!!!!!!!!!!!!!!!!!!!!!
// Если ваше приложение было ранее установлено и сгенерировано токен,
// то onTokenRefresh не будет вызываться. Попробуйте удалить и переустановить приложение,
// чтобы заставить генерировать новый токен, это вызовет вызов onTokenRefresh.
// messaging.onTokenRefresh(function () {
//     messaging.getToken()
//         .then(function (refreshedToken) {
//             console.log('Token refreshed.');
//             showToken('refresh AAAAAAAAAAAAAAA    '+ refreshedToken);
//             alert('refresh');
//         })
//         .catch(function (err) {
//             console.log('Unable to retrieve refreshed token ', err);
//             alert('Проблема с ключем регистрации усьройства');
//         });
// });