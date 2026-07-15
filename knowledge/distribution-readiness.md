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

---

## MVP — "coworker-AI" (D1 + D3-min + D4 + acceptance eval)

**Goal:** a coworker, in their OWN repo, `npm install`s the package AND their AI (Cursor/Claude)
follows the Alejandría knowledge to generate faithful components/screens — end-to-end, outside this
monorepo. This is the thinnest slice that delivers that loop. **D1 alone does NOT** — it ships the
runnable components; the "AI follows the instructions" part needs portable knowledge (D3) + a
consumption model (D4).

**Out of MVP (deferred):** full MCP server, bundled self-hosted fonts, `draft → stable` promotion,
and the D5 coverage build.

### Work items

**MVP-1 — Publishable package** (D1 core) — ✅ **done** (2026-07-15)
- `license: UNLICENSED`; no `publishConfig`; `files: ["dist"]`; exports `.` + `./style.css`.
- Icons exported (`export * from "./Icons"`, 34 URL consts, inlined as data-URIs in the bundle).
- Google-Fonts network requirement documented in README; `dist/src/index.d.ts` types-resolution bug fixed.
- Verified: `npm pack` → tarball (56 files, dist only, no `knowledge/`) → scratch Vite app renders a component + `style.css` + an icon.
- **Caveat:** the **tarball** path is verified; **git-install** (`npm i git+url`) needs `dist` committed or a `prepare: vite build` hook (deferred — tarball suffices for MVP).

**MVP-2 — Portable knowledge** (D3 minimal) — ✅ **done** (2026-07-15)
- **2a (portable citations):** agent-facing docs cite the **published API** (`import { X } from "@alejandria/ui-kit"`) instead of `packages/ui/src` paths — 19 component docs (Category `Export`→`Import` row), `index.md` (new "Consuming outside the monorepo" section), `visual-grammar`, `component-archetype` (+maintainers banner), `component-selection`, `decision-order`. Internal-fidelity marked, not rewritten: component-doc Implementation Notes, the `specs/**` numeric layer, and the `export:` frontmatter (mirrors the manifest — left as internal metadata).
- **2b (ship in tarball):** `knowledge/` lives at the repo root (outside `packages/ui/`), so npm `files` can't reference it directly. A `prepack` hook (`scripts/copy-knowledge.mjs`) copies it into `packages/ui/knowledge/` (excluding the 35 MB `design-reference.pdf`; `pdf-text-extract.md` ships), `files: ["dist","knowledge"]`, and the root `pack:ui` script cleans the transient copy after pack. `packages/ui/knowledge/` is gitignored.
- **Gotcha:** pnpm runs `postpack` **before** the tarball is fully written, so a `postpack` cleanup deletes the copy mid-pack (ENOENT, no tarball). Cleanup must be chained after pack (`pack:ui = pnpm … pack && node scripts/copy-knowledge.mjs --clean`), not a lifecycle hook.
- Verified: `pnpm pack:ui` → `alejandria-ui-kit-0.1.0.tgz` (~293 KB, 144 entries: 88 `knowledge/` + 55 `dist/`), `design-reference.pdf` absent, `pdf-text-extract.md` present, no leftover copy, clean `git status`.

**MVP-3 — Agent consumption model** (D4 minimal) — ✅ **done** (2026-07-15)
- Shipped a tool-agnostic **entrypoint template** `knowledge/consumer/AGENTS.template.md`: consumer
  frame ("you consume the package, don't modify the DS; make it look Alejandría"), the non-negotiable
  invariants (import from `@alejandria/ui-kit` + `style.css`; reuse; report-don't-invent; `--ds-*`
  tokens; icons as `<img>`), the installed knowledge path (`node_modules/@alejandria/ui-kit/knowledge/`
  + vendored fallback), and which docs to skip as internal (agent-playbook, PDF, `packages/ui/src`).
- **Pointer, not copy:** the template does NOT duplicate knowledge content — it routes the agent to
  `knowledge/index.md` and its resolution order (chose the "pure pointer" variant to avoid drift).
- **Setup guide** `knowledge/consumer/SETUP.md`: install → import `style.css` → copy the template to
  the repo root as `AGENTS.md` (+ optional Cursor `.cursor/rules` / Claude `CLAUDE.md` wiring) → vendor
  the knowledge for offline → ask for UI. README + `index.md` point to `knowledge/consumer/`.
- Both files live under `knowledge/consumer/`, so MVP-2b's prepack copy ships them automatically.
- Verified: `pnpm pack:ui` → tarball contains `knowledge/consumer/AGENTS.template.md` + `SETUP.md`.
- Format/path decisions: `AGENTS.md` canonical (Cursor/Claude wiring documented); node_modules path
  default with copy-to-repo fallback. (An `npx @alejandria/ui-kit init` copier is post-MVP.)

**MVP-4 — Consumer-repo acceptance eval** (the proof)
- In a FRESH scratch consumer repo (npm-installed package + shipped knowledge + rules file, NO
  monorepo), have a fresh agent generate a component/screen. Faithful output (reuses components,
  applies the grammar, reports gaps) = the coworker scenario works end-to-end.

### Sequencing
```
MVP-1 (package) ────────────┐
                            ├─▶ MVP-3 (consumption model) ─▶ MVP-4 (acceptance eval)
MVP-2 (portable knowledge) ─┘
```
MVP-1 and MVP-2 run in parallel; both feed MVP-3; MVP-4 validates the whole loop from a consumer repo.

### Definition of done
A coworker can, from their own repo, install `@alejandria/ui-kit`, point their AI at the shipped
knowledge via the rules file, and have it generate faithful Alejandría components/screens — proven
by the MVP-4 consumer-repo eval.
