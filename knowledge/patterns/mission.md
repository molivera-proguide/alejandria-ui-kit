---
id: mission
name: Mission
category: pattern
status: draft
storybook: Alejandria/Patterns/Mission
source: packages/ui/src/patterns/mission/Mission.stories.tsx
last_reviewed: 2026-07-14
---

# Mission

## Purpose

Focused live-operations panel for a single evacuation mission, shown as a PDF/reporting overlay on the operations map. Assembled from existing DS exports using PDF grey surfaces and pdf-skinned controls.

## Responsibilities

- Frame mission identity (type, running timer title, live indicator, close).
- Surface emergency context via `AlertBanner`.
- Show four operational percentage metrics with semantic tone.
- Present a horizontally scrollable live-imagery strip (pattern-local frames; no video export).
- Present a searchable AI log with coded, timestamped rows and optional operator choice pairs.
- Summarize mission status in the `Card` footer.

## Layout structure

Fullscreen map host + floating `Card` panel (right/bottom), composition:

1. **Map host** — ops-map-style backdrop (image, scan wash, hazard markers); pattern-local, not a kit export.
2. **Card header** — `eyebrow` = mission type; `title` = timed mission label; `actions` = live `Badge` + close control.
3. **Incident** — `AlertBanner` (`tone="danger"`).
4. **Metrics** — four `ProgressRing` (`size="sm"`) in a row.
5. **Imagery** — `.ds-scroll-area.ds-scroll-area--x` strip of labeled camera frames.
6. **AI log** — `TextField appearance="pdf"` + `.ds-scroll-area.ds-scroll-area--y` rows (`Badge` + text + timestamp; optional dual `Button variant="pdf"`).
7. **Footer** — mono summary line (mission · progress % · evacuated / total).

## Components involved

| Component | Role |
|-----------|------|
| `Card` | Overlay panel shell (header / body / footer); PDF skin via pattern CSS |
| `Badge` | Live chip; log entry codes |
| `AlertBanner` | Emergency incident context |
| `ProgressRing` | Operational % metrics with tone |
| `TextField` | Log search (`appearance="pdf"`) |
| `Button` | Log decision options (`sm` + `variant="pdf"`) |

Utility: `.ds-scroll-area` / `--x` / `--y` (native overflow chrome; see [Scrollbar.md](../components/Scrollbar.md)).

External: `lucide-react` (`AlertTriangle`, `Search`, `X`).

## Composition rules

- Context is **PDF / reporting** ([visual-grammar.md](../guidelines/visual-grammar.md) §1) — surfaces via `--ds-color-pdf-*`; decision buttons `variant="pdf"`; search `appearance="pdf"`.
- Prefer `Card` slots over reinventing header chrome; PDF panel paint is contextual CSS only (do not edit Card).
- Use `ProgressRing` for 0–100 progress with semantic tone — not `MetricCard` and not `DonutChartCard`.
- Scroll regions use `.ds-scroll-area` (not the decorative `Scrollbar` indicator, not unstyled native overflow).
- Do not mint a VideoFeed / AILog package component; keep frames and log rows as pattern-local markup (report-don't-invent).

## Responsive behavior

Panel max-width ~440px on desktop; full width inset on narrow viewports. Metrics collapse from 4 to 2 columns under 720px.

## When to use

- Live evacuation / incident mission focus over the ops map (PDF/reporting Misión screen).
- Operator needs metrics, live imagery skim, and AI log decisions in one overlay.

## When not to use

- Compact teal console mission summary (use [Mission Panel](./mission-panel.md)).
- Entity detail / ficha (use [Detail Sheet](./detail-sheet.md)).
- Full KPI strip without mission chrome (use [Metrics Row](./metrics-row.md)).

## Related patterns

- [Mission Panel](./mission-panel.md)
- [Operations Console](./operations-console.md)
- [Alert Stack](./alert-stack.md) / [Actionable Alert](./actionable-alert.md)

## Known limitations

- No dedicated PDF lamina registration; polished against the product Misión reference + PDF grammar.
- Camera frames are placeholders (no video/stream component in the kit).
- AI log is composed markup (no dedicated log list export).
- Timer is static mock content (no live clock).
- Close control is presentational (no dismiss state).
- Firefox scroll chrome: thin + color only (no pill) — constraint of `.ds-scroll-area`.
---
