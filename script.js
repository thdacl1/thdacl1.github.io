// Hàm gửi yêu cầu tới API Novita AI
async function getAIResponse(userInput) {
  const apiUrl = "https://api.novita.ai/v3/openai/chat/completions";
  const apiKey = "sk_XUEQztNwoL_vDz7R-IMYcPQRCfbNCfx2hn_MWORs_Hg";  // Thay thế bằng API Key của bạn

  const requestPayload = {
    model: "deepseek/deepseek-r1",
    messages: [
      { role: "system", content: "Be a helpful assistant" },
      { role: "user", content: userInput }
    ],
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

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestPayload)
  });

  if (response.ok) {
    const data = await response.json();
    return data.choices[0].message.content;  // Lấy nội dung phản hồi từ API
  } else {
    console.error("Lỗi khi gọi API:", response.statusText);
    return "Có lỗi xảy ra, vui lòng thử lại!";
  }
}

// Xử lý sự kiện gửi tin nhắn
document.getElementById('chat-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  // Lấy nội dung người dùng nhập
  const userInput = document.getElementById('user-input').value;
  
  if (userInput.trim()) {
    // Hiển thị tin nhắn của người dùng trong giao diện
    const userMessage = document.createElement('div');
    userMessage.textContent = `Bạn: ${userInput}`;
    document.querySelector('.message-wrap').appendChild(userMessage);
    
    // Gửi yêu cầu tới API Novita AI và nhận phản hồi
    const aiResponse = await getAIResponse(userInput);
    
    // Hiển thị phản hồi của AI trong giao diện
    const botResponse = document.createElement('div');
    botResponse.textContent = `AI: ${aiResponse}`;
    document.querySelector('.message-wrap').appendChild(botResponse);
    
    // Xóa ô nhập liệu
    document.getElementById('user-input').value = '';
  }
});
