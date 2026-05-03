# ADR-0002: pnpm + Turborepo monorepo

- **Status:** Accepted
- **Date:** 2026-05-03

## Context

Multiple deployable apps planned: corporate site, FastAPI service, future spinout product UIs. Need shared design system + types + Genkit flows. Want fast CI with caching.

## Options

1. **pnpm + Turborepo** — proven, low ceremony, remote caching via Vercel free tier or self-host.
2. **Nx** — heavier, opinionated, more features than needed for v1.
3. **Bun workspaces** — fast, but Bun runtime not yet first-class on App Hosting / Cloud Build.
4. **Polyrepo** — duplication of design tokens + schemas; rejected.

## Decision

**pnpm 9 workspaces + Turborepo 2.x.** Self-host remote cache later if needed; local cache sufficient for now.

## Consequences

Positive:
- `packages/ui`, `packages/schemas`, `packages/genkit-flows` shared cleanly
- Turbo task pipelines parallelize lint/test/build
- pnpm strict by default (no phantom deps)

Negative:
- Python `apps/api` outside JS workspace; managed via uv + separate Cloud Build
- Some IDE plugins (e.g. older ESLint) wobble on pnpm — handle via `.npmrc public-hoist-pattern`
