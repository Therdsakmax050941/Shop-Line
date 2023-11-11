<?php include_once('./navbar.php'); //import menu 
?>

<!-- content -->
<div class="container-fluid py-4">
    <div class="row">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">จำนวน Packages</p><br>
                                <h5 class="font-weight-bolder  text-center">
                                    <b style="color:#00b2ff" class="text-md" id="row-count">0</b> หมวดหมู่
                                </h5>
                                <p class="mb-0">
                                    <span class="text-success text-sm font-weight-bolder"></span>
                                </p>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">การเพิ่มสินค้า</p>
                                <h5 class="font-weight-bolder">
                                    2,300
                                </h5>
                                <p class="mb-0">
                                    <span class="text-success text-sm font-weight-bolder">+3%</span>
                                    สินค้ามาใหม่
                                </p>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                <i class="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <!-- button add Package -->
    <div class="col-md-4">
        <button type="button" class="btn btn-icon btn-3 bg-gradient-info" data-bs-toggle="modal" data-bs-target="#modal-form">
            <svg class="text-dark" width="16px" height="16px" viewBox="0 0 42 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>basket</title>
                <g id="Basic-Elements" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Rounded-Icons" transform="translate(-1869.000000, -741.000000)" fill="#FFFFFF" fill-rule="nonzero">
                        <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
                            <g id="basket" transform="translate(153.000000, 450.000000)">
                                <path class="color-background" d="M34.080375,13.125 L27.3748125,1.9490625 C27.1377583,1.53795093 26.6972449,1.28682264 26.222716,1.29218729 C25.748187,1.29772591 25.3135593,1.55890827 25.0860125,1.97535742 C24.8584658,2.39180657 24.8734447,2.89865282 25.1251875,3.3009375 L31.019625,13.125 L10.980375,13.125 L16.8748125,3.3009375 C17.1265553,2.89865282 17.1415342,2.39180657 16.9139875,1.97535742 C16.6864407,1.55890827 16.251813,1.29772591 15.777284,1.29218729 C15.3027551,1.28682264 14.8622417,1.53795093 14.6251875,1.9490625 L7.919625,13.125 L0,13.125 L0,18.375 L42,18.375 L42,13.125 L34.080375,13.125 Z" opacity="0.595377604"></path>
                                <path class="color-background" d="M3.9375,21 L3.9375,38.0625 C3.9375,40.9619949 6.28800506,43.3125 9.1875,43.3125 L32.8125,43.3125 C35.7119949,43.3125 38.0625,40.9619949 38.0625,38.0625 L38.0625,21 L3.9375,21 Z M14.4375,36.75 L11.8125,36.75 L11.8125,26.25 L14.4375,26.25 L14.4375,36.75 Z M22.3125,36.75 L19.6875,36.75 L19.6875,26.25 L22.3125,26.25 L22.3125,36.75 Z M30.1875,36.75 L27.5625,36.75 L27.5625,26.25 L30.1875,26.25 L30.1875,36.75 Z"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            &nbsp;
            <span class="btn-inner--text">เพิ่มสินค้า</span>
        </button>
        <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                                <h3 class="font-weight-bolder text-info text-gradient">เพิ่มสินค้า</h3>
                                <p class="mb-0"></p>
                            </div>
                            <div class="card-body">
                                <form role="form text-left" id="form-product">
                                    <select id="product_category" class="form-control">
                                        <option value="">Default select</option>
                                    </select>
                                    <label>ชื่อสินค้า</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" id="productName" Name="productName" placeholder="ชื่อสินค้า" aria-label="productName" aria-describedby="productName" required>
                                    </div>
                                    <label>ราคา</label>
                                    <div class="input-group mb-3">
                                        <input type="number" class="form-control" id="price" Name="price" placeholder="ราคาสินค้า" aria-label="price" aria-describedby="price" required>
                                    </div>
                                    <label>จำนวนสินค้า</label>
                                    <div class="input-group mb-3">
                                        <input type="number" class="form-control" id="qty" Name="price" placeholder="จำนวนสินค้า" aria-label="price" aria-describedby="price" required>
                                    </div>
                                    <label>รูปภาพสินค้า</label>
                                    <div class="input-group mb-3">
                                        <input type="file" id="image" class="form-control" Name="image" placeholder="image" aria-label="image" aria-describedby="image">
                                    </div>
                                    <label>รหัสหมวดหมู่</label>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" id="product_code" Name="product_code" placeholder="รหัสสินค้าจะสร้างให้อัตโนมัติ" aria-label="product_code" aria-describedby="product_code" required>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" id="submitBtnProduct" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0">สร้าง</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- table -->
<div class="card">
    <div class="table-responsive">
        <table class="table align-items-center mb-0">
            <thead>
                <tr>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ชื่อหมวดหมู่
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">รหัสสินค้า
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Image</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ราคา</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">จำนวนสินค้า</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Time Created
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                </tr>
            </thead>
            <tbody id="table-body">
        </table>
    </div>
</div>
<div>
    <div id="editProductModal" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Product</h5>
                </div>
                <div class="modal-body">
                    <!-- สร้างแบบฟอร์มแก้ไขสินค้า ที่นี่ -->
                    <form id="edit-product-form">
                        <input type="hidden" id="edit-product-id" name="product_id" value="">
                        <div class="form-group">
                            <label for="edit-price">Price</label>
                            <input type="text" class="form-control" id="edit-price" name="price">
                        </div>
                        <div class="form-group">
                            <label for="edit-qty">Quantity</label>
                            <input type="text" class="form-control" id="edit-qty" name="qty">
                        </div>
                        <div class="form-group">
                            <img id="edit-existing-image" src="" alt="Existing Image" width="100px" height="100px">
                            <button id="edit-upload-image-button" class="btn btn-primary">Upload New Image</button>
                            <input type="file" id="edit-image-file" style="display: none">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
                    <button type="button" class="btn btn-primary" onclick="saveEditedProduct()">Save Changes</button>
                </div>

            </div>
        </div>
    </div>

</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="../assets/js/function/product.js"></script>
<script src="../assets/js/function/function.js"></script>
<script src="../assets/js/function/gencode.js"></script>
<script>
    $(document).ready(function() {
        loadTableProduct()

        // สร้างการอัปเดตข้อมูลอัตโนมัติทุก 1 วินาที
        setInterval(function() {
            loadTableProduct()

        }, 3000);
    });
    window.onload = function() {
        loadSelectPackages()
    }
</script>
<?php include_once('./footer.php'); ?>