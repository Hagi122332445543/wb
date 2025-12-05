"use client";

export default function ChatMessage({ role = "ai", content = "", timestamp }) {
  const isUser = role === "user";
  return (
    <div className={`flex w-full items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-indigo-600 text-white grid place-items-center font-semibold">AI</div>
      )}
      <div className={`max-w-[85%] sm:max-w-[75%] chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-ai"}`}>
        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">{content}</div>
        <div className={`mt-2 text-[10px] ${isUser ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>{timestamp}</div>
      </div>
      {isUser && (
        <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-slate-900 text-white grid place-items-center font-semibold">U</div>
      )}
    </div>
  );
}
