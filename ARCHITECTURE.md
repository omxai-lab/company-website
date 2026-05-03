# Architecture

Concrete technical blueprint for OMXAI corporate site + product portal. Decisions binding unless superseded by ADR.

## Stack at a glance

| Layer | Tech | Why |
|---|---|---|
| Frontend | Next.js 15 App Router, React 19, TS 5.5 | RSC + SSR for SEO, streaming, App Hosting native |
| Styling | Tailwind CSS v4 + shadcn/ui + Radix primitives | Design system velocity, a11y baseline |
| Hosting (web) | Firebase App Hosting | SSR + CDN + GitHub-triggered builds |
| Backend (AI) | FastAPI on Cloud Run (Python 3.12) | Vertex AI SDK maturity, GPU support |
| Backend (general) | Cloud Run Functions (Node 20) | Webhooks, light async work |
| AI orchestration | Genkit (TS) + Vertex AI (Gemini 2.x) | Flows, traces, eval, model swap via Remote Config |
| Auth | Firebase Auth + App Check (reCAPTCHA Enterprise) | Web-friendly, abuse protection |
| Operational DB | Firestore (Native mode, multi-region nam5) | Realtime, low-latency, IAM rules |
| Analytics + vectors | BigQuery + Vertex AI Vector Search | RAG corpus, business analytics, single warehouse |
| Object storage | Cloud Storage (regional + multi-region) | Assets, RAG source docs, model artifacts |
| Billing | Stripe (Checkout + Customer Portal + webhooks) | Standard SaaS billing |
| Email | Resend + React Email templates | Tx + marketing, low-config |
| Errors | Sentry (web + API) | Source maps, release tracking |
| Product analytics | PostHog (self-host on Cloud Run later, cloud for now) | Funnels, session replay |
| Infra logs | Cloud Logging + Cloud Monitoring | Native, free-tier generous |
| Secrets | Secret Manager + Firebase Remote Config | Runtime secrets vs feature flags |
| CI | GitHub Actions | Lint, typecheck, test, e2e |
| Deploy | Cloud Build (App Hosting + Cloud Run) | GCP-native, Workload Identity |
| Monorepo | pnpm workspaces + Turborepo | Caching, parallel tasks |

Languages: TypeScript (web, functions, genkit), Python (FastAPI AI services). No Go for v1.

## Repo layout

```
.
├── apps/
│   ├── web/                       Next.js corporate site + product portal
│   │   ├── app/
│   │   │   ├── (marketing)/       Home, solutions, work, insights, about
│   │   │   ├── (product)/         Authed product portal at /app/*
│   │   │   ├── api/               Route handlers (BFF, webhooks)
│   │   │   └── layout.tsx
│   │   ├── components/            App-specific composites
│   │   ├── lib/                   Server actions, fetchers, auth
│   │   ├── content/               MDX for insights, case studies
│   │   ├── public/
│   │   └── apphosting.yaml        App Hosting config (rollout, env)
│   └── api/                       FastAPI on Cloud Run
│       ├── omxai_api/
│       │   ├── main.py            FastAPI app
│       │   ├── routers/
│       │   │   ├── inference.py
│       │   │   ├── rag.py
│       │   │   └── agents.py
│       │   ├── deps.py            Auth, rate limit
│       │   └── settings.py        pydantic-settings
│       ├── tests/
│       ├── pyproject.toml
│       └── Dockerfile
├── packages/
│   ├── ui/                        Shared shadcn components, design tokens
│   ├── config/                    eslint, tsconfig, tailwind preset
│   ├── genkit-flows/              Vertex AI orchestration (TS)
│   └── schemas/                   Zod schemas shared client/server
├── infra/
│   ├── firebase/
│   │   ├── firestore.rules
│   │   ├── firestore.indexes.json
│   │   ├── storage.rules
│   │   └── firebase.json
│   ├── cloud-run/
│   │   └── api.yaml               Cloud Run service spec
│   └── terraform/
│       ├── project.tf
│       ├── iam.tf
│       ├── bigquery.tf
│       ├── secrets.tf
│       └── monitoring.tf
├── .github/workflows/
│   ├── ci.yml                     Lint, typecheck, test on PR
│   ├── e2e.yml                    Playwright on PR
│   └── deploy.yml                 Tag-based release
├── docs/
│   ├── adr/
│   └── research/
├── README.md
├── STRATEGY.md
├── ARCHITECTURE.md
├── DESIGN.md
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Data model (Firestore)

Collections (Firestore, namespace `prod_` / `staging_` per env):

```
users/{uid}
  email, displayName, role (owner|admin|member|guest)
  createdAt, lastLoginAt
  stripeCustomerId?

orgs/{orgId}
  name, slug, plan (free|pro|enterprise)
  ownerUid
  members: { [uid]: role }
  createdAt

orgs/{orgId}/projects/{projectId}
  name, description
  ragCorpusId? (BigQuery dataset ref)
  agentConfig: { model, systemPrompt, tools[] }
  createdAt, updatedAt

orgs/{orgId}/conversations/{convId}
  projectId, userId
  messages: subcollection
  createdAt

orgs/{orgId}/conversations/{convId}/messages/{msgId}
  role (user|assistant|tool)
  content (string | structured)
  toolCalls?
  tokensIn, tokensOut, latencyMs, model
  createdAt

leads/{leadId}                    # marketing site contacts
  email, name, company, message
  source (page slug), utm
  createdAt, status

caseStudies/{slug}                # mirrored from MDX for query
  title, industry, tags[], publishedAt, featured

events/{eventId}                  # analytics fanout
  type, userId, orgId, payload
  createdAt
```

BigQuery datasets (`omxai_prod`):
- `events_raw` — append-only, partitioned by date
- `rag_corpora.{corpus_id}` — vector embeddings + chunks
- `usage` — token + cost rollups, hourly materialized view
- `analytics_marts.*` — dbt-built marts (later)

## API contract (FastAPI)

Base URL: `https://api.omxai.com` (Cloud Run + Cloud LB)

All routes auth via Firebase ID token in `Authorization: Bearer`. App Check token in `X-Firebase-AppCheck` for browser-origin requests.

```
POST /v1/inference
  body: { projectId, messages[], stream?: bool }
  resp: { messageId, content, usage } | SSE stream

POST /v1/rag/query
  body: { corpusId, query, topK?: 8 }
  resp: { chunks: [{ text, score, source }], answer? }

POST /v1/rag/ingest
  body: { corpusId, source: { type: "gcs"|"url", uri } }
  resp: { jobId } -> Cloud Run Job
GET  /v1/rag/ingest/{jobId}
  resp: { status, progress, error? }

POST /v1/agents/{agentId}/invoke
  body: { input, context? }
  resp: { runId, output, traceUrl }

GET  /v1/usage?orgId&from&to
  resp: { tokens, costUsd, byModel{}, byDay[] }

GET  /healthz
  resp: { ok: true, version, model: <gemini-version-from-RemoteConfig> }
```

Rate limit: per-org tier (free 100/day, pro 10k/day, enterprise unbounded). Implemented via Firestore counter + retry-after headers.

## AI orchestration

Genkit flows in `packages/genkit-flows/`:

- `assistantFlow` — RAG + tool use; called by `/v1/inference`
- `summarizeDoc` — single-shot
- `extractEntities` — structured output via Zod
- `agenticTask` — multi-step with tool router

Model selection via Firebase Remote Config keys:
- `model.default` → e.g. `gemini-2.5-flash`
- `model.heavy` → e.g. `gemini-2.5-pro`
- `model.cheap` → e.g. `gemini-2.5-flash-lite`

Swap models without redeploy. Audit changes via Remote Config history.

## Auth & authorization

- Firebase Auth providers: Google, email link, SAML (enterprise via Identity Platform)
- Firestore rules enforce org membership for all reads/writes
- Cloud Run API verifies ID token → resolves org/role → applies policy
- App Check required on all browser-originated API calls (reCAPTCHA Enterprise on web, debug tokens for dev)
- Service-to-service: Workload Identity Federation, no JSON keys

## Environment variables

`apps/web/.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
NEXT_PUBLIC_API_BASE=https://api.omxai.com
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_SENTRY_DSN=
RESEND_API_KEY=                   # server only
STRIPE_SECRET_KEY=                # server only
STRIPE_WEBHOOK_SECRET=
INTERNAL_API_TOKEN=               # signed JWT for SSR -> Cloud Run
```

`apps/api/` (loaded from Secret Manager in prod):
```
GOOGLE_CLOUD_PROJECT=omxai-prod
VERTEX_LOCATION=us-central1
FIREBASE_PROJECT_ID=omxai-prod
SENTRY_DSN=
LOG_LEVEL=INFO
ALLOWED_ORIGINS=https://omxai.com,https://www.omxai.com
```

Secrets never in repo. `.env.local` gitignored. CI uses GitHub OIDC → GCP Workload Identity.

## IAM (least privilege)

| Identity | Roles |
|---|---|
| `web-sa@omxai-prod` (App Hosting backend) | Firestore User, Secret Accessor (scoped), Cloud Run Invoker (api), Logs Writer |
| `api-sa@omxai-prod` (Cloud Run api) | Vertex AI User, BigQuery Data Editor (scoped datasets), Firestore User, Secret Accessor, Logs Writer |
| `ingest-job-sa@omxai-prod` (Cloud Run Jobs) | Storage Object Viewer (sources), BigQuery Job User, Vertex AI User |
| `gha-deployer@omxai-prod` (GitHub Actions WIF) | Cloud Run Admin, Artifact Registry Writer, App Hosting Admin |
| Developers | Viewer + Cloud Run Developer (staging only); prod read-only |

No primitive roles (Owner/Editor) on prod project except break-glass account.

## Deploy

Branches:
- `main` → staging (auto on push)
- `release/*` → prod (manual approval gate)

Pipeline (GitHub Actions → Cloud Build):
1. CI: lint, typecheck, unit, build → required for merge
2. On merge to `main`:
   - Web: App Hosting picks up GitHub commit → builds → rollout to staging URL
   - API: Cloud Build builds Docker → Artifact Registry → `gcloud run deploy --tag=staging`
3. E2E (Playwright) against staging
4. Tag `release/v*` → traffic split rollout (10% → 50% → 100% with 5min holds)
5. Post-deploy: smoke check `/healthz` + synthetic Vertex inference

Rollback: `gcloud run services update-traffic --to-revisions=PREV=100` + App Hosting rollback to last release.

## Observability

- **Metrics:** Cloud Monitoring dashboards per service. SLOs: web p95 TTFB <800ms, API p95 latency <2s (non-stream), Vertex error rate <1%
- **Logs:** Structured JSON, `traceId` propagated client → web → api → Vertex
- **Traces:** Cloud Trace + Genkit traces (visible in Firebase console)
- **Errors:** Sentry, alert to Slack via webhook on rate spike or new issue
- **Synthetics:** Cloud Monitoring uptime check every 1min on `/healthz` + home page
- **Cost:** Daily BigQuery rollup of token + GCP usage → PostHog dashboard

## Cost ceilings (alerts at 50/80/100%)

| Service | Monthly budget | Notes |
|---|---|---|
| Vertex AI (Gemini) | $500 | Hard quota at 10x: temporary kill-switch via Remote Config |
| Cloud Run | $100 | min instances=0; concurrency=80 |
| Firebase App Hosting | $50 | scales to 0 off-hours via min instances=0 |
| Firestore | $30 | reads cached aggressively |
| BigQuery | $100 | flat-rate not used; on-demand with custom quota |
| Cloud Storage | $20 | lifecycle policy: 90 day → coldline |
| Logging | $30 | retention 30 days |
| Sentry/PostHog/Resend | $0–50 each (free tier first) | |
| **Total target v1** | **<$1k/mo** | Pre-revenue ceiling |

Budget alerts via Cloud Billing → Pub/Sub → Slack. Hard cap automation: Cloud Function on alert disables non-critical Cloud Run services.

## Security baseline

- TLS only (App Hosting + Cloud Run enforce). HSTS preload.
- CSP: nonce-based, no `unsafe-inline`. Strict on `/app/*`.
- App Check on every API call from browser.
- Firestore + Storage rules: deny by default, explicit allow per collection.
- Stripe webhook signature verification.
- Dependabot + `pnpm audit` in CI; Snyk on weekly cron.
- Quarterly key rotation (Stripe, Resend). Workload Identity removes most keys.
- DPA-ready: BigQuery + Firestore in `us` multi-region; data export endpoint per org.
- PII: encrypted at rest (Google-managed). No PII in logs (PII redactor in log middleware).

## Environments

| Env | GCP project | Domain | Purpose |
|---|---|---|---|
| dev | `omxai-dev` | localhost + preview channels | Local + PR previews |
| staging | `omxai-staging` | `staging.omxai.com` | Pre-prod E2E |
| prod | `omxai-prod` | `omxai.com`, `api.omxai.com` | Customer-facing |

PR previews: App Hosting preview channels (auto). API: shared staging service per PR (path prefix `/pr-{n}`).

## Open questions (track in ADRs)

- Stripe vs Lemon Squeezy for global tax handling — see [ADR-0005](docs/adr/0005-stripe-billing.md)
- Identity Platform tier upgrade timing for SAML
- Vector store: Vertex Vector Search vs BigQuery vector vs pgvector — see [ADR-0004](docs/adr/0004-vector-store.md)
- When to fork `apps/api` per product (currently shared)
