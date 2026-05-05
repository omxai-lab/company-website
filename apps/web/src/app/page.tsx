import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] font-sans">
      <main>
        {/* Above the fold */}
        <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight leading-[1.0] text-balance">
              Ship production AI in 90 days, keep the code.
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-fg-muted)] leading-relaxed max-w-2xl">
              We are a builder-focused venture studio. We ship robust AI products alongside your team, and you own everything at handover.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--color-fg)] text-[var(--color-bg)] font-medium transition-colors hover:bg-[var(--color-fg-muted)]"
              >
                Book strategy call
              </Link>
              <Link
                href="/studio"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface)] font-medium transition-colors"
              >
                Try the platform
              </Link>
            </div>
          </div>

          {/* Live demo placeholder */}
          <div className="flex-1 w-full max-w-lg">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden backdrop-blur-xl">
              <div className="h-2 bg-iridescent w-full" />
              <div className="p-8 aspect-square flex items-center justify-center text-center flex-col gap-4">
                <div className="w-16 h-16 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center justify-center">
                  <span className="font-mono text-sm text-[var(--color-fg-muted)]">AI</span>
                </div>
                <p className="font-mono text-sm text-[var(--color-fg-muted)]">Live Genkit Agent Demo</p>
                <p className="text-xs text-[var(--color-fg-dim)] mt-4">Interactive widget loading...</p>
              </div>
            </div>
          </div>
        </section>

        {/* Below the fold: 3 outcome metrics */}
        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
            <div className="flex flex-col items-center text-center space-y-2 md:px-8">
              <div className="text-4xl md:text-5xl font-display font-medium text-[var(--color-brand-500)]">$2M+</div>
              <div className="text-sm font-medium uppercase tracking-widest text-[var(--color-fg-muted)]">Infrastructure cost reduced</div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 md:px-8 pt-8 md:pt-0">
              <div className="text-4xl md:text-5xl font-display font-medium text-[var(--color-brand-500)]">60 Days</div>
              <div className="text-sm font-medium uppercase tracking-widest text-[var(--color-fg-muted)]">Average time to deploy</div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 md:px-8 pt-8 md:pt-0">
              <div className="text-4xl md:text-5xl font-display font-medium text-[var(--color-brand-500)]">100%</div>
              <div className="text-sm font-medium uppercase tracking-widest text-[var(--color-fg-muted)]">Code ownership transfer</div>
            </div>
          </div>
        </section>

        {/* Logo bar placeholder */}
        <section className="py-12 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Replace with actual logos */}
            <div className="font-display text-xl font-bold tracking-tight">EnterpriseCorp</div>
            <div className="font-display text-xl font-bold tracking-tight">GlobalTech</div>
            <div className="font-display text-xl font-bold tracking-tight">FinScale</div>
            <div className="font-display text-xl font-bold tracking-tight">HealthAI</div>
          </div>
        </section>

        {/* Featured case study */}
        <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-display font-medium mb-4">Featured Work</h2>
            <p className="text-[var(--color-fg-muted)] max-w-2xl">Real outcomes from production deployments.</p>
          </div>

          <Link href="/work/enterprise-rag" className="block group">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-300 hover:border-[var(--color-brand-500)]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-[var(--color-border)]">
                  <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] text-xs font-mono w-fit bg-[var(--color-surface-2)]">
                    Finance / Enterprise RAG
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-medium group-hover:text-[var(--color-brand-500)] transition-colors">
                    Replacing manual compliance checks with secure RAG
                  </h3>
                  <p className="text-[var(--color-fg-muted)]">
                    Built a 100% locally-hosted vector database and LLM pipeline that processes 10,000+ regulatory documents in under 5 minutes.
                  </p>
                </div>
                <div className="bg-[var(--color-surface-2)] p-8 flex items-center justify-center font-mono text-sm text-[var(--color-fg-dim)] min-h-[300px]">
                  [ Architecture Diagram / UI Screenshot ]
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Pillar grid */}
        <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors">
              <h3 className="text-xl font-display font-medium text-[var(--color-brand-500)]">Solutions</h3>
              <p className="text-[var(--color-fg-muted)]">Consulting capabilities spanning strategy, engineering, data platforms, and agent architecture.</p>
              <Link href="/solutions" className="inline-flex items-center text-sm font-medium hover:text-[var(--color-brand-500)] transition-colors">
                Explore capabilities →
              </Link>
            </div>
            <div className="space-y-4 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors">
              <h3 className="text-xl font-display font-medium text-[var(--color-brand-500)]">Studio</h3>
              <p className="text-[var(--color-fg-muted)]">Our portfolio of ready-to-deploy AI products. Proven architecture, customizable for your enterprise.</p>
              <Link href="/studio" className="inline-flex items-center text-sm font-medium hover:text-[var(--color-brand-500)] transition-colors">
                View products →
              </Link>
            </div>
            <div className="space-y-4 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors">
              <h3 className="text-xl font-display font-medium text-[var(--color-brand-500)]">Insights</h3>
              <p className="text-[var(--color-fg-muted)]">Strategic writing, technical deep-dives, and interactive experiments from our innovation lab.</p>
              <Link href="/insights" className="inline-flex items-center text-sm font-medium hover:text-[var(--color-brand-500)] transition-colors">
                Read the blog →
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-8">
            <blockquote className="text-2xl md:text-4xl font-display font-medium leading-tight">
              &quot;OMXAI delivered a production-ready agent in 8 weeks. What usually takes months of PowerPoint decks was replaced by actual working software we could test and iterate on.&quot;
            </blockquote>
            <div className="flex flex-col items-center space-y-2">
              <div className="font-medium">Sarah Jenkins</div>
              <div className="text-sm text-[var(--color-fg-muted)]">CTO, EnterpriseCorp</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[var(--color-border)] mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-2xl font-medium mb-2">OMXAI</h2>
            <p className="text-[var(--color-fg-muted)]">Builder-focused AI venture studio.</p>
          </div>
          <div className="flex flex-col items-start md:items-end space-y-4">
            <h3 className="font-medium text-sm uppercase tracking-widest">Stay updated</h3>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-4 py-2 flex-1 md:w-64 focus:outline-none focus:border-[var(--color-brand-500)] transition-colors"
              />
              <button className="bg-[var(--color-fg)] text-[var(--color-bg)] px-4 py-2 rounded-md font-medium hover:bg-[var(--color-fg-muted)] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center text-sm text-[var(--color-fg-muted)]">
          <div>© {new Date().getFullYear()} OMXAI. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-[var(--color-fg)] transition-colors">About</Link>
            <Link href="/legal/privacy" className="hover:text-[var(--color-fg)] transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-[var(--color-fg)] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
