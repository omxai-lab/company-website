import { ArrowRight, Sparkles, Trophy, CalendarDays, Megaphone, Clock, ShieldCheck, Mail } from "lucide-react";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import ContactForm from "./components/ContactForm";

export default function HomePage() {
  const products = [
    {
      id: "competition-scheduler",
      Icon: Trophy,
      tag: "Leagues & Esports",
      title: "Competition Scheduler",
      description: "Automate complex tournament brackets, track registration limits, and organize multi-day competitive events. Perfect for leagues, athletic tournaments, and athletic venues.",
      features: ["Auto-bracket generation", "Multi-venue scheduling", "Live score distribution"],
    },
    {
      id: "appointment-engine",
      Icon: CalendarDays,
      tag: "Client Booking",
      title: "Appointment Engine",
      description: "A fast, scalable scheduling infrastructure built to handle high-volume client bookings, slot reservations, calendar syncs, and automated notifications out of the box.",
      features: ["Real-time availability sync", "Custom intake forms", "Automated SMS/Email alerts"],
    },
    {
      id: "race-communicator",
      Icon: Megaphone,
      tag: "Mass Event Tech",
      title: "Race-Day Communicator",
      description: "A real-time broadcast and notification network built for race organizers. Keep runners, volunteers, and emergency staff synced with instant updates and checkpoint alerts.",
      features: ["Live broadcast SMS streams", "Runner checkpoint mapping", "Volunteer dispatch alerts"],
    },
  ];

  return (
    <>
      <SiteNav />
      <main id="main" className="min-h-screen bg-bg text-fg flex flex-col justify-between px-6 md:px-12 pt-16 relative overflow-hidden">
        {/* Background radial highlight */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" 
          aria-hidden="true" 
        />

      {/* 1. Hero Content */}
      <section className="w-full max-w-7xl mx-auto py-24 md:py-32 z-10">
        <div className="max-w-4xl flex flex-col items-start text-left gap-6 reveal">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] bg-brand-500/12 border border-brand-500/25 text-brand-500">
            <Sparkles size={10} aria-hidden="true" />
            Product Suite
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] text-balance">
            We turn complex ideas into <span className="text-brand-500">products people love.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed">
            Beautiful interfaces backed by rock-solid engineering. We combine elite product design with clean, scalable code to build blazingly fast, secure software that solves real-world problems—no fluff, no delays.
          </p>

          <div className="pt-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-brand-500 text-fg hover:bg-brand-600 transition-all hover:-translate-y-px shadow-lg shadow-brand-500/20 group"
            >
              See what we build
              <ArrowRight size={16} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Product Catalog Section */}
      <section id="products" className="w-full max-w-7xl mx-auto py-20 z-10 border-t border-border/20 scroll-mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-500">Our Engines</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-[-0.025em]">
              High-performance scheduling & communication software.
            </h2>
          </div>
          <p className="text-sm text-fg-muted max-w-sm leading-relaxed">
            We build ready-to-run scheduling and notification systems designed to handle critical event orchestration at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(({ id, Icon, tag, title, description, features }) => (
            <div
              key={id}
              className="glass rounded-2xl p-7 flex flex-col justify-between hover:bg-white/[0.06] transition-all hover:-translate-y-0.5 duration-200 group relative"
            >
              {/* Subtle top iridescent highlight on card hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-border group-hover:bg-iridescent rounded-t-2xl transition-colors" aria-hidden="true" />
              
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-500/12 border border-brand-500/20 mb-6" aria-hidden="true">
                  <Icon size={18} className="text-brand-500" />
                </div>
                
                <span className="text-[10px] uppercase font-semibold tracking-widest text-brand-500 block mb-1">
                  {tag}
                </span>
                
                <h3 className="font-display text-lg font-semibold text-fg leading-snug group-hover:text-brand-500 transition-colors">
                  {title}
                </h3>
                
                <p className="mt-3 text-xs leading-relaxed text-fg-muted">
                  {description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <ul className="flex flex-col gap-2 list-none m-0 p-0">
                  {features.map((f, i) => (
                    <li key={i} className="text-[11px] font-mono text-fg-dim flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-500" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Contact Us / Inquiry Section */}
      <section id="contact" className="w-full max-w-7xl mx-auto py-20 z-10 border-t border-border/20 scroll-mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 reveal">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-500">Contact Us</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] leading-tight">
              Ready to deploy? <br />
              <span className="text-brand-500">Let&apos;s collaborate.</span>
            </h2>
            <p className="text-base text-fg-muted max-w-md leading-relaxed">
              Have questions about integration complexity, scale limits, or custom features? Get in touch. You will always speak directly with a product engineer—no sales representatives, no automated response loops.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3 text-xs font-mono text-fg-dim">
                <Clock size={16} className="text-brand-500" aria-hidden="true" />
                <span>Same-day engineering response in under 2 hours.</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-fg-dim">
                <ShieldCheck size={16} className="text-brand-500" aria-hidden="true" />
                <span>100% direct developer chats. No generic sales loops.</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-fg-dim">
                <Mail size={16} className="text-brand-500" aria-hidden="true" />
                <span>Or email directly: <a href="mailto:support@tymora.io" className="text-brand-500 hover:underline">support@tymora.io</a></span>
              </div>
            </div>
          </div>

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
