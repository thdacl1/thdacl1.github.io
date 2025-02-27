import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.novita.ai/v3/openai",
  apiKey: "sk_XUEQztNwoL_vDz7R-IMYcPQRCfbNCfx2hn_MWORs_Hg",
});
const stream = true; // or false

async function run() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Be a helpful assistant",
      },
      {
        role: "user",
        content: "Hi there!",
      },
    ],
    model: "deepseek/deepseek-r1",
    stream,
    response_format: { type: "text" },
    max_tokens: 2048,
    temperature: 0.6,
    top_p: 1,
    min_p: 0,
    top_k: 50,
    presence_penalty: 0,
    frequency_penalty: 0,
    repetition_penalty: 1
  });

  if (stream) {
    for await (const chunk of completion) {
      if (chunk.choices[0].finish_reason) {
        console.log(chunk.choices[0].finish_reason);
      } else {
        console.log(chunk.choices[0].delta.content);
      }
    }
  } else {
    console.log(JSON.stringify(completion));
  }
}

run();
  
