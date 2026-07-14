---
id: distribution-readiness
name: Distribution & Portability Readiness Assessment
status: active
last_reviewed: 2026-07-14
note: >
  Can another repository / AI agent consume Alejandría to GENERATE its UI? This assesses
  external-consumption readiness (distinct from the knowledge-architecture roadmap, which is
  internal quality). Grounded in the repo state on 2026-07-14.
---

# Distribution & Portability Readiness

## Verdict
The **knowledge/generation layer is mature and validated** (M1–M6, five evals). External
**consumption is not ready.** The package is *close* for a human developer (buildable, exports
configured) but not published; and for an **AI agent in another repo** — the actual goal — the
**knowledge is repo-local with no consumption model**, which is the binding gap.

| Consumer | Maturity | Blocker |
|----------|:--------:|---------|
| Internal (this repo / `apps/web`) | ~3 / 4 | works |
| External human dev | ~2 / 4 | not published; icons/fonts; API `draft` |
| **External AI agent** (the goal) | ~1.5 / 4 | above **+** knowledge not portable **+** no agent consumption model |

## Readiness matrix (grounded 2026-07-14)

| Dimension | State | Evidence | Gap |
|-----------|:-----:|----------|-----|
| Package build | ✅ | `dist/` exists (`index.js`, `style.css`, types); `vite build` | — |
| Package publish | ❌ | no LICENSE / CHANGELOG / `publishConfig` / `.npmrc`; version `0.1.0`; `private:false` | not published to any registry; can't `npm install` |
| API completeness | ⚠️ | 19 components exported from `index.ts` | **icons NOT exported** (ModuleCard/InvestigationCard need them); patterns not exported |
| API stability | ❌ | all component docs `status: draft`; churned recently (variants, @2× calibration) | no `stable` contract, no semver, no changelog |
| Assets | ⚠️ | `styles.css` has a Google Fonts `@import` (network) | fonts fail offline / under CSP; icon set not distributed |
| Peer deps | ✅ | `peerDependencies: react >=18.2` | — |
| Knowledge portability | ❌ | 19 specs cite `packages/ui/src` **source** paths; `design-reference.pdf` is **35 MB**; `.cursor` rule is repo-local | knowledge assumes the monorepo layout; nothing travels to another repo |
| Agent consumption model | ❌ | none designed | undefined: how does an external agent load this knowledge into context (system prompt / MCP / shipped rules-file / retrieval)? |
| Consumer onboarding | ❌ | `README.md` stale (lists ~1 of 19 components) | no install guide, no usage examples for external consumers |
| Coverage | ⚠️ | 19 components + patterns | missing primitives evals hit: Modal shell, Menú/NavRail, pattern-lock, media/video, map host |

## Phased path to external consumption

### D1 — Publishable package (unblocks human-dev consumption)
- Add `LICENSE`, `CHANGELOG.md`, `publishConfig` (private registry / GitHub Packages), a real version + tag.
- **Export the Alejandría icon set** from `index.ts` (or a `/icons` subpath).
- **Fonts:** self-host (bundle) or document the network requirement; remove the hard `@import` dependency or make it opt-in.
- Verify: install the packed tarball in a scratch consumer app and render a component + `style.css`.

### D2 — API stability & contract
- Promote the core set `draft → stable`; adopt semver; keep a `CHANGELOG`.
- Rewrite `README.md`: install, the 19-component list + chart family, that icons ship separately, usage examples.

### D3 — Portable knowledge (the AI-agent track, part 1)
- Distribute the knowledge base with the release (or as a separate artifact) so an external repo has it.
- Rewrite spec/doc citations to reference the **published API** (component + prop), not `packages/ui/src` line numbers.
- Replace the 35 MB PDF dependency with the portable `pdf-text-extract.md` + a few rendered references.
- Make the entry point (`index.md`) + governance/reasoning docs work **outside** the monorepo (no `packages/ui/**` path assumptions).

### D4 — Agent consumption model (the AI-agent track, part 2) ← the decisive gap
- Decide HOW an external agent loads the knowledge into context: a shipped rules-file (Cursor/Claude), an MCP server over the knowledge, a curated system-prompt bundle, or retrieval over the docs.
- Ship a single "consume this design system" entrypoint for agents (which files to load, in what order, for which task).

### D5 — Coverage for real product screens
- Build the missing primitives the evals flagged (Modal, Menú/NavRail, pattern-lock, styled media/video placeholders, map host) so agents stop hitting report-don't-invent walls on real screens.

## Dependencies & sequencing
```
D1 (publish) ──▶ D2 (stabilize) ─┐
                                 ├─▶ external human-dev consumption
D3 (portable knowledge) ──▶ D4 (agent consumption model) ─▶ external AI-agent generation
D5 (coverage) — ongoing, raises fidelity for both
```
- D1 is the fastest unlock (the package is already built + configured; mostly publish plumbing + icons + fonts).
- **D4 is the decisive, un-started gap** for the project's actual goal (agents generating in another repo). D3 must precede it.
- D5 is continuous and lifts both consumer modes.

## Honest note
We invested heavily in generation *quality* (M1–M6) and almost nothing in *distribution/portability*
— they are different tracks, and this second one is barely begun. The good news: the hard part
(a validated generation brain) is done; what remains is packaging and a consumption model, which are
well-understood engineering, not open research.
