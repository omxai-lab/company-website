import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Insights", href: "/insights" },
        { label: "Careers", href: "https://linkedin.com" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "AI Strategy", href: "/solutions/strategy" },
        { label: "Agent Build", href: "/solutions/agents" },
        { label: "Data Platform", href: "/solutions/data-platform" },
        { label: "Studio", href: "/studio" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
        { label: "DPA", href: "/legal/dpa" },
      ],
    },
  ];

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-bg"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span
                aria-hidden="true"
                className="w-7 h-7 rounded-lg bg-iridescent flex items-center justify-center text-[11px] font-bold text-bg font-display"
              >
                OMX
              </span>
              <span className="font-display text-sm font-semibold">OMXAI</span>
            </div>
            <p className="text-xs leading-relaxed text-fg-dim">
              Builder-focused AI venture studio.
              <br />
              Consulting funds products.
              <br />
              Products compound authority.
            </p>
          </div>

          {cols.map(({ title, links }) => (
            <div key={title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-dim mb-4">
                {title}
              </p>
              <ul className="flex flex-col gap-2 list-none m-0 p-0">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-fg-muted hover:text-fg transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-fg-dim">
          <p>&copy; {year} OMXAI Ltd. All rights reserved.</p>
          <p>Built with Next.js 15, React 19, Tailwind v4.</p>
        </div>
      </div>
    </footer>
  );
}
