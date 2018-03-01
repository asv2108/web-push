<?php
// get Request Payload from ajax
//$id = file_get_contents('php://input');

$conn = new mysqli("localhost", "root", "", "webpush");
if ($conn->query("UPDATE user_push_id SET key_push='-' WHERE id=1") === TRUE) {
    echo 'users entry update successfully';
}
else {
    echo 'Error: '. $conn->error;
}

$conn->close();