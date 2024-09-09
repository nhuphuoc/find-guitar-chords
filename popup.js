console.log('This is where to add script!');
document.addEventListener('DOMContentLoaded', function () {
    function updateDateTime() {
        const now = new Date();
        const dateTimeStr = now.toLocaleString(); // Lấy thời gian theo định dạng địa phương
        document.getElementById('datetime').textContent = dateTimeStr;
    }

    // Cập nhật thời gian mỗi giây
    updateDateTime();
    setInterval(updateDateTime, 1000);
});