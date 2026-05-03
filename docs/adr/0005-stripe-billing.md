# ADR-0005: Stripe for billing

- **Status:** Accepted
- **Date:** 2026-05-03

## Context

Self-serve product billing eventually; for v1 limited to enterprise invoicing. Need tax, dunning, PCI scope minimization.

## Options

1. **Stripe** — standard, Checkout + Customer Portal + webhooks, Stripe Tax for global VAT/sales tax, strong docs.
2. **Lemon Squeezy** — Merchant of Record, handles all global tax/compliance, slightly higher fees (~5% + $0.50 vs Stripe 2.9% + $0.30 + Stripe Tax fee).
3. **Paddle** — also MoR; UI dated; smaller dev community.
4. **Custom invoicing only** — defers decision; viable for first 5–10 customers.

## Decision

**Stripe + Stripe Tax + Customer Portal** for self-serve. Manual NetSuite/QuickBooks invoicing for first enterprise deals (no engineering needed). Webhooks → `apps/web/app/api/webhooks/stripe/route.ts` → Firestore.

Revisit Lemon Squeezy if global tax compliance burden exceeds Stripe Tax automation (unlikely below $1M ARR).

## Consequences

Positive:
- Massive ecosystem (React Stripe.js, official tax integrations)
- Direct payouts to bank, full ledger control
- Already widely trusted by enterprise procurement

Negative:
- Sales tax registration burden in nexus states/countries falls on OMXAI (Stripe Tax automates calc but not registration)
- Webhook reliability requires idempotent handlers + Firestore-backed event log
