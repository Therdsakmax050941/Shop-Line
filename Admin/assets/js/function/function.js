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

// สร้างฟังก์ชันสำหรับ Gen เลขที่ไม่ซ้ำกัน

