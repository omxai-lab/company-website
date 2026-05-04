"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Solutions", href: "/solutions" },
  { label: "Studio", href: "/studio" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
      role="banner"
    >
      <nav
        aria-label="Primary"
        className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-lg bg-iridescent flex items-center justify-center text-[11px] font-bold text-bg font-display"
          >
            OMX
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            OMXAI
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-2 rounded-md text-sm text-fg-muted hover:text-fg hover:bg-surface transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/solutions/strategy"
            className="px-4 py-2 rounded-md text-sm font-semibold bg-brand-500 text-fg hover:bg-brand-600 transition-colors"
          >
            Book strategy call
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md text-fg-muted hover:text-fg hover:bg-surface"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl"
        >
          <ul className="px-6 py-4 space-y-1 list-none m-0">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm text-fg-muted hover:text-fg hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/solutions/strategy"
                onClick={() => setOpen(false)}
                className="block mt-2 px-3 py-2 rounded-md text-sm font-semibold bg-brand-500 text-fg text-center"
              >
                Book strategy call
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
