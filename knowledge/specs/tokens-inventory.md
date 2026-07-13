# Token Candidate Inventory

- Status: measured
- Source: packages/ui/src/styles.css (entire file)
- Method: mechanical literal extraction (hex, rgb/rgba, px, pt, rem, em, ms, unitless line-height, letter-spacing, font-weight, border-radius non-var, easing keywords)
- Existing tokens recorded from `:root` block (styles.css:6–41); not renamed

## Summary counts

| Category | Unique values | Occurrences |
|----------|--------------:|------------:|
| Color | 72 | 109 |
| Spacing | 21 | 81 |
| Size | 31 | 87 |
| Radius | 4 | 13 |
| Typography | 55 | 131 |
| Shadow | 14 | 21 |
| Motion | 5 | 24 |
| **Total** | **202** | **466** |

## Existing `--ds-*` tokens (styles.css:6–41)

| Token | Value | Source |
|-------|-------|--------|
| `--ds-font-display` | `"Source Code Pro", monospace` | styles.css:8 |
| `--ds-font-body` | `"Montserrat", sans-serif` | styles.css:9 |
| `--ds-font-mono` | `"Source Code Pro", monospace` | styles.css:10 |
| `--ds-color-ink` | `#f4f7f5` | styles.css:12 |
| `--ds-color-ink-soft` | `#a9b3b0` | styles.css:13 |
| `--ds-color-ink-muted` | `#6f7977` | styles.css:14 |
| `--ds-color-paper` | `#eef4f3` | styles.css:15 |
| `--ds-color-surface` | `#101315` | styles.css:16 |
| `--ds-color-surface-strong` | `#171b1d` | styles.css:17 |
| `--ds-color-surface-glass` | `rgb(16 19 21 / 0.82)` | styles.css:18 |
| `--ds-color-line` | `rgb(226 239 234 / 0.18)` | styles.css:19 |
| `--ds-color-line-strong` | `rgb(226 239 234 / 0.34)` | styles.css:20 |
| `--ds-color-teal` | `#6ce0c7` | styles.css:21 |
| `--ds-color-teal-dark` | `#1b8f7d` | styles.css:22 |
| `--ds-color-teal-soft` | `rgb(108 224 199 / 0.13)` | styles.css:23 |
| `--ds-color-coral` | `#ff5a52` | styles.css:24 |
| `--ds-color-coral-soft` | `rgb(255 90 82 / 0.13)` | styles.css:25 |
| `--ds-color-amber` | `#d7b24a` | styles.css:26 |
| `--ds-color-amber-soft` | `rgb(215 178 74 / 0.14)` | styles.css:27 |
| `--ds-color-blue` | `#62b8d7` | styles.css:28 |
| `--ds-color-blue-soft` | `rgb(98 184 215 / 0.13)` | styles.css:29 |
| `--ds-color-green` | `#85d66f` | styles.css:30 |
| `--ds-color-green-soft` | `rgb(133 214 111 / 0.13)` | styles.css:31 |
| `--ds-color-danger` | `#ff3d48` | styles.css:32 |
| `--ds-color-danger-soft` | `rgb(255 61 72 / 0.13)` | styles.css:33 |
| `--ds-shadow-sm` | `0 1px 2px rgb(0 0 0 / 0.22), 0 14px 36px rgb(17 25 28 / 0.16), inset 0 1px 0 rgb(255 255 255 / 0.04)` | styles.css:35 |
| `--ds-shadow-md` | `0 22px 64px rgb(17 25 28 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.05)` | styles.css:36 |
| `--ds-radius-xs` | `2px` | styles.css:37 |
| `--ds-radius-sm` | `4px` | styles.css:38 |
| `--ds-radius-md` | `6px` | styles.css:39 |
| `--ds-focus-ring` | `0 0 0 3px rgb(108 224 199 / 0.24)` | styles.css:40 |

## Color

| Value | Count | styles.css lines | Matching --ds-* token? |
|-------|------:|------------------|------------------------|
| `#1b8f7d` | 1 | styles.css:22 | --ds-color-teal-dark |
| `#2a2927` | 1 | styles.css:586 | --ds-color-surface (semantic dup candidate; token value differs) |
| `#5a5a5a` | 1 | styles.css:867 | UNTOKENIZED — candidate |
| `#6ce0c7` | 1 | styles.css:21 | --ds-color-teal |
| `#6f7977` | 1 | styles.css:14 | --ds-color-ink-muted |
| `#8a8b87` | 10 | styles.css:458, styles.css:547, styles.css:565, styles.css:668, styles.css:679, styles.css:688, styles.css:1252, styles.css:1289, styles.css:1297, styles.css:1338 | --ds-color-ink-soft (semantic dup candidate; token value differs) |
| `#9affdf` | 1 | styles.css:121 | UNTOKENIZED — candidate |
| `#24a893` | 1 | styles.css:121 | UNTOKENIZED — candidate |
| `#62b8d7` | 1 | styles.css:28 | --ds-color-blue |
| `#82f3d8` | 1 | styles.css:114 | --ds-color-teal (semantic dup candidate; token value differs) |
| `#85d66f` | 1 | styles.css:30 | --ds-color-green |
| `#171b1d` | 1 | styles.css:17 | --ds-color-surface-strong |
| `#04110f` | 1 | styles.css:117 | UNTOKENIZED — candidate |
| `#060606` | 1 | styles.css:489 | --ds-color-surface (semantic dup candidate; token value differs) |
| `#101315` | 1 | styles.css:16 | --ds-color-surface |
| `#494949` | 1 | styles.css:862 | UNTOKENIZED — candidate |
| `#606060` | 1 | styles.css:726 | UNTOKENIZED — candidate |
| `#a9b3b0` | 1 | styles.css:13 | --ds-color-ink-soft |
| `#bd1f2a` | 1 | styles.css:147 | UNTOKENIZED — candidate |
| `#c1c1c1` | 5 | styles.css:490, styles.css:535, styles.css:587, styles.css:626, styles.css:824 | --ds-color-line (semantic dup candidate; token value differs) |
| `#d7b24a` | 1 | styles.css:26 | --ds-color-amber |
| `#d92733` | 1 | styles.css:153 | UNTOKENIZED — candidate |
| `#e6e6e6` | 1 | styles.css:447 | UNTOKENIZED — candidate |
| `#eef4f3` | 1 | styles.css:15 | --ds-color-paper |
| `#f4f7f5` | 1 | styles.css:12 | --ds-color-ink |
| `#ff3d48` | 1 | styles.css:32 | --ds-color-danger |
| `#ff5a52` | 1 | styles.css:24 | --ds-color-coral |
| `#ff0404` | 1 | styles.css:477 | --ds-color-danger (semantic dup candidate; token value differs) |
| `#ff696f` | 1 | styles.css:147 | UNTOKENIZED — candidate |
| `#ff8084` | 1 | styles.css:153 | UNTOKENIZED — candidate |
| `#fff` | 1 | styles.css:1330 | UNTOKENIZED — candidate |
| `#ffffff` | 14 | styles.css:149, styles.css:468, styles.css:481, styles.css:504, styles.css:575, styles.css:590, styles.css:646, styles.css:657, styles.css:729, styles.css:791, styles.css:814, styles.css:863, styles.css:872, styles.css:1272 | UNTOKENIZED — candidate |
| `rgb(0 0 0 / 0.2)` | 1 | styles.css:341 | UNTOKENIZED — candidate |
| `rgb(0 0 0 / 0.7)` | 1 | styles.css:725 | UNTOKENIZED — candidate |
| `rgb(0 0 0 / 0.22)` | 3 | styles.css:35, styles.css:505, styles.css:1216 | UNTOKENIZED — candidate |
| `rgb(0 0 0 / 0.24)` | 1 | styles.css:1131 | UNTOKENIZED — candidate |
| `rgb(0 0 0 / 0.34)` | 1 | styles.css:378 | UNTOKENIZED — candidate |
| `rgb(6 6 6 / 0.2)` | 2 | styles.css:446, styles.css:1241 | UNTOKENIZED — candidate |
| `rgb(8 127 115 / 0.12)` | 1 | styles.css:1119 | UNTOKENIZED — candidate |
| `rgb(16 19 21 / 0.82)` | 1 | styles.css:18 | --ds-color-surface-glass |
| `rgb(17 25 28 / 0.16)` | 2 | styles.css:35, styles.css:1110 | UNTOKENIZED — candidate |
| `rgb(17 25 28 / 0.28)` | 1 | styles.css:36 | UNTOKENIZED — candidate |
| `rgb(98 184 215 / 0.13)` | 1 | styles.css:29 | --ds-color-blue-soft |
| `rgb(98 184 215 / 0.42)` | 1 | styles.css:218 | UNTOKENIZED — candidate |
| `rgb(108 224 199 / 0.12)` | 1 | styles.css:116 | UNTOKENIZED — candidate |
| `rgb(108 224 199 / 0.13)` | 1 | styles.css:23 | --ds-color-teal-soft |
| `rgb(108 224 199 / 0.22)` | 1 | styles.css:122 | UNTOKENIZED — candidate |
| `rgb(108 224 199 / 0.24)` | 1 | styles.css:40 | UNTOKENIZED — candidate |
| `rgb(108 224 199 / 0.74)` | 1 | styles.css:115 | UNTOKENIZED — candidate |
| `rgb(108 224 199 / 0.75)` | 1 | styles.css:269 | UNTOKENIZED — candidate |
| `rgb(133 214 111 / 0.13)` | 1 | styles.css:31 | --ds-color-green-soft |
| `rgb(133 214 111 / 0.42)` | 1 | styles.css:228 | UNTOKENIZED — candidate |
| `rgb(169 179 176 / 0.5)` | 1 | styles.css:421 | UNTOKENIZED — candidate |
| `rgb(193 193 193 / 0.6)` | 1 | styles.css:1242 | UNTOKENIZED — candidate |
| `rgb(193 193 193 / 0.35)` | 1 | styles.css:511 | UNTOKENIZED — candidate |
| `rgb(193 193 193 / 0.45)` | 2 | styles.css:764, styles.css:852 | UNTOKENIZED — candidate |
| `rgb(215 178 74 / 0.14)` | 1 | styles.css:27 | --ds-color-amber-soft |
| `rgb(215 178 74 / 0.46)` | 1 | styles.css:238 | UNTOKENIZED — candidate |
| `rgb(226 239 234 / 0.18)` | 1 | styles.css:19 | --ds-color-line |
| `rgb(226 239 234 / 0.34)` | 1 | styles.css:20 | --ds-color-line-strong |
| `rgb(255 61 72 / 0.5)` | 1 | styles.css:248 | UNTOKENIZED — candidate |
| `rgb(255 61 72 / 0.13)` | 1 | styles.css:33 | --ds-color-danger-soft |
| `rgb(255 61 72 / 0.22)` | 1 | styles.css:154 | UNTOKENIZED — candidate |
| `rgb(255 61 72 / 0.72)` | 1 | styles.css:148 | UNTOKENIZED — candidate |
| `rgb(255 90 82 / 0.13)` | 1 | styles.css:25 | --ds-color-coral-soft |
| `rgb(255 255 255 / 0.04)` | 1 | styles.css:35 | UNTOKENIZED — candidate |
| `rgb(255 255 255 / 0.05)` | 3 | styles.css:36, styles.css:126, styles.css:207 | UNTOKENIZED — candidate |
| `rgb(255 255 255 / 0.06)` | 2 | styles.css:142, styles.css:876 | UNTOKENIZED — candidate |
| `rgb(255 255 255 / 0.08)` | 3 | styles.css:897, styles.css:1093, styles.css:1361 | UNTOKENIZED — candidate |
| `rgb(255 255 255 / 0.09)` | 2 | styles.css:132, styles.css:886 | UNTOKENIZED — candidate |
| `rgb(255 255 255 / 0.035)` | 1 | styles.css:258 | UNTOKENIZED — candidate |
| `rgb(255 255 255 / 0.045)` | 1 | styles.css:988 | UNTOKENIZED — candidate |

## Spacing

| Value | Count | styles.css lines | Matching --ds-* token? |
|-------|------:|------------------|------------------------|
| `-1px` | 1 | styles.css:76 | UNTOKENIZED — candidate |
| `-2px` | 1 | styles.css:506 | UNTOKENIZED — candidate |
| `-18px` | 2 | styles.css:602, styles.css:603 | UNTOKENIZED — candidate |
| `2px` | 2 | styles.css:720, styles.css:1325 | UNTOKENIZED — candidate |
| `3px` | 2 | styles.css:1067, styles.css:1098 | UNTOKENIZED — candidate |
| `4px` | 7 | styles.css:693, styles.css:810, styles.css:836, styles.css:950, styles.css:1032, styles.css:1136, styles.css:1137 | UNTOKENIZED — candidate |
| `5px` | 3 | styles.css:615, styles.css:700, styles.css:846 | UNTOKENIZED — candidate |
| `7px` | 3 | styles.css:190, styles.css:299, styles.css:1151 | UNTOKENIZED — candidate |
| `8px` | 8 | styles.css:58, styles.css:194, styles.css:318, styles.css:327, styles.css:352, styles.css:531, styles.css:744, styles.css:900 | UNTOKENIZED — candidate |
| `10px` | 9 | styles.css:453, styles.css:554, styles.css:611, styles.css:617, styles.css:733, styles.css:747, styles.css:835, styles.css:1246, styles.css:1248 | UNTOKENIZED — candidate |
| `11px` | 5 | styles.css:94, styles.css:399, styles.css:416, styles.css:451, styles.css:968 | UNTOKENIZED — candidate |
| `12px` | 11 | styles.css:344, styles.css:346, styles.css:359, styles.css:731, styles.css:803, styles.css:980, styles.css:996, styles.css:1153, styles.css:1201, styles.css:1209, styles.css:1266 | UNTOKENIZED — candidate |
| `14px` | 6 | styles.css:272, styles.css:275, styles.css:998, styles.css:1060, styles.css:1201, styles.css:1209 | UNTOKENIZED — candidate |
| `15px` | 4 | styles.css:100, styles.css:611, styles.css:733, styles.css:748 | UNTOKENIZED — candidate |
| `16px` | 6 | styles.css:283, styles.css:285, styles.css:336, styles.css:346, styles.css:609, styles.css:803 | UNTOKENIZED — candidate |
| `20px` | 6 | styles.css:106, styles.css:495, styles.css:498, styles.css:674, styles.css:846 | UNTOKENIZED — candidate |
| `24px` | 1 | styles.css:1123 | UNTOKENIZED — candidate |
| `25px` | 1 | styles.css:498 | UNTOKENIZED — candidate |
| `50px` | 1 | styles.css:498 | UNTOKENIZED — candidate |
| `72px` | 1 | styles.css:739 | UNTOKENIZED — candidate |
| `90px` | 1 | styles.css:1316 | UNTOKENIZED — candidate |

## Size

| Value | Count | styles.css lines | Matching --ds-* token? |
|-------|------:|------------------|------------------------|
| `0.75px` | 5 | styles.css:447, styles.css:490, styles.css:547, styles.css:587, styles.css:726 | UNTOKENIZED — candidate |
| `1px` | 20 | styles.css:52, styles.css:184, styles.css:260, styles.css:271, styles.css:281, styles.css:342, styles.css:379, styles.css:887, styles.css:897, styles.css:990, styles.css:1016, styles.css:1085, styles.css:1089, styles.css:1094, styles.css:1108, styles.css:1132, styles.css:1143, styles.css:1182, styles.css:1208, styles.css:1242 | UNTOKENIZED — candidate |
| `2px` | 1 | styles.css:175 | UNTOKENIZED — candidate |
| `4px` | 1 | styles.css:991 | UNTOKENIZED — candidate |
| `5px` | 2 | styles.css:977, styles.css:978 | UNTOKENIZED — candidate |
| `6px` | 1 | styles.css:979 | UNTOKENIZED — candidate |
| `7px` | 2 | styles.css:202, styles.css:203 | UNTOKENIZED — candidate |
| `15px` | 2 | styles.css:1171, styles.css:1172 | UNTOKENIZED — candidate |
| `16px` | 2 | styles.css:178, styles.css:179 | UNTOKENIZED — candidate |
| `17px` | 4 | styles.css:159, styles.css:160, styles.css:398, styles.css:400 | UNTOKENIZED — candidate |
| `18px` | 4 | styles.css:331, styles.css:332, styles.css:1026, styles.css:1027 | UNTOKENIZED — candidate |
| `20px` | 6 | styles.css:757, styles.css:760, styles.css:770, styles.css:772, styles.css:1111, styles.css:1113 | UNTOKENIZED — candidate |
| `24px` | 1 | styles.css:193 | UNTOKENIZED — candidate |
| `28px` | 1 | styles.css:1097 | UNTOKENIZED — candidate |
| `32px` | 2 | styles.css:93, styles.css:581 | UNTOKENIZED — candidate |
| `34px` | 3 | styles.css:1020, styles.css:1022, styles.css:1152 | UNTOKENIZED — candidate |
| `38px` | 4 | styles.css:414, styles.css:600, styles.css:605, styles.css:966 | UNTOKENIZED — candidate |
| `40px` | 2 | styles.css:99, styles.css:383 | UNTOKENIZED — candidate |
| `48px` | 1 | styles.css:105 | UNTOKENIZED — candidate |
| `50px` | 4 | styles.css:778, styles.css:779, styles.css:785, styles.css:787 | UNTOKENIZED — candidate |
| `52px` | 1 | styles.css:1103 | UNTOKENIZED — candidate |
| `78px` | 1 | styles.css:905 | UNTOKENIZED — candidate |
| `112px` | 1 | styles.css:909 | UNTOKENIZED — candidate |
| `120px` | 3 | styles.css:1268, styles.css:1317, styles.css:1320 | UNTOKENIZED — candidate |
| `132px` | 2 | styles.css:452, styles.css:1308 | UNTOKENIZED — candidate |
| `148px` | 1 | styles.css:913 | UNTOKENIZED — candidate |
| `180px` | 3 | styles.css:518, styles.css:524, styles.css:526 | UNTOKENIZED — candidate |
| `220px` | 1 | styles.css:1247 | UNTOKENIZED — candidate |
| `240px` | 1 | styles.css:610 | UNTOKENIZED — candidate |
| `260px` | 3 | styles.css:496, styles.css:497, styles.css:1062 | UNTOKENIZED — candidate |
| `280px` | 2 | styles.css:616, styles.css:732 | UNTOKENIZED — candidate |

## Radius

| Value | Count | styles.css lines | Matching --ds-* token? |
|-------|------:|------------------|------------------------|
| `2px` | 1 | styles.css:37 | --ds-radius-xs |
| `4px` | 1 | styles.css:38 | --ds-radius-sm |
| `6px` | 1 | styles.css:39 | --ds-radius-md |
| `999px` | 10 | styles.css:177, styles.css:200, styles.css:888, styles.css:1095, styles.css:1109 | UNTOKENIZED — candidate (pill) |

## Typography

| Value | Count | styles.css lines | Matching --ds-* token? |
|-------|------:|------------------|------------------------|
| `0` | 9 | styles.css:60, styles.css:191, styles.css:297, styles.css:307, styles.css:472, styles.css:651, styles.css:662, styles.css:672, styles.css:694 | UNTOKENIZED — candidate |
| `0.1em` | 2 | styles.css:540 | UNTOKENIZED — candidate |
| `0.2 (unitless)` | 2 | styles.css:652, styles.css:663 | UNTOKENIZED — candidate |
| `0.04em` | 2 | styles.css:795 | UNTOKENIZED — candidate |
| `0.7rem` | 2 | styles.css:366, styles.css:1199 | UNTOKENIZED — candidate |
| `0.08em` | 2 | styles.css:1292 | UNTOKENIZED — candidate |
| `0.9 (unitless)` | 1 | styles.css:933 | UNTOKENIZED — candidate |
| `0.9rem` | 2 | styles.css:1254, styles.css:1274 | UNTOKENIZED — candidate |
| `0.25em` | 2 | styles.css:1256 | UNTOKENIZED — candidate |
| `0.41em` | 2 | styles.css:462 | UNTOKENIZED — candidate |
| `0.62rem` | 1 | styles.css:948 | UNTOKENIZED — candidate |
| `0.66rem` | 1 | styles.css:295 | UNTOKENIZED — candidate |
| `0.68rem` | 2 | styles.css:188, styles.css:1219 | UNTOKENIZED — candidate |
| `0.72rem` | 1 | styles.css:427 | UNTOKENIZED — candidate |
| `0.74rem` | 1 | styles.css:1149 | UNTOKENIZED — candidate |
| `0.75rem` | 1 | styles.css:1340 | UNTOKENIZED — candidate |
| `0.78rem` | 2 | styles.css:92, styles.css:1073 | UNTOKENIZED — candidate |
| `0.84rem` | 2 | styles.css:413, styles.css:965 | UNTOKENIZED — candidate |
| `0.86rem` | 1 | styles.css:1080 | UNTOKENIZED — candidate |
| `0.88rem` | 1 | styles.css:98 | UNTOKENIZED — candidate |
| `0.92rem` | 2 | styles.css:1045, styles.css:1225 | UNTOKENIZED — candidate |
| `0.95 (unitless)` | 1 | styles.css:473 | UNTOKENIZED — candidate |
| `0.95rem` | 1 | styles.css:316 | UNTOKENIZED — candidate |
| `1 (unitless)` | 3 | styles.css:61, styles.css:192, styles.css:845 | UNTOKENIZED — candidate |
| `1.2 (unitless)` | 9 | styles.css:298, styles.css:368, styles.css:485, styles.css:541, styles.css:570, styles.css:580, styles.css:673, styles.css:796, styles.css:829 | UNTOKENIZED — candidate |
| `1.3 (unitless)` | 1 | styles.css:1081 | UNTOKENIZED — candidate |
| `1.05 (unitless)` | 3 | styles.css:308, styles.css:1039, styles.css:1334 | UNTOKENIZED — candidate |
| `1.05rem` | 1 | styles.css:1038 | UNTOKENIZED — candidate |
| `1.15 (unitless)` | 3 | styles.css:705, styles.css:715, styles.css:819 | UNTOKENIZED — candidate |
| `1.18rem` | 1 | styles.css:938 | UNTOKENIZED — candidate |
| `1.25 (unitless)` | 5 | styles.css:463, styles.css:710, styles.css:721, styles.css:1257, styles.css:1342 | UNTOKENIZED — candidate |
| `1.35 (unitless)` | 3 | styles.css:428, styles.css:695, styles.css:1046 | UNTOKENIZED — candidate |
| `1.35rem` | 2 | styles.css:305, styles.css:1357 | UNTOKENIZED — candidate |
| `1.45 (unitless)` | 2 | styles.css:317, styles.css:683 | UNTOKENIZED — candidate |
| `1.72rem` | 1 | styles.css:931 | UNTOKENIZED — candidate |
| `1.75rem` | 1 | styles.css:1332 | UNTOKENIZED — candidate |
| `1rem` | 1 | styles.css:104 | UNTOKENIZED — candidate |
| `2.15rem` | 1 | styles.css:942 | UNTOKENIZED — candidate |
| `8px` | 1 | styles.css:1291 | UNTOKENIZED — candidate |
| `10pt` | 1 | styles.css:827 | UNTOKENIZED — candidate |
| `11pt` | 1 | styles.css:843 | UNTOKENIZED — candidate |
| `12px` | 1 | styles.css:460 | UNTOKENIZED — candidate |
| `13pt` | 1 | styles.css:793 | UNTOKENIZED — candidate |
| `13px` | 2 | styles.css:709, styles.css:719 | UNTOKENIZED — candidate |
| `14pt` | 1 | styles.css:817 | UNTOKENIZED — candidate |
| `14px` | 2 | styles.css:649, styles.css:691 | UNTOKENIZED — candidate |
| `16px` | 6 | styles.css:483, styles.css:568, styles.css:578, styles.css:670, styles.css:681, styles.css:714 | UNTOKENIZED — candidate |
| `18px` | 2 | styles.css:660, styles.css:704 | UNTOKENIZED — candidate |
| `24px` | 1 | styles.css:538 | UNTOKENIZED — candidate |
| `84px` | 1 | styles.css:470 | UNTOKENIZED — candidate |
| `200` | 2 | styles.css:484, styles.css:828 | UNTOKENIZED — candidate |
| `300` | 6 | styles.css:569, styles.css:671, styles.css:682, styles.css:794, styles.css:1275, styles.css:1341 | UNTOKENIZED — candidate |
| `400` | 3 | styles.css:539, styles.css:650, styles.css:692 | UNTOKENIZED — candidate |
| `600` | 1 | styles.css:438 | UNTOKENIZED — candidate |
| `700` | 19 | styles.css:57, styles.css:189, styles.css:296, styles.css:306, styles.css:367, styles.css:461, styles.css:471, styles.css:579, styles.css:661, styles.css:818, styles.css:844, styles.css:932, styles.css:949, styles.css:1074, styles.css:1150, styles.css:1200, styles.css:1220, styles.css:1255, styles.css:1333 | UNTOKENIZED — candidate |

## Shadow

| Value | Count | styles.css lines | Matching --ds-* token? |
|-------|------:|------------------|------------------------|
| `1px` | 3 | styles.css:35, styles.css:36 | --ds-shadow-sm (contains) |
| `2px` | 3 | styles.css:35, styles.css:764, styles.css:852 | --ds-shadow-sm (contains) |
| `3px` | 4 | styles.css:40, styles.css:511, styles.css:1110, styles.css:1119 | UNTOKENIZED — candidate |
| `8px` | 1 | styles.css:1110 | UNTOKENIZED — candidate |
| `12px` | 1 | styles.css:201 | UNTOKENIZED — candidate |
| `14px` | 1 | styles.css:35 | --ds-shadow-sm (contains) |
| `16px` | 1 | styles.css:505 | UNTOKENIZED — candidate |
| `18px` | 1 | styles.css:116 | UNTOKENIZED — candidate |
| `22px` | 1 | styles.css:36 | --ds-shadow-md (contains) |
| `24px` | 1 | styles.css:154 | UNTOKENIZED — candidate |
| `26px` | 1 | styles.css:122 | UNTOKENIZED — candidate |
| `36px` | 1 | styles.css:35 | --ds-shadow-sm (contains) |
| `42px` | 1 | styles.css:505 | UNTOKENIZED — candidate |
| `64px` | 1 | styles.css:36 | --ds-shadow-md (contains) |

## Motion

| Value | Count | styles.css lines | Matching --ds-* token? |
|-------|------:|------------------|------------------------|
| `160ms` | 13 | styles.css:66, styles.css:67, styles.css:68, styles.css:69, styles.css:70, styles.css:386, styles.css:387, styles.css:848, styles.css:1100, styles.css:1101, styles.css:1102, styles.css:1112 | UNTOKENIZED — candidate |
| `180ms` | 3 | styles.css:500 | UNTOKENIZED — candidate |
| `800ms` | 1 | styles.css:174 | UNTOKENIZED — candidate |
| `ease` | 6 | styles.css:500, styles.css:848, styles.css:1112 | UNTOKENIZED — candidate |
| `linear` | 1 | styles.css:174 | UNTOKENIZED — candidate |

## Duplication candidates

Flagged only — no renames or migrations. Values that appear as raw literals while a `--ds-*` token exists for a related semantic role (per audit §3.5 and measured token table).

| Literal | Category | Related token note | styles.css lines |
|---------|----------|--------------------|------------------|
| `#2a2927` | Color | --ds-color-surface (semantic dup candidate; token value differs) | styles.css:586 |
| `#8a8b87` | Color | --ds-color-ink-soft (semantic dup candidate; token value differs) | styles.css:458, styles.css:547, styles.css:565, styles.css:668, styles.css:679, styles.css:688, styles.css:1252, styles.css:1289, styles.css:1297, styles.css:1338 |
| `#82f3d8` | Color | --ds-color-teal (semantic dup candidate; token value differs) | styles.css:114 |
| `#060606` | Color | --ds-color-surface (semantic dup candidate; token value differs) | styles.css:489 |
| `#c1c1c1` | Color | --ds-color-line (semantic dup candidate; token value differs) | styles.css:490, styles.css:535, styles.css:587, styles.css:626, styles.css:824 |
| `#ff0404` | Color | --ds-color-danger (semantic dup candidate; token value differs) | styles.css:477 |
| `#a9b3b0` (as `rgb(169 179 176 / 0.5)` placeholder) | Color | Exact match candidate for `--ds-color-ink-soft` (#a9b3b0) at 50% opacity | styles.css:421 |
| `rgb(108 224 199 / …)` literals | Color | Channel match to `--ds-color-teal` (#6ce0c7) | multiple button/card lines |
| `rgb(255 61 72 / …)` literals | Color | Channel match to `--ds-color-danger` (#ff3d48) | multiple badge/button lines |

## Extraction notes

- `color-mix(...)` expressions are not counted as separate color literals (no hex/rgb literal inside beyond CSS functions already matched).
- `var(--ds-*)` references are not counted as literals; only concrete values are inventoried.
- Token definition block values are included in the Color/Spacing/Size/Radius/Shadow counts when they contain literals.
- Unitless `z-index` integers are out of scope for this inventory (not listed in milestone categories).
