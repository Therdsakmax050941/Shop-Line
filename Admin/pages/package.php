<?php include_once('./navbar.php'); //import menu ?>

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
      <span class="btn-inner--icon"><svg class="text-dark" width="16px" height="16px" viewBox="0 0 45 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Basic-Elements" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Rounded-Icons" transform="translate(-1716.000000, -439.000000)" fill="#FFFFFF" fill-rule="nonzero">
              <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
                <g id="shop-" transform="translate(0.000000, 148.000000)">
                  <path class="color-background" d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z" id="Path" opacity="0.598981585"></path>
                  <path class="color-background" d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z" id="Path"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </span>
      &nbsp;
      <span class="btn-inner--text">เพิ่มหมวดหมู่สินค้า</span>
    </button>
    <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="card card-plain">
              <div class="card-header pb-0 text-left">
                <h3 class="font-weight-bolder text-info text-gradient">เพิ่มหมวดหมู่สินค้า</h3>
                <p class="mb-0"></p>
              </div>
              <div class="card-body">
                <form role="form text-left" id="form-package">
                  <label>ชื่อหมวดหมู่</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" id="product_title" Name="product_title" placeholder="ชื่อหมวดหมู่" aria-label="ชื่อหมวดหมู่" aria-describedby="ชื่อหมวดหมู่">
                  </div>
                  <label>รูปภาพหมวดหมู่</label>
                  <div class="input-group mb-3">
                    <input type="file" id="image" class="form-control" Name="image" placeholder="image" aria-label="image" aria-describedby="image">
                  </div>
                  <label>รหัสหมวดหมู่</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" id="product_code" Name="product_code" placeholder="Product code" aria-label="product_code" aria-describedby="product_code" required>
                  </div>
                  <div class="text-center">
                    <button type="submit" id="submitBtn" class="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0">สร้าง</button>
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
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Package Name
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product Code
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Image</th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Time Created
          </th>
          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
        </tr>
      </thead>
      <tbody id="table-body">
    </table>
  </div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="../assets/js/function/function.js"></script>
<script>
  $(document).ready(function() {
    loadTablePackage()

    // สร้างการอัปเดตข้อมูลอัตโนมัติทุก 1 วินาที
    setInterval(function() {
      loadTablePackage()

    }, 3000);
  });
</script>
<?php include_once('./footer.php'); ?>