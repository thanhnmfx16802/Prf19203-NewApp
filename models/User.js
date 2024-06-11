"use strict";
// Taoj class User (phần 1)
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    // Thêm 2 dòng dưới để làm chức năng số 9, mặc định nếu không thiết lập thì pageSize sẽ là 10 và category là General
    pageSize = 10,
    category = "General"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    // Thêm 2 dòng pageSize và category để làm chức năng số 9
    this.pageSize = pageSize;
    this.category = category;
  }
}

// Tạo class Task (phần 8 Todo List)
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
