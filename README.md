Web push notification
Учетные данные для проекта
<script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
<script>
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBaaV8jUe_6oHafyAHLGiN2uO-Tfi7bFcg",
        authDomain: "vasilyev-e6d1e.firebaseapp.com",
        databaseURL: "https://vasilyev-e6d1e.firebaseio.com",
        projectId: "vasilyev-e6d1e",
        storageBucket: "",
        messagingSenderId: "709625869743"
    };
    firebase.initializeApp(config);
</script>

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

запуск локально без https
sudo su 
npm install -g firebase-tools
firebase login --interactive
firebase init
firebase serve
если выпадет ошибка пустой farebase.json
{
  "hosting": {
    "public": "./",
    "ignore": [
      "firebase.json",
      "database-rules.json",
      "storage.rules",
      "functions"
    ],
    "headers": [{
      "source" : "**/*.@(js|html)",
      "headers" : [ {
        "key" : "Cache-Control",
        "value" : "max-age=0"
      } ]
    }]
  }
}
firebase serve

Файл Service Worker-а должен называться именно firebase-messaging-sw.js и обязательно должен находиться
в корне проекта, то есть доступен по адресу https://example.com/firebase-messaging-sw.js. 
Путь к этому файлу жестко прописан в библиотеке Firebase.

пришлось изменить manifest.json 
"gcm_sender_id": "103953800507" c моего 709625869743 !!!!!!!!!!11 для локальной разработки через firebase serve

PublicVapidKey  Веб-конфигурация Сертификаты для Web Push 
BC38NtDGBrwHcy3rELmRwA4whdxaRXGaKHzAxOAfWwbhobsgBLzbVXgfkztXfFi2zX-c14IOwPsUaKiQjfdE49I


If you opt for a VAPID public key, use this specific FCM public key:
BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4
 
 

//старый вариант
curl -X POST --header "Authorization: key=AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA" \
    --Header "Content-Type: application/json" \
    https://fcm.googleapis.com/fcm/send \
    -d "{\"to\":\"fjGBLlAPFws:APA91bFy_jIoRXyx5Yq8Xn98d9r6QqZAG8MPkEtOW8UpBuhb39cdcKjXmY5jilE0t_dyZyYavk-7FdR9bWMIGzaXBBo03Rs6LLu02ZUEimCFLtEFlMvmH7p8ZlKGSOUQsJzjPrHvTMKH\",\"notification\":{\"title\": \"Hello\",\"body\":\"Second message\"},\"priority\":10}"

// новый вариант  
curl -X POST -H "Authorization: key=AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": ""
  },
  "time_to_live": 90000,
  "to": "cBr8y3luHA4:APA91bEgEWBvZm9-5raKYYGoRv8PM34B5TIksqhEuc4UjQ9UStOSjjMHFqlEfnVsy_Qk54D5KR77oXgFKTd6dkrRyqC775WUvdoFfdYy4akMuiYeiHpmg-34GfPH_zPMTQqpoCeLYp6n"
}' "https://fcm.googleapis.com/fcm/send"