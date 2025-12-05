import { NextResponse } from "next/server";

const MODELS = {
  deepseek: "deepseek-ai/DeepSeek-V3",
  qwen72: "Qwen/Qwen3-72B-AI-Reasoner",
  gemma: "google/gemma-3-27b-it",
  openthinker: "OpenThinkerAI/OpenThinker-70B-GRPO",
  qwen32: "Qwen/Qwen3-32B-Thinker",
  llama: "meta-llama/Llama-3.2-90B"
};

export async function POST(req) {
  try {
    const { model, prompt } = await req.json();
    if (!model || !prompt) {
      return NextResponse.json({ error: "Missing model or prompt" }, { status: 400 });
    }

    const hfModel = MODELS[model];
    if (!hfModel) {
      return NextResponse.json({ error: "Unknown model key" }, { status: 400 });
    }

    const token = process.env.HF_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "HF_TOKEN missing in environment" }, { status: 500 });
    }

    const url = `https://api-inference.huggingface.co/models/${encodeURIComponent(hfModel)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true }
      })
    });

    if (!response.ok) {
      const txt = await response.text();
      return NextResponse.json({ error: txt || `HF HTTP ${response.status}` }, { status: 500 });
    }

    const data = await response.json();
    // Normalize different HF response shapes
    let output = "";
    if (typeof data === "string") {
      output = data;
    } else if (Array.isArray(data)) {
      const first = data[0] || {};
      output = first.generated_text || first.summary_text || JSON.stringify(first);
    } else if (data && typeof data === "object") {
      output = data.generated_text || data.text || data.output || JSON.stringify(data);
    }
    output = output || "(No output)";

    return NextResponse.json({ output });
  } catch (e) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
