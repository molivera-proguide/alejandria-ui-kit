# Building UI with @alejandria/ui-kit

> Copy this file to your repo root as `AGENTS.md` (or wire it into your tool — see
> `node_modules/@alejandria/ui-kit/knowledge/consumer/SETUP.md`). It tells your AI how to generate
> product UI that looks like Alejandría using the installed `@alejandria/ui-kit` package.

## Your role
You build **product UI** by consuming `@alejandria/ui-kit`. You do **not** modify or redesign the
design system. Your goal is UI that looks Alejandría — dark teal operational consoles, the system's
hierarchy, spacing, and tokens — achieved by reusing the kit's components and styles.

## Non-negotiable invariants
1. Import components/icons from the package, and load its stylesheet once at your app root:
   ```tsx
   import { Button, MetricCard, BuscarIcon } from "@alejandria/ui-kit";
   import "@alejandria/ui-kit/style.css"; // tokens (--ds-*) + fonts = the Alejandría look
   ```
2. **Reuse** existing components. Compose them; don't reimplement their look in local CSS.
3. **Report, don't invent.** If the UI needs a primitive the kit doesn't export, say so and stop —
   don't fabricate a fake `@alejandria/ui-kit` component or hand-clone its styling. Use local markup
   only where a documented pattern already does.
4. Any custom value uses design tokens (`var(--ds-*)`), never hardcoded colors/spacing.
5. Icons are URL strings — render as `<img src={XIcon} alt="" width={..} height={..} />`.

## Read the design-system knowledge first
The knowledge ships inside the installed package at:
```
node_modules/@alejandria/ui-kit/knowledge/
```
(Offline / vendored fallback: copy that folder into your repo, e.g. `docs/alejandria/knowledge/`,
and read from there instead.)

Start at `knowledge/index.md` and **follow its resolution order** ("Navigation instructions for AI
agents" / "Suggested resolution order for a UI task") for every UI task — it routes you through
selection → patterns/screens → component docs + specs → visual grammar → anti-patterns. Don't skip
to code.

Note: `knowledge/agent-playbook.md`, the design-reference PDF, and any `packages/ui/src` path are
**internal/maintainer** references for building the design system — not available or needed here.

## Before done
- Every generated screen imports `@alejandria/ui-kit/style.css`.
- Components come from `@alejandria/ui-kit`; no reinvented primitives; gaps reported.
- Layout follows a documented pattern or the visual grammar; custom values use `--ds-*` tokens.
