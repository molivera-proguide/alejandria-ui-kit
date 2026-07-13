# Alejandría Design Language

Evidence-grounded intent taxonomy for tokenization (Milestone 2a).
This document describes **what the measured values mean**, not how to build new components (Milestone 5).

- Status: interpretive synthesis over M1 measurements
- Evidence sources: `knowledge/specs/tokens-inventory.md`, `knowledge/specs/components/*.spec.md`, existing `--ds-*` in `packages/ui/src/styles.css:6–41`
- Citation discipline mirrors `knowledge/specs/SCHEMA.md`
- Claims are labeled **[observation]** (counted/cited fact) or **[interpretation]** (role/meaning inferred from usage)

---

## 1. Dual visual systems (context)

**[observation]** The inventory and component specs show two coexisting palettes:

| System | Typical surfaces / text / lines | Specs citing usage |
|--------|----------------------------------|--------------------|
| Console / brand (tokenized) | `--ds-color-surface` `#101315`, `--ds-color-ink` `#f4f7f5`, `--ds-color-line` `rgb(226 239 234 / 0.18)`, teal accents | Button, Badge, Card, AlertBanner, fields, Switch, SegmentedControl, DataTable, ProgressRing |
| PDF reporting / cards (mostly raw) | `#060606`, `#2a2927`, `#8a8b87`, `#c1c1c1`, `#e6e6e6`, `#ffffff`, `#ff0404` | MetricCard, ModuleCard, TaskCard, ChartCard, InvestigationCard, chart SVG labels |

**[interpretation]** These are not accidental typos of one palette; they encode two product contexts (interactive console chrome vs PDF-faithful reporting tiles). Tokenization must name both systems rather than silently merging them.

---

## 2. Color roles

### 2.1 Role catalog

| Role | Intent (interpretation) | Current value(s) serving role | Occurrences (inventory) | Notes |
|------|-------------------------|-------------------------------|-------------------------|-------|
| **ink** | Primary readable text on dark UI | `#f4f7f5` → `--ds-color-ink` | 1 (token def) + widespread `var()` use | Tokenized |
| **ink-soft** | Secondary / supporting text | `#a9b3b0` → `--ds-color-ink-soft` **and** `#8a8b87` (PDF muted) | ink-soft def 1; `#8a8b87` **10** | **Duplication:** two muted greys |
| **ink-muted** | Tertiary / hint text | `#6f7977` → `--ds-color-ink-muted` | 1 | Tokenized |
| **paper** | Light paper (unused in most component CSS) | `#eef4f3` → `--ds-color-paper` | 1 | Tokenized; low component reuse in inventory |
| **surface** | Primary dark canvas | `#101315` → `--ds-color-surface` **and** `#060606`, `#2a2927` | surface 1; `#060606` 1; `#2a2927` 1 | **Duplication:** three “dark surface” hexes |
| **surface-strong** | Elevated dark panel | `#171b1d` | 1 | Tokenized |
| **surface-glass** | Translucent panel fill | `rgb(16 19 21 / 0.82)` | 1 | Tokenized |
| **line** | Hairline border (console) | `rgb(226 239 234 / 0.18)` → `--ds-color-line` **and** `#c1c1c1` / `rgb(193 193 193 / …)` (PDF grey) | line 1; `#c1c1c1` **5**; rgb grey alphas 4 | **Duplication + overload:** PDF grey is both border and label |
| **line-strong** | Emphasized border | `rgb(226 239 234 / 0.34)` | 1 | Tokenized |
| **accent-brand (teal)** | Primary interactive accent | `#6ce0c7` + soft/dark + opacity ladder | teal family + soft opacities | Tokenized core; many opacity one-offs |
| **accent-info (blue)** | Info / default progress | `#62b8d7` + soft + border opacity | blue family | Tokenized |
| **accent-success (green)** | Success | `#85d66f` + soft + border opacity | green family | Tokenized |
| **accent-warning (amber)** | Warning | `#d7b24a` + soft + border opacity | amber family | Tokenized |
| **accent-danger** | Destructive / danger | `#ff3d48` → `--ds-color-danger` **and** `#ff0404` (metric critical) | danger 1; `#ff0404` 1 | **Duplication:** critical vs danger |
| **accent-coral** | Secondary warm accent | `#ff5a52` + soft | coral family | Tokenized; lower reuse than danger |
| **on-accent / pure white** | Text/icon on filled controls & PDF values | `#ffffff` (14), `#fff` (1) | **15** | Untokenized; high reuse |
| **wash-white** | Soft overlay / ghost fill | `rgb(255 255 255 / 0.035…0.09)` | multiple (see inventory) | Opacity ladder, not one role |
| **wash-black** | Dimmer panel / control fill | `rgb(0 0 0 / 0.2…0.7)`, `rgb(6 6 6 / 0.2)` | multiple | PDF + console glass variants |
| **pdf-action** | Investigation primary button fill | `#494949` (+ hover `#5a5a5a`) | 1+1 | Spec: local PDF styles, not global Button |
| **pdf-border-mid** | Investigation card border | `#606060` | 1 | PDF-only |
| **pdf-metric-border** | MetricCard border | `#e6e6e6` | 1 | PDF MÉTRICAS |
| **on-primary-dark** | Text on teal primary button | `#04110f` | 1 | Button primary |
| **gradient stops** | Button primary/danger/hover paints | `#82f3d8`, `#9affdf`, `#24a893`, `#ff696f`, `#bd1f2a`, … | mostly 1 each | Component paint, not shared roles |

### 2.2 Duplication (two values → one role)

**[observation]** Inventory §Duplication candidates:

| Role | Competing values | Counts | Risk if unified |
|------|------------------|-------:|-----------------|
| muted label/text | `#8a8b87` vs `--ds-color-ink-soft` `#a9b3b0` | 10 vs token | **visual** (hue/chroma differ) |
| dark surface | `#060606` / `#2a2927` vs `--ds-color-surface` `#101315` | 1+1 vs token | **visual** |
| line / border grey | `#c1c1c1` vs `--ds-color-line` translucent teal-grey | 5 vs token | **visual** |
| danger / critical | `#ff0404` vs `--ds-color-danger` `#ff3d48` | 1 vs 1 | **visual** (MetricCard.spec.md) |
| teal paint | `#82f3d8` vs `--ds-color-teal` `#6ce0c7` | 1 vs 1 | **visual** (gradient stop) |

### 2.3 Overload (one value → multiple roles)

**[observation + interpretation]**

| Value | Roles observed | Evidence |
|-------|----------------|----------|
| `#c1c1c1` | Module/Task border; Module title; Task neutral accent; Investigation metric label | ModuleCard, TaskCard, InvestigationCard specs |
| `#8a8b87` | Metric/Module/Task muted text; chart labels; donut track; Module divider | MetricCard, TaskCard, ChartCard, chart specs |
| `#ffffff` | Danger button text; metric value/change; hover borders; task code/status; investigation title/actions; chart footer | Multiple specs |
| `rgb(255 255 255 / 0.05)` | Badge neutral bg; secondary button; shadow inset channel | Badge, Button, shadow token def |

**[interpretation]** Overload is acceptable when the role is a shared primitive (e.g. “solid white”), but `#c1c1c1` should become a named PDF grey primitive with semantic aliases (`line` vs `label`) rather than being forced into console `--ds-color-line`.

---

## 3. Spacing rhythm

### 3.1 Observed interval

**[observation]** Positive spacing unique values (inventory Spacing): `-1/-2/-18`, then `2,3,4,5,7,8,10,11,12,14,15,16,20,24,25,50,72,90`. Highest reuse: `12px` (11), `10px` (9), `8px` (8), `4px` (7), `16px`/`14px`/`20px` (6).

**[interpretation]** The densest compatible lattice is **4px**. Values `4 / 8 / 12 / 16 / 20 / 24` sit on that lattice. That lattice is the proposed **rhythm**, not a claim that off-grid values are mistakes.

### 3.2 Proposed step scale (interpretation; values unchanged)

| Step | Value | On-grid? | Inventory count |
|------|------:|:--------:|----------------:|
| space-1 | 4px | yes | 7 |
| space-2 | 8px | yes | 8 |
| space-3 | 12px | yes | 11 |
| space-4 | 16px | yes | 6 |
| space-5 | 20px | yes | 6 |
| space-6 | 24px | yes | 1 (spacing) |

### 3.3 Drift candidates (do not silently normalize)

**[observation]** Off-grid spacing with reuse:

| Value | Count | Example usage (specs/CSS) | Classification |
|------:|------:|---------------------------|----------------|
| 10px | 9 | Metric/Chart padding & gaps; Task kanban padding | High-reuse drift → gated normalization proposal (nearest lattice step; tie 8/12) |
| 11px | 5 | Button sm padding-x; field icon/input; Metric gap | Drift (also MetricCard.doc «gap: 11px») → gated normalization proposal (nearest lattice step) |
| 14px | 6 | Alert padding; Switch gap; table cell padding | Near-grid (±2 from 12/16) → gated normalization proposal (nearest lattice step; tie 12/16) |
| 15px | 4 | Button md padding-x; Task/Investigation padding | PDF card padding pattern → gated normalization proposal (nearest lattice step) |
| 5px | 3 | Task kanban gap; meta gap; action padding-y | Micro drift → gated normalization proposal (nearest lattice step) |
| 7px | 3 | Badge/segmented gaps; card eyebrow margin | Micro drift → gated normalization proposal (nearest lattice step) |
| 3px | 2 | Switch copy gap / track padding | Micro (<4px) → keep-as-is (geometry, not rhythm) |
| 2px | 2 | Task meta / donut stat gaps | Micro (<4px) → keep-as-is (geometry, not rhythm) |
| 25px / 50px / 72px / 90px | 1 each | Module padding; utilities reserve; donut offset | Component-specific → keep-as-is |
| -1px / -2px / -18px | transform offsets | Button/Module hover; Task accent | Motion/geometry, not layout rhythm → keep-as-is |

---

## 4. Type roles

### 4.1 Families

**[observation]** Already tokenized:

| Token | Value | Role |
|-------|-------|------|
| `--ds-font-display` | Source Code Pro | Display / titles (also equals mono) |
| `--ds-font-mono` | Source Code Pro | Labels, badges, field text, codes |
| `--ds-font-body` | Montserrat | Body, metrics, descriptions |

**[interpretation]** Display and mono share a face but differ by role (title hierarchy vs data/label). Keep both names (Rule 07).

### 4.2 Weight roles

**[observation]** Numeric weights in inventory: `200` (2), `300` (6), `400` (3), `600` (1), `700` (19).

**[interpretation]**

| Weight | Role | Intentional? |
|-------:|------|--------------|
| 700 | Primary emphasis (buttons, labels, titles, values) | Yes — dominant |
| 400 | Regular mono titles / codes | Yes |
| 300 | Light body (PDF descriptions, module labels) | Yes — PDF light |
| 200 | Extralight references / metric labels | Yes — sparse |
| 600 | Error text only | Borderline single-role |

### 4.3 Size combinations

**[observation]** Two measurement dialects:

1. **rem UI ladder** (console): `0.62–2.15rem` — many unique steps, several count=1.
2. **px/pt PDF ladder** (cards/charts): `8px` labels, `12–24px` card type, `10–14pt` investigation, `84px` metric value.

**[interpretation]** Intentional steps (reuse ≥2 or named in PDF-aligned specs):

| Combo | Evidence | Role |
|-------|----------|------|
| mono 0.68rem / 700 / uppercase | Badge, table th | Chip / column label |
| mono 0.7rem / 700 / uppercase | Field label, caption | Form / table caption |
| mono 0.84rem | Field input/select | Control value |
| body 16px / 300 or 700 | Module metrics, Task title/desc | PDF body pair |
| mono 14px / 400 | Task code/meta | PDF identifier |
| display tracking 0.25em / 0.41em | Chart title; Metric label | Section tracking |

**[observation]** Drift / sparse sizes (count 1): many rem steps (`0.62`, `0.66`, `0.72`, `0.74`, `0.86`, `0.88`, `1.05`, `1.18`, `1.72`, `1.75`, `2.15`, `84px`, pt sizes). Treat as component-locked unless promoted later.

### 4.4 Tracking & leading

**[observation]** Letter-spacing: `0` (9), `0.04em`, `0.08em`, `0.1em`, `0.25em`, `0.41em`. Line-height: dense set around `1–1.45`, plus extreme `0.2` (Task code/status — layout hack).

**[interpretation]** `0.41em` matches MetricCard.doc «interlettering PDF 410». `0.2` leading is not a type scale step; it is TaskCard packing geometry (keep-as-is / component-specific).

---

## 5. Radius, elevation, motion

### 5.1 Radius

**[observation]** Tokenized `2 / 4 / 6px` (`--ds-radius-xs|sm|md`). Untokenized `999px` (10) for pills (spinner, badge dot, progress, switch).

**[interpretation]** Four intents: xs card chrome, sm controls, md alerts/tables, pill for circular UI. Add `--ds-radius-pill` only.

### 5.2 Elevation / focus

**[observation]** `--ds-shadow-sm`, `--ds-shadow-md`, `--ds-focus-ring` exist. Additional glows (`0 0 18px`, `26px`, Module `16px 42px`, Switch thumb, Badge dot `12px`) are mostly count 1–2.

**[interpretation]** Keep sm/md/focus as the elevation language; treat accent glows as component paint unless reuse grows.

### 5.3 Motion

**[observation]** `160ms` (13), `180ms` (3), `800ms` (1); easing `ease` (6), `linear` (1).

**[interpretation]** Default interactive duration is 160ms ease; 180ms is ModuleCard hover; 800ms linear is spinner. Three duration tokens suffice; do not invent intermediate times.

---

## 6. Implications for the token plan

1. **Preserve** all existing `--ds-*` names and values as the console baseline.
2. **Name the PDF palette** as its own primitive family (`--ds-color-pdf-*` or equivalent) instead of merging into console tokens without sign-off.
3. **Introduce scales** for space (4px lattice only: `--ds-space-1..6`; gated normalization proposals for off-grid drift (10/11/14/15); no drift tokens), weight, common tracking/leading, duration/ease, and pill radius.
4. **Gate** any proposal that changes `#8a8b87`, `#c1c1c1`, `#060606`/`#2a2927`, `#ff0404`, or `#82f3d8` toward console tokens — those are **visual** resolutions.
5. **Keep small** (Rule 06): prefer reuse ≥2 or clear semantic role; single-use geometry/paint stays `keep-as-is` with reason.
