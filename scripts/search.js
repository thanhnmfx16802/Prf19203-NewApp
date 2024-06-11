"use strict";
// Cần phải đăng nhập mới sử dụng được search
if (currentUser.username) {
  const btnPrevious = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const pageNumBtn = document.getElementById("page-num");
  const btnSubmit = document.getElementById("btn-submit");
  const inputQuery = document.getElementById("input-query");
  const btnNews = document.getElementById("news-container");

  let totalresult;
  //Tạo hàm tìm kiếm với 3 tham số
  const searchNews = async function (keyword, pageSize, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&page=${page}&apiKey=601d993a880b44eebb559fbdf8ce3f83`
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      btnNews.innerHTML = "";
      for (let i = 0; i < pageSize; i++) {
        let html = `
      <div class="card flex-row flex-wrap">
                      <div class="card mb-3" style="">
                          <div class="row no-gutters">
                              <div class="col-md-4">
                                  <img src=${data.articles[i].urlToImage}
                                      class="card-img"
                                      >
                              </div>
                              <div class="col-md-8">
                                  <div class="card-body">
                                      <h5 class="card-title">${data.articles[i].title}</h5>
                                      <p class="card-text">${data.articles[i].description}</p>
                                      <a href=${data.articles[i].url}
                                          class="btn btn-primary">View</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
      `;
        btnNews.innerHTML += html;
      }
      totalresult = data.totalResults;
    } catch (err) {
      console.error(err);
    }
  };

  // Khi chưa tìm kiếm thì ẩn các nút previous, số trang, next
  if (!inputQuery.value) {
    pageNumBtn.style.display = "none";
    btnNext.style.display = "none";
    btnPrevious.style.display = "none";
  }

  // Thiết lập thông số hiển thị kết quả tìm kiếm
  let pageSize = 4;
  let currentPage = 1;

  // Gắn sự kiện click vào nút search
  btnSubmit.addEventListener("click", function () {
    // Nếu xác thực hợp lệ
    if (validate()) {
      // Tìm kiếm thông tin
      searchNews(inputQuery.value, pageSize, currentPage);
      //  Hiện số trang, nút next, nhưng không hiện nút previous vì đang trang đầu tiên
      document.getElementById("page-num").style.display = "block";
      document.getElementById("btn-next").style.display = "block";
      //  document.getElementById("btn-prev").style.display = "block";
    }
  });

  // Gắn sự kiện vào nút next
  btnNext.addEventListener("click", function () {
    // Hiển thị nút Previous
    btnPrevious.style.display = "block";
    // Tăng số thứ tự trang lên 1
    currentPage += 1;
    //   Hiển thị số thứ tự trang mới
    pageNumBtn.textContent = currentPage;
    //   Hiển thị nội dung trang tin mới đúng với số thứ tự
    searchNews(inputQuery.value, pageSize, currentPage);
    // Ẩn nút next khi đang ở trang cuối cùng
    if (totalresult % pageSize === 0) {
      if (currentPage === totalresult / pageSize) {
        btnNext.style.display = "none";
      }
    } else {
      if (currentPage === parseInt(totalresult / pageSize) + 1) {
        btnNext.style.display = "none";
      }
    }
  });

  // Mặc định khi đang ở trang 1 sẽ Ẩn nút previous
  if (currentPage === 1) {
    btnPrevious.style.display = "none";
  }

  // Gắn sự kiện vào nút previous
  btnPrevious.addEventListener("click", function () {
    if (currentPage > 1) {
      // Hiển thị nút next
      btnNext.style.display = "block";
      // Giảm số thứ tự trang xuống 1
      currentPage -= 1;
      // Hiển thị số thứ tự trang mới
      pageNumBtn.textContent = currentPage;
      // Hiển thị nội dung trang tin mới đúng số thứ tự
      searchNews(inputQuery.value, pageSize, currentPage);
    }
    // Khi click nút previous giảm đúng bằng 1 sẽ ẩn nút previous
    if (currentPage === 1) {
      btnPrevious.style.display = "none";
    }
  });

  //  Hàm xác thực dữ liệu
  function validate() {
    let isValidate = true;
    if (inputQuery.value.trim() === "") {
      alert("Please type something to search!");
      isValidate = false;
    }
    return isValidate;
  }
} else {
  //Nếu chưa đăng nhập
  alert("Bạn cần đăng nhập trước!");
  window.location.href = "./login.html";
}
