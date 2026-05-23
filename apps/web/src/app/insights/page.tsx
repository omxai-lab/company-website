import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export default function InsightsPage() {
  const posts = [
    { title: "Building RAG with Google Vertex AI Vector Search", slug: "rag-vertex-search", type: "Technical" },
    { title: "Managing AI Costs: Remote Config system prompts", slug: "remote-config-prompts", type: "Operational" },
    { title: "Governance frameworks for secure enterprise agents", slug: "governance-enterprise-agents", type: "Strategy" },
  ];

  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[70vh] flex flex-col justify-between">
        <section className="mx-auto max-w-4xl w-full py-12 flex flex-col items-center text-center gap-6 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            Insights & Lab
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-tight">
            Practitioner Writings
          </h1>
          <p className="text-lg text-fg-muted max-w-xl">
            Thought leadership, technical breakdowns, and live experimental sandboxes from our venture studio engineers.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Link
              href="/insights/lab"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-500/12 border border-brand-500/25 text-brand-500 hover:bg-brand-500/20 transition-colors"
            >
              <Sparkles size={12} />
              Try our experimental Lab Demos
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="rounded-2xl glass p-6 text-left hover:bg-white/[0.06] transition-colors relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-border group-hover:bg-iridescent" />
                <div>
                  <BookOpen size={20} className="text-brand-500 mb-3" />
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-brand-500 block mb-1">
                    {post.type}
                  </span>
                  <h3 className="font-display text-sm font-semibold text-fg leading-snug group-hover:text-brand-500 transition-colors">
                    {post.title}
                  </h3>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-[11px] font-medium text-brand-500">
                  Read article →
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
