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
 
// новый вариант  
curl -X POST -H "Authorization: key=AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": ""
  },
  "time_to_live": 90000,
  "to": "e_AiE7Sjaao:APA91bEKYUvS_IMmHMOTRFAFP_t37GY9FxqfJKSO_bKHFbE79mKPQTWy1JTtrmu6KvlL0qXmTVP95RohcGZ4E9tDd_LOrcbcO03IkraCikkJ4QoE-07QcZHm91qqYfUo5rSMfr1xvc2o"
}' "https://fcm.googleapis.com/fcm/send"


https http://help.ubuntu.ru/wiki/apache2#настройка_https_в_apache
https://www.digitalocean.com/community/tutorials/how-to-create-a-ssl-certificate-on-apache-for-ubuntu-14-04

default-ssl.conf
<IfModule mod_ssl.c>
	<VirtualHost _default_:443>
		ServerAdmin webmaster@localhost
        #DocumentRoot /var/www/html
		DocumentRoot /home/mycredit/www
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        SSLEngine on
        SSLCertificateFile /etc/apache2/ssl/apache.crt
        SSLCertificateKeyFile /etc/apache2/ssl/apache.key
        <FilesMatch "\.(cgi|shtml|phtml|php)$">
                        SSLOptions +StdEnvVars
        </FilesMatch>
        <Directory /usr/lib/cgi-bin>
                        SSLOptions +StdEnvVars
        </Directory>
        BrowserMatch "MSIE [2-6]" \
                        nokeepalive ssl-unclean-shutdown \
                        downgrade-1.0 force-response-1.0
        BrowserMatch "MSIE [17-9]" ssl-unclean-shutdown
	</VirtualHost>
</IfModule>

my new sites availble
<VirtualHost *:443>
    ServerName webpush-ssl
    DocumentRoot /home/mycredit/www/webpush
	<Directory />
		Options FollowSymLinks
		AllowOverride None
	</Directory>
	<Directory /home/mycredit/www/webpush>
		Options Indexes FollowSymlinks
		AllowOverride All
		Require all granted
	</Directory>
    SSLEngine on
    #SSLCertificateFile /etc/apache2/ssl/apache.crt
    #SSLCertificateKeyFile /etc/apache2/ssl/apache.key
    SSLCertificateFile    /etc/ssl/certs/server.pem
    SSLCertificateKeyFile /etc/ssl/private/server.key
</VirtualHost>

127.0.0.1	webpush-ssl

"Failed to register a ServiceWorker: An SSL certificate error occurred when fetching the script."

chrome://flags/#allow-insecure-localhost  вкл

в хроме не удалось запустить

пробую мозилу


//удалить .firebaserc firebase-debug.log