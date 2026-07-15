# Setup — generating Alejandría UI with your AI agent

Prereqs: `@alejandria/ui-kit` installed (tarball or git — see the package README) with
`react`/`react-dom` >= 18.2.

## 1. Import the stylesheet at your app root
```tsx
import "@alejandria/ui-kit/style.css";
```

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
