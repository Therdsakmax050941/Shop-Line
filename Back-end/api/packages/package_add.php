<?php
require_once ('../function.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);
    file_put_contents('json.txt', $json_data);
    // เชื่อมต่อกับฟังก์ชัน uploadImage
    $uploadedImagePath = uploadImage($_FILES['Image']);
    if (isset($_POST['Product_title'])) {
        $ProductTitle = $_POST['Product_title'];
        $ProductCode = $_POST['Product_code'];

        if ($uploadedImagePath) {
            // สร้าง JSON response 
            insertPackage($ProductTitle, $uploadedImagePath, $ProductCode);
            $response = array('message' => true, 'image_url' => $uploadedImagePath);
            echo json_encode($response);
        } else {
            $response = array('message' => 'มีข้อผิดพลาดในการอัปโหลดรูปภาพ');
            echo json_encode($response);
        }
        
        file_put_contents('log.txt', "บันทึกข้อมูลสำเร็จ at " . date('Y-m-d H:i:s'));
        exit();
    } 
} else{
    $response = array('message' => 'Method not allowed');
    echo json_encode($response);
    file_put_contents('log.txt', "Method not allowed at " . date('Y-m-d H:i:s'));
    exit();
}

?>
