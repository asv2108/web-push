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

пришлось изменить manifest.json 
"gcm_sender_id": "103953800507" c моего 709625869743 !!!!!!!!!!11 для локальной разработки через firebase serve



