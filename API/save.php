<?php
// get Request Payload from ajax (main.js string 21)
$data = file_get_contents('php://input');
$values= explode("&",$data);

$id = str_replace('https://fcm.googleapis.com/fcm/send/','',$values[0]);

$conn = new mysqli("localhost", "root", "", "web_push");

$sql = "UPDATE users_push_id SET key_push='{$id}', `key` ='{$values[1]}',auth='{$values[2]}' WHERE id=1";

if ($conn->query($sql) === TRUE) {
    echo 'users entry saved successfully';
}
else {
    echo 'Error: '. $conn->error;
}

$conn->close();