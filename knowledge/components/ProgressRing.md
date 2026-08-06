---
id: progress-ring
name: ProgressRing
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/ProgressRing.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/ProgressRing

aliases:
  - anillo de progreso
  - indicador circular
  - progress ring
keywords:
  - ProgressRing
  - progreso
  - avance
  - porcentaje
  - circular
  - tone
  - size
  - ProgressRingTone
  - ProgressRingSize
  - ProgressRingProps
tags:
  - data-display
  - indicators
  - presentational
  - atom

last_reviewed: 2026-08-06
---

# ProgressRing

Canonical design reference (default `variant="pdf"`): `knowledge/references/design-reference.pdf`
**page 9 — GRAFICOS › "Torta"** (`doc[8]`). `variant="console"` (opt-in, no longer the default as
of 2026-08-06) has no PDF reference — it's a "teal/console" component on the display-scale `rem`
convention (see `specs/README.md`'s scale-calibration section), unrelated to this PDF page; its
Storybook stories were removed at the user's request, but the code path itself is untouched.

## Purpose

Presenta un indicador circular de avance porcentual con valor central, etiqueta opcional y tono semántico. Por defecto (`variant="pdf"`, desde 2026-08-06) es el gauge de estado de GRAFICOS p.9 "Torta" — antes de esa fecha ese tipo de gráfico del PDF no tenía ningún componente asociado. `variant="console"` sigue existiendo (código sin cambios) para el sistema de consola sin referencia PDF, pero ya no tiene stories propias en Storybook.

Describe:

- **Responsabilidad principal:** mostrar un porcentaje de progreso (0–100) en un anillo visual con valor numérico destacado.
- **Problema que resuelve:** unificar la lectura de avance operativo (misión, riesgo, red) sin acoplar cálculo de progreso ni navegación. `variant="pdf"` además cubre el gauge de estado (rojo/ámbar/verde) que el PDF muestra para métricas como "Evacuados" en pantallas de reporting.
- **Alcance:** componente presentacional basado en `<div>`; el consumidor provee `value`, opcionalmente `label`, `tone`, `size` y `variant`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div class="ds-progress">` con modificadores `ds-progress--{tone}` y `ds-progress--{size}`.
- `value` acotado internamente al rango 0–100 mediante `Math.max(0, Math.min(100, value))` antes de renderizar y calcular estilos.
- Porcentaje visible en `<span class="ds-progress__value">` como `{clampedValue}%` (valor ya acotado).
- `label` renderizado en `<span class="ds-progress__label">` solo cuando `label` es truthy.
- `tone` por defecto `"neutral"`; `size` por defecto `"md"`.
- Variable CSS `--progress-value` en el estilo inline del nodo raíz, calculada como `{clampedValue * 3.6}deg` para el arco del `conic-gradient`.
- Fusión de `style` del consumidor con `--progress-value`; las props del consumidor en `style` pueden sobrescribir otras propiedades inline.
- Fusión de `className` externa con clases base mediante `cn()`.
- `role="img"` en el contenedor raíz.
- `aria-label` en el contenedor raíz: `"{label}: {clampedValue}%"` si `label` está presente; `"{clampedValue}%"` si no.
- Repaso de atributos nativos de `HTMLAttributes<HTMLDivElement>` al `<div>` raíz vía `...props` (`id`, `data-*`, etc.).

## This component never

- Calcula, anima ni actualiza progreso por sí mismo (solo refleja `value` recibido).
- Expone `forwardRef` ni reenvía ref al DOM.
- Usa `role="progressbar"`, `aria-valuenow`, `aria-valuemin` ni `aria-valuemax`.
- Compone internamente `Card`, `MetricCard`, `TaskCard`, `Badge` ni otros componentes del kit.
- Redondea el valor mostrado (refleja el número acotado tal cual, p. ej. `75.4` → `"75.4%"`).
- Soporta estado indeterminado ni valores fuera de 0–100 en la presentación (se acotan silenciosamente).
- Define media queries ni comportamiento responsivo propio.
- Renderiza iconos, tendencias ni texto de cambio (solo porcentaje y `label` opcional).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer `value` (prop obligatoria de tipo `number`); el componente lo acota a 0–100.

## Forbidden

- Inventar props que no existan en `ProgressRingProps` (`max`, `variant`, `showLabel`, `formatValue`, etc.).
- Asumir semántica de barra de progreso interactiva (`role="progressbar"` no está implementado).
- Usar `ProgressRing` como sustituto de `MetricCard` para KPIs textuales sin porcentaje circular.
- Usar `ProgressRing` dentro de `TaskCard` esperando integración (`TaskCard` usa barra lineal propia).
- Pasar `value` fuera de 0–100 esperando que se muestre sin acotar.

## Recommendations

- Usar `tone="warning"` con `label="avance"` para progreso de misión, según demos en `Card.stories.tsx`, `Components.stories.tsx` y `apps/web/src/App.tsx`.
- Colocar dentro de `Card` → `children` junto a métricas complementarias en grid, según `Card.stories.tsx` → `WithActionsAndFooter`.
- Usar `size="lg"` en paneles compuestos de consola (`Components.stories.tsx` → `OperationsConsole`).
- Elegir `tone` según semántica operativa: `success` (avance favorable), `warning` (misión), `danger` (riesgo), `neutral` (red/genérico), según `ProgressRing.stories.tsx` → `Tones`.

---

# Category

| Field | Value |
|--------|-------|
| Type | atom |
| Group | Indicators |
| Package | @alejandria/ui-kit |
| Import | `import { ProgressRing } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  ProgressRing,
  type ProgressRingProps,
  type ProgressRingTone,
  type ProgressRingSize,
  type ProgressRingVariant
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `ProgressRing` — componente función.
- `ProgressRingProps` — props del componente.
- `ProgressRingTone` — unión de tonos semánticos.
- `ProgressRingSize` — unión de tamaños.
- `ProgressRingVariant` — unión `"console" | "pdf"` (agregado 2026-08-06).

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `value` | `number` | — | sí | Porcentaje de progreso. Acotado internamente a 0–100. Alimenta el arco visual (`--progress-value`) y el texto `{value}%`. |
| `label` | `string` | — | no | Etiqueta bajo el porcentaje. Renderizada en `<span class="ds-progress__label">`. Incluida en `aria-label` si está presente. |
| `tone` | `ProgressRingTone` | `"neutral"` | no | Tono semántico del acento. Aplica clase `ds-progress--{tone}`. |
| `size` | `ProgressRingSize` | `"md"` | no | Tamaño del anillo. Escala `--ds-size-progress-pdf-*` + fuente inline (`pdf`) o clase `ds-progress--{size}` (`console`). |
| `variant` | `ProgressRingVariant` | `"pdf"` (desde 2026-08-06; antes `"console"`) | no | `"pdf"`: anillo SVG de dos trazos según GRAFICOS p.9 "Torta" — ver spec. `"console"` (opt-in): `conic-gradient` original, sin stories propias. |
| `className` | `string` | — | no | Clases adicionales fusionadas en el `<div>` raíz. |
| `style` | `CSSProperties` | — | no | Estilos inline fusionados con `--progress-value` en el `<div>` raíz. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos del contenedor (`id`, `data-*`, etc.). El spread se aplica después de `role` y `aria-label`; el consumidor puede sobrescribirlos. |

### ProgressRingTone

| Value | Description |
|-------|-------------|
| `"neutral"` | Acento por defecto `--ds-color-blue` (variable `--progress-accent` en `.ds-progress`). Clase `ds-progress--neutral` sin reglas CSS adicionales. |
| `"success"` | Acento verde. Clase `ds-progress--success`; `--progress-accent: var(--ds-color-green)`. |
| `"warning"` | Acento ámbar. Clase `ds-progress--warning`; `--progress-accent: var(--ds-color-amber)`. Demos de avance de misión. |
| `"danger"` | Acento rojo. Clase `ds-progress--danger`; `--progress-accent: var(--ds-color-danger)`. |

### ProgressRingSize

| Value | Description |
|-------|-------------|
| `"sm"` | Anillo compacto. Clase `ds-progress--sm`; `width: 78px`; valor en `font-size: 1.18rem`. |
| `"md"` | Tamaño por defecto. Clase `ds-progress--md`; `width: 112px`; valor en `font-size: 1.72rem`. |
| `"lg"` | Anillo grande. Clase `ds-progress--lg`; `width: 148px`; valor en `font-size: 2.15rem`. |

---

# Variants

Describe every public visual variant.

## Default

Cuatro tonos y tres tamaños públicos implementados en CSS mediante modificadores BEM. Todos comparten estilos base de `.ds-progress` (anillo circular, `aspect-ratio: 1`, `conic-gradient` con `--progress-value`, borde `--ds-color-line`).

| Tone | Apariencia implementada |
|------|-------------------------|
| `neutral` (default) | Arco y color del valor con `--progress-accent: var(--ds-color-blue)` heredado de `.ds-progress`. |
| `success` | Arco y valor en `--ds-color-green`. |
| `warning` | Arco y valor en `--ds-color-amber`. |
| `danger` | Arco y valor en `--ds-color-danger`. |

| Size | Apariencia implementada |
|------|-------------------------|
| `sm` | `width: 78px`; porcentaje `1.18rem`. |
| `md` (default) | `width: 112px`; porcentaje `1.72rem`. |
| `lg` | `width: 148px`; porcentaje `2.15rem`. |

El fondo del anillo usa `radial-gradient` sobre `--ds-color-surface` y tramo restante en `rgb(255 255 255 / 0.09)`. Pseudo-elemento `::before` añade borde interior decorativo.

## PDF (`variant="pdf"`, default)

Anillo SVG de dos trazos, calibrado @2× ÷2 según GRAFICOS p.9 "Torta" (`doc[8]`): arco de progreso
más grueso (color de `tone`) sobre un eje/track más delgado (`--ds-color-pdf-line-light`, siempre
visible detrás — no es un "resto" separado, el arco grueso lo tapa donde corresponde). Número
(`{value}%`) centrado **dentro** del anillo en el color de `tone`; `label` (si existe) va
**debajo** del anillo, no apilado dentro como en `variant="console"`. Empieza a las 12 en punto
(mismo criterio visual que el `conic-gradient` de `variant="console"`, no confirmado en el PDF).

| Tone (`pdf`) | Color medido en el PDF |
|------|-------------------------|
| `success` | `--ds-color-pdf-success` (`#28a500`) |
| `warning` | `--ds-color-pdf-warning` (`#e3a500`) — único ejemplo visible en la página ("Evacuados 75%") |
| `danger` | `--ds-color-pdf-critical` (`#ff0404`) |
| `neutral` | `--ds-color-pdf-ink-muted` (`#8a8b87`) — sin ejemplo en el PDF, elegido por no inventar un 4º tono |

**Escala de tamaños recalibrada 2026-08-06 (feedback de usuario):** la v1 (2026-08-06, misma
sesión) usaba el tamaño *literalmente medido* del PDF (36px de diámetro) como `"md"` — en la
práctica se sentía muy chico y el número llegaba a tocar el trazo de progreso. Ahora `"md"` es el
tamaño que antes era `"lg"` (48px, ya extrapolado en la v1), y `"sm"`/`"lg"` se re-derivan de este
nuevo `"md"` con la misma razón proporcional (0.696 / 1 / 1.321) — pero aplicada esta vez a **las
cuatro** magnitudes (diámetro, ambos trazos, y las dos fuentes de número/label, antes fijas sin
importar `size`), así la relación texto-anillo se mantiene constante en los tres tamaños y ninguno
corre riesgo de superposición, no solo el que antes era `"lg"`.

| Size (`pdf`) | Diámetro | Trazo progreso / track | Fuente número / label | Medido o derivado |
|------|----------|--------------------------|--------------------------|------------------------|
| `sm` | `33px` | `6.9px` / `3.2px` | `6px` / `7px` | derivado de `md` ×0.696 |
| `md` | `48px` | `9.9px` / `4.6px` | `9px` / `10px` | **el `sm`/`md` originalmente medido en el PDF era 36px/7.5px/3.5px/9px/10px — ver Deltas en el spec**; este `md` es el ex-`lg` extrapolado, promovido tras revisión de usuario |
| `lg` | `63px` | `13.1px` / `6.1px` | `12px` / `13px` | derivado de `md` ×1.321 |

---

# States

| State | Description |
|--------|-------------|
| Default | Anillo con arco proporcional a `value` acotado; porcentaje y `label` opcional visibles. |
| With label | Cuando `label` es truthy: texto en `.ds-progress__label` (mono, uppercase, `--ds-color-ink-soft`). |
| Value clamped low | `value < 0` se trata como `0`; arco vacío, texto `"0%"`. |
| Value clamped high | `value > 100` se trata como `100`; arco completo, texto `"100%"`. |
| Focus | Sin estilos `:focus` ni `:focus-visible` en `.ds-progress`; no es focuseable salvo que el consumidor pase `tabIndex` vía `...props`. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa `role="img"` en el contenedor; trata el anillo como imagen decorativa/informativa, no como barra de progreso interactiva.
- Construye `aria-label` con el porcentaje acotado y, si existe, el prefijo `{label}:`.
- El porcentaje y la etiqueta son también texto visible para usuarios sighted.
- No expone `aria-valuenow`, `aria-valuemin` ni `aria-valuemax`.
- El consumidor puede sobrescribir `role` o `aria-label` pasándolos en `...props` (se aplican después en el spread, sobrescribiendo los valores del componente).

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="img"` | Aplicado por el componente en el `<div>` raíz. |
| `aria-label` | `"{label}: {clampedValue}%"` si `label` está presente; `"{clampedValue}%"` en caso contrario. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `role`, `aria-hidden`, etc.; los del spread sobrescriben los predeterminados del componente. |

### Keyboard

| Key | Action |
|-----|--------|
| — | El componente no es interactivo por defecto; sin manejadores de teclado propios. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`ProgressRing` no define media queries. El tamaño lo define la prop `size` (`78px`, `112px` o `148px` de ancho fijo).

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Dimensiones fijas por `size`; `aspect-ratio: 1` mantiene forma circular. |
| Storybook `Tones` / `Sizes` | Contenedor padre con `display: flex`, `flexWrap: wrap`, `gap: 20`; el colapso depende del padre, no de `.ds-progress`. |
| `Card` / `apps/web` | Grid del consumidor (`gridTemplateColumns: auto 1fr` o `.ops-map__panel-grid`); el layout responsivo depende del CSS del consumidor. |

---

# Composition

## Purpose in Layout

- **Detail** — avance de misión o indicador contextual dentro del cuerpo de un panel.
- **Summary** — lectura rápida de porcentaje en dashboards; complemento visual, no KPI textual completo.
- **Action** — no aplica; no es interactivo.
- **Navigation** — no aplica.
- **Container** — no envuelve otros componentes; es un indicador atómico.

## Parent

- `Card` → `children` en `Card.stories.tsx`, `Components.stories.tsx` y `apps/web/src/App.tsx`.
- `div` con grid inline en demos (`alignItems: center`, `gridTemplateColumns: auto 1fr`, `gap: 18`).
- Contenedores flex/grid del consumidor en paneles de consola.

## Children

- No acepta `children`; contenido fijo vía props `value` y `label`.

## Siblings

- Texto y métricas adyacentes en grid (`348 personas`, `fuera de zona critica` en `Card.stories.tsx` y `apps/web`).
- `TextField` — búsqueda en el mismo bloque de `Components.stories.tsx` → `OperationsConsole`.
- `MetricCard` — KPIs en fila de resumen; complementarios, no integrados en `ProgressRing`.
- `Badge`, `Button` — en `footer` del mismo `Card` padre, no hijos directos del anillo.

## Alternatives

- `MetricCard` — KPI textual con `label`, `value` y `change` en tarjeta; no anillo circular.
- `TaskCard` — progreso lineal integrado en tarjeta de tarea; no compone ni usa `ProgressRing`.
- Barra de progreso HTML/CSS externa — cuando no se requiere indicador circular del design system.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Card` | Contenedor padre habitual en demos; `ProgressRing` va en `children` para avance de misión. |
| `MetricCard` | KPI textual de resumen; complemento en la misma vista, no sustituto del anillo. |
| `TaskCard` | Muestra progreso lineal propio; no importa ni compone `ProgressRing`. |
| `Badge` | Hermano en `footer` de `Card`; contexto de estado sin integración en el anillo. |
| `TextField` | Hermano en `children` de `Card` en `Components.stories.tsx`; búsqueda adyacente al anillo. |

---

# Content Guidelines

## Labels

- `label`: texto corto en minúsculas o mixed case; el CSS aplica `text-transform: uppercase` en `.ds-progress__label`.
- Demos usan español: `"avance"`, `"red"`, `"mision"`, `"riesgo"`, `"sm"`, `"md"`, `"lg"`.
- Debe describir qué mide el porcentaje (p. ej. avance de evacuación, nivel de red).

## Values

- `value`: entero o decimal en rango 0–100; demos usan `45`, `72`, `75`, `18`.
- El componente acota silenciosamente valores fuera de rango.
- No hay prop de formato; el texto mostrado es siempre `{clampedValue}%`.

## Icons

- No hay slots de icono ni elementos gráficos personalizables.
- El arco es puramente CSS (`conic-gradient` + `--progress-value`).

## Localization

- Las stories y `apps/web` usan español. El componente no impone idioma; cualquier string es válido en `label`. El sufijo `%` es fijo en la implementación.

---

# Examples

## Basic

```tsx
import { ProgressRing } from "@alejandria/ui-kit";

<ProgressRing value={75} label="avance" tone="warning" />
```

## Variant

```tsx
import { ProgressRing } from "@alejandria/ui-kit";

<ProgressRing value={45} label="red" />
<ProgressRing value={72} label="avance" tone="success" />
<ProgressRing value={75} label="mision" tone="warning" />
<ProgressRing value={18} label="riesgo" tone="danger" />
```

## Composition

```tsx
import { Eye } from "lucide-react";
import { Badge, Button, Card, ProgressRing } from "@alejandria/ui-kit";

<Card
  eyebrow="Mision"
  title="Evacuacion"
  description="Riesgo alto, avance estable y recursos en movimiento."
  actions={<Eye />}
  footer={
    <>
      <Badge tone="success">Lote 1</Badge>
      <Button size="sm" variant="secondary">
        Ver tarea
      </Button>
    </>
  }
>
  <div style={{ alignItems: "center", display: "grid", gap: 18, gridTemplateColumns: "auto 1fr" }}>
    <ProgressRing value={75} label="avance" tone="warning" />
    <div style={{ display: "grid", gap: 6 }}>
      <strong style={{ fontFamily: "var(--ds-font-display)", fontSize: "1.8rem", lineHeight: 1 }}>
        348 personas
      </strong>
      <span style={{ color: "var(--ds-color-ink-soft)", fontFamily: "var(--ds-font-mono)", fontSize: ".72rem" }}>
        Fuera de zona critica
      </span>
    </div>
  </div>
</Card>
```

---

# Reasoning Examples

## User Request

Mostrar avance del 75% de una misión de evacuación en un panel.

### Recommended Components

- `ProgressRing value={75} label="avance" tone="warning"` dentro de `Card` → `children`

### Why

Patrón de `Card.stories.tsx` → `WithActionsAndFooter`, `apps/web/src/App.tsx` y `Components.stories.tsx`.

---

## User Request

Comparar tonos semánticos para distintos indicadores (red, avance, riesgo).

### Recommended Components

- Varios `ProgressRing` con `tone` distinto

### Why

`ProgressRing.stories.tsx` → `Tones` demuestra `neutral`, `success`, `warning` y `danger`.

---

## User Request

Anillo más grande en panel de consola compuesto.

### Recommended Components

- `ProgressRing size="lg"`

### Why

`Components.stories.tsx` → `OperationsConsole` usa `size="lg"` junto a `TextField`.

---

## User Request

KPI de resumen "Riesgo operativo: Alto" con texto de cambio.

### Recommended Components

- `MetricCard`

### Why

`MetricCard` presenta KPIs textuales en tarjeta; `ProgressRing` solo muestra porcentaje circular sin `change` ni formato libre de `value`.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-blue` | color | `--progress-accent` por defecto en `.ds-progress` (tone `neutral`) |
| `--ds-color-green` | color | `--progress-accent` en `.ds-progress--success` |
| `--ds-color-amber` | color | `--progress-accent` en `.ds-progress--warning` |
| `--ds-color-danger` | color | `--progress-accent` en `.ds-progress--danger` |
| `--ds-color-surface` | color | Centro del anillo en `radial-gradient` de `.ds-progress` |
| `--ds-color-line` | color | `border` de `.ds-progress` |
| `--ds-color-ink` | color | `color` de `.ds-progress` |
| `--ds-color-ink-soft` | color | `color` de `.ds-progress__label` |
| `--ds-font-display` | typography | `font-family` de `.ds-progress__value` |
| `--ds-font-mono` | typography | `font-family` de `.ds-progress__label` |

Nota: tramo restante del `conic-gradient` (`rgb(255 255 255 / 0.09)`), borde interior de `::before` (`rgb(255 255 255 / 0.08)`) y sombras no usan tokens con nombre. La variable custom `--progress-value` la establece el componente en runtime, no en `:root`.

## `variant="pdf"` (agregado 2026-08-06)

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-success` | color | Arco + número cuando `tone="success"` (`#28a500`) |
| `--ds-color-pdf-warning` | color | Arco + número cuando `tone="warning"` (`#e3a500`) |
| `--ds-color-pdf-critical` | color | Arco + número cuando `tone="danger"` |
| `--ds-color-pdf-ink-muted` | color | Arco + número cuando `tone="neutral"` (sin ejemplo PDF, ver Variants) |
| `--ds-color-pdf-line-light` | color | Track/eje del anillo y `label` |
| `--ds-size-progress-pdf-sm/md/lg` | size | Diámetro del anillo (solo `md` medido, ver Variants) |
| `--ds-font-body` | typography | `font-family` de número y `label` (Montserrat, no display/mono como `console`) |
| `--ds-space-1` | space | Gap entre el anillo y `label` (medido ~4.8px) |

---

# Implementation Notes

This section is intended for maintainers extending the component.

> **Interno (mantenedores).** Las rutas de esta sección (Source File, Dependencies, DOM Structure)
> son fuente del monorepo (`packages/ui/**`); no forman parte de la API publicada de
> `@alejandria/ui-kit`. Un consumidor externo usa el import de arriba y `@alejandria/ui-kit/style.css`.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/ProgressRing.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-progress`, `ds-progress--{tone}`, `ds-progress--{size}`, `ds-progress__value`, `ds-progress__label`; pseudo `::before`)

## DOM Structure

```text
div.ds-progress.ds-progress--{tone}.ds-progress--{size}[role="img"][aria-label][style="--progress-value: …"]
├── span.ds-progress__value
│   └── {clampedValue}%
└── span.ds-progress__label (solo si label)
    └── {label}
```

### `variant="pdf"`

```text
div.ds-progress-pdf
├── div.ds-progress-pdf__ring
│   ├── svg[role="img"][aria-label]
│   │   ├── circle.ds-progress-pdf__track
│   │   └── circle.ds-progress-pdf__arc
│   └── span.ds-progress-pdf__value
│       └── {clampedValue}%
└── span.ds-progress-pdf__label (solo si label)
    └── {label}
```

---

# Known Limitations

- No usa `forwardRef`; no hay reenvío de ref al DOM.
- Semántica `role="img"`, no `role="progressbar"` con `aria-valuenow` / `aria-valuemin` / `aria-valuemax`.
- Acota `value` silenciosamente; no advierte al consumidor sobre valores fuera de rango.
- No redondea el porcentaje mostrado (decimales visibles si se pasan).
- Clase `ds-progress--neutral` aplicada sin reglas CSS dedicadas (depende del acento azul base).
- Sin animación de transición al cambiar `value`.
- Sin estado indeterminado.
- Sin estilos de foco; no es interactivo por defecto.
- Sin tests unitarios ni de integración en el repositorio.
- Sin documentación JSDoc en `ProgressRing.tsx` según convenciones del repositorio.
- `TaskCard` no compone `ProgressRing` aunque ambos comunican progreso en la consola.
- `variant="pdf"`: ninguno de los tres `size` públicos coincide hoy con la instancia literal del PDF (36px de diámetro) — esa medida quedó "entre" `sm` (33px) y `md` (48px) tras la recalibración 2026-08-06 (ver Variants). `sm`/`lg` siguen siendo extrapolaciones proporcionales de `md`, no mediciones independientes.
- `variant="pdf"`, `tone="neutral"`: sin ejemplo en el PDF (la página solo muestra un caso, ámbar); el color elegido (`--ds-color-pdf-ink-muted`) es una elección razonable, no una medición.
- `variant="pdf"` no envuelve el gauge en un `ChartCard` (fondo/borde/padding de "GRAFICOS"), aunque el PDF muestra esa leyenda compartida para toda la página — queda a criterio del consumidor, mismo patrón que otros átomos del kit.

---

# Future Improvements

- [ ] `role="progressbar"` con `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- [ ] `forwardRef` hacia el `<div>` raíz
- [ ] Redondeo configurable del valor mostrado
- [ ] Animación CSS al cambiar `--progress-value`
- [ ] Reglas CSS explícitas para `ds-progress--neutral` o documentación en tokens
- [ ] Documentación JSDoc en `ProgressRing.tsx` según convenciones del repositorio
- [ ] Story de valores límite (`0`, `100`, negativos, >100)
- [ ] Vincular diseño Figma cuando esté disponible

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `ProgressRing`, `ProgressRingProps`, `ProgressRingTone` y `ProgressRingSize` con estilos `ds-progress`, acotado de `value`, variable CSS `--progress-value` y stories en Storybook (`Playground`, `Tones`, `Sizes`). Uso en `Card.stories.tsx`, `Components.stories.tsx` y `apps/web/src/App.tsx`. |
| 0.2.0 | Agregado `variant: "console" \| "pdf"` — GRAFICOS p.9 "Torta" (`doc[8]`) no tenía ningún componente asociado (el roadmap listaba "Gráficos p.9–10 ✅✅" atribuyendo ambas páginas a `ChartCard`/`BarChartCard`/`DonutChartCard`/`LineChartCard`, pero esos solo cubren p.10 — corregido en `component-roadmap.md`). `variant="pdf"` es un render SVG separado (no reusa el `conic-gradient` de `console`, que no puede expresar un trazo de progreso más grueso que el del track) con arco 7.5px + track 3.5px, colores de `tone` mapeados a hex exactos del PDF (`#e3a500`/`#ff0404`/`#28a500`), número dentro del anillo y `label` afuera/abajo (a diferencia de `console`, que apila ambos dentro). Stories `PdfGauge`, `PdfTones`, `PdfSizes` con decorator oscuro (mismo patrón que otros componentes PDF — `--ds-color-pdf-line-light` es casi invisible en el canvas claro por defecto de Storybook). `variant="console"` sin cambios, verificado sin regresión. |
| 0.2.1 | Feedback de usuario, mismo día: (1) sacadas las stories `Playground`/`Tones`/`Sizes` originales de `variant="console"` y renombradas las tres stories `Pdf*` a `Playground`/`Tones`/`Sizes` (el código de `variant="console"` no se tocó, solo sus stories). (2) `variant` default cambia de `"console"` a `"pdf"` — el sistema console ya no tiene ninguna story propia en Storybook. (3) Escala de tamaños recalibrada: el diámetro literal medido del PDF (36px) se sentía chico y el número tocaba el arco de progreso; el ex-`"lg"` extrapolado (48px) pasa a ser el nuevo `"md"`, y `"sm"`/`"lg"` se re-derivan de él con la misma razón 0.696/1.321 — esta vez aplicada también a ambos trazos y a las dos fuentes (número/label), que antes eran fijas (9px/10px) sin importar `size`, la otra mitad del problema de superposición a tamaños chicos. Verificado en Storybook: ningún tamaño toca el arco. |
