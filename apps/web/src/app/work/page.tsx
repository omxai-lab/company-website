import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export default function WorkPage() {
  const caseStudies = [
    {
      title: "From 14-day contract reviews to 4 hours",
      slug: "insurer-contract-ai",
      qualifier: "Legal Contract AI",
      metric: "$1.8M saved",
    },
    {
      title: "RAG-powered support agent in 60 days",
      slug: "support-rag",
      qualifier: "Customer Support RAG",
      metric: "50k queries/day",
    },
    {
      title: "Multi-agent risk platform 12 mo uptime",
      slug: "risk-agents",
      qualifier: "Financial Risk Agent",
      metric: "0 incidents",
    },
  ];

  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[70vh] flex flex-col justify-between">
        <section className="mx-auto max-w-4xl w-full py-12 flex flex-col items-center text-center gap-6 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            Case Studies
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
            Our Featured Work
          </h1>
          <p className="text-lg text-fg-muted max-w-xl">
            Real outcomes from production deployments. Delivered on fixed timelines with full source transfer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-8">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="rounded-2xl glass p-6 text-left hover:bg-white/[0.06] transition-colors relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-border group-hover:bg-iridescent" />
                <div>
                  <ShieldCheck size={20} className="text-brand-500 mb-3" />
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-brand-500 block mb-1">
                    {cs.qualifier}
                  </span>
                  <h3 className="font-display text-base font-semibold text-fg leading-snug group-hover:text-brand-500 transition-colors">
                    {cs.title}
                  </h3>
                </div>
                <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-success">{cs.metric}</span>
                  <ArrowRight size={12} className="text-fg-dim group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors mt-8"
          >
            <ArrowLeft size={16} />
            Back to homepage
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
