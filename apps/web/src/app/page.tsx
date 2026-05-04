import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Layers,
  Bot,
  BookOpen,
  BarChart3,
  Database,
  Users,
  Cpu,
  Globe,
  Code2,
} from "lucide-react";
import SiteNav from "./components/SiteNav";
import DemoWidget from "./components/DemoWidget";

export default function HomePage() {
  return (
    <>
      <SiteNav />

      <main id="main">
        <Hero />
        <LogoBar />
        <Metrics />
        <CaseStudy />
        <Pillars />
        <Testimonial />
        <FooterCta />
      </main>

      <SiteFooter />
    </>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
      {children}
    </span>
  );
}

/* 1. Hero */
function Hero() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-6 reveal">
          <Pill>Builder-focused AI venture studio</Pill>

          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] text-balance">
            Ship production AI in 90 days,{" "}
            <span className="text-brand-500">keep the code.</span>
          </h1>

          <p className="text-lg leading-relaxed text-fg-muted max-w-xl">
            Fixed timelines. Weekly demos. Full code transfer at handover. No
            vendor lock-in — ever.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/solutions/strategy"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-brand-500 text-fg hover:bg-brand-600 hover:-translate-y-px transition-all"
            >
              Book strategy call
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border border-border text-fg hover:border-fg-dim hover:bg-surface transition-colors"
            >
              Try the platform
            </Link>
          </div>

          <p className="text-xs text-fg-dim flex items-center gap-2 mt-1">
            <ShieldCheck size={12} aria-hidden="true" className="text-success" />
            Full code transfer at handover — contractually guaranteed
          </p>
        </div>

        <div className="reveal delay-2">
          <DemoWidget />
        </div>
      </div>
    </section>
  );
}

/* 2. Logo bar */
function LogoBar() {
  const logos = [
    { Icon: Globe, name: "GlobalFinance" },
    { Icon: Database, name: "DataCore" },
    { Icon: ShieldCheck, name: "SecureOps" },
    { Icon: Cpu, name: "NeuraLink" },
    { Icon: BarChart3, name: "IntelEdge" },
    { Icon: Users, name: "TeamAxis" },
  ];

  return (
    <section
      aria-label="Client logos placeholder"
      className="border-y border-border bg-surface/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-[11px] uppercase tracking-[0.14em] text-fg-dim mb-7">
          Trusted by forward-thinking enterprises
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-60">
          {logos.map(({ Icon, name }) => (
            <div
              key={name}
              className="flex items-center gap-2"
              aria-label={`${name} — client logo placeholder`}
            >
              <Icon size={16} aria-hidden="true" className="text-fg-muted" />
              <span className="font-display text-sm font-semibold tracking-tight text-fg-muted">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 3. Outcome metrics */
function Metrics() {
  const stats = [
    {
      metric: "$2M",
      qualifier: "cost reduced",
      detail:
        "Operational savings in year one for a global logistics client through automated document processing.",
      href: "/work/logistics-doc-ai",
    },
    {
      metric: "60",
      qualifier: "days to deploy",
      detail:
        "From kick-off to production for a RAG-powered customer support agent handling 50k queries/day.",
      href: "/work/support-rag",
    },
    {
      metric: "12 mo",
      qualifier: "post-delivery uptime",
      detail:
        "Continuous operation of a multi-agent risk platform without a single production incident.",
      href: "/work/risk-agents",
    },
  ];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Pill>Proven results</Pill>
          <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em]">
            Outcomes, not slide decks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map(({ metric, qualifier, detail, href }) => (
            <Link
              key={metric}
              href={href}
              className="flex flex-col p-7 rounded-2xl bg-surface border border-border hover:border-brand-500/40 transition-colors group"
            >
              <p className="font-display text-6xl font-semibold leading-none tracking-[-0.04em] text-brand-500">
                {metric}
              </p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.08em] text-fg-muted">
                {qualifier}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-dim">
                {detail}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-brand-500 group-hover:gap-2 transition-all">
                Read case study
                <ArrowRight size={12} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4. Featured case study */
function CaseStudy() {
  const cards = [
    {
      label: "Problem",
      tone: "text-danger",
      content:
        "847 contracts/quarter reviewed manually. 14-day turnaround blocked deal velocity. High error rate on clause extraction.",
    },
    {
      label: "Solution",
      tone: "text-brand-500",
      content:
        "Multi-agent RAG pipeline on Gemini 2.5 Pro. Clause extraction, risk scoring, and escalation routing — automated. Deployed in 55 days.",
    },
    {
      label: "Outcome",
      tone: "text-success",
      content:
        "4-hour average review cycle. $1.8M annual savings. Zero production incidents in 12 months. Full code transferred, team self-sufficient.",
    },
  ];

  return (
    <section className="px-6 py-24 bg-surface/40 border-y border-border">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Pill>Featured case study</Pill>
          <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em] leading-[1.15]">
            From 14-day contract reviews to 4 hours
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted max-w-lg">
            A top-10 global insurer&rsquo;s legal team was drowning in
            high-volume commercial contract review — 847 contracts per quarter,
            14 days average per batch.
          </p>
          <Link
            href="/work/insurer-contract-ai"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:gap-2.5 transition-all"
          >
            Full case study
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {cards.map(({ label, tone, content }) => (
            <div
              key={label}
              className="rounded-xl p-5 bg-surface border border-border"
            >
              <span
                className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${tone}`}
              >
                {label}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5. Pillar grid */
function Pillars() {
  const pillars = [
    {
      Icon: ShieldCheck,
      title: "Solutions",
      href: "/solutions",
      description:
        "Strategy, build, data platforms, and autonomous agents. Fixed-scope engagements with weekly demos and hard end dates.",
      links: [
        { label: "AI Strategy", href: "/solutions/strategy" },
        { label: "Agent Build", href: "/solutions/agents" },
        { label: "Data Platform", href: "/solutions/data-platform" },
      ],
    },
    {
      Icon: Layers,
      title: "Studio",
      href: "/studio",
      description:
        "Spinout products validated by consulting engagements. Purpose-built, not retrofitted. Open to enterprise customisation.",
      links: [
        { label: "Contract AI", href: "/studio/contract-ai" },
        { label: "RAG Platform", href: "/studio/rag" },
        { label: "Agent Runtime", href: "/studio/runtime" },
      ],
    },
    {
      Icon: Bot,
      title: "Work",
      href: "/work",
      description:
        "Delivered projects with verifiable outcomes. Named clients where permitted. Metrics 12 months post-delivery.",
      links: [
        { label: "Contract review", href: "/work/insurer-contract-ai" },
        { label: "Support RAG", href: "/work/support-rag" },
        { label: "Risk agents", href: "/work/risk-agents" },
      ],
    },
    {
      Icon: BookOpen,
      title: "Insights",
      href: "/insights",
      description:
        "Technical writing, experiment lab, and opinion from practitioners who ship. New every week.",
      links: [
        { label: "Lab demos", href: "/insights/lab" },
        { label: "Engineering blog", href: "/insights" },
        { label: "AI governance", href: "/insights/governance" },
      ],
    },
  ];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Pill>What we do</Pill>
          <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em]">
            Four ways we create leverage
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pillars.map(({ Icon, title, href, description, links }) => (
            <div
              key={title}
              className="glass rounded-2xl p-7 flex flex-col gap-5 hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-brand-500/12 border border-brand-500/20"
                  aria-hidden="true"
                >
                  <Icon size={18} className="text-brand-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {description}
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
                {links.map(({ label, href: linkHref }) => (
                  <li key={label}>
                    <Link
                      href={linkHref}
                      className="flex items-center justify-between px-3 py-2 -mx-3 rounded-md text-sm text-fg-muted hover:bg-white/5 hover:text-fg transition-colors"
                    >
                      <span>{label}</span>
                      <ArrowRight size={12} aria-hidden="true" className="text-fg-dim" />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-500 mt-auto hover:gap-2 transition-all"
              >
                Explore {title}
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6. Testimonial */
function Testimonial() {
  return (
    <section className="px-6 py-24 bg-surface/40 border-y border-border">
      <div className="mx-auto max-w-3xl text-center">
        <Pill>Client perspective</Pill>

        <blockquote className="mt-8" cite="/work/insurer-contract-ai">
          <p className="font-display text-2xl lg:text-3xl font-medium leading-snug tracking-[-0.015em] text-balance">
            &ldquo;We had tried two vendors before OMXAI. Both left us with
            black-box systems we couldn&rsquo;t modify. OMXAI delivered the
            agent in 55 days, handed us the repo, and our engineers have
            shipped three improvements since.&rdquo;
          </p>

          <footer className="mt-6">
            <p className="text-sm font-semibold">Sarah Chen</p>
            <p className="text-sm text-fg-muted">
              Chief Digital Officer, Global Insurance Group
              <span className="ml-2 text-xs text-fg-dim">
                —{" "}
                <Link
                  href="/work/insurer-contract-ai"
                  className="text-brand-500 hover:underline"
                >
                  Full case study
                </Link>
              </span>
            </p>
          </footer>
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm flex-wrap text-fg-dim">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} aria-hidden="true" className="text-success" />
            <span>12 months post-delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 size={14} aria-hidden="true" className="text-success" />
            <span>Full code ownership</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7. Footer CTA */
function FooterCta() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl p-10 lg:p-16 text-center bg-surface border border-border">
          <Pill>Get started</Pill>
          <h2 className="mt-4 font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em]">
            Ready to ship production AI?
          </h2>
          <p className="mt-3 text-base leading-relaxed max-w-xl mx-auto text-fg-muted">
            Book a 30-minute strategy call. We&rsquo;ll map your highest-value
            AI opportunity, scope a fixed engagement, and send you a proposal
            the same week.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/solutions/strategy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-brand-500 text-fg hover:bg-brand-600 transition-colors"
            >
              Book strategy call
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border border-border text-fg hover:border-fg-dim hover:bg-surface-2 transition-colors"
            >
              Contact the team
            </Link>
          </div>

          <div className="mt-10 max-w-md mx-auto">
            <p className="text-[11px] uppercase tracking-[0.1em] text-fg-dim mb-3">
              Or get insights in your inbox
            </p>
            <form
              action="#"
              className="flex gap-2"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="you@company.com"
                required
                className="flex-1 min-w-0 px-4 py-2.5 rounded-lg text-sm bg-bg border border-border text-fg outline-none focus:border-brand-500/60"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-border text-fg hover:bg-surface-2 transition-colors flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Site footer */
function SiteFooter() {
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
