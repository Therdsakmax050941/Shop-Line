const config = {
    baseUrl: 'http://localhost:8000/Back-end/',
    
  };
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
        fetch(config.baseUrl + 'api/packages/package_add.php', {
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
                if (data.message) {
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
                    // document.getElementById('modal-form').classList.remove('show');
                    // document.body.classList.remove('modal-open'); // ลบคลาส 'modal-open' ที่ถูกเพิ่มโดย Bootstrap
                    // document.querySelector('.modal-backdrop').remove(); // ลบพื้นหลัง (backdrop) ของ Modal

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
function updateRowCount() {
    var tableBody = document.getElementById('table-body');
    var rowCount = tableBody.getElementsByTagName('tr').length;
    var rowCountElement = document.getElementById('row-count');

    if (rowCountElement) {
        rowCountElement.textContent = rowCount.toString();
    }
}