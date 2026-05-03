# ADR-0001: Next.js 15 on Firebase App Hosting

- **Status:** Accepted
- **Date:** 2026-05-03
- **Decider:** Suhas

## Context

Need SSR/RSC for SEO on marketing surface, server actions for forms, edge personalization, and a path to authed product portal under same domain. GCP-aligned for AI backend cohesion.

## Options

1. **Next.js on Vercel** — best DX, but splits cloud vendors, pays Vercel margin on bandwidth, harder Workload Identity to GCP.
2. **Next.js on Firebase App Hosting** — GCP-native, GitHub-triggered builds, Cloud Run under hood, supports SSR/RSC, integrates Firebase Auth + App Check natively.
3. **Astro + Cloud Run** — lighter, but RSC + server actions wanted for product portal; hybrid would mean two codebases.
4. **Remix on Cloud Run** — viable, smaller community, fewer template/component ecosystems.

## Decision

**Next.js 15 App Router on Firebase App Hosting.**

## Consequences

Positive:
- Single GCP billing surface; Workload Identity simplifies service auth
- App Hosting handles SSR + CDN + preview channels with no infra glue
- React 19 + RSC supported; can stream from Cloud Run inference
- shadcn + Radix ecosystem matches Next.js conventions

Negative:
- App Hosting newer than Vercel (fewer plugins, slower cold start in some regions); mitigate with `min instances=1` on prod
- Vendor lock to Firebase build pipeline; mitigate by keeping the app Cloud Run-deployable as fallback (it is, since App Hosting wraps Cloud Run)
- Next.js framework upgrades occasionally lag in App Hosting; accept ~1–2 week delay window

## Reversibility

High. App Hosting deploys to Cloud Run + Cloud CDN. Same Docker image can run on Cloud Run directly. Domain CNAME swap = under 1 hour.
