---
id: carga-de-formulario-screen
name: Carga de Formulario
category: screen
status: draft
storybook: Alejandria/Screens/CargaDeFormulario
source: packages/ui/src/screens/carga-de-formulario/CargaDeFormulario.stories.tsx
layout: fullscreen
last_reviewed: 2026-08-07
---

# Carga de Formulario

## Purpose

Fullscreen data-entry screen — collapsed `SideBar` nav rail + a 3-column form composed
entirely from the `001-form-modal` field primitives (`FormTextInput`, `FormSelect`,
`FormCheckable`, `FormFileUpload`, `FormDatePicker`). First screen built in the new
`knowledge/screens/` + `packages/ui/src/screens/` layer as a proof of concept: every piece
it uses was already built and fidelity-checked before this composition — zero new
components, zero gaps.

**Source:** "Alejandria - Agosto 2026.pdf" p.19 (a separate, larger composed-screens PDF —
kept external, not committed to the repo; see `knowledge/component-roadmap.md` § "Screens
triage" and `DECISIONS.md`, 2026-08-07, for why).

**Not a literal 1:1 port.** The PDF page is a **field gallery** in disguise: it shows
several UI alternatives for the same semantic field side by side (`FormSelect` vs. a
`FormCheckable` radio group for "tipo de usuario"; checkbox vs. switch for "acceso a
módulos") plus every interaction state (error, multiselect, calendar/hour open, file
list) at once — a spec-sheet page, not a screen any real user would see mid-interaction.
This composition keeps that same field variety (it's genuinely useful as a live reference
of every sub-variant in one place) but renders each field in a **resting** state instead of
forcing multiple dropdowns open simultaneously, which isn't a real resting state of any of
these components and would visually collide in a 3-column layout.

## User goals

- See every field-level building block of the `Form*` family composed in one real layout,
  not just in isolated per-component stories.
- Reference how `FormCheckable` reads as radio (simple and with description), checkbox, and
  switch for conceptually similar "access" fields.
- Reference `FormTextInput`'s error state, `FormSelect`'s single/multiselect, `FormDatePicker`'s
  resting value display, and `FormFileUpload`'s mixed row/thumbnail file list, all together.

## Main regions

| Region | Contents |
|--------|----------|
| **Nav rail** | `SideBar`, `collapsed`, same item set as `SideBar.stories.tsx` (Mis tareas/Historial/Reportes/Catástrofes + Notificaciones badge/Mi cuenta/Configuración/Ayuda/Cerrar sesión) |
| **Title** | Plain `<h1>`, "Carga de formulario" |
| **Column 1** | `FormTextInput` NOMBRE/APELLIDO/DNI + `FormSelect` TIPO DE USUARIO + `FormCheckableGroup` TIPO DE USUARIO (radio, simple) + `FormCheckableGroup` TIPO DE USUARIO (radio, con bajada) + `FormCheckableGroup` ACCESO A MÓDULOS (checkbox, con bajada) |
| **Column 2** | `FormTextInput` DNI (error) + `FormSelect` TIPO DE USUARIO (single) + `FormSelect` TIPO DE USUARIO (multiselect) + `FormDatePicker` (FECHA+HORA) + checkbox list simple (sin bajada) + `FormTextInput` DESCRIPCIÓN (multiline, vacío) |
| **Column 3** | `FormCheckableGroup` ACCESO A MÓDULOS (switch, con bajada) + `FormFileUpload` (2 filas + 3 thumbnails) + `FormTextInput` DESCRIPCIÓN (multiline, con valor) |

Canvas: `--ds-color-pdf-surface` (`#060606`) background, `display: flex` (rail + main),
3-column CSS grid (`repeat(3, minmax(0, 1fr))`, `gap: 32px`) for the form body.

## Patterns used

None yet registered under `knowledge/patterns/` — this composition doesn't reuse an
existing pattern doc (it's the first screen in this family).

## Components used

`SideBar`, `FormTextInput`, `FormSelect`, `FormCheckable`, `FormCheckableGroup`,
`FormFileUpload`, `FormDatePicker`.

## Navigation

`SideBar` items have no `onClick` wired (static demo, same convention as
`SideBar.stories.tsx`'s `Expanded`/`Collapsed` stories) — this is a Storybook-only
composition, no routing.

## Responsive behavior

None. Fixed 3-column grid; narrow viewports will compress or overflow (same known
limitation as `Operations Console`).

## Accessibility considerations

- Title is a native `h1`.
- Every field relies on component-level semantics already documented in
  `knowledge/components/{FormTextInput,FormSelect,FormCheckable,FormFileUpload,FormDatePicker}.md`
  — this composition adds no new interactive behavior of its own.
- `SideBar` collapsed state: icon-only buttons, `aria-label` per item is inherited from the
  component (not overridden here).

## Known limitations

- Static demo data (`Juan Cruz`, fake `File` objects, fixed date) — no real submit handler.
- The duplicated "TIPO DE USUARIO" (`FormSelect` + 2× radio group) and "ACCESO A MÓDULOS"
  (checkbox ×2 + switch) fields are intentional — see "Not a literal 1:1 port" above — not
  a real product form's field set.
- No responsive layout.
- First screen in this layer; no shared "form screen" pattern extracted yet (would be
  premature with only one example — revisit once 2–3 more `Grupo A` screens from the
  triage exist, per `component-roadmap.md`).
