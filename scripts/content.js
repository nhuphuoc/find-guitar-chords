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

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === "getTitle") {
      // Gửi tiêu đề của trang web hiện tại trở lại popup
      sendResponse({ title: document.title });
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