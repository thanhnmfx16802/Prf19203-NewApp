"use strict";

// Kiểm tra nếu trong localStorage nếu chưa có key USER_ARRAY thì tạo với giá trị []
if (!getFromStorage("USER_ARRAY")) {
  saveToStorage("USER_ARRAY", []);
}

// Tạo hàm lưu (key, value) vào localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Tạo hàm lấy giá trị từ localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// Hàm chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return user;
}

// Lấy giá trị JS Object từ localStorage lưu vào biến userArrayJS
const userArrJS = JSON.parse(getFromStorage("USER_ARRAY"));
console.log(userArrJS);

// Chuyển giá trị từ JS Object sang Class Instance
const userArr = userArrJS.map((user) => parseUser(user));
console.log(userArr);

/////////////////////////////////////////////

// Kiểm tra nếu trong localStorage nếu chưa có key CURRENT_USER thì tạo với giá trị []
if (!getFromStorage("CURRENT_USER")) {
  saveToStorage("CURRENT_USER", []);
}

// Lấy giá trị JS Object từ localStorage lưu vào biến currentUser
const currentUser = JSON.parse(getFromStorage("CURRENT_USER"));

/////////////////////////////////////////////

// Kiểm tra nếu trong localStorage nếu chưa có key todo thì tạo với giá trị []
if (!getFromStorage("todo")) {
  saveToStorage("todo", []);
}

// Lấy giá trị JS Object từ localStorage lưu vào biến todoArrJS
const todoArrJS = JSON.parse(getFromStorage("todo"));

// Hàm chuyển từ JS Object sang Class Instance
function parseTask(UserTask) {
  const Todo = new Task(UserTask.task, UserTask.owner, UserTask.isDone);

  return Todo;
}

// Chuyển giá trị từ JS Object sang Class Instance
const todoArr = todoArrJS.map((task) => parseTask(task));
console.log(todoArr);
