import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    // Primary: router.huggingface.co models endpoint (replacement for api-inference)
    const primaryUrl = `https://router.huggingface.co/models/${encodeURIComponent(hfModel)}`;

    let data;
    let output = "";

    const primary = await fetch(primaryUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true }
      })
    });

    if (primary.ok) {
      data = await primary.json();
      if (typeof data === "string") {
        output = data;
      } else if (Array.isArray(data)) {
        const first = data[0] || {};
        output = first.generated_text || first.summary_text || first.text || JSON.stringify(first);
      } else if (data && typeof data === "object") {
        output = data.generated_text || data.text || data.output || JSON.stringify(data);
      }
    } else {
      // Fallback: OpenAI-compatible Chat Completions on router
      const fallbackUrl = "https://router.huggingface.co/v1/chat/completions";
      const fb = await fetch(fallbackUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          model: hfModel,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1024,
          stream: false
        })
      });

      if (!fb.ok) {
        const ptxt = await primary.text().catch(() => "");
        const ftxt = await fb.text().catch(() => "");
        return NextResponse.json(
          { error: ptxt || ftxt || `HF HTTP ${primary.status}/${fb.status}` },
          { status: 500 }
        );
      }

      const j = await fb.json();
      if (j && Array.isArray(j.choices) && j.choices.length > 0) {
        const choice = j.choices[0];
        output = choice.message?.content || choice.text || "";
      }
    }

    output = (output && String(output).trim()) || "(No output)";
    return NextResponse.json({ output });
  } catch (e) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
