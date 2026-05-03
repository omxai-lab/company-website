# ADR-0004: Vector store — BigQuery vector first

- **Status:** Accepted (provisional, revisit at 1M+ vectors)
- **Date:** 2026-05-03

## Context

RAG corpora per project. Need similarity search at low latency, low ops, with audit trail and joinable to business data.

## Options

1. **BigQuery vector search (`VECTOR_SEARCH` + `CREATE VECTOR INDEX`)** — same warehouse as analytics, SQL-joinable, no extra service, ~100ms p50 at <1M vectors.
2. **Vertex AI Vector Search (Matching Engine)** — purpose-built ANN, sub-50ms, scales to billions, but per-index minimum hourly cost (~$0.40/h ≈ $290/mo) regardless of usage.
3. **pgvector on Cloud SQL** — flexible, but adds Postgres ops surface and cost.
4. **Firestore + manual cosine** — no, won't scale beyond toy.

## Decision

**BigQuery vector** for v1. Single index per `corpus_id`. Embeddings via Vertex AI `text-embedding-005`.

Migrate to **Vertex AI Vector Search** when:
- Any single corpus exceeds 1M vectors, OR
- p95 query latency exceeds 300ms, OR
- Concurrent QPS exceeds BigQuery slot capacity at flat-rate

## Consequences

Positive:
- Zero idle cost; pay per query
- Joinable with usage + analytics tables in same warehouse
- Trivial backfill / re-embedding via SQL

Negative:
- ANN quality and latency lower than purpose-built service
- Index rebuild after large deletes (handle via tombstones + nightly compact)
