"use client";

const MODEL_LABELS = {
  deepseek: "DeepSeek-V3",
  qwen72: "Qwen3-72B-AI-Reasoner",
  gemma: "Gemma-3-27B-Reasoning",
  openthinker: "OpenThinker-70B-GRPO",
  qwen32: "Qwen3-32B-Thinker-2025",
  llama: "LLaMA-3.2-90B Reasoning Distill"
};

export default function Sidebar({ selected, onSelect }) {
  return (
    <aside className="w-full sm:w-64 shrink-0 border-r border-slate-200/60 dark:border-slate-800/60 bg-panel-light dark:bg-panel-dark">
      <div className="p-4">
        <div className="mb-3 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Models</div>
        <nav className="space-y-1">
          {Object.entries(MODEL_LABELS).map(([key, label]) => {
            const active = key === selected;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${active ? "bg-white" : "bg-indigo-600"}`} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <div className={`mt-1 text-xs ${active ? "text-indigo-100/90" : "text-slate-500 dark:text-slate-400"}`}>
                  {key}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
