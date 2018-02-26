<?php
$conn = new mysqli("localhost", "root", "", "web_push");
$sql = "SELECT key_push FROM users_push_id WHERE id=1";
$result = $conn->query($sql);