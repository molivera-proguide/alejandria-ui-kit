---
id: modal
name: Modal
category: overlay
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Modal.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Modal

aliases:
  - diálogo de confirmación
  - confirm dialog
  - modal de confirmación
  - alertdialog
keywords:
  - Modal
  - dialog
  - alertdialog
  - confirmación
  - confirm
  - cancel
  - backdrop
  - ModalProps
  - ModalAction
tags:
  - overlay
  - feedback
  - presentational
  - molecule

last_reviewed: 2026-08-07
---

# Modal

## Purpose

Diálogo de confirmación de acción (título + texto + 2 acciones configurables) con backdrop,
alineado con la sección **ALERT § "Confirmación de acción"** del PDF de referencia (p.22).

Describe:

- **Responsabilidad principal:** presentar un mensaje de confirmación bloqueante con dos
  acciones (ej. confirmar/cancelar) y notificar al consumidor de la intención de cerrarse.
- **Problema que resuelve:** resuelve el gap **Modal/Dialog** que
  `knowledge/component-roadmap.md` marcaba como High priority — no existía un diálogo
  bloqueante en el kit (`AlertBanner` es un banner inline no bloqueante, distinto).
- **Alcance:** solo la variante "Confirmación de acción" de la p.22 del PDF. Las otras dos
  cajas de esa misma página ("Alert Sigcat", "Tarea realizada") son notificaciones, no
  diálogos, y quedan fuera de esta implementación.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` v3 p.22
"ALERT" § "Confirmación de acción". Verificado con render directo (PyMuPDF `get_pixmap()`)
tras encontrarse que el fondo/color de texto reales discrepaban de la leyenda de la propia
página — ver Changelog.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

## This component guarantees

- Renderiza un backdrop de pantalla completa (`.ds-modal-backdrop`, `position: fixed`) con
  el diálogo centrado (`role="alertdialog"`, `aria-modal="true"`).
- `title` se asocia vía `aria-labelledby`; `description` vía `aria-describedby`.
- `secondaryAction` se renderiza primero (ej. "cancelar"), `primaryAction` segundo (ej.
  "confirmar") — ambas como `<button>` reales con su propio `onClick`.
- Presionar `Escape` o hacer click en el backdrop (fuera del diálogo) invoca `onClose` si
  está definido.
- **No gestiona su propia visibilidad** — es un componente controlado/presentacional: el
  consumidor decide cuándo renderizarlo (o no) según su propio estado; `onClose` /
  `secondaryAction.onClick` / `primaryAction.onClick` son callbacks que el consumidor debe
  usar para dejar de renderizar el `Modal`, no un mecanismo de auto-cierre.
- Fusiona `className` externa con `ds-modal` en el diálogo raíz; repasa atributos nativos de
  `HTMLAttributes<HTMLDivElement>` (menos `title`, que es una prop tipada propia).

## This component never

- Se cierra por su cuenta al hacer click en sus acciones o en el backdrop — solo invoca los
  callbacks (`onClose`, `secondaryAction.onClick`, `primaryAction.onClick`); dejar de
  renderizarlo es responsabilidad del consumidor. **Una story o demo que no wire esos
  callbacks a un estado de visibilidad no va a mostrar ningún cambio visual al clickear** —
  no es un bug del componente.
- Implementa focus trap completo (no exigido por el spec del PDF; ver Known Limitations).
- Anima la aparición/desaparición — no hay transición de entrada/salida implementada.
- Cubre las variantes "Alert Sigcat" ni "Tarea realizada" de la misma página del PDF — son
  notificaciones, no diálogos, y no forman parte de este componente.

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- El consumidor **debe** controlar la visibilidad del `Modal` externamente (renderizado
  condicional) y usar `onClose`/las acciones para actualizar ese estado — el componente no
  lo hace por sí mismo (ver Behavioral Contract).
- Proveer `title`, `description`, `secondaryAction` y `primaryAction` — las 4 son
  requeridas, no hay valores por defecto.

## Forbidden

- Usar `Modal` para notificaciones no bloqueantes — usar `AlertBanner` en su lugar.
- Asumir que existe algún mecanismo de auto-cierre por temporizador o por click en las
  acciones — no existe.
- Reemplazar el patrón confirm/cancel por más de 2 acciones — la API solo admite
  `primaryAction`/`secondaryAction`.

## Recommendations

- Envolver el renderizado condicional del `Modal` en el propio estado de la app (ej.
  `isConfirmOpen && <Modal ... onClose={() => setIsConfirmOpen(false)} />`).
- Usar `primaryAction` para la acción que efectivamente ejecuta la operación irreversible, y
  `secondaryAction` para cancelar — coincide con el orden de renderizado (secundaria
  primero, primaria segunda) del PDF.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Overlay |
| Package | @alejandria/ui-kit |
| Import | `import { Modal } from "@alejandria/ui-kit"` |

---

# Public API

```tsx
import {
  Modal,
  type ModalProps,
  type ModalAction
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Modal` — componente funcional.
- `ModalProps` — props del componente.
- `ModalAction` — forma de `primaryAction`/`secondaryAction` (`{ label, onClick }`).

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título del diálogo (PDF: "¿ESTÁS SEGURO DE ESTA ACCIÓN?"). |
| `description` | `string` | — | sí | Texto explicativo bajo el título. |
| `secondaryAction` | `ModalAction` | — | sí | Acción renderizada primero (ej. "cancelar"). |
| `primaryAction` | `ModalAction` | — | sí | Acción renderizada segunda (ej. "confirmar"). |
| `onClose` | `() => void` | — | no | Se dispara al hacer click en el backdrop o presionar `Escape`. **No cierra el Modal por sí mismo** — ver Behavioral Contract. |
| `...props` | `HTMLAttributes<HTMLDivElement>` (menos `title`) | — | no | Atributos nativos del diálogo raíz. |

### ModalAction

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | sí | Texto del botón. |
| `onClick` | `() => void` | sí | Handler de click. |

---

# Variants

Una sola variante pública — "Confirmación de acción" (PDF p.22). No hay prop `variant`.

---

# States

| State | Description |
|--------|-------------|
| Abierto | Único estado visual — el `Modal` se renderiza siempre completo mientras el consumidor lo monte. No hay estado interno de apertura/cierre. |

---

# Layout (PDF p.22 "Confirmación de acción")

| Nivel | Elemento DOM | Prop / origen |
|-------|--------------|---------------|
| 1 | `div.ds-modal-backdrop` | fijo, cubre viewport |
| 2 | `h2.ds-modal__title` | `title` |
| 3 | `p.ds-modal__text` | `description` |
| 4 | `hr.ds-modal__divider` | fijo |
| 5 | `div.ds-modal__actions` → 2 `<button>` | `secondaryAction`, `primaryAction` (en ese orden) |

Diálogo: `width: 325px` (calibrado ÷2 — PDF 650×310pt @2×).

---

# Accessibility

## Requirements

- `role="alertdialog"`, `aria-modal="true"` en el diálogo raíz.
- `aria-labelledby`/`aria-describedby` conectan título y texto vía `useId`.
- Cierra con `Escape` (listener global mientras el componente está montado).
- Click en el backdrop (fuera del diálogo) invoca `onClose`.
- Ambas acciones son `<button type="button">` nativos — foco y activación por teclado
  nativos.

## No implementado (ver Known Limitations)

- Focus trap (el foco no queda forzado dentro del diálogo).
- Devolución de foco automática al elemento que abrió el diálogo tras cerrarse.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="alertdialog"` | Diálogo raíz. |
| `aria-modal="true"` | Diálogo raíz. |
| `aria-labelledby` | Referencia al `id` de `title`. |
| `aria-describedby` | Referencia al `id` de `description`. |

### Keyboard

| Key | Action |
|-----|--------|
| `Escape` | Invoca `onClose` (no cierra el `Modal` por sí mismo — ver Behavioral Contract). |
| `Tab` | Foco nativo entre los 2 botones de acción (sin trap — el foco puede salir del diálogo). |

---

# Responsive Behavior

Sin media queries propias. `width: 325px` fijo, con `padding: var(--ds-space-4)` en el
backdrop que actúa como margen de seguridad en viewports angostos.

---

# Composition

## Purpose in Layout

- **Overlay** — diálogo bloqueante sobre el resto de la interfaz.

## Parent

- Montado condicionalmente por el consumidor, típicamente en el nivel más alto de la vista
  o app (no anidado dentro de otro componente de layout del kit).

## Children

- No admite `children` — el contenido es fijo (`title`, `description`, 2 acciones).

## Siblings

- `AlertBanner` — notificación inline no bloqueante; no reemplaza a `Modal` ni viceversa.

## Alternatives

- `AlertBanner` — para mensajes que no necesitan bloquear la interacción del usuario.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `AlertBanner` | Notificación inline; distinta de `Modal` por diseño (bloqueante vs. no bloqueante) — nombre `Modal` elegido deliberadamente para no confundir con `Alert`. |

---

# Content Guidelines

## Labels

- `title`: pregunta o afirmación corta en mayúsculas (vía CSS), ej.
  `"¿ESTÁS SEGURO DE ESTA ACCIÓN?"`.
- `description`: explicación breve de la consecuencia de la acción.
- `secondaryAction.label` / `primaryAction.label`: verbos de acción en mayúsculas (vía CSS),
  ej. `"CANCELAR"` / `"CONFIRMAR"`. El PDF usa placeholders genéricos ("ACCIÓN A"/"ACCIÓN
  B"), no literal.

## Values

- No aplica — sin campos de datos.

## Icons

- No aplica — `Modal` no renderiza iconos.

## Localization

- Las stories usan español; el componente no impone idioma.

---

# Examples

## Confirmación de acción, controlado por el consumidor

```tsx
const [isOpen, setIsOpen] = useState(false);

{isOpen && (
  <Modal
    title="¿ESTÁS SEGURO DE ESTA ACCIÓN?"
    description="Esta acción es irreversible; la elección realizada afectará el resultado definitivo y no podrá deshacerse."
    secondaryAction={{ label: "CANCELAR", onClick: () => setIsOpen(false) }}
    primaryAction={{ label: "CONFIRMAR", onClick: () => { doTheThing(); setIsOpen(false); } }}
    onClose={() => setIsOpen(false)}
  />
)}
```

---

# Reasoning Examples

## User Request

Confirmar antes de ejecutar una acción irreversible (ej. eliminar un registro).

### Recommended Components

- `Modal`

### Why

PDF p.22 "Confirmación de acción" — único componente del kit con patrón confirm/cancel
bloqueante.

---

## User Request

Mostrar una notificación no bloqueante tras completar una acción.

### Recommended Components

- `AlertBanner`

### Why

`Modal` bloquea la interacción y requiere 2 acciones explícitas; `AlertBanner` es para
feedback inline que no necesita confirmación del usuario.

---

# Design Tokens

| Token / value | Category | Usage |
|---------------|----------|-------|
| `--ds-color-pdf-action` (`#494949`) | color | Fondo del diálogo — **corregido**, la leyenda del PDF dice `#060606` pero el render compuesto de la página mide `#494949` (ver Changelog). También fondo permanente de `primaryAction` (`--primary`), que por eso se funde con el diálogo. |
| `--ds-color-pdf-border` (`#606060`) | color | Borde del diálogo |
| `--ds-color-white` (`#ffffff`) | color | Título, texto de acciones |
| `--ds-color-pdf-ink-bright` (`#f6f6f6`) | color | Texto de descripción — **corregido**, leyenda dice `#c1c1c1` pero el span medido es `#f6f6f6` |
| `--ds-color-pdf-ink-muted` (`#8a8b87`) | color | Línea separadora; fondo permanente de `secondaryAction` (base, sin `--primary`) — **corregido 2026-08-10**, antes solo era el fondo `:hover` de ambas acciones (ninguna tenía fill en reposo) |
| `--ds-font-display` | typography | Título (Source Code Bold) |
| `--ds-font-body` | typography | Texto de descripción y acciones |

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
packages/ui/src/components/Modal.tsx
```

## Dependencies

- `cn()` de `packages/ui/src/utils/cn.ts`
- `styles.css` (`.ds-modal*`)

## DOM Structure

```text
div.ds-modal-backdrop
└── div.ds-modal[role=alertdialog][aria-modal=true]
    ├── h2.ds-modal__title
    ├── p.ds-modal__text
    ├── hr.ds-modal__divider
    └── div.ds-modal__actions
        ├── button.ds-modal__action (secondaryAction)
        └── button.ds-modal__action--primary (primaryAction)
```

---

# Known Limitations

- Sin focus trap — el foco puede salir del diálogo con `Tab` mientras está "abierto".
- Sin devolución automática de foco al cerrarse.
- **No se auto-cierra.** La story actual (`Modal.stories.tsx` → `ConfirmacionDeAccion`) pasa
  callbacks vacíos (`onClick: () => {}`) y no wirea `onClose` a ningún estado de
  visibilidad — clickear el backdrop o cualquier acción en esa story no produce ningún
  cambio visual, por diseño del componente controlado, no por un bug. Ver `DECISIONS.md`
  y `specs/001-form-modal/checklist.md` (CHK023).
- Sin tests unitarios ni de integración (sin framework de test instalado).
- **`primaryAction` (derecha) se funde visualmente con el fondo del modal en reposo** (fondo
  `#494949`, igual al de `.ds-modal` — "invisible" hasta el hover). `secondaryAction`
  (izquierda) tiene el fill permanente `#8a8b87`, más visible. Esto viene directo de lo medido
  en PDF p.22 (`get_drawings()`: dos fills opacos simultáneos, no una lectura de hover) — no
  es un bug, pero significa que si un consumidor usa `primaryAction` para "confirmar" (el
  ejemplo recomendado en Constraints), ese botón queda menos visible en reposo que
  `secondaryAction`/"cancelar". Corregido 2026-08-10 — antes ambos botones eran transparentes
  en reposo (ninguno mostraba este contraste). Ver `.spec.md` § Deltas.

---

# Future Improvements

- [ ] Focus trap + devolución de foco, si un futuro consumidor lo requiere.
- [ ] Story de demo que wiree visibilidad real (útil para QA manual en Storybook, no
  cambia el componente en sí).

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial (confirm/cancel, Escape + backdrop-click via `onClose`, `role="alertdialog"`), feature `001-form-modal`. Resuelve el gap Modal/Dialog de `knowledge/component-roadmap.md`. |
| 0.1.0 | **Corrección de color tras render real (2026-08-07):** la leyenda de texto de la página p.22 decía fondo `#060606` y texto `#c1c1c1`, pero el sampling de píxeles compuestos (`get_pixmap()`, 128 puntos sobre la caja "Confirmación de acción") midió `#494949` y `#f6f6f6` respectivamente — coincidiendo exactamente con las otras 2 cajas de la misma página ("Alert Sigcat"/"Tarea realizada"). El path propio de la caja (`get_drawings()`) sí reporta `#060606` como su fill nativo, pero algún dimming/overlay a nivel de página lo aclara en el render final — se priorizó el píxel final compuesto (lo que Luna ve en Storybook) sobre el fill crudo de la forma. |
| 0.1.1 | **Fidelity pass de geometría 2026-08-10:** `font-size` de las acciones estaba sin declarar (heredaba el default del browser, ~2× oversized) — ahora `7px` (medido). La lectura "un botón es hover, no dos colores permanentes" (2026-08-07) resultó incorrecta al medir `get_drawings()`: los 2 rects de "ACCIÓN A"/"ACCIÓN B" tienen fills opacos simultáneos (`#8a8b87` izquierda, `#494949` derecha) — dos colores permanentes reales, no una captura de estado hover (un PDF plano no puede renderizar hover y reposo a la vez). `.ds-modal__action--primary` ya existía en `Modal.tsx` sin regla CSS propia — se le agregó el fill `#494949`; la acción base (secundaria) pasó a `#8a8b87` permanente. También corregidas las labels invertidas de la demo en `Modal.stories.tsx` ("ACCIÓN B" aparecía a la izquierda; el PDF muestra "ACCIÓN A" a la izquierda). |
