<?php
$id=1;
$conn = new mysqli("localhost", "root", "", "webpush");
$sql = "SELECT * FROM user_push_id WHERE id=1";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
    $token = $row['key_push'];
}
$conn->close();
$title = $_POST['title'];
$body = $_POST['body'];



if($token){

// API access key from Google API's Console
    define('API_ACCESS_KEY', 'AAAApTj_da8:APA91bG-q75ChxZEArYelPzUJ0jzjZ2e6Q0pD3wT8lrsG4i7cvliU6HB-bJDvcg8mTjMGELYOmpxYbI-yOcZEKEAwEVHqHvm2H00g09dLSnHqL6mtOvs1ZDETbmYTkAr-I4oQ9_01GaA');
    $fields = array (
        'notification' => array (
            "title"=> "fffffffffff",
            "body"=> "465467",
            "icon"=> "firebase-logo.png",
            "click_action"=> ""
        ),
        'to'=>"dB_-2rtBtl0:APA91bHMRkxbyxHLMmPbVLV57svMvT9pHJCTNggzyxmFJpmlm4G29Kj_hxXwz_Ig8viS8a5uip0oDykh3Ffm_8qxuxevw8XEc_3EBYIsQGimsQKopSNcLaQwAPRiP7n-qiawFfmS0sDl"
    );

    $headers = array(
        'Authorization: key=' . API_ACCESS_KEY,
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

    echo $result;
    
    return true;
}else return false;

