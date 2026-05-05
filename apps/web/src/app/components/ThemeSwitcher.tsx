"use client";

import { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";

export const THEMES = [
  { id: "dark",     label: "Dark",     hint: "Near-black + cool blue" },
  { id: "light",    label: "Light",    hint: "Cloud Dancer + cool blue" },
  { id: "midnight", label: "Midnight", hint: "Deep navy + cyan" },
  { id: "obsidian", label: "Obsidian", hint: "Pure black + violet" },
  { id: "ember",    label: "Ember",    hint: "Warm dark + burnt orange" },
  { id: "paper",    label: "Paper",    hint: "Warm cream + forest" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "omxai-theme";

function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
  try { localStorage.setItem(STORAGE_KEY, id); } catch {}
}

export default function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeId>("dark");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = (typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme")) as ThemeId | null;
    if (stored) setActive(stored);
  }, []);

  const select = (id: ThemeId) => {
    setActive(id);
    applyTheme(id);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          role="dialog"
          aria-label="Theme switcher"
          className="mb-2 w-64 rounded-xl bg-surface border border-border shadow-2xl overflow-hidden"
        >
          <p className="px-4 pt-3 pb-2 text-[10px] uppercase tracking-[0.12em] text-fg-dim font-semibold">
            Color scheme
          </p>
          <ul className="list-none m-0 p-1.5 flex flex-col gap-0.5">
            {THEMES.map((t) => {
              const selected = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => select(t.id)}
                    aria-current={selected ? "true" : undefined}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      selected
                        ? "bg-brand-500/12 text-fg"
                        : "text-fg-muted hover:bg-surface-2 hover:text-fg"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <ThemeSwatch theme={t.id} />
                      <span className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{t.label}</span>
                        <span className="text-[11px] text-fg-dim truncate">
                          {t.hint}
                        </span>
                      </span>
                    </span>
                    {selected && (
                      <Check size={14} aria-hidden="true" className="text-brand-500 flex-shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="px-4 py-2 border-t border-border text-[10px] text-fg-dim">
            Saved locally. Refresh persists choice.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Change color scheme"
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-surface border border-border shadow-lg text-sm font-medium text-fg-muted hover:text-fg hover:bg-surface-2 transition-colors"
      >
        <Palette size={14} aria-hidden="true" />
        <span className="hidden sm:inline">Theme</span>
        <span className="font-mono text-[11px] text-fg-dim">
          {THEMES.find((t) => t.id === active)?.label}
        </span>
      </button>
    </div>
  );
}

function ThemeSwatch({ theme }: { theme: ThemeId }) {
  // Tiny preview pill rendered with literal OKLCH so it survives even when
  // current page theme differs from swatch theme.
  const swatches: Record<ThemeId, [string, string, string]> = {
    dark:     ["oklch(0.145 0 0)",       "oklch(0.205 0 0)",       "oklch(0.62 0.19 250)"],
    light:    ["oklch(0.985 0.005 90)",  "oklch(0.92 0 0)",        "oklch(0.55 0.21 252)"],
    midnight: ["oklch(0.16 0.025 250)",  "oklch(0.28 0.035 250)",  "oklch(0.72 0.16 200)"],
    obsidian: ["oklch(0.10 0 0)",        "oklch(0.21 0 0)",        "oklch(0.65 0.22 310)"],
    ember:    ["oklch(0.14 0.012 40)",   "oklch(0.26 0.018 40)",   "oklch(0.62 0.16 50)"],
    paper:    ["oklch(0.97 0.012 85)",   "oklch(0.84 0.018 85)",   "oklch(0.42 0.13 145)"],
  };
  const [bg, surface, brand] = swatches[theme];

  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center w-7 h-7 rounded-md overflow-hidden flex-shrink-0 border border-border"
      style={{ background: bg }}
    >
      <span className="w-1/3 h-full" style={{ background: surface }} />
      <span className="w-1/3 h-full" style={{ background: brand }} />
    </span>
  );
}
