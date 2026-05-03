# Strategy

Compressed positioning for OMXAI. Source: [docs/research/gemini-blueprint.md](docs/research/gemini-blueprint.md).

## Positioning

**Builder-focused AI venture studio.** Not slide-deck consultancy. Not pure SaaS. Hybrid: consulting engagements fund and validate spinout products.

Two narratives, one site:
1. **Consultancy authority** — risk, governance, enterprise delivery
2. **Studio agility** — shipped products, autonomous agents, polished UI

### Differentiation tests (must pass on home page)

| Test | Pass criteria |
|---|---|
| Code ownership | "Full code transfer at handover" stated explicitly |
| Cadence | Fixed end dates, weekly demos — not open-ended retainers |
| Track record | At least 1 case study with 12-month post-delivery state |
| Live proof | Interactive demo on home page, no signup gate |

## Target buyers

- **Enterprise CTO/CDO** — needs AI strategy + execution, fears vendor lock-in
- **Mid-market founder** — has data, wants AI product spun out
- **Product team lead** — needs RAG/agent expertise as embedded squad

CTAs segment by buyer. Default CTA: "See live agent demo" (no gate).

## Information architecture

Strict hierarchy. 4 top-level pillars:

```
/                           Home (live demo + 3 proof points)
/solutions                  Consulting capabilities
  /solutions/strategy
  /solutions/build
  /solutions/data-platform
  /solutions/agents
  /industries/[slug]        Vertical-specific landing pages
/studio                     Product portfolio
  /studio/[product-slug]    Per-product landing
/work                       Case studies
  /work/[case-slug]
/insights                   Blog + innovation lab
  /insights/[post-slug]
  /insights/lab             Experimental demos (sandboxed)
/about                      Team, values, contact
/legal/{privacy,terms,dpa}
```

Cross-link rules:
- Every solution page → 2 case studies + 1 product
- Every case study → ≥1 solution + ≥1 product
- Every product page → 1 case study + "Want this customized?" → solutions

## Home page anatomy

Above fold (≤3s read):
1. **Headline** — value exchange, ≤10 words. e.g. "Ship production AI in 90 days, keep the code."
2. **Sub** — mechanism. ≤20 words.
3. **Live demo** — interactive Genkit-backed widget. No signup. Proof artifact.
4. **Primary CTA** — "Book strategy call" (consulting) + "Try the platform" (product)

Below fold:
5. **Logo bar** — enterprise clients (when earned; placeholder until)
6. **3 outcome metrics** — quantified ("$2M cost reduced", "60-day deploy")
7. **Featured case study** — problem / solution / outcome
8. **Pillar grid** — Solutions / Studio / Insights with deep links
9. **Testimonial** — outcome-oriented, named source
10. **Footer CTA** — newsletter + contact

Forbidden:
- Abstract neural-net background art
- Generic "Learn More" buttons
- Stock photo humans-with-laptops
- "AI-powered" in headline

## Design intent

See [DESIGN.md](DESIGN.md). Summary:
- Dark mode default, cinematic neutral canvas
- Iridescent gradient accents (sparing) on interactive AI elements only
- Inter (UI), Space Grotesk (display), JetBrains Mono (code)
- Layered glass/metallic surfaces for product cards
- Motion: 200ms ease-out default, 500ms expressive for hero reveals

## Trust architecture

Below the fold, every persuasive surface needs:
- Specific metric or named entity (not "many clients")
- Linked source (case study, post, GitHub)
- No superlatives without proof

## Innovation lab

`/insights/lab` ships rough experiments weekly. Public. Goals:
- Compounding SEO surface (long-tail AI queries)
- Recruiting magnet (engineers ship → engineers want to join)
- Sales enablement (link to lab demos in proposals)

Each lab post = 1 demo + 1 short writeup + 1 linked Cloud Run service.

## Out of scope (v1)

- Live chat widget (use async form)
- Self-serve product signup (book-a-call only until product GA)
- Multi-locale (English only)
- Job board (LinkedIn link only)
