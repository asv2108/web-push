<?php
$id=1;
$conn = new mysqli("localhost", "root", "", "webpush");
$sql = "SELECT * FROM user_push_id WHERE id=1";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
    $token = $row['key_push'];
}
$conn->close();

if($token){
    $title = $_POST['title'];
    $body = $_POST['body'];
    $to_url = $_POST['to-url'];
    $key = $_POST['key'];


    // отображает service worker при параметре data
    $fields = array (
        'data'=>array(
            'message'=> $body,
            'title'=> $title,
            'key'=> $key,
            "action" => $to_url
        ),
        'to'=>$token
    );

    // отображает сама служба firebase при параметре notification
    $fields2 = array (
        'notification' => array (
            "title"=> $title,
            "body"=> $body,
            "icon"=> "firebase-logo.png",
            "click_action"=> $to_url
        ),
        'to'=>$token
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
    $result = curl_exec($ch);
    curl_close($ch);

    //echo $result;
    header('HTTP/1.1 301');
    header('Location: /');
    return true;
}else return false;

