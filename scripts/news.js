"use strict";
const btnNews = document.getElementById("news-container");
const pageNumBtn = document.getElementById("page-num");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let totalresult;
// Tạo hàm renderNews
const renderNews = async function (country, category, pageSize, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=601d993a880b44eebb559fbdf8ce3f83`
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

let currentPage = 1;
// Mặc định luôn hiện tin tức khi vào news
renderNews("us", currentUser.category, currentUser.pageSize, currentPage);

// Gắn sự kiện vào nút next
btnNext.addEventListener("click", function () {
  // Hiển thị nút Previous
  btnPrevious.style.display = "block";
  // Tăng số thứ tự trang lên 1
  currentPage += 1;
  //   Hiển thị số thứ tự trang mới
  pageNumBtn.textContent = currentPage;
  //   Hiển thị nội dung trang tin mới đúng với số thứ tự
  renderNews("us", currentUser.category, currentUser.pageSize, currentPage);
  // Ẩn nút next khi đang ở trang cuối cùng
  if (totalresult % currentUser.pageSize === 0) {
    if (currentPage === totalresult / currentUser.pageSize) {
      btnNext.style.display = "none";
    }
  } else {
    if (currentPage === parseInt(totalresult / currentUser.pageSize) + 1) {
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
    renderNews("us", currentUser.category, currentUser.pageSize, currentPage);
  }
  // Khi click nút previous giảm đúng bằng 1 sẽ ẩn nút previous
  if (currentPage === 1) {
    btnPrevious.style.display = "none";
  }
});
