"use strict";
if (currentUser.username) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");
  //   Gán sự kiện vào nút submit
  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      // Cập nhật lại currentUser
      currentUser.pageSize = parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      saveToStorage("CURRENT_USER", currentUser);

      // Cập nhật thêm pageSize và category cho user trong mảng userArray
      const index = userArr.findIndex(
        (item) => item.username === currentUser.username
      );
      userArr[index].pageSize = currentUser.pageSize;
      userArr[index].category = currentUser.category;
      // Lưu vào localStorage
      saveToStorage("USER_ARRAY", userArr);
      // alert lại form nhập đã thành công
      alert("Thiết lập thành công!");
      // Làm trống trường News per page
      inputPageSize.value = "";
      // Gán giá trị mặc định cho News Category là General
      inputCategory.value = "General";
    }
  });

  //////////////////////////////////////////
  //   Xác nhận dữ liệu người dùng nhập vào
  function validate() {
    let isValidate = true;
    // Kiểm tra inputPageSize
    if (
      isNaN(parseInt(inputPageSize.value)) ||
      parseInt(inputPageSize.value) <= 0
    ) {
      alert("Please input for news per page field and value is more than 0");
      isValidate = false;
    }
    // Kiểm tra category đã được chọn chưa
    if (inputCategory.value === "") {
      alert("Please input for category field");
      isValidate = false;
    }

    return isValidate;
  }
} else {
  alert("Bạn cần đăng nhập trước!");
  window.location.href = "./login.html";
}
