Web push notification

apiKey: "AIzaSyBaaV8jUe_6oHafyAHLGiN2uO-Tfi7bFcg",
messagingSenderId: "709625869743"
    
Ключ сервера
AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA
Устаревший ключ сервера help_outline
AIzaSyC5YuWXNEuXMtRWsj09VV0TwAyOZJtv8Fk
Идентификатор отправителя help_outline
709625869743

Веб-конфигурация
Пара ключей для web приложения
приватный - YM4BjG3wuACJ6yVW6dzSIB6ck5on5TO35JFDbORU3_g
app - BC38NtDGBrwHcy3rELmRwA4whdxaRXGaKHzAxOAfWwbhobsgBLzbVXgfkztXfFi2zX-c14IOwPsUaKiQjfdE49I

если убить сервис воркер вручную из браузера то он появляется при подписке

Файл Service Worker-а должен называться именно firebase-messaging-sw.js и обязательно должен находиться
в корне проекта, то есть доступен по адресу https://example.com/firebase-messaging-sw.js. 
Путь к этому файлу жестко прописан в библиотеке Firebase.

В зависимости от того свернута ли текущая страница или активна
в сервис воркере будет запускаться или messaging.setBackgroundMessageHandler  или messaging.onMessage from app.js

пришлось изменить manifest.json 
"gcm_sender_id": "103953800507" c моего 709625869743 

PublicVapidKey  Веб-конфигурация Сертификаты для Web Push 
BC38NtDGBrwHcy3rELmRwA4whdxaRXGaKHzAxOAfWwbhobsgBLzbVXgfkztXfFi2zX-c14IOwPsUaKiQjfdE49I

If you opt for a VAPID public key, use this specific FCM public key:
BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4
 

// если не слать секцию notification тогда срабатывает код из сервис воркера
curl -X POST -H "Authorization: key=AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA" -H "Content-Type: application/json" -d '{
  "data" : {
        "volume" : "3.21.15",
        "contents" : "http://www.news-magazine.com/world-week/21659772"
  },
  "time_to_live": 90000,
  "to": "cejsr6mJB3U:APA91bEZnonIq4HN_cGEL4RNzvugyWxXTFkqWCXSJZphHth6s6qcMS7W2hRxdzww_RdZwwJ86so8b5sX2QE-K0u0lqwIFxQoSiVefl91df3kO9wULG2oFmDYKHkfRA3yV3p8nFyFh3Wi"
}' "https://fcm.googleapis.com/fcm/send"