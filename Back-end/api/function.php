<?php
function db_con()
{
    $db_status = 1;
    if ($db_status == 1) {
        $dbHost = 'localhost'; // โฮสต์ฐานข้อมูล
        $dbName = 'test'; // ชื่อฐานข้อมูล
        $dbUser = 'root'; // ชื่อผู้ใช้ของฐานข้อมูล
        $dbPass = ''; // รหัสผ่านของฐานข้อมูล
    } else {
        $dbHost = "127.0.0.1";
        $dbName = "db0lucbi4dglvy";
        $dbUser = "uprfvkaszh1sa";
        $dbPass = "b+~~*6.hBlxl";
        
    }

    try {
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("การเชื่อมต่อฐานข้อมูลล้มเหลว: " . $e->getMessage());
    }
}
function uploadImage($imageFile) {
    if ($imageFile['error'] !== UPLOAD_ERR_OK) {
        return false;
    }
    
    $uploadDirectory = __DIR__ . '/imgs/';
    $baseUrl = 'http://localhost:8000/Back-end/api/imgs';

    $fileName = uniqid() . '_' . $imageFile['name'];
    $uploadPath = $uploadDirectory . $fileName;
    
    if (is_uploaded_file($imageFile['tmp_name']) && file_exists($uploadDirectory)) {
        if (move_uploaded_file($imageFile['tmp_name'], $uploadPath)) {
            return $baseUrl . '/' . $fileName;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


function insertPackage($title, $imageUrl, $productData) {
    try {
        $pdo = db_con(); // เรียกใช้ฟังก์ชันเพื่อเชื่อมต่อกับฐานข้อมูล

        // เตรียมคำสั่ง SQL
        $sql = "INSERT INTO packages (text, imageUrl, product_data, created_at)
                VALUES (:title, :imageUrl, :productData, NOW())";

        // เตรียมคำสั่ง SQL ในรูปแบบ PDO
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':imageUrl', $imageUrl, PDO::PARAM_STR);
        $stmt->bindParam(':productData', $productData, PDO::PARAM_STR);

        // รันคำสั่ง SQL
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    } catch (PDOException $e) {
        die("การเชื่อมต่อฐานข้อมูลล้มเหลว: " . $e->getMessage());
    }
}
function insertProduct($productData, $productName, $productKey, $qty,   $imageUrl, $price) {
    try {
        $pdo = db_con(); // เรียกใช้ฟังก์ชันเพื่อเชื่อมต่อกับฐานข้อมูล

        // เตรียมคำสั่ง SQL
        $sql = "INSERT INTO products (product_data, product_title, product_key, imageUrl, price, qty, created_at)
                VALUES (:productData, :productName, :productKey, :imageUrl, :price, :qty, NOW())";

        // เตรียมคำสั่ง SQL ในรูปแบบ PDO
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':productData', $productData, PDO::PARAM_STR);
        $stmt->bindParam(':productName', $productName, PDO::PARAM_STR);
        $stmt->bindParam(':productKey', $productKey, PDO::PARAM_STR);
        $stmt->bindParam(':imageUrl', $imageUrl, PDO::PARAM_STR);
        $stmt->bindParam(':price', $price, PDO::PARAM_STR);
        $stmt->bindParam(':qty', $qty, PDO::PARAM_STR);
        // รันคำสั่ง SQL
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    } catch (PDOException $e) {
        die("การเชื่อมต่อฐานข้อมูลล้มเหลว: " . $e->getMessage());
    }
}
function Get_AllTable($table) {
    try {
        $db = db_con(); 

        $query = "SELECT * FROM $table";
        $stmt = $db->query($query);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = array(
            'message' => 'ดึงข้อมูลสําเร็จ',
            'data' => $result // ข้อมูลจากฐานข้อมูล
        );

        // ส่ง JSON response กลับ
        echo json_encode($response);

        // บันทึกข้อมูลลงในไฟล์ log
        file_put_contents('log.txt', json_encode($response) . date('Y-m-d H:i:s'));

        exit();
    } catch (PDOException $e) {
        // กรณีเกิดข้อผิดพลาดในการเชื่อมต่อกับฐานข้อมูล
        $response = array('message' => 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล: ' . $e->getMessage());
        echo json_encode($response);
        file_put_contents('log.txt', json_encode($response) . date('Y-m-d H:i:s'));
        exit();
    }
}



?>