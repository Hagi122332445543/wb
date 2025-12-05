"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 dark:border-slate-800/60 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
    >
      <span className="h-2 w-2 rounded-full bg-yellow-400 dark:bg-slate-200" />
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"} Mode</span>
    </button>
  );
}
