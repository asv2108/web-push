<?php

$data = file_get_contents('php://input');
$conn = new mysqli("localhost", "root", "", "webpush");

$sql = "UPDATE users_push_id SET key_push='{$id}' WHERE id=1";

if ($conn->query($sql) === TRUE) {
    echo 'users entry saved successfully';
}
else {
    echo 'Error: '. $conn->error;
}

$conn->close();