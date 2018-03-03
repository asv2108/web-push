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
  "time_to_live": 3,
  "data" : {
        "message" : "message terminal",
         "title" : "title terminal",
         "key" : "dggdfs",
         "action" : "http://dev.mycredit.ua/ru/faq/"
  }
  "to": "dI4WVRUxSco:APA91bFHkloiHNMsL5KptpTooj2UyBe25A084Y8fDwpEwTtgkhFsvtHs3JmT9bhfp1rn98hljrJcNGhmaR-cFZ4btoTNy4Lnv5hg54ez0_JPKGHXV3a1rVt7gFm43SpvXadMESRqYJ56"
}' "https://fcm.googleapis.com/fcm/send"

curl -X POST -H "Authorization: key=AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA" -H "Content-Type: application/json" -d '{
  "time_to_live": 3,
  "data" : {
        "message" : "message terminal",
         "title" : "title terminal",
         "key" : "dggdfs",
         "action" : "http://dev.mycredit.ua/ru/faq/"
  }
  "to": "dI4WVRUxSco:APA91bFHkloiHNMsL5KptpTooj2UyBe25A084Y8fDwpEwTtgkhFsvtHs3JmT9bhfp1rn98hljrJcNGhmaR-cFZ4btoTNy4Lnv5hg54ez0_JPKGHXV3a1rVt7gFm43SpvXadMESRqYJ56"
}' "https://fcm.googleapis.com/fcm/send"


curl -X POST -H "Authorization: key=AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA" -H "Content-Type: application/json" -d '{
  "time_to_live": 3,
  "data" : {
        "message" : "message terminal",
         "title" : "title terminal",
         "key" : "dggdfs",
         "action" : "http://dev.mycredit.ua/ru/faq/"
  }
  "registration_ids": ["eRybdH8C-ts:APA91bFGv1Y9GkbL7rg1yFWSzLxSC6zAGHN8LU_0yQdvCEZQL3H2UcuM3oNH5eWJC7Pc-KBjxc7Gsx77_m0-8aFnXdA5fKhWvto91RlIHq7mjBK0uCvON3kGZ5fF_Bf3DzBMZtJp7NCZ"]
}' "https://fcm.googleapis.com/fcm/send"

