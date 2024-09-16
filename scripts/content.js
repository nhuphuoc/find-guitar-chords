// Lắng nghe thông điệp từ popup
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "showAlert") {
    // alert("Hello from Extension! Content: " + request.content);
    const xpathResult = document.evaluate(
      '//*[@id="title"]/h1/yt-formatted-string',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );

    // Lấy giá trị innerText của phần tử
    const element = xpathResult.singleNodeValue;
    const value = element ? element.innerText : null;
    const searchQuery = extractSongTitle(value) + 'hopamchuan';
    const searchUrl =
      "https://hopamchuan.com/search?q=" + extractSongTitle(value);

    // Mở trang tìm kiếm trong tab mới
    window.open(searchUrl, "_blank");
  }
});

function extractSongTitle(title) {
  // Kiểm tra xem tham số title có phải là chuỗi không
  if (typeof title !== "string") {
    return ""; // Trả về chuỗi rỗng nếu không phải chuỗi
  }

  // Loại bỏ phần sau các ký tự (, [, {, |, ~, @
  const formattedTitle = title.split(/[\(\[\{\|\~\@]/)[0].trim();

  return formattedTitle;
}
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === "getYtTitle") {
      try {
        // Sử dụng XPath để lấy phần tử
        const xpathResult = document.evaluate(
          '//*[@id="title"]/h1/yt-formatted-string',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        );

        // Lấy giá trị innerText của phần tử
        const element = xpathResult.singleNodeValue;
        const value = element ? element.innerText : null;

        // Gửi giá trị trở lại popup
        sendResponse({ value: extractSongTitle(value) });
      } catch (error) {
        console.error("Error fetching XPath value:", error);
        sendResponse({ value: null, error: error.toString() });
      }
    }
  });


  // Hàm thêm button bên cạnh tiêu đề
function addButtonToVideoTitle() {
  // Sử dụng XPath để lấy phần tử tiêu đề video
  const xpathResult = document.evaluate(
    '//*[@id="title"]/h1/yt-formatted-string',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );

  const titleElement = xpathResult.singleNodeValue;

  const base64Image = "data:image/png;base64,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";
  // Kiểm tra xem phần tử tiêu đề có tồn tại không trước khi thêm button
  if (titleElement && !document.getElementById('my-custom-button')) {
    // Tạo nút mới
    const button = document.createElement('button');
    button.id = 'my-custom-button';
    // button.innerText = 'Find ♫'; // Icon + text
    button.innerHTML = `
                <div style="padding-left: 15px !important; padding-right: 0 !important; display: flex !important;background-color: white; height: 40px; width: 86px !important; border-radius: 25px 25px 25px 25px !important;">
                    <div style="display: flex !important; line-height: 40px !important;">
                        <div style="display: flex !important; line-height: 40px !important; margin-right: 5px">
                            Find
                        </div>
                    </div>
                    <img src="data:image/png;base64,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"
                        alt="logo"
                        style="width: 51px !important; height: 50px !important; vertical-align: middle; margin-right: 0px;">
                </div>
                `;
    button.style.width = '110px !important';
    button.style.fontWeight = 'bold';
    button.style.marginLeft = '10px';
    button.style.padding = '0px 0px';
    button.style.fontSize = '14px';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = 'white';
    button.style.color = '#CC631F';
    button.style.border = 'none';
    button.style.borderRadius = '36px 36px 36px 36px';
    button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    button.style.transition = 'background-color 0.3s ease';

    // Thêm hiệu ứng khi hover vào nút
    // button.addEventListener('mouseover', function () {
    //   button.style.backgroundColor = '#CC631F';
    // });

    // button.addEventListener('mouseout', function () {
    //   button.style.backgroundColor = '#D5A96B';
    // });


    // Gắn sự kiện click cho nút
    button.addEventListener('click', function () {
      const xpathResult = document.evaluate(
        '//*[@id="title"]/h1/yt-formatted-string',
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );

      // Lấy giá trị innerText của phần tử
      const element = xpathResult.singleNodeValue;
      const value = element ? element.innerText : null;
      const searchQuery = extractSongTitle(value) + 'hopamchuan';
      const searchUrl =
        "https://hopamchuan.com/search?q=" + extractSongTitle(value);

      // Mở trang tìm kiếm trong tab mới
      window.open(searchUrl, "_blank");
    });


    if (titleElement.parentNode) {
      titleElement.parentNode.appendChild(button);
    }
  }
}

// Sử dụng MutationObserver để theo dõi các thay đổi trên trang
const observer = new MutationObserver(() => {
  addButtonToVideoTitle();
});

// Bắt đầu quan sát thay đổi của phần tử body
observer.observe(document.body, { childList: true, subtree: true });

// Thêm button khi trang được tải lần đầu
window.onload = addButtonToVideoTitle();
