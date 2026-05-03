# OMXAI

AI venture studio. Hybrid consulting + product. Builder-focused.

This repo: corporate website + product portal monorepo.

## Docs

- [STRATEGY.md](STRATEGY.md) — positioning, IA, page anatomy
- [ARCHITECTURE.md](ARCHITECTURE.md) — stack, file tree, deploy, env, cost
- [DESIGN.md](DESIGN.md) — tokens, components, motion
- [docs/adr/](docs/adr/) — architecture decisions
- [docs/research/gemini-blueprint.md](docs/research/gemini-blueprint.md) — raw strategic research input

## Quick start

```bash
pnpm install
pnpm dev          # site on :3000
pnpm build
pnpm test
```

Requires: Node 20+, pnpm 9+, gcloud CLI, Firebase CLI.

## Layout

```
apps/
  web/            # Next.js corporate site + product portal
  api/            # FastAPI on Cloud Run — AI inference, RAG
packages/
  ui/             # shared React components (shadcn-based)
  config/         # ts/eslint/tailwind shared config
  genkit-flows/   # Vertex AI orchestration flows
infra/
  firebase/       # apphosting.yaml, firestore.rules, storage.rules
  terraform/      # GCP project, IAM, BigQuery, secrets
docs/
```

## Status

Pre-MVP. Strategy + architecture defined. Scaffold pending.
