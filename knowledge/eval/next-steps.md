# Eval — next steps

**Written:** 2026-07-22 (after the baseline run) · **Target session:** 2026-07-23
**Baseline:** [results/2026-07-22-baseline.md](./results/2026-07-22-baseline.md) — aesthetic mean 22.6/24, 5/5 Ship-quality, both gap-probes passed.

## Where we are

The baseline says the **knowledge and the generation contract work** (the agent reused components, chose the correct console-vs-PDF subsystem in all 5 builds, and reported gaps instead of inventing). The bottleneck is no longer the knowledge base — it's **component quality (sizing)** and **coverage (pagination, modal)**. So the work shifts from writing docs to hardening/extending components — but **every change is re-measured against the baseline**.

## Warm-up (30–45 min · low risk)

- **Export `DetailSheet`** from `packages/ui/src/index.ts` (the "Quick win" in `component-roadmap.md`). One re-export + confirm the barrel `.d.ts` regenerates (it derives from `index.ts` now). Unblocks reusing the Ficha for detail/login instead of composing by hand.

## Main focus — pick ONE (recommended: A)

### A) Harden sizing (Theme 1) — RECOMMENDED
The single change that lifts **3 of 5 prompts** (G1, G4, G5), low risk if you follow one rule: **do NOT un-calibrate the ÷2 display scale** (it's correct per fidelity — see anti-examples §6). Only add **layout constraints**:
- Sensible default `max-height`/`max-width` on `ChartCard` / `LineChartCard` (today they fill the viewport).
- Decide the **component-vs-composition boundary** for the ficha `MetricCard` row and the kanban `TaskCard` (own cap, or stays a documented consumer responsibility per anti-examples §7).
- `Asistente` fixed 774px is the biggest — defer to a second pass.
- **Close the loop:** re-run G1/G4/G5 in the harness, log `results/2026-07-23-sizing.md`, compare. Expect dims 5 (spacing) and 6 (composition) to rise.

### B) Coverage: `Pagination` + `DataTable` sort/paginate
Closes a real gap (G3). Bigger. Good opportunity to **pilot the spec-first flow** from the AI-native vision: write the spec/contract → implement → eval. One component, end to end.

### C) `Modal` / `Dialog`
The most important missing primitive (G6), but the most design work (focus trap, Esc, `aria-modal`). Do it after A or B validates the cycle — and build it accessible from day one (ties into the a11y track below).

## The discipline that makes this a *loop* (non-negotiable)

After any change: **re-run the affected golden-set prompts and log a new results file**, then compare to the baseline. Without it, the change is blind; with it, you have evidence it helped.

Re-pack the harness after changing the kit:
```bash
# in the kit repo:
pnpm build:ui && pnpm pack:ui
# in alejandria-harness:
rm -rf node_modules/@alejandria package-lock.json && npm install
```

## Recommended order for 2026-07-23

1. Warm-up: export `DetailSheet` (fast, measurable).
2. Focus **A (sizing)** — highest leverage, lowest risk, measurable same day.
3. Close the loop: `results/2026-07-23-sizing.md` vs. baseline.

Defer **B / C (new builds)** to when you want to debut the spec-first flow — that's where daily work connects to the AI-native architecture (contract → component → validation).

## Parallel track (radar, not for 2026-07-23)

The eval does not touch the accessibility findings from the original repo audit: `Switch` without `role="switch"`, "dialog" components without focus-trap/Esc, `AlertBanner` always `role="status"`, `SegmentedControl` prop-spread bug, fields' errors not in a live region, `DataTable` `<th>` without `scope`. These are a separate hardening track; a good time to tackle them is alongside building `Modal` (C) accessibly. Track them against the original audit, not the aesthetic eval score.

## Open decisions to make (not blockers)

- **Component vs composition for sizing** — does the kit ship max constraints, or is constraining a documented consumer responsibility? (Affects A.)
- **Spec-first pilot** — when building the first net-new component (Pagination/Modal), do we author a spec/contract first to pilot the AI-native generation flow, or build directly?
