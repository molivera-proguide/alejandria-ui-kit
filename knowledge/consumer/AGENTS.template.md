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
5. Icons are URL strings — render as `<img src={XIcon} alt="" width={..} height={..} />`. The kit
   ships a **domain-specific** set (investigation / modules / menu / cards); generic UI glyphs (arrow,
   plus, etc.) may be absent — that's an expected gap: omit the icon or report it, don't hand-draw a
   lookalike SVG. Pattern docs cite `lucide-react` icons as an **external/optional** dependency (used
   by the Storybook demos); install it only if you want that parity.

## App shell (make it look Alejandría)
`@alejandria/ui-kit/style.css` sets the design tokens and fonts but does **not** paint a page
background — components carry their own dark surfaces, so on a default page you'd get dark cards on
white. Give your app root the console backdrop using tokens:
```tsx
// your root layout / body wrapper
<div style={{ minHeight: "100vh", background: "var(--ds-color-surface)", color: "var(--ds-color-ink)" }}>
  {/* screens go here */}
</div>
```
Use `var(--ds-*)` tokens for shell spacing too (`--ds-space-1..6`); don't hardcode hex or px for
design values.

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
- The app shell sits on `var(--ds-color-surface)` with `var(--ds-color-ink)` text (style.css ships
  tokens + fonts, not a page background).
- Every generated screen imports `@alejandria/ui-kit/style.css`.
- Components come from `@alejandria/ui-kit`; no reinvented primitives; gaps reported.
- Layout follows a documented pattern or the visual grammar; custom values use `--ds-*` tokens.
