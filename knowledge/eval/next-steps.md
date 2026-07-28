# Eval — next steps

**Written:** 2026-07-22 (baseline) · **Updated:** 2026-07-28 (Focus A closed)
**Baseline:** [results/2026-07-22-baseline.md](./results/2026-07-22-baseline.md) — aesthetic mean 22.6/24, 5/5 Ship-quality, both gap-probes passed.

## Status (2026-07-28): Focus A (sizing) closed

`DetailSheet` exported. `ChartCard`/ficha `MetricCard` hardened and **code-confirmed** against
two real Cursor generations (not just screenshots). `TaskCard`'s kanban column-sizing gap got a
defensive fix (a `style` prop can no longer silently override its calibrated `max-width` —
`anti-examples.md` §9) but the *underlying* gap — agents not sizing the grid column to the card,
per §7 — survived two consecutive real runs unresolved. **Decision: defer that one, it's still
Ship-quality (22/24).** Full log: [results/2026-07-28-sizing.md](./results/2026-07-28-sizing.md).

| Prompt | Baseline (07-22) | Final (07-28) | Δ |
|---|:-:|:-:|:-:|
| G1 Dashboard | 22/24 | 22/24 | 0 (kanban column-sizing gap survives, see above) |
| G4 Detail | 22/24 | **24/24** | +2, code-confirmed |
| G5 Assistant | 23/24 | 23/24 | 0 (`Asistente` 774px still deferred) |

**Loop lesson to carry forward:** judge from code, not screenshots alone, whenever a change could
be silently defeated by a local `style`/`className` override — a screenshot can look "fixed" for
the wrong reason (this is exactly how G1 v1 was mis-scored 23/24 before the code review caught it).

## Next focus: B) Pagination + DataTable sort/paginate

Chosen over C (Modal/Dialog) for this session. Closes a real, consumer-confirmed gap (G3: the
2026-07-22 baseline agent had to hand-build a page bar with `Button` because no `Pagination`
export exists, and `DataTable` is display-only). Also the intended venue to **pilot the spec-first
flow** from the AI-native vision — write the component's spec/contract before implementing it,
not after — since it's the next net-new component being built from scratch.

**Open decision before starting (not resolved yet):** spec-first (author
`knowledge/specs/components/Pagination.spec.md` + update `DataTable.spec.md` *before* writing any
component code) vs. build-first (implement, then backfill the spec like every prior component in
`component-roadmap.md` did). This is the first net-new component since the eval loop exists, so
it's a natural point to try the spec-first order and see if it changes anything about the build
quality or the eval score — but it's a real workflow change, not a default to assume silently.

### Scope, once started
- `Pagination`: new component. Needs at minimum: page indicator, prev/next, and probably
  page-size — check `golden-set.md` G3 and the baseline's coverage-gap note for what a "realistic"
  consumer actually reached for.
- `DataTable`: add sort (column header click → asc/desc) and paginate (wire to the new
  `Pagination`, or accept a controlled page/pageSize prop). Filter was already covered by
  `SegmentedControl` in G3 — don't duplicate that.
- Close the loop the same way as Focus A: re-run **G3** (and re-check G6 stays a clean gap-probe
  pass — a shipped `Pagination` might tempt a future agent to also assume `Modal` exists) against
  the repacked tarball, log `results/<date>-pagination.md` against the baseline, judge from code
  not just screenshots.

## Backlog (not this session)

- **C) Modal / Dialog** — the most important missing primitive (G6), but the most design work
  (focus trap, Esc, `aria-modal`). Natural pairing with the accessibility track below — build it
  accessible from day one rather than retrofitting.
- **`Asistente` 774px** — second sizing pass, deferred twice now.
- **Kanban `TaskCard` column-sizing gap** — revisit if a future run regresses below Ship-quality,
  or when doing general knowledge-format work. Leading candidate fix per this session's evidence:
  a concrete copy-pasteable composition example, not another prose Right/Wrong pair — two real
  agent runs didn't pick up §7 from prose alone.
- **Accessibility track (parallel, from the original repo audit)** — `Switch` without
  `role="switch"`; dialog-shaped components (incl. the future `Modal`) without focus-trap/Esc;
  `AlertBanner` always `role="status"`; `SegmentedControl` prop-spread bug; field errors not in a
  live region; `DataTable` `<th>` without `scope`. Track against the original audit, not the
  aesthetic eval score. Good time to fold in: alongside building `Modal` (C).
- **Ficha `MetricCard` label contrast** — spec-faithful but low-contrast on dark; a11y-vs-fidelity
  tension for design to weigh in on, not a generation defect.

## The discipline that makes this a *loop* (non-negotiable)

After any change: **re-run the affected golden-set prompts and log a new results file**, judged
from the generated **code**, not screenshots alone, then compare to the previous run. Without
this, the change is blind.

Re-pack after changing the kit:
```bash
# in the kit repo:
pnpm build:ui && pnpm pack:ui
# in alejandria-harness (PowerShell):
Remove-Item -Recurse -Force node_modules\@alejandria, package-lock.json
npm install
```
