# Setup — generating Alejandría UI with your AI agent

Prereqs: `@alejandria/ui-kit` installed (tarball or git — see the package README) with
`react`/`react-dom` >= 18.2.

## 1. Import the stylesheet at your app root
```tsx
import "@alejandria/ui-kit/style.css";
```

## ⚠️ Import order (Tailwind / Next.js / any CSS reset)
Import `@alejandria/ui-kit/style.css` **after** your framework's base/reset CSS (Tailwind's
`@import "tailwindcss"`, your `globals.css`, etc.). The kit ships its component styles in a cascade
layer (`@layer ds.components`), and **CSS layer order beats specificity** — so if the kit stylesheet
is declared *before* Tailwind, Tailwind's preflight resets (`*` border/margin/padding, `button`
background) win over the kit and strip its borders, padding, and backgrounds.

```tsx
// layout.tsx (Next) or your entry — kit CSS LAST
import "./globals.css";                 // Tailwind + your base/preflight
import "@alejandria/ui-kit/style.css";  // ← after, so ds.components wins
```
Symptom of the wrong order: cards/fields/buttons render unstyled or cramped (no borders, no padding,
transparent buttons).

## 2. Add the AI entrypoint
Copy the shipped template to your repo root as `AGENTS.md`:
```bash
cp node_modules/@alejandria/ui-kit/knowledge/consumer/AGENTS.template.md ./AGENTS.md
```
Most agents (Cursor, Claude Code, …) read a root `AGENTS.md` automatically.

### Wire into your tool (optional)
- **Cursor:** add `.cursor/rules/alejandria.mdc` with `alwaysApply: true` pointing at `AGENTS.md`
  (or paste the template's content).
- **Claude Code:** reference `AGENTS.md` from `CLAUDE.md`, or copy the template there.

## 3. (Optional) Vendor the knowledge for offline use
`AGENTS.md` points at `node_modules/@alejandria/ui-kit/knowledge/`. To work offline or pin a version,
copy that folder into your repo (e.g. `docs/alejandria/knowledge/`) and update the path in `AGENTS.md`.

## 4. Ask for UI
Prompt normally ("build an operations dashboard with KPI cards and a task board"). Your agent reads
the knowledge, reuses `@alejandria/ui-kit` components, and reports missing primitives instead of
inventing them.
