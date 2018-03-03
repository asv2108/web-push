<?php
$id=1;
$conn = new mysqli("localhost", "root", "", "webpush");
$sql = "SELECT * FROM user_push_id WHERE id=1";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
    $token = $row['key_push'];
}
$conn->close();

// собираем массив адресатов
$registration_ids = array();
array_push($registration_ids,$token);


if(count($registration_ids)>0){


    // подготовка данных сообщения
    $title = $_POST['title'];
    $body = $_POST['body'];
    $to_url = $_POST['to-url'];
    $key = $_POST['key'];

    // TODO time_to_live не отрабатывает
    $fields = array (
        'time_to_live'=> 3,
        'data'=>array(
            'message'=> $body,
            'title'=> $title,
            'key'=> $key,
            "action" => $to_url
        ),
        "registration_ids"=>$registration_ids
    );


    // Ключ сервера
    // TODO спрятать в конфиг
    $api_key = 'AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA';

    $headers = array(
        'Authorization: key=' . $api_key,
        'Content-Type: application/json'
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $result = curl_exec($ch);
    curl_close($ch);

    //запрашивая аяксом отправлять джейсоном результат
//    echo $result;

    header('HTTP/1.1 301');
    header('Location: /');
    return true;

}else return false;

