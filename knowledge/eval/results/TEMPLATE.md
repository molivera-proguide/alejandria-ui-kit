<!-- Copy to results/<YYYY-MM-DD>-<label>.md and fill in. One file per run of the golden set. -->

# Eval run — <YYYY-MM-DD> — <label>

- **Kit version / tarball:** <e.g. alejandria-ui-kit-0.1.0.tgz @ commit abc1234>
- **Knowledge version:** <commit / date>
- **Agent + model:** <e.g. Cursor / Claude, Claude Code / Opus 4.8>
- **Harness repo:** <link or path to the clean consumer app used>
- **Judge:** <human name / LLM-judge>

## Scores

Dimensions: 1 Reuse · 2 Tokens · 3 Tonality · 4 Type · 5 Spacing · 6 Composition · 7 Gap honesty · 8 Correctness (0–3 each, /24)

| Prompt | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | Total | Gates | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| G1 Dashboard   |  |  |  |  |  |  |  |  |  |  |  |
| G2 Login       |  |  |  |  |  |  |  |  |  |  |  |
| G3 Table       |  |  |  |  |  |  |  |  |  |  |  |
| G4 Detail      |  |  |  |  |  |  |  |  |  |  |  |
| G5 Assistant   |  |  |  |  |  |  |  |  |  |  |  |
| G6 Gap-probe   |  |  |  |  |  |  |  |  |  |  |  |

**Run summary:** <mean total, how many Ship-quality, notable regressions vs last run>

## Findings → fixes (input to loop step 4)

For each deduction: what drifted, which design-language/anti-example rule, and the concrete fix.

- G_: <finding> → <fix to knowledge / tokens / component / docs>
- ...

## Coverage gaps observed (feed component-roadmap.md, NOT the aesthetic score)

- <missing primitive the agent correctly reported> → <roadmap note>

## Screenshots / artifacts

- <links or paths per prompt>
