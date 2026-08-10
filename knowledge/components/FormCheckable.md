---
id: form-checkable
name: FormCheckable
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/FormCheckable.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/FormCheckable

aliases:
  - checkbox
  - radio
  - switch
  - toggle
  - checkable de formulario
keywords:
  - FormCheckable
  - checkbox
  - radio
  - switch
  - description
  - FormCheckableGroup
  - FormCheckableType
  - FormCheckableProps
tags:
  - forms
  - input
  - presentational
  - atom

last_reviewed: 2026-08-07
---

# FormCheckable

## Purpose

Control checkbox, radio o switch con label y descripción opcional, unificado bajo una sola
API, alineado con la sección **FORM - CHECKABLES** del PDF de referencia (p.19).

Describe:

- **Responsabilidad principal:** capturar una selección booleana (checkbox/switch) o de
  grupo (radio) con feedback visual inmediato, con o sin texto descriptivo bajo el label.
- **Problema que resuelve:** el PDF pide "versión simple y con bajada para todos los casos"
  para los 3 sub-tipos — un solo componente con prop `type` evita triplicar la mecánica de
  label+descripción.
- **Alcance:** wrapper sobre `<input type="checkbox"|"radio">` nativo (el `type="switch"`
  también usa `type="checkbox"` internamente, con estilos propios) — no controlado, estado
  nativo del navegador salvo que el consumidor pase `checked`/`onChange`.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` v3 p.19 "FORM -
CHECKABLES". Verificado en Storybook y, de forma independiente, en el sweep post-review de
`knowledge/fidelity-pass/next-steps.md` (2026-08-07) — 0 bugs encontrados, confirmó además
un fix de CSS hecho horas antes (ver Changelog).

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

## This component guarantees

- Renderiza un `<label>` que envuelve un `<input type="checkbox"|"radio">` nativo
  (visualmente oculto, `opacity: 0`) + un control visual (`.ds-form-checkable__control`) +
  el label y descripción opcional.
- `type="checkbox"` (default): control cuadrado; seleccionado → fondo `#ffffff`, check-glyph
  `#060606`.
- `type="radio"`: control circular; seleccionado → fondo `#ffffff`, punto sólido `#060606`.
- `type="switch"`: control tipo track/thumb; no seleccionado fondo `#606060` thumb
  `#ffffff`; seleccionado fondo `#ffffff` thumb `#060606`.
- `description` (opcional) renderiza un `<span>` bajo el label — cubre "versión ... con
  bajada" del PDF.
- Es un `<input>` nativo — foco, activación por teclado (`Espacio`) y toggling son
  comportamiento del navegador, no reimplementado en JS.
- Exporta también `FormCheckableGroup`, un wrapper `<fieldset>`/`<legend>` liviano para
  agrupar varias instancias bajo un título común (PDF: "Título grupo", ej. "ACCESO A
  MÓDULOS") — no reemplaza `FormCheckable`, solo agrupa visualmente.

## This component never

- Gestiona estado de grupo (radio) por su cuenta — el agrupamiento (`name` compartido) es
  responsabilidad del consumidor, igual que con radios nativos.
- Valida que al menos una opción esté seleccionada en un grupo.
- Anima la transición entre seleccionado/no seleccionado más allá de `transform`/
  `background-color` del thumb del switch.
- Sincroniza `FormCheckableGroup` con la selección de sus hijos — es puramente estructural
  (título + contenedor).

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- Compartir `name` entre instancias `type="radio"` que deban comportarse como grupo
  mutuamente excluyente (comportamiento nativo de `<input type="radio">`).
- Usar `defaultChecked` (no controlado) o `checked`+`onChange` (controlado) — nunca
  `checked` sin `onChange` (el input queda de solo lectura, comportamiento estándar de
  React con inputs nativos, no un bug del componente).

## Forbidden

- Inventar un 4to `type` — solo `"checkbox" | "radio" | "switch"`.
- Usar `FormCheckableGroup` como contenedor genérico de cualquier contenido — solo agrupa
  instancias de `FormCheckable`.

## Recommendations

- Pasar `description` únicamente cuando el PDF/contexto lo pida (ej. explicar el alcance de
  un rol: "Este usuario solo podrá editar el contenido pero no aprobarlo").
- Usar `FormCheckableGroup` con `title` en mayúsculas explícito (el CSS lo mayusculiza, pero
  mantener la fuente en Title/Sentence case en la prop mejora la legibilidad del código).

---

# Category

| Field | Value |
|--------|-------|
| Type | atom |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Import | `import { FormCheckable, FormCheckableGroup } from "@alejandria/ui-kit"` |

---

# Public API

```tsx
import {
  FormCheckable,
  type FormCheckableProps,
  type FormCheckableType,
  FormCheckableGroup,
  type FormCheckableGroupProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `FormCheckable` — componente funcional (`forwardRef<HTMLInputElement>`).
- `FormCheckableProps` — props del componente.
- `FormCheckableType` — unión `"checkbox" | "radio" | "switch"`.
- `FormCheckableGroup` — wrapper de agrupamiento visual.
- `FormCheckableGroupProps` — props del wrapper.

---

# Props

## FormCheckable

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Texto junto al control. |
| `description` | `string` | — | no | Bajada opcional bajo el label. |
| `type` | `FormCheckableType` | `"checkbox"` | no | `"checkbox"`, `"radio"` o `"switch"`. |
| `...props` | `InputHTMLAttributes<HTMLInputElement>` (menos `type`) | — | no | Atributos nativos del `<input>` (`checked`, `defaultChecked`, `onChange`, `disabled`, `name`, `id`, `aria-*`). |

## FormCheckableGroup

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | sí | Título del grupo (PDF: "Título grupo", ej. "ACCESO A MÓDULOS"). |
| `children` | `ReactNode` | sí | Instancias de `FormCheckable`. |
| `...props` | `HTMLAttributes<HTMLFieldSetElement>` | no | Atributos nativos del `<fieldset>`. |

---

# Variants

## `checkbox` (default)

Control cuadrado, check-glyph al seleccionar. Fondo `#ffffff` / selector `#060606`.

## `radio`

Control circular (`border-radius` pill), punto sólido al seleccionar. Mismos colores que
`checkbox`.

## `switch`

Track/thumb. No seleccionado: fondo `#606060`, thumb `#ffffff`. Seleccionado: fondo
`#ffffff`, thumb `#060606` (el thumb se desplaza vía `transform: translateX`).

---

# States

| State | Description |
|--------|-------------|
| No seleccionado | Estado nativo `unchecked`. |
| Seleccionado | Estado nativo `checked`. Colores invertidos según `type` (ver Variants). |
| Con bajada | `description` presente — línea adicional bajo el label. |
| Disabled | Atributo nativo `disabled` en el `<input>` — estilo heredado del navegador + `cursor: not-allowed` en el `<label>` (vía `cursor: pointer` base). |
| Focus visible | `:focus-visible` en el `<input>` aplica `box-shadow` (`--ds-focus-ring`) en el control visual. |

---

# Layout (PDF p.19)

| Nivel | Elemento DOM | Prop / origen |
|-------|--------------|---------------|
| 1 | `input` (oculto) + `span.ds-form-checkable__control` | `type` |
| 2 | `span.ds-form-checkable__label` | `label` |
| 3 | `span.ds-form-checkable__description` (opcional) | `description` |

`FormCheckableGroup`: `legend.ds-form-checkable-group__title` (`title`) sobre
`div.ds-form-checkable-group__items` (`children`).

---

# Accessibility

## Requirements

- `<input>` nativo real (no `div` simulando checkbox) — foco, `Tab`, activación por
  `Espacio` (checkbox/switch) o navegación de grupo (radio, comportamiento nativo del
  navegador con `name` compartido) son 100% nativos.
- `<label>` envuelve todo el control — click en cualquier parte del label activa el input.
- `FormCheckableGroup` usa `<fieldset>`/`<legend>` semánticos.

### ARIA

| Attribute | Usage |
|-----------|-------|
| — | No se agregan atributos ARIA adicionales — la semántica nativa de `<input>`/`<fieldset>`/`<legend>` es suficiente. |

### Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Foco nativo entre controles. |
| `Espacio` | Activa checkbox/switch enfocado (comportamiento nativo). |
| Flechas (dentro de un grupo `radio` con `name` compartido) | Navegación nativa del navegador entre radios del mismo grupo. |

---

# Responsive Behavior

Sin media queries propias. `display: inline-flex` — el ancho lo define el contenido/
contenedor padre.

---

# Composition

## Purpose in Layout

- **Input** — selección booleana o de grupo dentro de un formulario.
- **Container** (`FormCheckableGroup`) — agrupa varias instancias bajo un título común.

## Parent

- Cualquier contenedor de formulario del consumidor; `FormCheckableGroup` cuando se necesita
  título de grupo.

## Children

- `FormCheckable` no admite `children`. `FormCheckableGroup` admite instancias de
  `FormCheckable` como `children`.

## Siblings

- `FormTextInput`, `FormSelect`, `FormFileUpload`, `FormDatePicker` — misma familia visual y
  feature.
- `Switch` — componente switch de la familia console/teal existente, distinto en paleta y
  contexto de uso.

## Alternatives

- `Switch` — usar en superficies console/teal; no mezclar con `FormCheckable
  type="switch"` en la misma vista.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `FormCheckableGroup` | Wrapper de título de grupo, exportado desde el mismo módulo. |
| `Switch` | Equivalente funcional en la familia console/teal. |
| `FormTextInput` | Misma feature (`001-form-modal`), familia visual PDF. |

---

# Content Guidelines

## Labels

- Texto breve del rol/opción (ej. `"Admin"`, `"Editor"`, `"General"`).

## Values

- No aplica — el valor es el estado `checked` nativo del `<input>`.

## Icons

- Check-glyph SVG interno (checkbox) y punto/thumb vía CSS (radio/switch) — no
  configurables vía props.

## Localization

- Las stories usan español; el componente no impone idioma.

---

# Examples

## Checkbox simple

```tsx
<FormCheckable type="checkbox" label="Editor" />
```

## Radio con bajada, agrupado

```tsx
<FormCheckableGroup title="ACCESO A MÓDULOS">
  <FormCheckable
    type="radio"
    name="acceso-modulos"
    label="Admin"
    description="Este usuario tendrá accesos ilimitados a todas las funcionalidades de la plataforma"
  />
  <FormCheckable
    type="radio"
    name="acceso-modulos"
    label="Editor"
    description="Este usuario solo podrá editar el contenido pero no aprobarlo"
    defaultChecked
  />
</FormCheckableGroup>
```

## Switch

```tsx
<FormCheckable type="switch" label="Notificaciones activas" defaultChecked />
```

---

# Reasoning Examples

## User Request

Elegir un rol de acceso entre 3 opciones mutuamente excluyentes, cada una con su
descripción.

### Recommended Components

- `FormCheckableGroup` + `FormCheckable type="radio"` (×3, `name` compartido)

### Why

PDF p.19 "ACCESO A MÓDULOS" — radios agrupados con bajada, título de grupo.

---

# Design Tokens

| Token / value | Category | Usage |
|---------------|----------|-------|
| `--ds-color-white` (`#ffffff`) | color | Fondo del control seleccionado (checkbox/radio/switch) |
| `--ds-color-pdf-surface` (`#060606`) | color | Selector/thumb del control seleccionado |
| `--ds-color-pdf-border` (`#606060`) | color | Track del switch no seleccionado, borde de checkbox/radio |
| `--ds-color-pdf-form-muted` (`#8d8d8d`) | color | Título de grupo |
| `--ds-font-body` | typography | Label y descripción (Montserrat) |
| `--ds-font-mono` | typography | Título de grupo (Source Code Light) |
| `--ds-size-icon-md` | size | Dimensión del control checkbox/radio |
| `--ds-size-switch-track-w` / `-h` | size | Dimensiones del track del switch |

---

# Implementation Notes

> **Interno (mantenedores).** Las rutas de esta sección son fuente del monorepo; no forman
> parte de la API publicada de `@alejandria/ui-kit`.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/FormCheckable.tsx
```

## Dependencies

- `cn()` de `packages/ui/src/utils/cn.ts`
- `styles.css` (`.ds-form-checkable*`)

## DOM Structure

```text
label.ds-form-checkable.ds-form-checkable--{type}
├── input.ds-form-checkable__input (visualmente oculto)
├── span.ds-form-checkable__control
│   ├── svg.ds-form-checkable__check (solo checkbox)
│   └── span.ds-form-checkable__thumb (solo switch)
└── span.ds-form-checkable__copy
    ├── span.ds-form-checkable__label
    └── span.ds-form-checkable__description (solo si description)
```

`FormCheckableGroup`:

```text
fieldset.ds-form-checkable-group
├── legend.ds-form-checkable-group__title
└── div.ds-form-checkable-group__items
    └── {children}
```

---

# Known Limitations

- Sin lógica de grupo propia para `radio` — depende enteramente de compartir `name`
  (comportamiento nativo del navegador, no reimplementado).
- Sin tests unitarios ni de integración (sin framework de test instalado).
- `FormCheckableGroup` no valida que sus `children` sean instancias de `FormCheckable`.

---

# Future Improvements

- [ ] Prop de error a nivel `FormCheckableGroup` (ej. "elegí al menos una opción") si un
  futuro consumidor lo necesita — no pedido por el PDF ni por `input.md` hoy.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial (`checkbox`/`radio`/`switch`, `description` opcional, `FormCheckableGroup`), feature `001-form-modal`. |
| 0.1.0 | Bug de CSS encontrado y corregido antes de commit (2026-08-07): el estado `:checked` del switch heredaba la regla `::after` (punto oscuro) de checkbox/radio, pintando un punto dentro del thumb que el PDF no muestra — corregido acotando esa regla a `--checkbox`/`--radio` únicamente. Confirmado sin bugs adicionales en el sweep PyMuPDF post-review de p.19 (checkbox/radio/switch verificados pixel-a-pixel). |
