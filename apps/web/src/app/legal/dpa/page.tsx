import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export default function DpaPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[70vh] flex flex-col justify-between">
        <section className="mx-auto max-w-4xl w-full py-12 flex flex-col items-center text-center gap-6 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            Legal Compliance
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
            Data Processing Addendum (DPA)
          </h1>
          <p className="text-lg text-fg-muted max-w-xl">
            Procedures governing the processing of personal data, models optimization loops, and third-party API controls.
          </p>

          <div className="w-full max-w-md rounded-2xl glass p-8 mt-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-iridescent" />
            <ShieldCheck className="mx-auto text-brand-500 mb-4" size={32} />
            <p className="text-sm font-mono text-fg-muted leading-relaxed">
              Standard data subprocessor disclosures, compliance frameworks, and encryption-at-rest policies are under drafting.
            </p>
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
