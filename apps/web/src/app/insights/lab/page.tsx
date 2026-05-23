import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export default function LabPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[70vh] flex flex-col justify-between">
        <section className="mx-auto max-w-4xl w-full py-12 flex flex-col items-center text-center gap-6 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            Innovation Lab
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
            Experimental Sandbox
          </h1>
          <p className="text-lg text-fg-muted max-w-xl">
            Where we host raw, open beta agent applications, models under evaluation, and pipeline testbeds. Updated weekly.
          </p>

          <div className="w-full max-w-md rounded-2xl glass p-8 mt-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-iridescent" />
            <Sparkles className="mx-auto text-brand-500 mb-4 animate-pulse" size={32} />
            <p className="text-sm font-mono text-fg-muted leading-relaxed">
              Our interactive playground, showcasing experimental reasoning traces, dynamic system prompts, and sandbox API connectors, is being engineered.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors mt-8"
          >
            <ArrowLeft size={16} />
            Back to Insights
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
