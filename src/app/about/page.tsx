import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[70vh] flex flex-col justify-between">
        <section className="mx-auto max-w-4xl w-full py-12 flex flex-col items-center text-center gap-6 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            Our Studio
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
            About Tymora Labs
          </h1>
          <p className="text-lg text-fg-muted max-w-xl">
            We design and build high-performance scheduling and communication digital products. We focus on clean, scalable code and elegant interfaces that solve real-world operational problems.
          </p>

          <div className="w-full max-w-md rounded-2xl glass p-8 mt-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-iridescent" />
            <Users className="mx-auto text-brand-500 mb-4" size={32} />
            <p className="text-sm font-mono text-fg-muted leading-relaxed">
              Our team profiles, studio philosophy, and operational engagement processes are under active design.
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
