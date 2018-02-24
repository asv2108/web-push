<?php
// get Request Payload from ajax (main.js string 21)
$id = file_get_contents('php://input');

$conn = new mysqli("localhost", "root", "root", "webpush");
if ($conn->query("UPDATE users_push_id SET key_push='' WHERE id=1") === TRUE) {
    echo 'users entry update successfully';
}
else {
    echo 'Error: '. $conn->error;
}

$conn->close();