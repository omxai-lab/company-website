"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

type Turn = { role: "user" | "assistant"; text: string };

const SCRIPT: Turn[] = [
  { role: "user", text: "Summarize the indemnification clause." },
  {
    role: "assistant",
    text:
      "Mutual indemnity, capped at 12 months of fees. Excludes gross negligence. Risk: low. Two redlines suggested.",
  },
];

const RESTART_MS = 6000;
const TYPING_MS = 18;

export default function DemoWidget() {
  const [shown, setShown] = useState<Turn[]>([]);
  const [streaming, setStreaming] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const run = async () => {
      setShown([]);
      setStreaming("");

      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        const turn = SCRIPT[i];

        if (turn.role === "user") {
          await new Promise<void>((res) => {
            const t = setTimeout(res, 600);
            timers.push(t);
          });
          if (cancelled) return;
          setShown((s) => [...s, turn]);
        } else {
          await new Promise<void>((res) => {
            const t = setTimeout(res, 700);
            timers.push(t);
          });
          if (cancelled) return;
          for (let n = 1; n <= turn.text.length; n++) {
            if (cancelled) return;
            setStreaming(turn.text.slice(0, n));
            await new Promise<void>((res) => {
              const t = setTimeout(res, TYPING_MS);
              timers.push(t);
            });
          }
          if (cancelled) return;
          setShown((s) => [...s, turn]);
          setStreaming("");
        }
      }

      const t = setTimeout(() => setTick((x) => x + 1), RESTART_MS);
      timers.push(t);
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [tick]);

  return (
    <div
      className="relative rounded-2xl glass overflow-hidden shadow-2xl"
      role="region"
      aria-label="Live agent demo"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-iridescent" aria-hidden="true" />

      <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-iridescent flex items-center justify-center" aria-hidden="true">
            <Sparkles size={12} className="text-bg" />
          </span>
          <span className="font-mono text-xs text-fg-muted">contract-agent</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-fg-dim flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
          live
        </span>
      </div>

      <div
        className="p-5 min-h-[280px] flex flex-col gap-3 font-mono text-sm"
        aria-live="polite"
      >
        {shown.map((t, i) => (
          <Bubble key={i} turn={t} />
        ))}
        {streaming && (
          <Bubble
            turn={{ role: "assistant", text: streaming }}
            cursor
          />
        )}
      </div>

      <div className="px-5 py-2.5 border-t border-border/50 flex items-center justify-between font-mono text-[10px] text-fg-dim">
        <span>gemini-2.5-flash · grounded</span>
        <span>187 tok · 412 ms</span>
      </div>
    </div>
  );
}

function Bubble({ turn, cursor }: { turn: Turn; cursor?: boolean }) {
  const isUser = turn.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] px-3.5 py-2 rounded-xl text-sm leading-relaxed ${
          isUser
            ? "bg-brand-500/15 border border-brand-500/25 text-fg"
            : "bg-surface border border-border text-fg"
        }`}
      >
        <span className="whitespace-pre-wrap">{turn.text}</span>
        {cursor && <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-fg animate-pulse" aria-hidden="true" />}
      </div>
    </div>
  );
}
