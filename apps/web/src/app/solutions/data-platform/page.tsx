import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export default function DataPlatformPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[70vh] flex flex-col justify-between">
        <section className="mx-auto max-w-4xl w-full py-12 flex flex-col items-center text-center gap-6 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            Pillar 03
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
            Data Platform
          </h1>
          <p className="text-lg text-fg-muted max-w-xl">
            Structuring enterprise data lakes, embedding pipelines, and scalable vector store infrastructure.
          </p>
          <div className="w-full max-w-md rounded-2xl glass p-8 mt-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-iridescent" />
            <Cpu className="mx-auto text-brand-500 mb-4" size={32} />
            <p className="text-sm font-mono text-fg-muted leading-relaxed">
              We construct BigQuery vector search architectures and cloud data connectors to feed Retrieval-Augmented Generation (RAG) models with low latency and clean formatting.
            </p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors mt-6"
          >
            <ArrowLeft size={16} />
            View all solutions
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
