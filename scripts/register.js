"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordIn = document.getElementById("input-password-confirm");

const btnSubmit = document.getElementById("btn-submit");

// Gắn sự kiện click vào nút submit
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu từ các input và lưu vào đối tượng data
  const data = {
    firstname: firstNameInput.value,
    lastname: lastNameInput.value,
    username: userNameInput.value,
    password: passwordInput.value,
    confirmpassword: confirmPasswordIn.value,
  };

  // Xác thực dữ liệu
  let validateData = function (data) {
    let validate = true;

    // Xác thực không có trường nào bị bỏ trống
    if (firstNameInput.value.trim() === "") {
      alert("Please insert for firstname field!");
      validate = false;
    }

    if (lastNameInput.value.trim() === "") {
      alert("Please insert for lastname field!");
      validate = false;
    }

    if (userNameInput.value.trim() === "") {
      alert("Please insert for username field!");
      validate = false;
    }

    if (passwordInput.value.trim() === "") {
      alert("Please insert for password field!");
      validate = false;
    }

    if (data.confirmpassword.trim() === "") {
      alert("Please insert for confirmpassword field!");
      validate = false;
    }
    // Username không trùng với các username trước đó
    for (let i = 0; i < userArr.length; i++) {
      if (userNameInput.value === userArr[i].username) {
        alert("Username must be unique!");
        validate = false;
        break;
      }
    }

    // Password phải có nhiều hơn 8 ký tự
    if (passwordInput.value.split("").length <= 8) {
      alert("Password must be more than 8 characters!");
      validate = false;
    }

    // Password và confirmpassword phải giống nhau
    if (passwordInput.value !== confirmPasswordIn.value) {
      alert("Password and confirm password must be same!");
      validate = false;
    }

    return validate;
  };

  // Gọi hàm validateData để kiểm tra form hợp lệ
  if (validateData(data)) {
    // Khởi tạo user mới với các dữ liệu hợp lệ
    let userCreate = new User(
      firstNameInput.value,
      lastNameInput.value,
      userNameInput.value,
      passwordInput.value
    );
    // Thêm vào mảng userArr
    userArr.push(userCreate);
    console.log(userArr);
    // Lưu mảng vào localStorage
    saveToStorage("USER_ARRAY", userArr);
    // Chuyển trang đến màn hình login
    window.location.href = "../pages/login.html";
  }
});
