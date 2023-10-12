// เมื่อค่าใน select เปลี่ยนแปลง
document.getElementById('product_category').addEventListener('change', function () {
    var selectedCategory = this.value; // รับค่าที่เลือก
    var productCodeInput = document.getElementById('product_code');

    // ตั้งค่าค่าของ input รหัสหมวดหมู่ให้เป็นค่าที่เลือก
    productCodeInput.value = selectedCategory;
});

// เมื่อคุณคลิกปุ่ม Gen รหัส
document.getElementById('generateCodeBtn').addEventListener('click', function () {
    var selectedCategory = document.getElementById('product_category').value;
    var productCodeInput = document.getElementById('product_code');

    // ส่งคำขอ Ajax เพื่อตรวจสอบและ Gen รหัสใหม่
    fetch(baseUrl + 'api/packages/product.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token: "123456",
            table: "products",
            category: selectedCategory // ส่งค่าหมวดหมู่ที่เลือกไปกับคำขอ
        })
    })
    .then(function (response) {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
        }
    })
    .then(function (data) {
        // ดึงข้อมูลและเพิ่มข้อมูลใหม่ในตาราง
        var existingCodes = {}; // เก็บรหัสที่มีอยู่แล้ว
        data.data.forEach(function (item) {
            existingCodes[item.product_key] = true;
        });

        // Gen รหัสที่ไม่ซ้ำกัน
        var generatedCode = selectedCategory + '001'; // เริ่มต้นที่ 001
        while (existingCodes[generatedCode]) {
            // ถ้ารหัสซ้ำ ก็เพิ่มค่าขึ้น 1
            var lastDigits = parseInt(generatedCode.slice(-3));
            lastDigits++;
            generatedCode = selectedCategory + ('000' + lastDigits).slice(-3);
        }

        // ตั้งค่ารหัสที่ Gen ขึ้นใน input
        productCodeInput.value = generatedCode;
    })
    .catch(function (error) {
        console.error(error);
    });
});