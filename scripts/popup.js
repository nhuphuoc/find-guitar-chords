document.addEventListener('DOMContentLoaded', function () {
  function updateDateTime() {
    const now = new Date();
    const dateTimeStr = now.toLocaleString(); // Lấy thời gian theo định dạng địa phương
    document.getElementById("datetime").textContent = dateTimeStr;
  }

  // Cập nhật thời gian mỗi giây
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Thêm sự kiện click cho nút
  document
    .getElementById("sendAlert")
    .addEventListener("click", async () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "showAlert", content: "content" });
      });
    });

  var button = document.getElementById("getTab");
  button.addEventListener(
    "click",
    async () => {
      // Gửi thông điệp đến tab hiện tại để lấy tiêu đề trang web
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getTitle" },
          function (response) {
            alert("Current tab title: " + (response.title || "Not available"));
          }
        );
      });
    },
    false
  );

document
    .getElementById("getYtTitle")
    .addEventListener("click", async () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id, 
            { action: "getYtTitle"},
            function (response) {
                alert("Youtube video title: " + (response.value || "Not available"));
                // const searchQuery = response.value + " hopamchuan";
                // const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(searchQuery);
                // window.location.href = searchUrl;
            }
        );
      });
    });
});