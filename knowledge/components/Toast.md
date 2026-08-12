---
id: toast
name: Toast
category: feedback
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Toast.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Toast

aliases:
  - Tarea realizada
  - notificación centrada
  - snackbar
keywords:
  - Toast
  - snackbar
  - notification
  - Tarea realizada
  - ToastProps
  - auto-dismiss
tags:
  - feedback
  - presentational
  - molecule

last_reviewed: 2026-08-11
---

# Toast

## Purpose

- **Responsabilidad principal:** notificación centrada, temporal, de auto-dismiss —
  confirma que una acción se completó, sin requerir interacción del usuario.
- **Problema que resuelve:** el PDF de referencia ("ALERT" p.22 § "Tarea realizada",
  "Se creó una tarea con éxito") tiene esta pieza como notificación propia, distinta
  de `AlertBar` (franja persistente) y `AlertBanner` (tarjeta inline). No existía en
  el kit — gap ya trackeado en `drafts/pantallas-grupo-a-b.md` § p.20 antes de esta
  feature.
- **Alcance:** un solo tono (`success`), auto-dismiss a los 4000ms, sin botón de
  cierre — el PDF no muestra ninguno.

Exclude: API details, implementation details, usage examples, composition.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` p.22
"ALERT" § "Tarea realizada". Medido 2026-08-11 vía `get_drawings()`/`get_text("dict")`.

---

# Behavioral Contract

## This component guarantees

- Renderiza `message` centrado (`position: fixed`, `role="status"`).
- Dispara `onDismiss` automáticamente a los `durationMs` (default 4000ms) vía
  `useEffect`+`setTimeout` interno.
- **No gestiona su propia visibilidad** — mismo criterio que `Modal`: el consumidor
  decide cuándo montarlo/desmontarlo; `onDismiss` es el callback para dejar de
  renderizarlo, el componente no se auto-desmonta.
- Limpia el `setTimeout` en cleanup (`useEffect` return) — no dispara `onDismiss`
  después de desmontado.
- Fusiona `className` externa; repasa atributos nativos de
  `HTMLAttributes<HTMLDivElement>` (menos `children`, no aplica).

## This component never

- Muestra un botón de cierre manual — el PDF no lo especifica.
- Soporta tonos distintos de `success` — fuera de scope de `005-alert-toast-filter`
  (el PDF solo muestra un ejemplo).
- Se cierra por click ni por teclado — solo por el timer.

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- El consumidor **debe** controlar el montaje/desmontaje externamente y usar
  `onDismiss` para actualizar ese estado (mismo patrón que `Modal.onClose`).
- Proveer `message` — única prop requerida.

## Forbidden

- Asumir que el componente se desmonta solo — no existe ese mecanismo, solo
  dispara el callback.
- Usarlo para notificaciones persistentes — usar `AlertBar`.

## Recommendations

- Envolver el renderizado condicional en el propio estado de la screen (ej.
  `showToast && <Toast message="…" onDismiss={() => setShowToast(false)} />`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Feedback |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/Toast.tsx |

---

# Public API

```tsx
import { Toast, type ToastProps } from "@alejandria/ui-kit";
```

Tipos exportados:

- `Toast` — componente funcional.
- `ToastProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `message` | `string` | — | sí | Texto centrado de la notificación. |
| `durationMs` | `number` | `4000` | no | Tiempo antes de disparar `onDismiss`. |
| `onDismiss` | `() => void` | — | no | Se dispara al terminar `durationMs`. **No desmonta el componente** — ver Behavioral Contract. |
| `...props` | `HTMLAttributes<HTMLDivElement>` (menos `children`) | — | no | Atributos nativos de la notificación raíz. |

---

# Variants

Una sola variante — sin prop `tone` (a diferencia de `AlertBar`). Ver Known
Limitations.

---

# States

| State | Description |
|--------|-------------|
| Montado | Único estado visual mientras el consumidor lo renderiza; el timer corre en background hasta disparar `onDismiss`. |

---

# Accessibility

## Requirements

- `role="status"` — anuncia el mensaje a lectores de pantalla sin robar el foco.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="status"` | Fijo en la notificación raíz. |

### Keyboard

Ninguno — no hay foco ni interacción de teclado (sin botón de cierre).

---

# Responsive Behavior

`left: 50%; transform: translateX(-50%)` centra horizontalmente sin importar el
ancho del viewport — sin breakpoints adicionales.

---

# Composition

## Purpose in Layout

- Notificación de confirmación, superpuesta a cualquier contenido (`position: fixed`,
  `z-index: 100`).

## Parent

- Cualquiera — se posiciona respecto al viewport, no a su contenedor DOM.

## Children

- Ninguno — solo texto (`message`).

## Siblings

- No aplica — flota sobre el resto del contenido.

## Alternatives

- `AlertBar` — franja persistente, sin auto-dismiss.
- `AlertBanner` — notificación inline con ícono/descripción/acción.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `AlertBar` | Misma familia visual del PDF "ALERT" p.22, ciclo de vida distinto (persistente vs. temporal). |
| `Modal` | Mismo patrón de "no gestiona su propia visibilidad" (`onClose`/`onDismiss` como callback, no auto-cierre por click). |

---

# Content Guidelines

## Labels

No aplica.

## Values

- `message` es texto libre, sin i18n propio del componente.

## Icons

No aplica — sin slot de ícono.

## Localization

No aplica.

---

# Examples

## Basic

```tsx
<Toast message="Se creó una tarea con éxito" />
```

## Variant

```tsx
<Toast message="Se creó una tarea con éxito" durationMs={6000} onDismiss={() => setVisible(false)} />
```

## Composition

```tsx
{showToast ? (
  <Toast message="Se creó una tarea con éxito" onDismiss={() => setShowToast(false)} />
) : null}
```

---

# Reasoning Examples

## User Request

"Necesito confirmar visualmente que se creó una tarea, sin que el usuario tenga que
cerrar nada."

### Recommended Components

- `Toast`

### Why

Coincide 1:1 con "Tarea realizada" del PDF — notificación centrada, auto-dismiss,
sin botón de cierre. `AlertBanner`/`Modal` requieren interacción o quedan fijos, no
aplican acá.

---

# Design Tokens

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-surface` | Color | Fondo (`#060606`) |
| `--ds-color-pdf-border` | Color | Borde (`#606060`) |
| `--ds-color-white` | Color | Texto |
| `--ds-font-mono` | Typography | Familia del texto (Source Code) |
| `--ds-font-weight-bold` | Typography | Peso del texto |
| `--ds-border-width-hair` | Border | Ancho del borde (0.75px) |
| `--ds-radius-xs` | Border | Radio de esquina |

---

# Implementation Notes

## Source File

```text
packages/ui/src/components/Toast.tsx
```

## Dependencies

- `../utils/cn` — merge de `className`.
- `react` (`useEffect`) — timer de auto-dismiss.

## DOM Structure

```text
<div class="ds-toast" role="status">
  {message}
</div>
```

---

# Known Limitations

- **Un solo tono (`success`).** Fuera de scope de `005-alert-toast-filter` — el PDF
  solo muestra un ejemplo, sin evidencia de error/warning/info.
- **Padding/posición exacta aproximados, no medidos del PDF.** La spec anotada solo
  da colores y tipografía — `top: 24px`, `padding: 10px 20px` son valores
  razonables, no una medida ÷2 citable. Ver `knowledge/specs/components/Toast.spec.md`.
- **`durationMs` de 4000ms es una decisión de producto, no una medida del PDF** —
  confirmada explícitamente con Luna durante `/sdd-refine`, no inferida.

---

# Future Improvements

- [ ] Tonos adicionales (error/warning/info) si el kit los necesita más adelante.
- [ ] Botón de cierre manual, si algún consumidor lo pide (el PDF no lo muestra).

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Creación — `005-alert-toast-filter`, PDF "ALERT" p.22 § "Tarea realizada". |
