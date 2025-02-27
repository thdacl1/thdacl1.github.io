// script.js

document.getElementById('searchBtn').addEventListener('click', function () {
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

    // Tạo payload cho API
    const payload = {
        messages: [
            {
                role: "system",
                content: "Be a helpful assistant"
            },
            {
                role: "user",
                content: query
            }
        ],
        model: "deepseek/deepseek-r1",
        stream: true, // Thay đổi thành true nếu bạn muốn sử dụng tính năng stream
        response_format: { type: "text" },
        max_tokens: 2048,
        temperature: 0.6,
        top_p: 1,
        min_p: 0,
        top_k: 50,
        presence_penalty: 0,
        frequency_penalty: 0,
        repetition_penalty: 1
    };

    // Gửi yêu cầu đến API Novita
    fetch('https://api.novita.ai/v3/openai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk_XUEQztNwoL_vDz7R-IMYcPQRCfbNCfx2hn_MWORs_Hg`  // Thay <YOUR_Novita_AI_API_Key> bằng API key của bạn
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            // Ẩn phần loading khi có phản hồi
            loading.style.display = 'none';

            if (data && data.choices && data.choices.length > 0) {
                // Hiển thị kết quả tìm kiếm từ API
                responseContainer.innerHTML = `<strong>Kết quả tìm kiếm:</strong><p>${data.choices[0].message.content}</p>`;
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
