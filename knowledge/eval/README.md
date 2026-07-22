# Eval — the Alejandría generation loop (minimal)

**Purpose.** Measure, with evidence, how much *Alejandría aesthetic* an AI agent actually produces
when it consumes `@alejandria/ui-kit` + this knowledge base. This is the maintainer-side feedback
loop that tells us whether a change to the knowledge/tokens/components makes agent-generated UI
**better or worse** — instead of guessing.

> Internal / maintainer artifact. Not shipped to consumers (the `knowledge/` copy in the tarball may
> include it, but it describes *how we evaluate the system*, not how to consume it).

## The loop

```
   ┌──────────────────────────────────────────────────────────┐
   │ 1. Run the golden set  (golden-set.md)                     │
   │    an agent, in a clean consumer repo, builds each prompt  │
   │           ↓                                                │
   │ 2. Judge the output    (rubric.md)                         │
   │    score each result against the design language           │
   │           ↓                                                │
   │ 3. Find where it drifts from Alejandría                     │
   │           ↓                                                │
   │ 4. Improve knowledge / tokens / components / docs          │
   │           ↓                                                │
   │ 5. Re-run the SAME prompts → compare scores  (results/)    │
   └──────────────────────────────────────────────────────────┘
```

The value is in **re-running the same prompts after every change** and watching the scores move.
A one-off pass tells you little; the trend line is the signal.

## How to run (one prompt)

1. **Fresh consumer repo.** A minimal React app (Vite or Next) with `@alejandria/ui-kit` installed
   from the current tarball, `style.css` imported at root, an app-shell background
   (`var(--ds-color-surface)` / `var(--ds-color-ink)`), and `AGENTS.md` copied from
   `knowledge/consumer/AGENTS.template.md`. See `knowledge/consumer/SETUP.md`.
2. **Give the agent the prompt verbatim** from `golden-set.md`. Nothing else — no hints, no pointing
   at specific components. The whole point is to test what the knowledge base steers it toward.
3. **Capture** the generated code (files/diff) and a **screenshot** of each screen rendered on the
   dark app shell.
4. **Score** with `rubric.md` (human eyes first; LLM-judge once the rubric is stable — the judge
   prompt is in `rubric.md`).
5. **Log** the run: copy `results/TEMPLATE.md` to `results/<YYYY-MM-DD>-<label>.md` and fill it in.
   Convert relative dates to absolute; note which kit/knowledge version was tested.

## Scope of the first golden set

Five "build" prompts across the real component surface (dashboard, login, table, detail, assistant)
plus one adversarial **gap-probe** that must be *reported, not invented*. They are chosen so a
faithful agent can succeed with **shipped** components — the eval measures *aesthetic fidelity and
correct gap-handling*, not raw component coverage. Coverage gaps are logged separately (they feed the
component roadmap, not the aesthetic score).

## Files

- `golden-set.md` — the prompts (verbatim + intent + expected components + known gaps to watch).
- `rubric.md` — scoring dimensions, anchors, gates, verdict bands, LLM-judge prompt.
- `results/` — one file per run; the trend line lives here.
- `next-steps.md` — prioritized plan for the next session (updated after each run).

## Honest limitations (do not silently ignore)

- **Judging is subjective** until the rubric is calibrated across a few human-scored runs. Record
  disagreements; tighten the anchors in `rubric.md` when they recur.
- **Screenshots depend on the app shell.** A missing background (see SETUP.md trap) will tank
  *every* score for reasons unrelated to the agent — verify the harness before blaming the output.
- **Five prompts is a floor, not a suite.** Expand only when a real failure mode isn't covered;
  more prompts cost re-run time on every iteration.
