import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export default function StudioPage() {
  const products = [
    { name: "Contract AI", slug: "contract-ai", desc: "Automated clause extraction and risk analysis agent." },
    { name: "RAG Platform", slug: "rag", desc: "Enterprise document grounding with secure vector search." },
    { name: "Agent Runtime", slug: "runtime", desc: "High-performance runtime for orchestrating LLM tool-calling." },
  ];

  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[70vh] flex flex-col justify-between">
        <section className="mx-auto max-w-4xl w-full py-12 flex flex-col items-center text-center gap-6 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            Product Portfolio
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
            The Product Studio
          </h1>
          <p className="text-lg text-fg-muted max-w-xl">
            SaaS products spun out of consulting engagements, ready to customize and deploy on your cloud tenant.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-8">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/studio/${p.slug}`}
                className="rounded-2xl glass p-6 text-left hover:bg-white/[0.06] transition-colors relative overflow-hidden group"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-border group-hover:bg-iridescent" />
                <Layers size={20} className="text-brand-500 mb-3" />
                <h3 className="font-display text-base font-semibold group-hover:text-brand-500 transition-colors">
                  {p.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-fg-dim">
                  {p.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-brand-500">
                  Explore product →
                </span>
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
