"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

const MODELS = {
  deepseek: "deepseek-ai/DeepSeek-V3",
  qwen72: "Qwen/Qwen3-72B-AI-Reasoner",
  gemma: "google/gemma-3-27b-it",
  openthinker: "OpenThinkerAI/OpenThinker-70B-GRPO",
  qwen32: "Qwen/Qwen3-32B-Thinker",
  llama: "meta-llama/Llama-3.2-90B"
};

export default function Page() {
  const [selectedModel, setSelectedModel] = useState("deepseek");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const timestamp = () => new Date().toLocaleString();

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async (text) => {
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text, timestamp: timestamp() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: selectedModel, prompt: text })
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const content = (data && data.output) || "(Boş yanıt)";
      const aiMsg = { id: crypto.randomUUID(), role: "ai", content, timestamp: timestamp() };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      const aiMsg = { id: crypto.randomUUID(), role: "ai", content: `Hata: ${e.message}`, timestamp: timestamp() };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex min-h-0">
        <Sidebar selected={selectedModel} onSelect={setSelectedModel} />
        <main className="flex-1 flex flex-col">
          <div ref={listRef} className="flex-1 overflow-y-auto">
            <div className="container-safe py-6 sm:py-8 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
                  Bir model seçip mesaj yazmaya başlayın.
                </div>
              )}
              {messages.map((m) => (
                <ChatMessage key={m.id} role={m.role} content={m.content} timestamp={m.timestamp} />
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="chat-bubble chat-bubble-ai flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-500 animate-pulse" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">Düşünüyor...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ChatInput onSend={handleSend} disabled={loading} />
        </main>
      </div>
    </div>
  );
}
