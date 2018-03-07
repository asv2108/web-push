<?php

//$data = file_get_contents('php://input');
$token = $_POST['token'];

try {
    $conn = new PDO("mysql:host=localhost;dbname=webpush", "root", "");
    $stmt = $conn->prepare("INSERT INTO user_push_id (key_push) VALUES (:token)");
    $stmt->bindParam(':token', $token);
    $stmt->execute();
    echo "New record created successfully";
}
catch(PDOException $e)
{
    echo $sql . "<br>" . $e->getMessage();
}
$conn = null;

