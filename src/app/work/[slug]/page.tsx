import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Capitalize slug
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[70vh] flex flex-col justify-between">
        <section className="mx-auto max-w-4xl w-full py-12 flex flex-col items-center text-center gap-6 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            Case Study
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
            {title}
          </h1>
          <p className="text-lg text-fg-muted max-w-xl">
            Detailed breakdown of our engagement, the technological solution implemented, and the measured outcomes 12 months post-delivery.
          </p>

          <div className="w-full max-w-md rounded-2xl glass p-8 mt-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-iridescent" />
            <ShieldCheck className="mx-auto text-brand-500 mb-4" size={32} />
            <p className="text-sm font-mono text-fg-muted leading-relaxed">
              Problem statements, RAG infrastructure diagrams, Vertex integration flows, and code repo logs for study identifier <code className="text-brand-500">&quot;{slug}&quot;</code> are under development.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors mt-8"
          >
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
