var xmlReq = new XMLHttpRequest();
// зашить в форму страницы есть ли в базе ключ регистрации if(true) = isPushEnabled = true
var isPushEnabled = false;
var key =  document.querySelector('.js-push-address');
var subscribeButton = document.querySelector('.js-subscribe-button');
if(key){
    isPushEnabled = true;
    subscribeButton.textContent = 'Disable Push Messages';
}

window.addEventListener('load', function() {
    // console.log(e);
    // Check that service workers are supported, if so, progressively
    // enhance and add push messaging support, otherwise continue without it.
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(initialiseState);
    } else {
        console.log('Service workers aren\'t supported in this browser.');
    }

    var subscribeButton = document.querySelector('.js-subscribe-button');

    subscribeButton.addEventListener('click', function() {
        if (isPushEnabled) {
            unsubscribe();
        } else {
            subscribe();
        }
    });
});

// Once the service worker is registered set the initial state
function initialiseState() {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.log('Notifications aren\'t supported.');
        return;
    }

    // Check the current Notification permission.
    // If its denied, it's a permanent block until the
    // user changes the permission
    if (Notification.permission === 'denied') {
        console.log('The user has blocked notifications.');
        return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        console.log('Push messaging isn\'t supported.');
        return;
    }

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        // Do we already have a push message subscription?
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                // Enable any UI which subscribes / unsubscribes from
                // push messages.
                var subscribeButton = document.querySelector('.js-subscribe-button');
                var pushButton = document.querySelector('.js-push-button');
                subscribeButton.disabled = false;

                if (!subscription) {
                    // We aren’t subscribed to push, so set UI
                    // to allow the user to enable push
                    return;
                }

                // Set your UI to show they have subscribed for
                // push messages
                subscribeButton.textContent = 'Disable Push Messages';
                pushButton.disabled = false;
                console.log(isPushEnabled);
                isPushEnabled = true;

            })
            .catch(function(err) {
                console.log('Error during getSubscription()', err);
            });
    });
}

function subscribe() {
    // Disable the button so it can't be changed while
    // we process the permission request
    var subscribeButton = document.querySelector('.js-subscribe-button');
    var pushButton = document.querySelector('.js-push-button');
    //pushButton.disabled = true;

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BB7_clNFMHM_UNgjZjiV0a56bBei0oiuUtC8YJdIKhEnWppU_Q5AP2uibOk1lr8VeCpbKHsz-atwvf09AmiU-pQ')
        })
            .then(function(subscription) {
                // The subscription was successful
                isPushEnabled = true;
                subscribeButton.textContent = 'Disable Push Messages';
                pushButton.disabled = false;

                // Save the subscription subscription.endpoint into db
                return sendSubscriptionToServer(subscription,"subscribe");

            })
            .catch(function(e) {
                if (Notification.permission === 'denied') {
                    // The user denied the notification permission which
                    // means we failed to subscribe and the user will need
                    // to manually change the notification permission to
                    // subscribe to push messages
                    console.log('Permission for Notifications was denied');
                    subscribeButton.disabled = true;
                } else {
                    // A problem occurred with the subscription, this can
                    // often be down to an issue or lack of the gcm_sender_id
                    // and / or gcm_user_visible_only
                    console.log('Unable to subscribe to push.', e);
                    // pushButton.disabled = false;
                    subscribeButton.textContent = 'Enable Push Messages';
                }
            });
    });
}

function unsubscribe() {
    var subscribeButton = document.querySelector('.js-subscribe-button');
    var pushButton = document.querySelector('.js-push-button');
    pushButton.disabled = true;

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        // To unsubscribe from push messaging, you need get the
        // subcription object, which you can call unsubscribe() on.
        serviceWorkerRegistration.pushManager.getSubscription().then(
            function(pushSubscription) {
                // Check we have a subscription to unsubscribe
                if (!pushSubscription) {
                    // No subscription object, so set the state
                    // to allow the user to subscribe to push
                    isPushEnabled = false;
                    //pushButton.disabled = false;
                    subscribeButton.textContent = 'Enable Push Messages';
                    return;
                }
                // Make a request to your server to remove
                // the users data from your data store so you
                // don't attempt to send them push messages anymore
                sendSubscriptionToServer(pushSubscription,"unsubscribe");

                // We have a subcription, so call unsubscribe on it
                pushSubscription.unsubscribe().then(function() {
                    //pushButton.disabled = false;
                    subscribeButton.textContent = 'Enable Push Messages';
                    isPushEnabled = false;
                }).catch(function(e) {
                    // We failed to unsubscribe, this can lead to
                    // an unusual state, so may be best to remove
                    // the subscription id from your data store and
                    // inform the user that you disabled push

                    console.log('Unsubscription error: ', e);
                    //pushButton.disabled = false;
                });
            }).catch(function(e) {
            console.log('Error thrown while unsubscribing from ' +
                'push messaging.', e);
        });
    });
}


function sendPushMess(){
    xmlReq.open("GET","./API/send.php",true);
    xmlReq.send();
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


function sendSubscriptionToServer(subscription,type) {

    if (subscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
        var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
        key = rawKey ?
            btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) :
            '';
        var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
        var authSecret = rawAuthSecret ?
            btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) :
            '';
        var data = subscription.endpoint+'&'+key+'&'+authSecret;
        xmlReq.open("POST","./API/save.php",true);
        xmlReq.send(data);

        return subscription.endpoint;
    }

    var mergedEndpoint = subscription.endpoint;
    // Chrome 42 + 43 will not have the subscriptionId attached
    // to the endpoint.
    if (subscription.subscriptionId &&
        subscription.endpoint.indexOf(subscription.subscriptionId) === -1) {
        // Handle version 42 where you have separate subId and Endpoint
        mergedEndpoint = subscription.endpoint + '/' +
            subscription.subscriptionId;
    }

    var endpointSections = mergedEndpoint.split('/');
    var subscriptionId = endpointSections[endpointSections.length - 1];
    
    if(type=="subscribe"){
        xmlReq.open("POST","./API/save.php",true);
        xmlReq.send(subscriptionId);
    }
    if(type=="unsubscribe"){
        xmlReq.open("POST","./API/delete.php",true);
        xmlReq.send(subscriptionId);
    }

}

