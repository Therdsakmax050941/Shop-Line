// config.js
const config = {
    baseUrl: 'http://localhost:8000/Back-end/',
    
  };


// เมื่อค่าใน select เปลี่ยนแปลง
document.getElementById('product_category').addEventListener('change', function () {
    var selectedCategory = this.value; // รับค่าที่เลือก
    var productCodeInput = document.getElementById('product_code');
    // ส่งคำขอ Ajax เพื่อรับข้อมูล Product ทั้งหมด
    fetch(config.baseUrl + 'api/products/products.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token: "123456",
            table: "products"
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
        // ดึงข้อมูล Product ทั้งหมด
        const products = data.data;

        // สร้างเลขที่ไม่ซ้ำกัน
        const uniqueProductCode = generateUniqueProductCode(products);

        // ตั้งค่าค่าของ input รหัสหมวดหมู่ให้เป็นค่าที่เลือกและเลขที่ไม่ซ้ำกัน
        productCodeInput.value = selectedCategory + ':' + uniqueProductCode;
    })
    .catch(function (error) {
        console.error(error);
    });
});




// เมื่อค่าใน select เปลี่ยนแปลง
document.getElementById('product_category').addEventListener('change', function () {
    var selectedCategory = this.value; // รับค่าที่เลือก
    var productCodeInput = document.getElementById('product_code');

    // ส่งคำขอ Ajax เพื่อรับข้อมูลจาก API
    fetch(config.baseUrl + 'api/packages/packages.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token: "123456",
            table: "packages"
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
        var productCode = '001'; // รหัสเริ่มต้น
        var isCodeUnique = false;

        // ตรวจสอบรหัสใหม่จนกว่าจะไม่ซ้ำ
        while (!isCodeUnique) {
            var formattedCode = productCode.padStart(3, '0'); // ให้รหัสมีความยาว 3 ตัวเสมอ
            var generatedCode = selectedCategory + formattedCode; // รวมรหัสกับหมวดหมู่

            // ตรวจสอบว่ารหัสมีอยู่ในข้อมูลที่ได้จาก API หรือไม่
            var exists = data.some(function (item) {
                console.log(item);
                return item.product_key === generatedCode;
            });

            if (!exists) {
                // ถ้ารหัสไม่ซ้ำกันในข้อมูลที่ได้จาก API
                isCodeUnique = true;
                productCodeInput.value = generatedCode;
            } else {
                // ถ้ารหัสซ้ำกันในข้อมูลที่ได้จาก API ให้เพิ่มเลข
                productCode = (parseInt(productCode) + 1).toString();
            }
        }
    })
    .catch(function (error) {
        console.error(error);
    });
});

// ตั้งค่า input เป็น readonly เมื่อเริ่มต้น
document.getElementById('product_code').readOnly = true;



document.addEventListener('DOMContentLoaded', function () {
    // หากแบบฟอร์มถูกส่ง
    document.getElementById('form-package').addEventListener('submit', function (e) {
        e.preventDefault();
        // ดึงข้อมูลจากฟอร์ม
        var ProductTitle = document.getElementById('product_title').value;
        var ProductCode = document.getElementById('product_code').value;
        var imageFile = document.getElementById('image').files[0];

        // สร้าง FormData object
        var formData = new FormData();
        formData.append('Call_function', 'AddPackage');
        formData.append('Product_title', ProductTitle);
        formData.append('Product_code', ProductCode);
        formData.append('Image', imageFile);

        // ทำการส่งข้อมูล JSON ไปยัง Backend
        fetch(config.baseUrl + 'api/packages/product_add.php', {
            method: 'POST',
            body: formData
        })
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('เกิดข้อผิดพลาดในการส่งข้อมูล');
                }
            })
            .then(function (data) {
                console.log(data);
                if (data.message == true) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'สร้างหมวดหมู่สินค้าเรียบร้อยแล้ว'
                    })
                    document.getElementById('modal-form').classList.remove('show');
                    document.body.classList.remove('modal-open'); // ลบคลาส 'modal-open' ที่ถูกเพิ่มโดย Bootstrap
                    document.querySelector('.modal-backdrop').remove(); // ลบพื้นหลัง (backdrop) ของ Modal

                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดในการสร้างหมวดหมู่สินค้า'
                    })
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // หากแบบฟอร์มถูกส่ง
    document.getElementById('form-product').addEventListener('submit', function (e) {
        e.preventDefault();
        // ดึงข้อมูลจากฟอร์ม
        var ProductData = document.getElementById('product_category').value;
        var ProductName = document.getElementById('productName').value;
        var Price = document.getElementById('price').value;
        var QTY = document.getElementById('qty').value;
        var imageFile = document.getElementById('image').files[0];
        var ProductCode = document.getElementById('product_code').value;
        
        // สร้าง FormData object
        var formData = new FormData();
        formData.append('ProductData', ProductData);
        formData.append('ProductName', ProductName);
        formData.append('Price', Price);
        formData.append('QTY', QTY);
        formData.append('ProductCode', ProductCode);
        formData.append('Image', imageFile);

        // ทำการส่งข้อมูล JSON ไปยัง Backend
        fetch(config.baseUrl + 'api/products/product_add.php', {
            method: 'POST',
            body: formData
        })
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('เกิดข้อผิดพลาดในการส่งข้อมูล');
                }
            })
            .then(function (data) {
                console.log(data);
                if (data.message == true) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'สร้างสินค้าเรียบร้อยแล้ว'
                    })
                    document.getElementById('modal-form').classList.remove('show');
                    document.body.classList.remove('modal-open'); // ลบคลาส 'modal-open' ที่ถูกเพิ่มโดย Bootstrap
                    document.querySelector('.modal-backdrop').remove(); // ลบพื้นหลัง (backdrop) ของ Modal

                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดในการสร้างสินค้า'
                    })
                }
            })
            .catch(function (error) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดในการสร้างสินค้า'
                })
                console.error(error);
            });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // รับค่า pages จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const pagesParam = urlParams.get("pages");

    // เพิ่มคลาส "active" ถ้า ID ตรงกับค่า pages
    if (pagesParam === "dashboard") {
        document.getElementById("dashboard").classList.add("active");
    } else if (pagesParam === "package") {
        document.getElementById("package").classList.add("active");
    } else if (pagesParam === "product") {
        document.getElementById("product").classList.add("active");
    }
});

function loadTablePackage() {
    // ส่งคำขอ Ajax เพื่อรับข้อมูลอัพเดต
    fetch(config.baseUrl + 'api/packages/packages.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token: "123456",
            table: "packages"
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
            data.data.forEach(function (item) {
                // ตรวจสอบว่าแถวที่มี id ตรงกับข้อมูลใหม่มีอยู่หรือไม่
                var existingRow = document.getElementById('row-' + item.id);
                if (!existingRow) {
                    var newRow = document.createElement('tr');
                    newRow.id = 'row-' + item.id; // กำหนด id ให้กับแถวใหม่
                    newRow.innerHTML = `
                        <td>
                            <p class="text-xs font-weight-bold mb-0 text-center">${item.text}</p>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0 text-center">${item.product_data}</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <img src="${item.imageUrl}" class="avatar avatar-sm me-3">
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${item.created_at}</span>
                        </td>
                        <td class="align-middle text-center">
                            <a href="#" class="btn bg-gradient-info btn-sm active" role="button" aria-pressed="true">Edit</a>
                            <a href="#" class="btn bg-gradient-danger btn-sm active" role="button" aria-pressed="true">Del</a>
                        </td>
                    `;

                    // เพิ่มแถวใหม่ลงในตาราง
                    var tableBody = document.getElementById('table-body');
                    tableBody.appendChild(newRow);
                    updateRowCount();
                }
            });
        })
        .catch(function (error) {
            console.error(error);
        });
}
function loadTableProduct() {
    // ส่งคำขอ Ajax เพื่อรับข้อมูลอัพเดต
    fetch(config.baseUrl + 'api/products/products.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token: "123456",
            table: "products"
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
            data.data.forEach(function (item) {
                // ตรวจสอบว่าแถวที่มี id ตรงกับข้อมูลใหม่มีอยู่หรือไม่
                var existingRow = document.getElementById('row-' + item.id);
                if (!existingRow) {
                    var newRow = document.createElement('tr');
                    newRow.id = 'row-' + item.id; // กำหนด id ให้กับแถวใหม่
                    newRow.innerHTML = `
                        <td>
                            <p class="text-xs font-weight-bold mb-0 text-center">${item.product_title}</p>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0 text-center">${item.product_data}</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <img src="${item.imageUrl}" class="avatar avatar-sm me-3">
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0 text-center">${item.price}</p>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0 text-center">${item.qty}</p>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${item.created_at}</span>
                        </td>
                        <td class="align-middle text-center">
                            <a href="#" class="btn bg-gradient-info btn-sm active" role="button" aria-pressed="true">Edit</a>
                            <a href="#" class="btn bg-gradient-danger btn-sm active" role="button" aria-pressed="true">Del</a>
                        </td>
                    `;

                    // เพิ่มแถวใหม่ลงในตาราง
                    var tableBody = document.getElementById('table-body');
                    tableBody.appendChild(newRow);
                    updateRowCount();
                }
            });
        })
        .catch(function (error) {
            console.error(error);
        });
}
function updateRowCount() {
    var tableBody = document.getElementById('table-body');
    var rowCount = tableBody.getElementsByTagName('tr').length;
    var rowCountElement = document.getElementById('row-count');

    if (rowCountElement) {
        rowCountElement.textContent = rowCount.toString();
    }
}
// สร้างฟังก์ชันสำหรับโหลดข้อมูลและแนบไปยัง select
function loadSelectPackages() {
    // ส่งคำขอ Ajax เพื่อรับข้อมูลอัพเดต
    fetch(config.baseUrl + 'api/packages/packages.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token: "123456",
            table: "packages"
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
        // เลือกเลือก (select) โดย ID
        var productSelect = document.getElementById('product_category');
        
        // ล้างรายการที่มีอยู่ใน select ในกรณีที่ต้องการรีเซ็ตค่าเก่า
        productSelect.innerHTML = '<option value="">Default select</option>';
        
        // แนบข้อมูลเข้ากับ select
        data.data.forEach(function (item) {
            var option = document.createElement('option');
            option.value = item.product_data;
            option.textContent = item.product_data;
            productSelect.appendChild(option);
        });
    })
    .catch(function (error) {
        console.error(error);
    });
}

// สร้างฟังก์ชันสำหรับ Gen เลขที่ไม่ซ้ำกัน
function generateUniqueProductCode(products) {
    // ให้เริ่มต้นเลขที่ 1
    let nextProductCode = 1;

    // วนลูปเพื่อตรวจสอบเลขที่ไม่ซ้ำกัน
    while (true) {
        // สร้างเลขใหม่
        const newProductCode = ('00' + nextProductCode).slice(-3);

        // ตรวจสอบว่าเลขใหม่ไม่ซ้ำกับที่มีอยู่ในข้อมูล Product
        const isUnique = !products.some(function (product) {
            return product.product_key === newProductCode;
        });

        // ถ้าเลขใหม่ไม่ซ้ำกับที่มีอยู่ ให้ return เลขใหม่นี้
        if (isUnique) {
            return newProductCode;
        }

        // ถ้าเลขใหม่ซ้ำกับที่มีอยู่ ให้เพิ่มเลขที่จะลองในรอบถัดไป
        nextProductCode++;
    }
}


