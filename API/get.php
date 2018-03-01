<?php
$conn = new mysqli("localhost", "root", "", "webpush");
$sql = "SELECT key_push FROM user_push_id WHERE id=1";
$result = $conn->query($sql);