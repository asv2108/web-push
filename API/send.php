<?php
$id=1;
$conn = new mysqli("localhost", "root", "", "web_push");
$sql = "SELECT * FROM users_push_id WHERE id=1";
$result = $conn->query($sql);

$id=1;
while($row = $result->fetch_assoc()) {
    $id = $row['key_push'];
    $key = $row['key'];
    $auth = $row['auth'];
}
$conn->close();
//$id = file_get_contents('php://input');


if($id != 1){

// API access key from Google API's Console
    define('API_ACCESS_KEY', 'AAAA2lhdnac:APA91bElVixPf4wDm4zR6kFMmA4zlfJEvnM1yZk_64o4ounrC-gN16Qn1SqwC7InHMy5KmNdKISlBp8VJowOSvTW1wDmgeNuagREwFp7kYrh_1vgsv1KNjlfAV4RRI30xsNdV1MzcOPZ');

    $registrationIds = array($id);

    $msg = array(
        'message' => 'here is a message !',
        'title' => 'This is a title',
    );

    $fields = array(
        'registration_ids' => $registrationIds,
        'data' => $msg
    );

    $headers = array(
        'Authorization: key=' . API_ACCESS_KEY,
        'Content-Type: application/json'
    );

//    json_encode([
//        'registration_ids' => $registrationIds,
//        'data' => ['message' => 'Logos Send'],
//        'time_to_live' => 300,
//        'collapse_key' => 'test'
//    ])

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
//    curl_setopt($ch, CURLOPT_URL, 'https://android.googleapis.com/gcm/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'registration_ids' => array($id),
        'p256dh' => $key,
        'auth' => $auth,
        'data' => ['message' => 'Logos Send'],
        'vapid' => [
            'subject' => 'mailto:sender@example.com',
            'public_key' => 'BB7_clNFMHM_UNgjZjiV0a56bBei0oiuUtC8YJdIKhEnWppU_Q5AP2uibOk1lr8VeCpbKHsz-atwvf09AmiU-pQ',
            'private_key' => 'GZB3z0R3JLplw7S8mVEmpEQXJFl5SP-a-mMPg9wZ0d0'
        ],
        'time_to_live' => 300,
        'collapse_key' => 'test'
    ]));
    $result = curl_exec($ch);
    curl_close($ch);

    echo $result;
    
    return true;
}else return false;

