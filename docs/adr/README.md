# Architecture Decision Records

Lightweight ADRs. One file per decision. Keep tight: context, options, decision, consequences.

## Index

| # | Title | Status |
|---|---|---|
| [0001](0001-stack-nextjs-app-hosting.md) | Next.js 15 on Firebase App Hosting | Accepted |
| [0002](0002-monorepo-pnpm-turbo.md) | pnpm + Turborepo monorepo | Accepted |
| [0003](0003-genkit-vertex.md) | Genkit + Vertex AI for orchestration | Accepted |
| [0004](0004-vector-store.md) | Vector store — BigQuery vector first | Accepted (provisional) |
| [0005](0005-stripe-billing.md) | Stripe for billing | Accepted |

## When to write a new ADR

- Picking a vendor or framework that affects multiple services
- Choosing a data model boundary
- Reversing a prior ADR (supersede it; don't delete)

## Template

```md
# ADR-NNNN: Short title

- Status: Proposed | Accepted | Superseded by ADR-MMMM
- Date: YYYY-MM-DD

## Context
What problem, what constraints.

## Options
Numbered list with one-line tradeoff each.

## Decision
What we picked.

## Consequences
Positive and negative. Reversibility note if non-obvious.
```
