"use strict";

// phần giao diện khi currentUser không có giá trị
const loginModal = document.getElementById("login-modal");
// phần giao diện khi currentUser có giá trị
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");

const logoutBtn = document.getElementById("btn-logout");

// Tìm thông tin user trong userArr mà tương ứng với user trong currentUser
let userFind = userArr.find(
  (user) =>
    user.username === currentUser.username &&
    user.password === currentUser.password
);
console.log(userFind);

// Nếu currentUser không có giá trị
if (!currentUser.username) {
  // Ẩn phần nội dung mainContent
  mainContent.style.display = "none";
  // Nếu currentUser có giá trị
} else {
  // Ẩn phần nội dụng loginModal
  loginModal.style.display = "none";
  // Hiện lời chào
  welcomeMessage.textContent = `Welcome ${userFind.lastname}`;
}

// Đính sự kiện vào nút logout
logoutBtn.addEventListener("click", function () {
  // Xóa value của currentUser ở trong localStorage
  localStorage.removeItem("CURRENT_USER");
  // Chuyển đến trang login
  window.location.href = "./pages/login.html";
});
