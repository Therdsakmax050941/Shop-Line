<?php
require_once ('../function.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    
    $accessToken = $data->access_token;
    $table = $data->table;
    
    if ($accessToken === '123456') {

        Get_AllTable($data->table);
        exit();
    } else {
        // รหัสยืนยันไม่ถูกต้อง
        $response = array('message' => 'รหัสยืนยันไม่ถูกต้อง');
        echo json_encode($response);
        exit();
    }
}
?>
