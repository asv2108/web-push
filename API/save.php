<?php

//$data = file_get_contents('php://input');
$token = $_POST['token'];

$conn = new mysqli("localhost", "root", "", "webpush");
$sql = "UPDATE user_push_id SET key_push='{$token}' WHERE id=1";

if ($conn->query($sql) === TRUE) {
    echo 'users entry saved successfully';
}
else {
    echo 'Error: '. $conn->error;
}

$conn->close();