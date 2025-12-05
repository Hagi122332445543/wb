"use client";

import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };

  return (
    <div className="border-t border-slate-200/60 dark:border-slate-800/60 bg-panel-light dark:bg-panel-dark p-3 sm:p-4">
      <div className="container-safe">
        <div className="flex items-end gap-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!disabled) submit();
              }
            }}
            rows={1}
            placeholder="Mesajınızı yazın... (Shift+Enter: yeni satır)"
            className="min-h-[48px] max-h-40 flex-1 resize-y rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={submit}
            disabled={disabled}
            className="h-12 px-4 rounded-xl bg-indigo-600 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
