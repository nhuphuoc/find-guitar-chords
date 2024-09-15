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
    // Loại bỏ phần sau dấu ngoặc () hoặc []
    title = title.split(/[\(\[\{]/)[0].trim();

    return title;
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

  // Kiểm tra xem phần tử tiêu đề có tồn tại không trước khi thêm button
  if (titleElement && !document.getElementById('my-custom-button')) {
    // Tạo nút mới
    const button = document.createElement('button');
    button.id = 'my-custom-button';
    button.innerText = 'Find ♫'; // Icon + text

    button.style.fontWeight = 'bold';
    button.style.fontSize = '20px';
    button.style.marginLeft = '10px'; 
    button.style.padding = '8px 16px'; 
    button.style.fontSize = '14px'; 
    button.style.cursor = 'pointer'; 
    button.style.backgroundColor = '#007bff'; 
    button.style.color = '#fff'; 
    button.style.border = 'none'; 
    button.style.borderRadius = '15px'; 
    button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; 
    button.style.transition = 'background-color 0.3s ease';

    // Thêm hiệu ứng khi hover vào nút
    button.addEventListener('mouseover', function () {
      button.style.backgroundColor = '#0056b3'; 
    });

    button.addEventListener('mouseout', function () {
      button.style.backgroundColor = '#007bff'; 
    });


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
