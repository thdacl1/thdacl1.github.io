// script.js

document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value;
    const loading = document.getElementById('loading');
    const responseContainer = document.getElementById('responseContainer');

    if (!query) {
        alert('Vui lòng nhập câu hỏi!');
        return;
    }

    // Hiển thị phần loading
    loading.style.display = 'block';
    responseContainer.style.display = 'none';

    // Gọi API của Novita (DeepSeek)
    const apiUrl = 'https://api.novita.ai/deepseek'; // URL API giả định của Novita
    const apiKey = 'sk_XUEQztNwoL_vDz7R-IMYcPQRCfbNCfx2hn_MWORs_Hg'; // Thay thế bằng API Key thật của bạn

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
        // Ẩn phần loading
        loading.style.display = 'none';

        if (data && data.response) {
            // Hiển thị kết quả từ API
            responseContainer.innerHTML = `<strong>Kết quả tìm kiếm:</strong><p>${data.response}</p>`;
            responseContainer.style.display = 'block';
        } else {
            responseContainer.innerHTML = '<strong>Không có kết quả tìm kiếm!</strong>';
            responseContainer.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
        loading.style.display = 'none';
        alert('Có lỗi xảy ra, vui lòng thử lại.');
    });
});
