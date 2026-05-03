# ADR-0003: Genkit + Vertex AI for orchestration

- **Status:** Accepted
- **Date:** 2026-05-03

## Context

Need RAG, tool use, agent loops, structured output, traces, evals. Want model-agnostic surface to swap Gemini variants and OpenAI/Anthropic if business demands.

## Options

1. **Genkit (TS) + Vertex AI** — Google-built, first-class Gemini, plugins for OpenAI/Anthropic, traces in Firebase console.
2. **LangChain JS** — large ecosystem, churny APIs, heavier, weaker tracing.
3. **LlamaIndex TS** — strong RAG primitives, weaker agent + tool model.
4. **Roll our own** — viable for v1 (the surface is small), but loses traces and eval harness for free.

## Decision

**Genkit for flows in TS (`packages/genkit-flows`), called from Next.js server actions and FastAPI via HTTP.** Vertex AI as primary provider; pluggable.

## Consequences

Positive:
- Built-in trace/log integration with Firebase
- Eval harness (`genkit eval`) supports CI quality gates
- Type-safe Zod-backed flow inputs/outputs
- Model swap via Remote Config keys without redeploy

Negative:
- Genkit pre-1.0 API churn risk; pin minor versions, monitor changelog weekly
- TS-only flow runtime — Python `apps/api` calls flows over HTTP, not in-process
