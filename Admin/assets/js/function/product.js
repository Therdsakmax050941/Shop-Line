// config.js
const config = {
    baseUrl: "http://localhost:8000/Back-end/",
};
function loadSelectPackages() {
    // ส่งคำขอ Ajax เพื่อรับข้อมูลอัพเดต
    fetch(config.baseUrl + "api/packages/packages.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: "123456",
            table: "packages",
        }),
    })
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
            }
        })
        .then(function (data) {
            // เลือกเลือก (select) โดย ID
            var productSelect = document.getElementById("product_category");

            // ล้างรายการที่มีอยู่ใน select ในกรณีที่ต้องการรีเซ็ตค่าเก่า
            productSelect.innerHTML = '<option value="">Default select</option>';

            // แนบข้อมูลเข้ากับ select
            data.data.forEach(function (item) {
                var option = document.createElement("option");
                option.value = item.product_data;
                option.textContent = item.product_data;
                productSelect.appendChild(option);
            });
        })
        .catch(function (error) {
            console.error(error);
        });
}

// เมื่อค่าใน select เปลี่ยนแปลง
document
    .getElementById("product_category")
    .addEventListener("change", function () {
        var selectedCategory = this.value; // รับค่าที่เลือก
        var productCodeInput = document.getElementById("product_code");

        // ส่งคำขอ Ajax เพื่อรับข้อมูลจาก API
        fetch(config.baseUrl + "api/packages/packages.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                access_token: "123456",
                table: "packages",
            }),
        })
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
                }
            })
            .then(function (data) {
                var productCode = "001"; // รหัสเริ่มต้น
                var isCodeUnique = false;

                // ตรวจสอบรหัสใหม่จนกว่าจะไม่ซ้ำ
                while (!isCodeUnique) {
                    var formattedCode = productCode.padStart(3, "0"); // ให้รหัสมีความยาว 3 ตัวเสมอ
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
document.getElementById("product_code").readOnly = true;
document.addEventListener("DOMContentLoaded", function () {
    // หากแบบฟอร์มถูกส่ง
    document
        .getElementById("form-product")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            // ดึงข้อมูลจากฟอร์ม
            var ProductData = document.getElementById("product_category").value;
            var ProductName = document.getElementById("productName").value;
            var Price = document.getElementById("price").value;
            var QTY = document.getElementById("qty").value;
            var imageFile = document.getElementById("image").files[0];
            var ProductCode = document.getElementById("product_code").value;

            // สร้าง FormData object
            var formData = new FormData();
            formData.append("ProductData", ProductData);
            formData.append("ProductName", ProductName);
            formData.append("Price", Price);
            formData.append("QTY", QTY);
            formData.append("ProductCode", ProductCode);
            formData.append("Image", imageFile);

            // ทำการส่งข้อมูล JSON ไปยัง Backend
            fetch(config.baseUrl + "api/products/product_add.php", {
                method: "POST",
                body: formData,
            })
                .then(function (response) {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("เกิดข้อผิดพลาดในการส่งข้อมูล");
                    }
                })
                .then(function (data) {
                    console.log(data);
                    if (data.message == true) {
                        document.getElementById("form-product").reset();

                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener("mouseenter", Swal.stopTimer);
                                toast.addEventListener("mouseleave", Swal.resumeTimer);
                            },
                        });

                        Toast.fire({
                            icon: "success",
                            title: "สร้างสินค้าเรียบร้อยแล้ว",
                        });
                        document.getElementById("modal-form").classList.remove("show");
                        document.body.classList.remove("modal-open"); // ลบคลาส 'modal-open' ที่ถูกเพิ่มโดย Bootstrap
                        document.querySelector(".modal-backdrop").remove(); // ลบพื้นหลัง (backdrop) ของ Modal
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener("mouseenter", Swal.stopTimer);
                                toast.addEventListener("mouseleave", Swal.resumeTimer);
                            },
                        });

                        Toast.fire({
                            icon: "error",
                            title: "เกิดข้อผิดพลาดในการสร้างสินค้า",
                        });
                    }
                })
                .catch(function (error) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });

                    Toast.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาดในการสร้างสินค้า",
                    });
                    console.error(error);
                });
        });
});
function loadTableProduct() {
    // ส่งคำขอ Ajax เพื่อรับข้อมูลอัพเดต
    fetch(config.baseUrl + "api/products/products.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: "123456",
            table: "products",
        }),
    })
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
            }
        })
        .then(function (data) {
            // ดึงข้อมูลและเพิ่มข้อมูลใหม่ในตาราง
            data.data.forEach(function (item) {
                // ตรวจสอบว่าแถวที่มี id ตรงกับข้อมูลใหม่มีอยู่หรือไม่
                var existingRow = document.getElementById("row-" + item.id);
                if (!existingRow) {
                    var newRow = document.createElement("tr");
                    newRow.id = "row-" + item.id; // กำหนด id ให้กับแถวใหม่
                    newRow.innerHTML = `
                        <td>
                            <p class="text-xs font-weight-bold mb-0 text-center">${item.product_data}</p>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0 text-center">${item.product_key}</p>
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
                        <a href="#" class="btn bg-gradient-info btn-sm active" onclick="loadEditForm(${item.id}, ${item.price},${item.qty},'${item.imageUrl}')"  role="button" aria-pressed="true">Edit</a>
                            <a href="#" class="btn bg-gradient-danger btn-sm active" role="button" aria-pressed="true">Del</a>
                        </td>
                    `;

                    // เพิ่มแถวใหม่ลงในตาราง
                    var tableBody = document.getElementById("table-body");
                    tableBody.appendChild(newRow);
                    updateRowCount();
                    const editButtons = document.querySelectorAll(".btn-edit");
                    editButtons.forEach(function (button) {
                        button.addEventListener("click", function () {
                            const productId = button.getAttribute("data-product-id");
                            loadEditForm(productId); // สร้างแบบฟอร์มแก้ไข
                        });
                    });
                }
            });
        })
        .catch(function (error) {
            console.error(error);
        });
}
function updateRowCount() {
    var tableBody = document.getElementById("table-body");
    var rowCount = tableBody.getElementsByTagName("tr").length;
    var rowCountElement = document.getElementById("row-count");

    if (rowCountElement) {
        rowCountElement.textContent = rowCount.toString();
    }
}
function generateUniqueProductCode(products, selectedCategory) {
    // กรองรายการสินค้าที่ตรงกับหมวดหมู่ที่ถูกเลือก
    const categoryProducts = products.filter((product) =>
        product.product_key.startsWith(selectedCategory)
    );
    // หารหัสสินค้าที่มีค่าสูงสุดในหมวดหมู่นี้
    let maxProductCode = 0;
    if (categoryProducts.length > 0) {
        maxProductCode = Math.max(
            ...categoryProducts.map((product) =>
                parseInt(product.product_key.split(":")[1], 10)
            )
        );
    }
    // สร้างรหัสใหม่โดยเพิ่มค่าขึ้นที่สูงสุด + 1
    const nextProductCode = maxProductCode + 1;
    // รับค่าความยาวของรหัสสินค้า
    const codeLength = 3;
    // สร้างรหัสใหม่โดยเติม 0 ข้างหน้าตามความยาวที่กำหนด
    const newProductCode = ("0".repeat(codeLength) + nextProductCode).slice(
        -codeLength
    );

    return newProductCode;
}

document
    .getElementById("product_category")
    .addEventListener("change", function () {
        var selectedCategory = this.value; // รับค่าที่เลือก
        var productCodeInput = document.getElementById("product_code");

        fetch(config.baseUrl + "api/products/products.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                access_token: "123456",
                table: "products",
            }),
        })
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
                }
            })
            .then(function (data) {
                const products = data.data;

                // สร้างเลขที่ไม่ซ้ำกันในหมวดหมู่ที่เลือก
                const uniqueProductCode = generateUniqueProductCode(
                    products,
                    selectedCategory
                );

                // ตั้งค่าค่าของ input รหัสหมวดหมู่ให้เป็นค่าที่เลือกและเลขที่ไม่ซ้ำกัน
                productCodeInput.value = selectedCategory + ":" + uniqueProductCode;
            })
            .catch(function (error) {
                console.error(error);
            });
    });

    function loadEditForm(productId, product_price, product_qty, imageUrl) {
        // เปิด Modal
        $("#editProductModal").modal("show");
    
        // เติมข้อมูลสินค้าลงในแบบฟอร์มแก้ไข
        document.getElementById("edit-product-id").value = productId;
        document.getElementById("edit-price").value = product_price;
        document.getElementById("edit-qty").value = product_qty;
        
        // แสดงรูปภาพเดิม
        document.getElementById("edit-existing-image").src = imageUrl;
        
        // เพิ่มอีเวนต์เมื่อปุ่ม "อัปโหลดรูปใหม่" ถูกคลิก
        document.getElementById("edit-upload-image-button").addEventListener("click", function() {
            // เปิดหน้าต่างเลือกรูปภาพใหม่
            document.getElementById("edit-image-file").click();
        });
    }
    
    document.getElementById('edit-image-file').addEventListener('change', function () {
        // เมื่อมีการเลือกไฟล์รูปภาพใหม่
        var newImageFile = this.files[0];
        var existingImage = document.getElementById('edit-existing-image');
    
        if (newImageFile) {
            // ถ้ามีการเลือกไฟล์รูปภาพใหม่
            var reader = new FileReader();
    
            reader.onload = function (e) {
                // เมื่อไฟล์รูปภาพใหม่ถูกโหลดเสร็จ
                existingImage.src = e.target.result; // ตั้งค่ารูปภาพใหม่
            };
    
            reader.readAsDataURL(newImageFile); // โหลดไฟล์รูปภาพใหม่
        }
    });
    function closeModal() {
        $('#editProductModal').modal('hide');
    }
    
