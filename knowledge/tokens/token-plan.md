# Token Plan

Proposed token set for Alejandría, grounded in M1 inventory + [design-language.md](../guidelines/design-language.md).
**Documentation only** — nothing applied to CSS. Visual resolutions are **proposals awaiting sign-off**.

- Baseline: existing `--ds-*` at `styles.css:6–41` (names and values unchanged)
- Evidence: `knowledge/specs/tokens-inventory.md` (202 unique / 466 occurrences)
- Classification: `mechanical` = byte-identical render via `var()` alias; `visual-gated` = would change pixels; `keep-as-is` = no token (justified)

---

## 1. Taxonomy

Two-tier model (see [README.md](./README.md)):

1. **Primitives** hold measured literals.
2. **Semantic** aliases name roles; they reference primitives with `var()`.

Namespaces added beyond baseline: `--ds-space-*`, `--ds-size-*`, `--ds-border-width-*`, `--ds-font-weight-*`, `--ds-text-*`, `--ds-tracking-*`, `--ds-leading-*`, `--ds-duration-*`, `--ds-ease-*`, `--ds-color-pdf-*`, `--ds-color-white`, opacity helpers.

---

## 2. Baseline tokens (retain as-is)

All existing tokens remain. Reuse counts below are inventory literal counts for the token’s defined value (definition line). Widespread `var()` consumption is additional and already correct.

| Token | Value | Role (design-language) | Inventory count of value | Action |
|-------|-------|------------------------|-------------------------:|--------|
| `--ds-font-display` | `"Source Code Pro", monospace` | display family | (family string not hex-inventoried as color) | retain |
| `--ds-font-body` | `"Montserrat", sans-serif` | body family | — | retain |
| `--ds-font-mono` | `"Source Code Pro", monospace` | mono/label family | — | retain |
| `--ds-color-ink` | `#f4f7f5` | ink | 1 | retain |
| `--ds-color-ink-soft` | `#a9b3b0` | ink-soft (console) | 1 | retain |
| `--ds-color-ink-muted` | `#6f7977` | ink-muted | 1 | retain |
| `--ds-color-paper` | `#eef4f3` | paper | 1 | retain |
| `--ds-color-surface` | `#101315` | surface (console) | 1 | retain |
| `--ds-color-surface-strong` | `#171b1d` | surface-strong | 1 | retain |
| `--ds-color-surface-glass` | `rgb(16 19 21 / 0.82)` | surface-glass | 1 | retain |
| `--ds-color-line` | `rgb(226 239 234 / 0.18)` | line (console) | 1 | retain |
| `--ds-color-line-strong` | `rgb(226 239 234 / 0.34)` | line-strong | 1 | retain |
| `--ds-color-teal` | `#6ce0c7` | accent-brand | 1 | retain |
| `--ds-color-teal-dark` | `#1b8f7d` | accent-brand dark | 1 | retain |
| `--ds-color-teal-soft` | `rgb(108 224 199 / 0.13)` | accent-brand soft | 1 | retain |
| `--ds-color-coral` | `#ff5a52` | accent-coral | 1 | retain |
| `--ds-color-coral-soft` | `rgb(255 90 82 / 0.13)` | accent-coral soft | 1 | retain |
| `--ds-color-amber` | `#d7b24a` | accent-warning | 1 | retain |
| `--ds-color-amber-soft` | `rgb(215 178 74 / 0.14)` | accent-warning soft | 1 | retain |
| `--ds-color-blue` | `#62b8d7` | accent-info | 1 | retain |
| `--ds-color-blue-soft` | `rgb(98 184 215 / 0.13)` | accent-info soft | 1 | retain |
| `--ds-color-green` | `#85d66f` | accent-success | 1 | retain |
| `--ds-color-green-soft` | `rgb(133 214 111 / 0.13)` | accent-success soft | 1 | retain |
| `--ds-color-danger` | `#ff3d48` | accent-danger | 1 | retain |
| `--ds-color-danger-soft` | `rgb(255 61 72 / 0.13)` | accent-danger soft | 1 | retain |
| `--ds-shadow-sm` | (compound) | elevation sm | compound | retain |
| `--ds-shadow-md` | (compound) | elevation md | compound | retain |
| `--ds-radius-xs` | `2px` | radius xs | 1 | retain |
| `--ds-radius-sm` | `4px` | radius sm | 1 | retain |
| `--ds-radius-md` | `6px` | radius md | 1 | retain |
| `--ds-focus-ring` | `0 0 0 3px rgb(108 224 199 / 0.24)` | focus | compound | retain |

**Count retained baseline:** 31 tokens.

---

## 3. Proposed primitive tokens

### 3.1 PDF / reporting color primitives

Named separately from console colors so dual-palette evidence is preserved ([design-language.md](../guidelines/design-language.md) §1–2).

| Token | Value | Role | Inventory count | Why token (Rule 06) |
|-------|-------|------|----------------:|---------------------|
| `--ds-color-pdf-surface` | `#060606` | PDF dark surface | 1 | Semantic role across ModuleCard + selected-state docs; also channels `rgb(6 6 6 / 0.2)` |
| `--ds-color-pdf-surface-warm` | `#2a2927` | TaskCard surface | 1 | Role: PDF TARJETAS surface (TaskCard.spec.md) |
| `--ds-color-pdf-ink-muted` | `#8a8b87` | PDF muted ink / divider / chart label | **10** | High reuse; distinct from ink-soft |
| `--ds-color-pdf-line` | `#c1c1c1` | PDF line / title / accent neutral | **5** | High reuse; overloaded roles share one primitive |
| `--ds-color-pdf-line-light` | `#e6e6e6` | MetricCard border | 1 | Role: PDF MÉTRICAS border |
| `--ds-color-pdf-border` | `#606060` | Investigation border | 1 | Role: PDF TARJETAS p.2 border |
| `--ds-color-pdf-action` | `#494949` | Investigation primary action | 1 | Role: local PDF action (not global Button) |
| `--ds-color-pdf-action-hover` | `#5a5a5a` | Investigation action hover | 1 | Paired role with pdf-action |
| `--ds-color-pdf-critical` | `#ff0404` | Metric critical value | 1 | Role distinct until visual gate vs danger |
| `--ds-color-white` | `#ffffff` | on-accent / PDF primary text | **14** (+`#fff` 1) | High reuse solid white |
| `--ds-color-on-primary` | `#04110f` | Text on teal primary | 1 | Role: on-primary-dark |

### 3.2 Opacity / wash primitives (reuse ≥2 or shared channel ladder)

| Token | Value | Role | Count | Why |
|-------|-------|------|------:|-----|
| `--ds-color-white-a04` | `rgb(255 255 255 / 0.04)` | shadow inset channel | 1 | Part of `--ds-shadow-sm` compound; alias inside token def only |
| `--ds-color-white-a05` | `rgb(255 255 255 / 0.05)` | ghost fill / shadow inset | **3** | Reuse |
| `--ds-color-white-a06` | `rgb(255 255 255 / 0.06)` | ghost hover | **2** | Reuse |
| `--ds-color-white-a08` | `rgb(255 255 255 / 0.08)` | hairline / track / grid | **3** | Reuse |
| `--ds-color-white-a09` | `rgb(255 255 255 / 0.09)` | secondary hover / progress remainder | **2** | Reuse |
| `--ds-color-black-a20` | `rgb(0 0 0 / 0.2)` | footer dim | 1 | Role wash-black; pairs with a22/a24 |
| `--ds-color-black-a22` | `rgb(0 0 0 / 0.22)` | shadow + th bg | **3** | Reuse |
| `--ds-color-black-a24` | `rgb(0 0 0 / 0.24)` | segmented track | 1 | Role wash |
| `--ds-color-black-a34` | `rgb(0 0 0 / 0.34)` | field control fill | 1 | Role control fill |
| `--ds-color-black-a70` | `rgb(0 0 0 / 0.7)` | investigation surface | 1 | PDF surface alpha |
| `--ds-color-pdf-surface-a20` | `rgb(6 6 6 / 0.2)` | metric/chart card fill | **2** | Reuse |
| `--ds-color-ink-soft-a50` | `rgb(169 179 176 / 0.5)` | placeholder | 1 | Channel = ink-soft @ 50% (mechanical alias path) |
| `--ds-color-teal-a12` | `rgb(108 224 199 / 0.12)` | primary glow | 1 | Teal opacity ladder |
| `--ds-color-teal-a22` | `rgb(108 224 199 / 0.22)` | primary hover glow | 1 | Teal opacity ladder |
| `--ds-color-teal-a24` | `rgb(108 224 199 / 0.24)` | focus ring channel | 1 | Equals focus-ring inner |
| `--ds-color-teal-a74` | `rgb(108 224 199 / 0.74)` | primary border | 1 | Teal opacity ladder |
| `--ds-color-teal-a75` | `rgb(108 224 199 / 0.75)` | card accent bar | 1 | Teal opacity ladder |
| `--ds-color-blue-a42` | `rgb(98 184 215 / 0.42)` | badge info border | 1 | State border opacity |
| `--ds-color-green-a42` | `rgb(133 214 111 / 0.42)` | badge success border | 1 | State border opacity |
| `--ds-color-amber-a46` | `rgb(215 178 74 / 0.46)` | badge warning border | 1 | State border opacity |
| `--ds-color-danger-a22` | `rgb(255 61 72 / 0.22)` | danger glow | 1 | Danger opacity ladder |
| `--ds-color-danger-a50` | `rgb(255 61 72 / 0.5)` | badge danger border | 1 | Danger opacity ladder |
| `--ds-color-danger-a72` | `rgb(255 61 72 / 0.72)` | danger button border | 1 | Danger opacity ladder |
| `--ds-color-pdf-line-a35` | `rgb(193 193 193 / 0.35)` | module focus | 1 | PDF grey alpha |
| `--ds-color-pdf-line-a45` | `rgb(193 193 193 / 0.45)` | investigation focus | **2** | Reuse |
| `--ds-color-pdf-line-a60` | `rgb(193 193 193 / 0.6)` | chart border | 1 | PDF grey alpha |
| `--ds-color-shadow-16` | `rgb(17 25 28 / 0.16)` | shadow channel | **2** | Reuse in shadows |
| `--ds-color-shadow-28` | `rgb(17 25 28 / 0.28)` | shadow-md channel | 1 | Shadow compound |
| `--ds-color-switch-glow` | `rgb(8 127 115 / 0.12)` | switch checked glow | 1 | Component role |

**Note (Rule 06):** Single-use opacity steps are tokenized only because they encode a **named accent opacity ladder** or PDF grey alpha role repeatedly across the system language — not because every alpha deserves a token. Gradient-only paints stay keep-as-is (see §6).

### 3.3 Space primitives

| Token | Value | Role | Count | Why |
|-------|------:|------|------:|-----|
| `--ds-space-1` | `4px` | rhythm step 1 | 7 | Scale |
| `--ds-space-2` | `8px` | rhythm step 2 | 8 | Scale |
| `--ds-space-3` | `12px` | rhythm step 3 | 11 | Scale |
| `--ds-space-4` | `16px` | rhythm step 4 | 6 | Scale |
| `--ds-space-5` | `20px` | rhythm step 5 | 6 | Scale |
| `--ds-space-6` | `24px` | rhythm step 6 | 1 | Completes 4px lattice (semantic scale step) |

**Spacing vocabulary = `--ds-space-1..6` only.** No off-lattice `--ds-space-*` and no `--ds-space-Npx` (Rule 07: `N` means step index, never pixels).

Off-grid drift with reuse ≥2 (`5/7/10/11/14/15px`): **not tokenized** — **visual-gated normalization proposals** toward the nearest lattice step (see §5). Ties record both neighbors.

Sub-4px structural micros (`2px`, `3px`), negative transform offsets (`-1/-2/-18px`), and large one-offs (`25/50/72/90px`): **keep-as-is** (geometry / component-locked), see migration-map.

### 3.4 Size & border-width primitives (reuse ≥2)

| Token | Value | Role | Count | Why |
|-------|------:|------|------:|-----|
| `--ds-border-width-hair` | `0.75px` | PDF hairline | 5 | Reuse |
| `--ds-border-width-1` | `1px` | default border | 20 | Reuse |
| `--ds-border-width-accent` | `4px` | alert accent bar | 1 | Semantic role (left accent) |
| `--ds-size-icon-sm` | `15px` | segmented icon | 2 | Reuse |
| `--ds-size-icon-md` | `17px` | button/field icon | 4 | Reuse |
| `--ds-size-icon-lg` | `18px` | card/alert icon | 4 | Reuse |
| `--ds-size-icon-xl` | `20px` | utility/switch thumb | 6 | Reuse |
| `--ds-size-icon-50` | `50px` | investigation icon | 4 | Reuse / PDF set |
| `--ds-size-icon-180` | `180px` | module icon | 3 | Reuse / PDF set |
| `--ds-size-control-sm` | `32px` | button sm min-height | 2 | Reuse |
| `--ds-size-control-md` | `40px` | button/field control | 2 | Reuse |
| `--ds-size-control-input` | `38px` | input/select min-height | 4 | Reuse |
| `--ds-size-control-lg` | `48px` | button lg | 1 | Size scale step (paired sm/md) |
| `--ds-size-badge-h` | `24px` | badge min-height | 1 | Role chip height |
| `--ds-size-switch-track-w` | `52px` | switch track | 1 | Role |
| `--ds-size-switch-track-h` | `28px` | switch track | 1 | Role |
| `--ds-size-alert-icon` | `34px` | alert icon box | 3 | Reuse |
| `--ds-size-task-accent` | `38px` | task corner accent | 4 | Reuse |
| `--ds-size-progress-sm` | `78px` | progress sm | 1 | Size variant role |
| `--ds-size-progress-md` | `112px` | progress md | 1 | Size variant role |
| `--ds-size-progress-lg` | `148px` | progress lg | 1 | Size variant role |
| `--ds-size-chart-min-h` | `120px` | chart body / donut | 3 | Reuse |
| `--ds-size-metric-min-h` | `132px` | metric / donut layout | 2 | Reuse |
| `--ds-size-card-min-w` | `220px` | chart card | 1 | Role |
| `--ds-size-task-max-w` | `240px` | task default | 1 | Role |
| `--ds-size-module-min` | `260px` | module / switch min | 3 | Reuse |
| `--ds-size-tile-max-w` | `280px` | task kanban / investigation | 2 | Reuse |

Single-use chevron border triangles (`5px`/`6px` size category), spinner `2px` border, badge dot `7px`: mapped in migration-map (token or keep).

### 3.5 Radius / type / motion primitives

| Token | Value | Role | Count | Why |
|-------|-------|------|------:|-----|
| `--ds-radius-pill` | `999px` | pill / circle | 10 | High reuse |
| `--ds-font-weight-extralight` | `200` | extralight | 2 | Reuse |
| `--ds-font-weight-light` | `300` | light | 6 | Reuse |
| `--ds-font-weight-regular` | `400` | regular | 3 | Reuse |
| `--ds-font-weight-semibold` | `600` | semibold | 1 | Role: error emphasis |
| `--ds-font-weight-bold` | `700` | bold | 19 | High reuse |
| `--ds-tracking-none` | `0` | default tracking | 9 | Reuse |
| `--ds-tracking-tight` | `0.04em` | investigation title | 2 | Reuse |
| `--ds-tracking-label` | `0.08em` | chart SVG labels | 2 | Reuse |
| `--ds-tracking-title` | `0.1em` | module title | 2 | Reuse |
| `--ds-tracking-section` | `0.25em` | chart card title | 2 | Reuse |
| `--ds-tracking-metric` | `0.41em` | metric label (PDF 410) | 2 | Reuse / PDF |
| `--ds-leading-none` | `1` | solid leading | 3 | Reuse |
| `--ds-leading-tight` | `1.05` | titles | 3 | Reuse |
| `--ds-leading-snug` | `1.15` | compact | 3 | Reuse |
| `--ds-leading-normal` | `1.2` | default | 9 | Reuse |
| `--ds-leading-label` | `1.25` | labels | 5 | Reuse |
| `--ds-leading-relaxed` | `1.35` | hints/meta | 3 | Reuse |
| `--ds-leading-body` | `1.45` | descriptions | 2 | Reuse |
| `--ds-text-badge` | `0.68rem` | badge/th | 2 | Reuse |
| `--ds-text-label` | `0.7rem` | field/caption | 2 | Reuse |
| `--ds-text-control` | `0.84rem` | input/select | 2 | Reuse |
| `--ds-text-button-sm` | `0.78rem` | button sm / switch | 2 | Reuse |
| `--ds-text-body-sm` | `0.92rem` | alert desc / td | 2 | Reuse |
| `--ds-text-chart` | `0.9rem` | chart title/footer | 2 | Reuse |
| `--ds-text-display-sm` | `1.35rem` | card title / donut secondary | 2 | Reuse |
| `--ds-duration-fast` | `160ms` | default interactive | 13 | Scale |
| `--ds-duration-md` | `180ms` | module hover | 3 | Scale |
| `--ds-duration-spin` | `800ms` | spinner | 1 | Role |
| `--ds-ease-standard` | `ease` | default easing | 6 | Scale |
| `--ds-ease-linear` | `linear` | spinner | 1 | Role |

Single-use rem/pt sizes and exotic leadings (`0.2`, `0.9`, `0.95`): **keep-as-is** unless listed above.

**Removed value-indexed type tokens:** `--ds-text-pdf-13/14/16/18` are not scale tokens. Inventory `13/14/16/18px` type sizes are either **visual-gated** toward a role rem token (when a role fits) or **keep-as-is** (when no role fits) — see §5. Never reintroduce px-indexed `--ds-text-pdf-*` names.

---

## 4. Semantic aliases (optional thin layer)

These do not introduce new literals; they alias primitives for role clarity. M2b may add them after primitives land.

| Semantic token | Alias of | Role |
|----------------|----------|------|
| `--ds-color-text-primary` | `--ds-color-ink` | console primary text |
| `--ds-color-text-secondary` | `--ds-color-ink-soft` | console secondary text |
| `--ds-color-text-pdf-muted` | `--ds-color-pdf-ink-muted` | PDF muted text |
| `--ds-color-border-console` | `--ds-color-line` | console border |
| `--ds-color-border-pdf` | `--ds-color-pdf-line` | PDF border |
| `--ds-color-bg-console` | `--ds-color-surface` | console canvas |
| `--ds-color-bg-pdf` | `--ds-color-pdf-surface` | PDF canvas |
| `--ds-color-state-danger` | `--ds-color-danger` | danger state |
| `--ds-color-state-critical` | `--ds-color-pdf-critical` | critical KPI (until visual gate) |

---

## 5. Duplication / palette / drift resolutions

### 5.1 Color (unchanged V1–V5)

| ID | Candidate | Proposal | Class | Impact |
|----|-----------|----------|-------|--------|
| V1 | `#ff0404` vs `--ds-color-danger` `#ff3d48` | Option A: keep `--ds-color-pdf-critical`. Option B (gated): repoint critical → danger | **visual-gated** | MetricCard critical value hue shifts |
| V2 | `#8a8b87` vs `--ds-color-ink-soft` `#a9b3b0` | Keep `--ds-color-pdf-ink-muted`; do not merge | **visual-gated** if merged | 10 label sites shift |
| V3 | `#c1c1c1` vs `--ds-color-line` | Keep `--ds-color-pdf-line`; do not merge | **visual-gated** if merged | Borders/titles shift |
| V4 | `#060606` / `#2a2927` vs `--ds-color-surface` | Keep PDF surface primitives | **visual-gated** if merged | Module/Task/Metric fills shift |
| V5 | `#82f3d8` vs `--ds-color-teal` | Keep as button gradient stop (`keep-as-is` until sign-off) | **visual-gated** if replaced by teal | Primary button gradient changes |

### 5.2 Spacing drift → gated lattice normalization

No drift tokens. Human picks at sign-off; M2b must not apply until then.

| ID | Value | Count | Proposed target(s) | Rationale |
|----|------:|------:|--------------------|-----------|
| S1 | `5px` | 3 | `--ds-space-1` (`4px`) | Nearest lattice step (dense micro gaps → space-1) |
| S2 | `7px` | 3 | `--ds-space-2` (`8px`) | Nearest lattice step (badge/segmented gaps → space-2) |
| S3 | `10px` | 9 | `--ds-space-3` (`12px`) **or** `--ds-space-2` (`8px`) | **Tie** mid-point; density-intent: Metric/Chart/Task dense padding often reads as space-3; record both |
| S4 | `11px` | 5 | `--ds-space-3` (`12px`) | Nearest lattice step (control padding / metric gap) |
| S5 | `14px` | 6 | `--ds-space-4` (`16px`) **or** `--ds-space-3` (`12px`) | **Tie** mid-point; alert/table padding density — record both |
| S6 | `15px` | 4 | `--ds-space-4` (`16px`) | Nearest lattice step (PDF card padding-y) |

### 5.3 Type value-indexed sizes → gated role mapping or keep

| ID | Value | Count | Proposed target(s) | Class | Rationale |
|----|------:|------:|--------------------|-------|-----------|
| T1 | `13px` | 2 | `--ds-text-label` (`0.7rem`) | **visual-gated** | Kanban dense mono; nearest role rem (rendered size may change) |
| T2 | `14px` | 2 | `--ds-text-label` (`0.7rem`) **or** `--ds-text-control` (`0.84rem`) | **visual-gated** | PDF identifier; prefer label; alt control — human picks |
| T3 | `16px` | 6 | `--ds-text-body-sm` (`0.92rem`) **or** `--ds-text-chart` (`0.9rem`) | **visual-gated** | PDF body pair; prefer body-sm; tie-ish rem neighbors |
| T4 | `18px` | 2 | — | **keep-as-is** | No rem role within a small jump (body-sm too small; display-sm `1.35rem` too large); component-locked |

### 5.4 Mechanical (byte-identical)

| ID | Candidate | Proposal | Class | Impact |
|----|-----------|----------|-------|--------|
| M1 | `#fff` → `--ds-color-white` | Alias identical white | **mechanical** | none |
| M2 | Soft token channel literals → existing soft tokens | `var(--ds-color-*-soft)` | **mechanical** | none |
| M3 | `rgb(169 179 176 / 0.5)` → `--ds-color-ink-soft-a50` | identical bytes | **mechanical** | none |
| M4 | On-lattice spacing / shared rem type / radius literals → `--ds-space-1..6`, role `--ds-text-*`, `--ds-radius-*` | identical values only | **mechanical** | none |
| M5 | `999px` → `--ds-radius-pill` | identical | **mechanical** | none |

**Default plan for M2b:** execute **mechanical** rows only; leave **visual-gated** color (V1–V5), spacing (S1–S6), and type (T1–T3) unresolved until human sign-off. Do not mint drift tokens as a workaround.

---

## 6. Single-use paints kept without tokens

Gradient stops and unique glows without shared role beyond one control:

`#9affdf`, `#24a893`, `#bd1f2a`, `#d92733`, `#ff696f`, `#ff8084`, and one-off shadow blur lengths used only inside unique `box-shadow` declarations that are not sm/md/focus.

**Reason:** Rule 06 — no reusable problem; migrating them would inflate the system without semantic gain. Listed as `keep-as-is` in migration-map.

---

## 7. Counts (plan summary)

| Bucket | BEFORE (M2a initial) | AFTER (this revision) |
|--------|---------------------:|----------------------:|
| Baseline retained | 31 | 31 |
| New color primitives | ~40 | ~40 |
| New space | 14 (incl. drift / `Npx`) | **6** (`space-1..6` only) |
| New size / border-width | ~28 | ~28 |
| New radius / type / motion | ~35 (incl. 4 `--ds-text-pdf-*`) | **~31** (pdf type tokens removed) |
| Semantic aliases (optional) | 9 | 9 |
| **Proposed new primitives (excl. aliases)** | **~117** | **~105** |
| **Approx. total named tokens (baseline + new + aliases)** | **~168** | **~156** |
| Visual-gated proposals | 5 (color V1–V5) | **5 color + 6 spacing + 3 type** (T4 keep-as-is) |

Removed from vocabulary this revision: `--ds-space-10/11/14/15`, `--ds-space-2px/3px/5px/7`, `--ds-text-pdf-13/14/16/18` (**12** tokens).

Exact per-value disposition: [migration-map.md](./migration-map.md).
