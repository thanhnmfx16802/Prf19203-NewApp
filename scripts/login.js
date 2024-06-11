"use strict";
const loginBtn = document.getElementById("btn-submit");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

// Gắn sự kiện click vào nút Login
loginBtn.addEventListener("click", function () {
  // Tìm index của phần tử trong userArr tương ứng với username đang nhập
  const index = userArr.findIndex(
    (item) => item.username === userNameInput.value
  );

  // Lấy dữ liệu từ các trường input
  const dataLog = {
    username: userNameInput.value,
    password: passwordInput.value,
    // Thêm 2 dòng dưới để làm chức năng số 9, mỗi khi login thì pageSize và category sẽ lấy thông tin tương ứng từ userArr để hiển thị tin tức theo cài đặt trước đó của người dùng
    pageSize: userArr[index].pageSize,
    category: userArr[index].category,
  };

  // Xác thực không để trống username và password
  let validateData = function (data) {
    let validate = true;

    // Không để trống trường dữ liệu username
    if (userNameInput.value.trim() === "") {
      alert("Please insert for username field!");
      validate = false;
    }

    // Không để trống trường dữ liệu password
    if (passwordInput.value.trim() === "") {
      alert("Please insert for password field!");
      validate = false;
    }
    return validate;
  };
  // Kiểm tra các trường hợp nhập dữ liệu vào username và password
  if (validateData(dataLog)) {
    let usercheck = true;
    let passcheck = true;
    for (let i = 0; i < userArr.length; i++) {
      if (
        // Username và password đều đúng
        userNameInput.value === userArr[i].username &&
        passwordInput.value === userArr[i].password
      ) {
        usercheck = true;
        passcheck = true;
        break;
      }

      if (
        // Username sai, password đúng
        userNameInput.value !== userArr[i].username &&
        passwordInput.value === userArr[i].password
      ) {
        usercheck = false;
        passcheck = true;
        break;
      }

      if (
        // Username đúng, password sai
        userNameInput.value === userArr[i].username &&
        passwordInput.value !== userArr[i].password
      ) {
        usercheck = true;
        passcheck = false;
        break;
      }

      if (
        // Username, password nhập sai
        userNameInput.value !== userArr[i].username &&
        passwordInput.value !== userArr[i].password
      ) {
        usercheck = false;
        passcheck = false;
      }
    }
    // Kiểm tra username và password khi login
    if (usercheck === true && passcheck === true) {
      // Thông báo đăng nhập thành công
      alert(`Login successfully!`);
      // Lưu vào localStorage
      saveToStorage("CURRENT_USER", dataLog);
      // Chuyển về trang Home
      window.location.href = "../index.html";
    } else if (usercheck === false && passcheck === true) {
      alert("Username is incorrect!");
    } else if (usercheck === true && passcheck === false) {
      alert("Password is incorrect!");
    } else {
      alert("Username and password is incorrect");
    }
  }
});
