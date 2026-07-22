# Rubric — scoring Alejandría generation

Score each golden-set result on **8 dimensions, 0–3 each** (max 24). Then apply the **gates**, then
read the **verdict band**. Judge from the generated **code** + a **screenshot** rendered on the dark
app shell. Ground every judgement in `guidelines/design-language.md` and `guidelines/anti-examples.md`
— cite the specific rule when you deduct points.

## Dimensions (0–3)

Anchors: **0** = absent/wrong · **1** = partial/inconsistent · **2** = mostly right, minor slips ·
**3** = faithful, indistinguishable from hand-built Alejandría.

| # | Dimension | What to look for |
|---|---|---|
| 1 | **Component reuse** | Uses shipped `@alejandria/ui-kit` components for what they cover; does not reinvent or hand-clone them in local markup/CSS. |
| 2 | **Token fidelity** | Colors, spacing, radius, borders come from `var(--ds-*)`; no hardcoded hex or arbitrary px for design values. |
| 3 | **Tonality & surface** | Dark console backdrop present (`--ds-color-surface`/`--ds-color-ink`); semantic colors used for their role (teal=primary/accent, coral/danger, amber=warn, blue/green as specified), not decoratively. |
| 4 | **Typography** | Correct families (Montserrat body / Source Code Pro display+mono), uppercase labels with tracking, eyebrow→title→body hierarchy. |
| 5 | **Spacing & density** | 4px rhythm (`--ds-space-*`); Alejandría's compact density — not generic airy SaaS spacing. |
| 6 | **Composition & hierarchy** | Follows a documented pattern or the visual grammar; correct card anatomy (header/body/footer, accents); blocks arranged as an operational console. |
| 7 | **Gap honesty** | Missing primitives are reported, not invented; local fallbacks (where a pattern allows) are clearly not passed off as kit components. |
| 8 | **Correctness** | Imports resolve with types; renders without breaking; icons rendered as `<img>` with sizing; no console errors from the kit. |

## Gates (applied after summing — they *cap* the verdict)

- **Gate A — Reinvention.** If the result reinvents or hand-clones a component the kit already
  exports (e.g. a bespoke metric card instead of `MetricCard`), cap the verdict at **Needs work** and
  name the component. Reusing the system is the whole point.
- **Gate B — Fabrication.** If the result fabricates a fake `@alejandria/ui-kit` export, invents a
  primitive the kit doesn't ship, or hand-draws a lookalike of a kit component/icon *instead of
  reporting the gap*, cap the verdict at **Needs work** (for G6, this is an automatic **fail**).

## Verdict bands (after gates)

| Total | Verdict | Meaning |
|---|---|---|
| 20–24 | **Ship-quality** | An Alejandría engineer would accept this. |
| 13–19 | **Needs work** | Recognizably Alejandría but with real fidelity/behavior gaps. |
| ≤ 12 | **Not Alejandría** | Generic UI wearing a few tokens, or broken. |

Record the **per-dimension scores**, the **triggered gates**, and **one concrete fix** per deduction
— that fix is the input to step 4 of the loop (improve knowledge/tokens/components).

## LLM-judge prompt (use once anchors are human-calibrated)

Paste the following, filling the four inputs. Keep the human in the loop until judge scores track
human scores within ~±2 total across a few runs.

```
You are grading how faithfully a generated UI matches the Alejandría design system.

RUBRIC: <paste this file's Dimensions + Gates + Verdict bands>
DESIGN LANGUAGE: <paste knowledge/guidelines/design-language.md>
ANTI-EXAMPLES: <paste knowledge/guidelines/anti-examples.md>

TASK PROMPT THAT WAS GIVEN: <paste the golden-set prompt>
GENERATED CODE: <paste the files/diff the agent produced>
SCREENSHOT: <attach the rendered screen on the dark app shell>

Score each of the 8 dimensions 0–3 with a one-line justification citing a specific design-language or
anti-example rule. Then evaluate Gate A and Gate B (state triggered / not, with evidence). Then give
the total, the capped verdict, and for every deduction one concrete fix to the knowledge base,
tokens, or components. Do not reward plausible-looking output that ignores the system — be strict.
```
