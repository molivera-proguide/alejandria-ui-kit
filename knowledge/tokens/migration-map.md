# Migration Map (M2b work-order)

Mechanical work-order for applying [token-plan.md](./token-plan.md) to `packages/ui/src/styles.css`.
**Do not execute in M2a.** Coverage: 100% of unique values in `knowledge/specs/tokens-inventory.md`.

## Legend

| Class | Meaning |
|-------|---------|
| `mechanical` | Replace literal with `var(--ds-*)` (or define token with **identical** value). Render unchanged. |
| `visual-gated` | Proposal would change pixels (palette merge **or** drift→lattice / px→role normalize); **requires human sign-off**. M2b must not apply. |
| `keep-as-is` | Leave literal; justified (Rule 06 / geometry / single-use paint). |

## Visual-gated proposals (do not apply in M2b without sign-off)

### Color (unchanged)

| ID | From | To (proposal) | Status |
|----|------|---------------|--------|
| V1 | `#ff0404` / `--ds-color-pdf-critical` | `--ds-color-danger` (`#ff3d48`) | awaiting sign-off |
| V2 | `#8a8b87` / `--ds-color-pdf-ink-muted` | `--ds-color-ink-soft` (`#a9b3b0`) | awaiting sign-off |
| V3 | `#c1c1c1` / `--ds-color-pdf-line` | `--ds-color-line` | awaiting sign-off |
| V4 | `#060606` / `#2a2927` | `--ds-color-surface` (`#101315`) | awaiting sign-off |
| V5 | `#82f3d8` | `--ds-color-teal` (`#6ce0c7`) | awaiting sign-off |

### Spacing drift → lattice normalization

| ID | From | To (proposal) | Status |
|----|------|---------------|--------|
| S1 | `5px` (count 3) | `--ds-space-1` (`4px`) | awaiting sign-off |
| S2 | `7px` (count 3) | `--ds-space-2` (`8px`) | awaiting sign-off |
| S3 | `10px` (count 9) | `--ds-space-3` (`12px`) **or** `--ds-space-2` (`8px`) — tie | awaiting sign-off |
| S4 | `11px` (count 5) | `--ds-space-3` (`12px`) | awaiting sign-off |
| S5 | `14px` (count 6) | `--ds-space-4` (`16px`) **or** `--ds-space-3` (`12px`) — tie | awaiting sign-off |
| S6 | `15px` (count 4) | `--ds-space-4` (`16px`) | awaiting sign-off |

### Type value-indexed sizes → role rem (or keep)

| ID | From | To (proposal) | Status |
|----|------|---------------|--------|
| T1 | `13px` (count 2) | `--ds-text-label` (`0.7rem`) | awaiting sign-off |
| T2 | `14px` (count 2) | `--ds-text-label` (`0.7rem`) **or** `--ds-text-control` (`0.84rem`) | awaiting sign-off |
| T3 | `16px` (count 6) | `--ds-text-body-sm` (`0.92rem`) **or** `--ds-text-chart` (`0.9rem`) | awaiting sign-off |
| T4 | `18px` (count 2) | keep-as-is (no close rem role) | not gated |

Default M2b path: mechanical aliases + PDF color primitives with **current** byte values; leave V1–V5, S1–S6, T1–T3 unmerged/unnormalized. Do **not** mint drift tokens.

**M2b execution status:** `mechanical` rows **applied** to `packages/ui/src/styles.css` (token defs + literal→`var()` swaps). `visual-gated` (V1–V5, S1–S6, T1–T3) and `keep-as-is` (incl. T4) left untouched — dispositions and values unchanged.

---

## Color

| Value | Count | styles.css lines | Proposed token | Class | Reason |
|-------|------:|------------------|----------------|-------|--------|
| `#1b8f7d` | 1 | styles.css:22 | `--ds-color-teal-dark` | mechanical | Already token definition / use existing token |
| `#2a2927` | 1 | styles.css:586 | `--ds-color-pdf-surface-warm` | mechanical | New PDF primitive; value unchanged (V4 merge gated separately) |
| `#5a5a5a` | 1 | styles.css:867 | `--ds-color-pdf-action-hover` | mechanical | Paired hover for pdf-action |
| `#6ce0c7` | 1 | styles.css:21 | `--ds-color-teal` | mechanical | Already token definition / use existing token |
| `#6f7977` | 1 | styles.css:14 | `--ds-color-ink-muted` | mechanical | Already token definition / use existing token |
| `#8a8b87` | 10 | styles.css:458, styles.css:547, styles.css:565, styles.css:668, styles.css:679, styles.css:688, styles.css:1252, styles.css:1289, styles.css:1297, styles.css:1338 | `--ds-color-pdf-ink-muted` | mechanical | New PDF primitive; value unchanged (V2 merge gated separately) |
| `#9affdf` | 1 | styles.css:121 | `keep-as-is` | keep-as-is | Single-use button gradient stop; Rule 06 — no shared role |
| `#24a893` | 1 | styles.css:121 | `keep-as-is` | keep-as-is | Single-use button gradient stop; Rule 06 — no shared role |
| `#62b8d7` | 1 | styles.css:28 | `--ds-color-blue` | mechanical | Already token definition / use existing token |
| `#82f3d8` | 1 | styles.css:114 | `keep-as-is` | visual-gated | V5: primary gradient stop vs --ds-color-teal; keep literal until sign-off |
| `#85d66f` | 1 | styles.css:30 | `--ds-color-green` | mechanical | Already token definition / use existing token |
| `#171b1d` | 1 | styles.css:17 | `--ds-color-surface-strong` | mechanical | Already token definition / use existing token |
| `#04110f` | 1 | styles.css:117 | `--ds-color-on-primary` | mechanical | On-primary text role |
| `#060606` | 1 | styles.css:489 | `--ds-color-pdf-surface` | mechanical | New PDF primitive; value unchanged (V4 merge gated separately) |
| `#101315` | 1 | styles.css:16 | `--ds-color-surface` | mechanical | Already token definition / use existing token |
| `#494949` | 1 | styles.css:862 | `--ds-color-pdf-action` | mechanical | New PDF action primitive |
| `#606060` | 1 | styles.css:726 | `--ds-color-pdf-border` | mechanical | New PDF investigation border primitive |
| `#a9b3b0` | 1 | styles.css:13 | `--ds-color-ink-soft` | mechanical | Already token definition / use existing token |
| `#bd1f2a` | 1 | styles.css:147 | `keep-as-is` | keep-as-is | Single-use button gradient stop; Rule 06 — no shared role |
| `#c1c1c1` | 5 | styles.css:490, styles.css:535, styles.css:587, styles.css:626, styles.css:824 | `--ds-color-pdf-line` | mechanical | New PDF primitive; value unchanged (V3 merge gated separately) |
| `#d7b24a` | 1 | styles.css:26 | `--ds-color-amber` | mechanical | Already token definition / use existing token |
| `#d92733` | 1 | styles.css:153 | `keep-as-is` | keep-as-is | Single-use button gradient stop; Rule 06 — no shared role |
| `#e6e6e6` | 1 | styles.css:447 | `--ds-color-pdf-line-light` | mechanical | New PDF metric border primitive |
| `#eef4f3` | 1 | styles.css:15 | `--ds-color-paper` | mechanical | Already token definition / use existing token |
| `#f4f7f5` | 1 | styles.css:12 | `--ds-color-ink` | mechanical | Already token definition / use existing token |
| `#ff3d48` | 1 | styles.css:32 | `--ds-color-danger` | mechanical | Already token definition / use existing token |
| `#ff5a52` | 1 | styles.css:24 | `--ds-color-coral` | mechanical | Already token definition / use existing token |
| `#ff0404` | 1 | styles.css:477 | `--ds-color-pdf-critical` | mechanical | New critical primitive; value unchanged (V1 merge gated separately) |
| `#ff696f` | 1 | styles.css:147 | `keep-as-is` | keep-as-is | Single-use button gradient stop; Rule 06 — no shared role |
| `#ff8084` | 1 | styles.css:153 | `keep-as-is` | keep-as-is | Single-use button gradient stop; Rule 06 — no shared role |
| `#fff` | 1 | styles.css:1330 | `--ds-color-white` | mechanical | Alias of #ffffff |
| `#ffffff` | 14 | styles.css:149, styles.css:468, styles.css:481, styles.css:504, styles.css:575, styles.css:590, styles.css:646, styles.css:657, styles.css:729, styles.css:791, styles.css:814, styles.css:863, styles.css:872, styles.css:1272 | `--ds-color-white` | mechanical | High-reuse solid white |
| `rgb(0 0 0 / 0.2)` | 1 | styles.css:341 | `--ds-color-black-a20` | mechanical | Black wash primitive |
| `rgb(0 0 0 / 0.7)` | 1 | styles.css:725 | `--ds-color-black-a70` | mechanical | Investigation surface alpha |
| `rgb(0 0 0 / 0.22)` | 3 | styles.css:35, styles.css:505, styles.css:1216 | `--ds-color-black-a22` | mechanical | Black wash primitive (count 3) |
| `rgb(0 0 0 / 0.24)` | 1 | styles.css:1131 | `--ds-color-black-a24` | mechanical | Black wash primitive |
| `rgb(0 0 0 / 0.34)` | 1 | styles.css:378 | `--ds-color-black-a34` | mechanical | Field control fill role |
| `rgb(6 6 6 / 0.2)` | 2 | styles.css:446, styles.css:1241 | `--ds-color-pdf-surface-a20` | mechanical | PDF surface alpha (count 2) |
| `rgb(8 127 115 / 0.12)` | 1 | styles.css:1119 | `--ds-color-switch-glow` | mechanical | Switch checked glow role |
| `rgb(16 19 21 / 0.82)` | 1 | styles.css:18 | `--ds-color-surface-glass` | mechanical | Already token definition / use existing token |
| `rgb(17 25 28 / 0.16)` | 2 | styles.css:35, styles.css:1110 | `--ds-color-shadow-16` | mechanical | Shadow channel (count 2) |
| `rgb(17 25 28 / 0.28)` | 1 | styles.css:36 | `--ds-color-shadow-28` | mechanical | Shadow-md channel |
| `rgb(98 184 215 / 0.13)` | 1 | styles.css:29 | `--ds-color-blue-soft` | mechanical | Already token definition / use existing token |
| `rgb(98 184 215 / 0.42)` | 1 | styles.css:218 | `--ds-color-blue-a42` | mechanical | Badge info border opacity |
| `rgb(108 224 199 / 0.12)` | 1 | styles.css:116 | `--ds-color-teal-a12` | mechanical | Teal opacity ladder |
| `rgb(108 224 199 / 0.13)` | 1 | styles.css:23 | `--ds-color-teal-soft` | mechanical | Already token definition / use existing token |
| `rgb(108 224 199 / 0.22)` | 1 | styles.css:122 | `--ds-color-teal-a22` | mechanical | Teal opacity ladder |
| `rgb(108 224 199 / 0.24)` | 1 | styles.css:40 | `--ds-color-teal-a24` | mechanical | Focus-ring channel; also in --ds-focus-ring |
| `rgb(108 224 199 / 0.74)` | 1 | styles.css:115 | `--ds-color-teal-a74` | mechanical | Teal opacity ladder |
| `rgb(108 224 199 / 0.75)` | 1 | styles.css:269 | `--ds-color-teal-a75` | mechanical | Teal opacity ladder |
| `rgb(133 214 111 / 0.13)` | 1 | styles.css:31 | `--ds-color-green-soft` | mechanical | Already token definition / use existing token |
| `rgb(133 214 111 / 0.42)` | 1 | styles.css:228 | `--ds-color-green-a42` | mechanical | Badge success border opacity |
| `rgb(169 179 176 / 0.5)` | 1 | styles.css:421 | `--ds-color-ink-soft-a50` | mechanical | ink-soft channels at 50% opacity |
| `rgb(193 193 193 / 0.6)` | 1 | styles.css:1242 | `--ds-color-pdf-line-a60` | mechanical | PDF grey alpha |
| `rgb(193 193 193 / 0.35)` | 1 | styles.css:511 | `--ds-color-pdf-line-a35` | mechanical | PDF grey alpha |
| `rgb(193 193 193 / 0.45)` | 2 | styles.css:764, styles.css:852 | `--ds-color-pdf-line-a45` | mechanical | PDF grey alpha (count 2) |
| `rgb(215 178 74 / 0.14)` | 1 | styles.css:27 | `--ds-color-amber-soft` | mechanical | Already token definition / use existing token |
| `rgb(215 178 74 / 0.46)` | 1 | styles.css:238 | `--ds-color-amber-a46` | mechanical | Badge warning border opacity |
| `rgb(226 239 234 / 0.18)` | 1 | styles.css:19 | `--ds-color-line` | mechanical | Already token definition / use existing token |
| `rgb(226 239 234 / 0.34)` | 1 | styles.css:20 | `--ds-color-line-strong` | mechanical | Already token definition / use existing token |
| `rgb(255 61 72 / 0.5)` | 1 | styles.css:248 | `--ds-color-danger-a50` | mechanical | Danger opacity ladder |
| `rgb(255 61 72 / 0.13)` | 1 | styles.css:33 | `--ds-color-danger-soft` | mechanical | Already token definition / use existing token |
| `rgb(255 61 72 / 0.22)` | 1 | styles.css:154 | `--ds-color-danger-a22` | mechanical | Danger opacity ladder |
| `rgb(255 61 72 / 0.72)` | 1 | styles.css:148 | `--ds-color-danger-a72` | mechanical | Danger opacity ladder |
| `rgb(255 90 82 / 0.13)` | 1 | styles.css:25 | `--ds-color-coral-soft` | mechanical | Already token definition / use existing token |
| `rgb(255 255 255 / 0.04)` | 1 | styles.css:35 | `--ds-color-white-a04` | mechanical | Wash primitive |
| `rgb(255 255 255 / 0.05)` | 3 | styles.css:36, styles.css:126, styles.css:207 | `--ds-color-white-a05` | mechanical | Wash primitive (count 3) |
| `rgb(255 255 255 / 0.06)` | 2 | styles.css:142, styles.css:876 | `--ds-color-white-a06` | mechanical | Wash primitive (count 2) |
| `rgb(255 255 255 / 0.08)` | 3 | styles.css:897, styles.css:1093, styles.css:1361 | `--ds-color-white-a08` | mechanical | Wash primitive (count 3) |
| `rgb(255 255 255 / 0.09)` | 2 | styles.css:132, styles.css:886 | `--ds-color-white-a09` | mechanical | Wash primitive (count 2) |
| `rgb(255 255 255 / 0.035)` | 1 | styles.css:258 | `keep-as-is` | keep-as-is | Single-use card gradient wash; no shared role beyond Card |
| `rgb(255 255 255 / 0.045)` | 1 | styles.css:988 | `keep-as-is` | keep-as-is | Single-use alert gradient wash; no shared role beyond AlertBanner |

## Spacing

| Value | Count | styles.css lines | Proposed token | Class | Reason |
|-------|------:|------------------|----------------|-------|--------|
| `-1px` | 1 | styles.css:76 | `keep-as-is` | keep-as-is | Transform hover offset (Button); geometry, not layout rhythm |
| `-2px` | 1 | styles.css:506 | `keep-as-is` | keep-as-is | Transform hover offset (ModuleCard); geometry, not layout rhythm |
| `-18px` | 2 | styles.css:602, styles.css:603 | `keep-as-is` | keep-as-is | Task accent positioning; component geometry |
| `2px` | 2 | styles.css:720, styles.css:1325 | `keep-as-is` | keep-as-is | Sub-4px structural micro-gap; not rhythm — do not tokenize |
| `3px` | 2 | styles.css:1067, styles.css:1098 | `keep-as-is` | keep-as-is | Sub-4px structural micro; not rhythm — do not tokenize |
| `4px` | 7 | styles.css:693, styles.css:810, styles.css:836, styles.css:950, styles.css:1032, styles.css:1136, styles.css:1137 | `--ds-space-1` | mechanical | 4px rhythm scale |
| `5px` | 3 | styles.css:615, styles.css:700, styles.css:846 | normalize → `--ds-space-1` (`4px`) | visual-gated | S1: nearest lattice step; awaiting sign-off |
| `7px` | 3 | styles.css:190, styles.css:299, styles.css:1151 | normalize → `--ds-space-2` (`8px`) | visual-gated | S2: nearest lattice step; awaiting sign-off |
| `8px` | 8 | styles.css:58, styles.css:194, styles.css:318, styles.css:327, styles.css:352, styles.css:531, styles.css:744, styles.css:900 | `--ds-space-2` | mechanical | 4px rhythm scale |
| `10px` | 9 | styles.css:453, styles.css:554, styles.css:611, styles.css:617, styles.css:733, styles.css:747, styles.css:835, styles.css:1246, styles.css:1248 | normalize → `--ds-space-3` (`12px`) or `--ds-space-2` (`8px`) | visual-gated | S3: tie mid-point; density-intent — human picks |
| `11px` | 5 | styles.css:94, styles.css:399, styles.css:416, styles.css:451, styles.css:968 | normalize → `--ds-space-3` (`12px`) | visual-gated | S4: nearest lattice step; awaiting sign-off |
| `12px` | 11 | styles.css:344, styles.css:346, styles.css:359, styles.css:731, styles.css:803, styles.css:980, styles.css:996, styles.css:1153, styles.css:1201, styles.css:1209, styles.css:1266 | `--ds-space-3` | mechanical | 4px rhythm scale |
| `14px` | 6 | styles.css:272, styles.css:275, styles.css:998, styles.css:1060, styles.css:1201, styles.css:1209 | normalize → `--ds-space-4` (`16px`) or `--ds-space-3` (`12px`) | visual-gated | S5: tie mid-point; density-intent — human picks |
| `15px` | 4 | styles.css:100, styles.css:611, styles.css:733, styles.css:748 | normalize → `--ds-space-4` (`16px`) | visual-gated | S6: nearest lattice step; awaiting sign-off |
| `16px` | 6 | styles.css:283, styles.css:285, styles.css:336, styles.css:346, styles.css:609, styles.css:803 | `--ds-space-4` | mechanical | 4px rhythm scale |
| `20px` | 6 | styles.css:106, styles.css:495, styles.css:498, styles.css:674, styles.css:846 | `--ds-space-5` | mechanical | 4px rhythm scale |
| `24px` | 1 | styles.css:1123 | `--ds-space-6` | mechanical | 4px rhythm scale step |
| `25px` | 1 | styles.css:498 | `keep-as-is` | keep-as-is | ModuleCard padding-bottom only; component-specific |
| `50px` | 1 | styles.css:498 | `keep-as-is` | keep-as-is | ModuleCard padding-top only; component-specific |
| `72px` | 1 | styles.css:739 | `keep-as-is` | keep-as-is | Investigation utilities padding-right reserve; component-specific |
| `90px` | 1 | styles.css:1316 | `keep-as-is` | keep-as-is | Donut chart left offset; component-specific |

## Size

| Value | Count | styles.css lines | Proposed token | Class | Reason |
|-------|------:|------------------|----------------|-------|--------|
| `0.75px` | 5 | styles.css:447, styles.css:490, styles.css:547, styles.css:587, styles.css:726 | `--ds-border-width-hair` | mechanical | PDF hairline border width |
| `1px` | 20 | styles.css:52, styles.css:184, styles.css:260, styles.css:271, styles.css:281, styles.css:342, styles.css:379, styles.css:887, styles.css:897, styles.css:990, styles.css:1016, styles.css:1085, styles.css:1089, styles.css:1094, styles.css:1108, styles.css:1132, styles.css:1143, styles.css:1182, styles.css:1208, styles.css:1242 | `--ds-border-width-1` | mechanical | Default border width |
| `2px` | 1 | styles.css:175 | `keep-as-is` | keep-as-is | Spinner border width only; single-use paint geometry |
| `4px` | 1 | styles.css:991 | `--ds-border-width-accent` | mechanical | Alert left accent width role |
| `5px` | 2 | styles.css:977, styles.css:978 | `keep-as-is` | keep-as-is | Select chevron triangle borders; component-specific geometry |
| `6px` | 1 | styles.css:979 | `keep-as-is` | keep-as-is | Select chevron triangle borders; component-specific geometry |
| `7px` | 2 | styles.css:202, styles.css:203 | `keep-as-is` | keep-as-is | Badge dot size only; prefer keep unless promoting --ds-size-badge-dot |
| `15px` | 2 | styles.css:1171, styles.css:1172 | `--ds-size-icon-sm` | mechanical | Segmented icon size |
| `16px` | 2 | styles.css:178, styles.css:179 | `--ds-size-spinner` | mechanical | Button spinner 16×16; named size role |
| `17px` | 4 | styles.css:159, styles.css:160, styles.css:398, styles.css:400 | `--ds-size-icon-md` | mechanical | Button/field icon size |
| `18px` | 4 | styles.css:331, styles.css:332, styles.css:1026, styles.css:1027 | `--ds-size-icon-lg` | mechanical | Card/alert icon size |
| `20px` | 6 | styles.css:757, styles.css:760, styles.css:770, styles.css:772, styles.css:1111, styles.css:1113 | `--ds-size-icon-xl` | mechanical | Utility/switch thumb size |
| `24px` | 1 | styles.css:193 | `--ds-size-badge-h` | mechanical | Badge min-height role |
| `28px` | 1 | styles.css:1097 | `--ds-size-switch-track-h` | mechanical | Switch track height role |
| `32px` | 2 | styles.css:93, styles.css:581 | `--ds-size-control-sm` | mechanical | Control height sm |
| `34px` | 3 | styles.css:1020, styles.css:1022, styles.css:1152 | `--ds-size-alert-icon` | mechanical | Alert icon box / segmented min-height shared 34px |
| `38px` | 4 | styles.css:414, styles.css:600, styles.css:605, styles.css:966 | `--ds-size-control-input / --ds-size-task-accent` | mechanical | Shared 38px measure: input min-height and task accent box (two semantic tokens, same value) |
| `40px` | 2 | styles.css:99, styles.css:383 | `--ds-size-control-md` | mechanical | Control height md |
| `48px` | 1 | styles.css:105 | `--ds-size-control-lg` | mechanical | Button lg height scale step |
| `50px` | 4 | styles.css:778, styles.css:779, styles.css:785, styles.css:787 | `--ds-size-icon-50` | mechanical | Investigation icon set |
| `52px` | 1 | styles.css:1103 | `--ds-size-switch-track-w` | mechanical | Switch track width role |
| `78px` | 1 | styles.css:905 | `--ds-size-progress-sm` | mechanical | Progress size variant |
| `112px` | 1 | styles.css:909 | `--ds-size-progress-md` | mechanical | Progress size variant |
| `120px` | 3 | styles.css:1268, styles.css:1317, styles.css:1320 | `--ds-size-chart-min-h` | mechanical | Chart/donut dimension |
| `132px` | 2 | styles.css:452, styles.css:1308 | `--ds-size-metric-min-h` | mechanical | Metric/donut min-height |
| `148px` | 1 | styles.css:913 | `--ds-size-progress-lg` | mechanical | Progress size variant |
| `180px` | 3 | styles.css:518, styles.css:524, styles.css:526 | `--ds-size-icon-180` | mechanical | Module icon set |
| `220px` | 1 | styles.css:1247 | `--ds-size-card-min-w` | mechanical | Chart card min-width role |
| `240px` | 1 | styles.css:610 | `--ds-size-task-max-w` | mechanical | Task default max-width role |
| `260px` | 3 | styles.css:496, styles.css:497, styles.css:1062 | `--ds-size-module-min` | mechanical | Module/switch min dimension |
| `280px` | 2 | styles.css:616, styles.css:732 | `--ds-size-tile-max-w` | mechanical | Kanban/investigation max-width |

## Radius

| Value | Count | styles.css lines | Proposed token | Class | Reason |
|-------|------:|------------------|----------------|-------|--------|
| `2px` | 1 | styles.css:37 | `--ds-radius-xs` | mechanical | Existing radius token |
| `4px` | 1 | styles.css:38 | `--ds-radius-sm` | mechanical | Existing radius token |
| `6px` | 1 | styles.css:39 | `--ds-radius-md` | mechanical | Existing radius token |
| `999px` | 10 | styles.css:177, styles.css:200, styles.css:888, styles.css:1095, styles.css:1109 | `--ds-radius-pill` | mechanical | New pill radius (count 10) |

## Typography

| Value | Count | styles.css lines | Proposed token | Class | Reason |
|-------|------:|------------------|----------------|-------|--------|
| `0` | 9 | styles.css:60, styles.css:191, styles.css:297, styles.css:307, styles.css:472, styles.css:651, styles.css:662, styles.css:672, styles.css:694 | `--ds-tracking-none` | mechanical | Default tracking |
| `0.1em` | 2 | styles.css:540 | `--ds-tracking-title` | mechanical | Tracking scale |
| `0.2 (unitless)` | 2 | styles.css:652, styles.css:663 | `keep-as-is` | keep-as-is | TaskCard packing hack; not a type-scale step |
| `0.04em` | 2 | styles.css:795 | `--ds-tracking-tight` | mechanical | Tracking scale |
| `0.7rem` | 2 | styles.css:366, styles.css:1199 | `--ds-text-label` | mechanical | Shared rem size (count 2) |
| `0.08em` | 2 | styles.css:1292 | `--ds-tracking-label` | mechanical | Tracking scale |
| `0.9 (unitless)` | 1 | styles.css:933 | `keep-as-is` | keep-as-is | Single-use ProgressRing value leading |
| `0.9rem` | 2 | styles.css:1254, styles.css:1274 | `--ds-text-chart` | mechanical | Shared rem size (count 2) |
| `0.25em` | 2 | styles.css:1256 | `--ds-tracking-section` | mechanical | Tracking scale |
| `0.41em` | 2 | styles.css:462 | `--ds-tracking-metric` | mechanical | PDF metric tracking |
| `0.62rem` | 1 | styles.css:948 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `0.66rem` | 1 | styles.css:295 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `0.68rem` | 2 | styles.css:188, styles.css:1219 | `--ds-text-badge` | mechanical | Shared rem size (count 2) |
| `0.72rem` | 1 | styles.css:427 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `0.74rem` | 1 | styles.css:1149 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `0.75rem` | 1 | styles.css:1340 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `0.78rem` | 2 | styles.css:92, styles.css:1073 | `--ds-text-button-sm` | mechanical | Shared rem size (count 2) |
| `0.84rem` | 2 | styles.css:413, styles.css:965 | `--ds-text-control` | mechanical | Shared rem size (count 2) |
| `0.86rem` | 1 | styles.css:1080 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `0.88rem` | 1 | styles.css:98 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `0.92rem` | 2 | styles.css:1045, styles.css:1225 | `--ds-text-body-sm` | mechanical | Shared rem size (count 2) |
| `0.95 (unitless)` | 1 | styles.css:473 | `keep-as-is` | keep-as-is | Single-use MetricCard value leading |
| `0.95rem` | 1 | styles.css:316 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `1 (unitless)` | 3 | styles.css:61, styles.css:192, styles.css:845 | `--ds-leading-none` | mechanical | Leading scale |
| `1.2 (unitless)` | 9 | styles.css:298, styles.css:368, styles.css:485, styles.css:541, styles.css:570, styles.css:580, styles.css:673, styles.css:796, styles.css:829 | `--ds-leading-normal` | mechanical | Leading scale |
| `1.3 (unitless)` | 1 | styles.css:1081 | `keep-as-is` | keep-as-is | Single-use Switch description leading |
| `1.05 (unitless)` | 3 | styles.css:308, styles.css:1039, styles.css:1334 | `--ds-leading-tight` | mechanical | Leading scale |
| `1.05rem` | 1 | styles.css:1038 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `1.15 (unitless)` | 3 | styles.css:705, styles.css:715, styles.css:819 | `--ds-leading-snug` | mechanical | Leading scale |
| `1.18rem` | 1 | styles.css:938 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `1.25 (unitless)` | 5 | styles.css:463, styles.css:710, styles.css:721, styles.css:1257, styles.css:1342 | `--ds-leading-label` | mechanical | Leading scale |
| `1.35 (unitless)` | 3 | styles.css:428, styles.css:695, styles.css:1046 | `--ds-leading-relaxed` | mechanical | Leading scale |
| `1.35rem` | 2 | styles.css:305, styles.css:1357 | `--ds-text-display-sm` | mechanical | Shared rem size (count 2) |
| `1.45 (unitless)` | 2 | styles.css:317, styles.css:683 | `--ds-leading-body` | mechanical | Leading scale |
| `1.72rem` | 1 | styles.css:931 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `1.75rem` | 1 | styles.css:1332 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `1rem` | 1 | styles.css:104 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `2.15rem` | 1 | styles.css:942 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `8px` | 1 | styles.css:1291 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `10pt` | 1 | styles.css:827 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `11pt` | 1 | styles.css:843 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `12px` | 1 | styles.css:460 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `13pt` | 1 | styles.css:793 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `13px` | 2 | styles.css:709, styles.css:719 | normalize → `--ds-text-label` (`0.7rem`) | visual-gated | T1: kanban dense mono → role rem; rendered size may change |
| `14pt` | 1 | styles.css:817 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `14px` | 2 | styles.css:649, styles.css:691 | normalize → `--ds-text-label` (`0.7rem`) or `--ds-text-control` (`0.84rem`) | visual-gated | T2: PDF identifier; prefer label; alt control |
| `16px` | 6 | styles.css:483, styles.css:568, styles.css:578, styles.css:670, styles.css:681, styles.css:714 | normalize → `--ds-text-body-sm` (`0.92rem`) or `--ds-text-chart` (`0.9rem`) | visual-gated | T3: PDF body pair; prefer body-sm |
| `18px` | 2 | styles.css:660, styles.css:704 | `keep-as-is` | keep-as-is | T4: no rem role within a small jump; component-locked PDF status/title |
| `24px` | 1 | styles.css:538 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `84px` | 1 | styles.css:470 | `keep-as-is` | keep-as-is | Single-use or sparse typography step; Rule 06 — retain literal until reuse grows (see design-language §4.3) |
| `200` | 2 | styles.css:484, styles.css:828 | `--ds-font-weight-extralight` | mechanical | Weight scale |
| `300` | 6 | styles.css:569, styles.css:671, styles.css:682, styles.css:794, styles.css:1275, styles.css:1341 | `--ds-font-weight-light` | mechanical | Weight scale |
| `400` | 3 | styles.css:539, styles.css:650, styles.css:692 | `--ds-font-weight-regular` | mechanical | Weight scale |
| `600` | 1 | styles.css:438 | `--ds-font-weight-semibold` | mechanical | Weight scale (error) |
| `700` | 19 | styles.css:57, styles.css:189, styles.css:296, styles.css:306, styles.css:367, styles.css:461, styles.css:471, styles.css:579, styles.css:661, styles.css:818, styles.css:844, styles.css:932, styles.css:949, styles.css:1074, styles.css:1150, styles.css:1200, styles.css:1220, styles.css:1255, styles.css:1333 | `--ds-font-weight-bold` | mechanical | Weight scale |

## Shadow

| Value | Count | styles.css lines | Proposed token | Class | Reason |
|-------|------:|------------------|----------------|-------|--------|
| `1px` | 3 | styles.css:35, styles.css:36 | `--ds-shadow-sm (compound)` | mechanical | Shadow length atom; migrate only via full compound token, not standalone |
| `2px` | 3 | styles.css:35, styles.css:764, styles.css:852 | `--ds-shadow-sm (compound)` | mechanical | Shadow length atom; migrate only via full compound token, not standalone |
| `3px` | 4 | styles.css:40, styles.css:511, styles.css:1110, styles.css:1119 | `--ds-focus-ring / local glows` | keep-as-is | 3px appears in focus-ring and unique glows; use --ds-focus-ring where applicable, else keep component glow |
| `8px` | 1 | styles.css:1110 | `keep-as-is` | keep-as-is | Unique glow/blur length inside a one-off box-shadow; Rule 06 |
| `12px` | 1 | styles.css:201 | `keep-as-is` | keep-as-is | Unique glow/blur length inside a one-off box-shadow; Rule 06 |
| `14px` | 1 | styles.css:35 | `--ds-shadow-sm (compound)` | mechanical | Shadow length atom; migrate only via full compound token, not standalone |
| `16px` | 1 | styles.css:505 | `keep-as-is` | keep-as-is | Unique glow/blur length inside a one-off box-shadow; Rule 06 |
| `18px` | 1 | styles.css:116 | `keep-as-is` | keep-as-is | Unique glow/blur length inside a one-off box-shadow; Rule 06 |
| `22px` | 1 | styles.css:36 | `--ds-shadow-md (compound)` | mechanical | Shadow length atom; migrate only via full compound token, not standalone |
| `24px` | 1 | styles.css:154 | `keep-as-is` | keep-as-is | Unique glow/blur length inside a one-off box-shadow; Rule 06 |
| `26px` | 1 | styles.css:122 | `keep-as-is` | keep-as-is | Unique glow/blur length inside a one-off box-shadow; Rule 06 |
| `36px` | 1 | styles.css:35 | `--ds-shadow-sm (compound)` | mechanical | Shadow length atom; migrate only via full compound token, not standalone |
| `42px` | 1 | styles.css:505 | `keep-as-is` | keep-as-is | Unique glow/blur length inside a one-off box-shadow; Rule 06 |
| `64px` | 1 | styles.css:36 | `--ds-shadow-md (compound)` | mechanical | Shadow length atom; migrate only via full compound token, not standalone |

## Motion

| Value | Count | styles.css lines | Proposed token | Class | Reason |
|-------|------:|------------------|----------------|-------|--------|
| `160ms` | 13 | styles.css:66, styles.css:67, styles.css:68, styles.css:69, styles.css:70, styles.css:386, styles.css:387, styles.css:848, styles.css:1100, styles.css:1101, styles.css:1102, styles.css:1112 | `--ds-duration-fast` | mechanical | Default interactive duration |
| `180ms` | 3 | styles.css:500 | `--ds-duration-md` | mechanical | Module hover duration |
| `800ms` | 1 | styles.css:174 | `--ds-duration-spin` | mechanical | Spinner duration role |
| `ease` | 6 | styles.css:500, styles.css:848, styles.css:1112 | `--ds-ease-standard` | mechanical | Default easing |
| `linear` | 1 | styles.css:174 | `--ds-ease-linear` | mechanical | Spinner easing |

## Coverage summary

| Metric | Count |
|--------|------:|
| Inventory unique values processed | 202 |
| mechanical | 136 |
| visual-gated | 10 |
| keep-as-is | 56 |
| UNMAPPED (must be 0) | 0 |

Disposition math: prior M2a map was mechanical 148 / visual-gated 1 / keep-as-is 53. This revision moves 6 spacing drift rows (5/7/10/11/14/15) mechanical→visual-gated, 2 micro rows (2/3) mechanical→keep-as-is, 3 type rows (13/14/16px) mechanical→visual-gated, 1 type row (18px) mechanical→keep-as-is → **136 / 10 / 56** (includes color V5 row).

Expected inventory unique total: **202** (Color 72 + Spacing 21 + Size 31 + Radius 4 + Typography 55 + Shadow 14 + Motion 5).

**Spacing vocabulary check:** only `--ds-space-1..6` appear as proposed tokens in Spacing; zero `--ds-space-Npx`; zero off-lattice space tokens. **Type check:** zero `--ds-text-pdf-*` remain.
