"use client";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-200/60 dark:border-slate-800/60 bg-panel-light/70 dark:bg-panel-dark/50 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-40">
      <div className="container-safe h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600" />
          <h1 className="text-base sm:text-lg font-semibold tracking-tight">
            Multi AI Reasoning Studio
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
