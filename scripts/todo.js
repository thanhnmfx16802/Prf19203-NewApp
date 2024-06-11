"use strict";

if (currentUser) {
  const inputTaskBtn = document.getElementById("input-task");
  const addBtn = document.getElementById("btn-add");
  const todoList = document.getElementById("todo-list");

  displayTodoList();

  // Hàm hiển thị thông tin todo list
  function displayTodoList() {
    let html = "";
    // từ mảng todoArr lọc ra các task là của user đăng nhập
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach(function (todo) {
        html += `
        <li class = ${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>
        `;
      });

    todoList.innerHTML = html;

    // Bắt sự kiện
    eventToggleTasks();
    eventDeleteTasks();
  }

  // Bắt sự kiện ấn nút Add để thêm tasks
  addBtn.addEventListener("click", function () {
    // Kiểm tra xem người dùng đã thực sự nhập tên nhiệm vụ cần add chưa
    if (inputTaskBtn.value.trim().length === 0) {
      alert("Vui lòng nhập nhiệm vụ!");
    } else {
      const todo = new Task(inputTaskBtn.value, currentUser.username, false);
      // Thêm task mới vào mảng todoArr
      todoArr.push(todo);
      // Lưu dữ liệu vào localStorage
      saveToStorage("todo", todoArr);
      // Hiển thị danh sách các nhiệm vụ
      displayTodoList();
      // Làm trống trường input
      inputTaskBtn.value = "";
    }
  });

  // Tạo hàm Bắt sự kiện Toggle Task
  function eventToggleTasks() {
    // Lấy tất cả phần tử li chưa thông tin các task và bát sự kiện click

    document
      .querySelectorAll("#content #todo-container ul li")
      .forEach(function (liEl) {
        liEl.addEventListener("click", function (e) {
          console.log(e);
          console.log(liEl);
          // Tránh nút delete để không chồng sự kiện khi ấn delete
          if (e.target !== liEl.children[0]) {
            // toggle class checked
            liEl.classList.toggle("checked");
            // Tìm task vừa click vào
            const todo = todoArr.find(
              (todoItem) =>
                todoItem.owner === currentUser.username &&
                todoItem.task === liEl.textContent.slice(0, -1)
            );
            console.log(todo);
            // Thay đổi thuộc tính isDone
            todo.isDone = liEl.classList.contains("checked") ? true : false;
            // Lưu vào localStorage
            saveToStorage("todo", todoArr);
          }
        });
      });
  }

  // Tạo hàm Bắt sự kiện xóa các tasks
  function eventDeleteTasks() {
    // Lấy tất cả các phần tử nút delete
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      console.log(closeEl.parentElement);
      closeEl.addEventListener("click", function () {
        // Xác nhận muốn xóa
        const isDelete = confirm("Bạn xác nhận muốn xóa?");
        if (isDelete) {
          // Tìm vị trí của task được ấn xóa trong mảng todoArr
          const index = todoArr.findIndex(
            (item) =>
              item.owner === currentUser.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );
          // Xóa task đó ra khỏi mảng todoArr
          todoArr.splice(index, 1);
          // Lưu xuống localStorage
          saveToStorage("todo", todoArr);
          // Hiển thị lại list todo
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng nhập để truy cập ứng dụng!");
  window.location.href = "../pages/login.html";
}
