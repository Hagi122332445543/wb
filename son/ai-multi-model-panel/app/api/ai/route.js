import { HfInference } from "@huggingface/inference";

const modelMapping = {
  deepseek: "deepseek-ai/DeepSeek-V3",
  qwen72: "Qwen/Qwen3-72B-AI-Reasoner",
  gemma: "google/gemma-3-27b-it",
  openthinker: "OpenThinkerAI/OpenThinker-70B-GRPO",
  qwen32: "Qwen/Qwen3-32B-Thinker",
  llama: "meta-llama/Llama-3.2-90B"
};

export async function POST(req) {
  const { prompt, model } = await req.json();

  if (!prompt || !model) {
    return new Response(JSON.stringify({ error: "Prompt and model are required" }), { status: 400 });
  }

  const modelName = modelMapping[model];
  if (!modelName) {
    return new Response(JSON.stringify({ error: "Invalid model selected" }), { status: 400 });
  }

  const hf = new HfInference(process.env.HF_TOKEN);

  try {
    const stream = hf.textGenerationStream({
      model: modelName,
      inputs: prompt,
      parameters: {
        max_new_tokens: 1024,
        repetition_penalty: 1.2,
        temperature: 0.7,
        top_p: 0.95,
        top_k: 50,
      },
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk.token) {
            controller.enqueue(chunk.token.text);
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (error) {
    console.error("HuggingFace API error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch from HuggingFace API" }), { status: 500 });
  }
}
