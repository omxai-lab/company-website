"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
            className="w-7 h-7 rounded-lg bg-iridescent flex items-center justify-center text-[10px] font-bold text-bg font-display"
          >
            TYM
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            Tymora Labs
          </span>
        </Link>

        <div>
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className="px-4 py-2 rounded-md text-sm font-semibold bg-brand-500 text-fg hover:bg-brand-600 transition-colors cursor-pointer"
          >
            Contact us
          </Link>
        </div>
      </nav>
    </header>
  );
}
