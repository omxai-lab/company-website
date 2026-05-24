import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, Mail } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28 pb-20 px-6 min-h-[85vh] flex flex-col justify-between relative overflow-hidden">
        {/* Background radial highlight */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" 
          aria-hidden="true" 
        />

        <section className="mx-auto max-w-6xl w-full py-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="flex flex-col gap-6 reveal">
              <span className="inline-flex items-center self-start px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
                Get in touch
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-tight text-balance">
                Connect directly with our <span className="text-brand-500">engineering team.</span>
              </h1>
              <p className="text-base text-fg-muted max-w-md leading-relaxed">
                Have questions about custom integrations, scalability, or deploying our scheduling engines on your own infrastructure? Reach out and speak directly to a builder.
              </p>

              <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center gap-3 text-xs font-mono text-fg-dim">
                  <Clock size={16} className="text-brand-500" aria-hidden="true" />
                  <span>Response from a core engineer in under 2 hours.</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-fg-dim">
                  <ShieldCheck size={16} className="text-brand-500" aria-hidden="true" />
                  <span>No sales scripts or automated bots. Just developers.</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-fg-dim">
                  <Mail size={16} className="text-brand-500" aria-hidden="true" />
                  <span>
                    Direct email:{" "}
                    <a href="mailto:support@tymora.io" className="text-brand-500 hover:underline">
                      support@tymora.io
                    </a>
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to homepage
                </Link>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="reveal delay-1">
              <ContactForm />
            </div>

          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
