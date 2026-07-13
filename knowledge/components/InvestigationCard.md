---
id: investigation-card
name: InvestigationCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/InvestigationCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/InvestigationCard

aliases:
  - tarjeta de investigación
  - tarjeta investigaciones
  - investigation tile
  - tarjeta métrica de investigación
keywords:
  - InvestigationCard
  - investigación
  - investigation
  - vuelo
  - métricas
  - metrics
  - icon
  - actions
  - InvestigationMetric
  - InvestigationAction
  - InvestigationActionVariant
  - InvestigationUtility
  - InvestigationUtilityType
tags:
  - data-display
  - cards
  - presentational
  - molecule

last_reviewed: 2026-07-06
---

# InvestigationCard

## Purpose

Presenta el resumen mínimo e indispensable de una investigación con icono identificador, título, cuadrícula de métricas y acciones en consolas del Alejandria UI Kit, alineada con la sección **TARJETAS** del PDF de referencia (p. 2).

Describe:

- **Responsabilidad principal:** mostrar una entidad investigativa (vuelo, vehículo, persona, etc.) con datos clave en formato compacto y acciones contextuales.
- **Problema que resuelve:** unificar la estructura de tarjetas de investigación en grids de consola sin acoplar lógica de negocio ni navegación.
- **Alcance:** componente presentacional basado en `<article>` con icono, título, hasta cuatro métricas en cuadrícula 2×2, utilidades opcionales (editar, eliminar, cerrar) y acciones inferiores con estilos PDF propios (no compone `Button` del kit).

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` — sección TARJETAS (p. 2, tarjeta estilo vuelo VUELO XR2180). El PDF es la única fuente de verdad para layout, proporciones y jerarquía visual.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<article>` con clase `ds-investigation-card` y modificador `ds-investigation-card--with-utilities` cuando `utilities` contiene al menos una entrada.
- `title`, `icon` y `metrics` obligatorios en la firma de props; `actions` por defecto `[]`.
- Cada entrada de `metrics` renderizada como celda con valor (`.ds-investigation-card__metric-value`) sobre etiqueta (`.ds-investigation-card__metric-label`) en cuadrícula 2 columnas.
- Utilidades renderizadas desde `utilities` en orden canónico (`edit`, `delete`, `close`); iconos SVG 10×10 display (PDF 20×20 @2×) del set Cards (Editar, Eliminar, Cerrar).
- Acciones inferiores renderizadas desde `actions`; cada una como `<button>` con clases `ds-investigation-card__action` y `ds-investigation-card__action--{variant}`.
- Contenedor del icono principal con `aria-hidden="true"`.
- Fusión de `className` externa y `style` externo en el `<article>` raíz.
- Repaso de atributos nativos de `HTMLAttributes<HTMLElement>` al `<article>` vía `...props` (`id`, `data-*`, `aria-*`, etc.).

## This component never

- Obtiene, calcula ni formatea datos de métricas.
- Compone internamente `Button`, `Card`, `TaskCard`, `ModuleCard` ni otros componentes del kit.
- Define navegación ni enrutamiento por sí mismo.
- Expone slots `children` ni contenido libre.
- Aplica media queries ni breakpoints propios.
- Usa las variantes `primary`/`ghost` del componente `Button` global (estilos PDF `#494949` son locales a esta tarjeta).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title` como `string`, `icon` como `ReactNode` y `metrics` como arreglo de `{ label: string; value: string | number }`.
- Consultar `knowledge/references/design-reference.pdf` (TARJETAS p. 2) antes de modificar estilos o jerarquía.
- Usar iconos del set Investigations (25×25 display; artboard 50×50) para el icono principal, como en las stories.

## Forbidden

- Inventar props que no existan en `InvestigationCardProps` (`children`, `variant`, `tone`, etc.).
- Usar `InvestigationCard` como contenedor genérico con contenido libre (`Card` cubre ese caso).
- Sustituir los botones de acción inferiores por `Button` del kit (rompe fidelidad PDF).
- Reinterpretar el layout usando patrones visuales de `TaskCard` o `ModuleCard`.
- Asumir que las utilidades se renderizan sin entrada correspondiente en `utilities`.
- Usar etiquetas duplicadas en `metrics` como `key` sin riesgo de advertencias React (`key={metric.label}`).

## Recommendations

- Agrupar instancias en un grid CSS, como en `InvestigationCard.stories.tsx` → `GridExample`.
- Proporcionar cuatro métricas para completar la cuadrícula 2×2 canónica del PDF.
- Pasar `utilities` con `type: "edit" | "delete" | "close"` cuando la tarjeta requiera utilidades de esquina superior derecha.
- Usar `actions` con `variant: "primary"` para la acción rellena (`#494949`) y `variant: "ghost"` para la acción de texto.
- Usar `key={investigation.title}` o identificador estable al mapear listas.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Cards |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/InvestigationCard.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  InvestigationCard,
  type InvestigationCardProps,
  type InvestigationMetric,
  type InvestigationAction,
  type InvestigationActionVariant,
  type InvestigationUtility,
  type InvestigationUtilityType
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `InvestigationCard` — componente funcional.
- `InvestigationCardProps` — props del componente.
- `InvestigationMetric` — forma de cada entrada en `metrics`.
- `InvestigationAction` — forma de cada entrada en `actions`.
- `InvestigationActionVariant` — unión `"primary" | "ghost"` para acciones inferiores.
- `InvestigationUtility` — forma de cada entrada en `utilities`.
- `InvestigationUtilityType` — unión `"edit" | "delete" | "close"` para utilidades de esquina.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título de la investigación. Renderizado en `<h3 class="ds-investigation-card__title">`. Mayúsculas vía CSS (`text-transform: uppercase`). |
| `icon` | `ReactNode` | — | sí | Icono identificador de la investigación. Renderizado en `.ds-investigation-card__icon` con `aria-hidden="true"`. |
| `metrics` | `InvestigationMetric[]` | — | sí | Métricas resumidas en cuadrícula 2×2. Cada celda muestra valor sobre etiqueta. |
| `actions` | `InvestigationAction[]` | `[]` | no | Acciones inferiores. Cada entrada renderiza un botón con estilos PDF locales. |
| `utilities` | `InvestigationUtility[]` | — | no | Utilidades de esquina superior derecha. Cada entrada renderiza un botón con icono SVG 10×10 display según `type`. |
| `onEdit` | `MouseEventHandler<HTMLButtonElement>` | — | no | **Deprecado.** Usar `utilities={[{ type: "edit", onClick }]}`. |
| `onDelete` | `MouseEventHandler<HTMLButtonElement>` | — | no | **Deprecado.** Usar `utilities={[{ type: "delete", onClick }]}`. |
| `onClose` | `MouseEventHandler<HTMLButtonElement>` | — | no | **Deprecado.** Usar `utilities={[{ type: "close", onClick }]}`. |
| `editLabel` | `string` | `"Editar"` | no | **Deprecado.** Usar `label` dentro de la entrada `utilities` con `type: "edit"`. |
| `deleteLabel` | `string` | `"Eliminar"` | no | **Deprecado.** Usar `label` dentro de la entrada `utilities` con `type: "delete"`. |
| `closeLabel` | `string` | `"Cerrar"` | no | **Deprecado.** Usar `label` dentro de la entrada `utilities` con `type: "close"`. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-investigation-card` en el `<article>` raíz. |
| `style` | `CSSProperties` | — | no | Estilos inline en el `<article>` raíz. |
| `...props` | `HTMLAttributes<HTMLElement>` | — | no | Atributos nativos del `<article>` (`id`, `data-*`, `aria-*`, etc.). |

### InvestigationMetric

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | sí | Etiqueta descriptiva bajo el valor. Usada como `key` en el mapeo. Renderizada en `.ds-investigation-card__metric-label`. |
| `value` | `string \| number` | sí | Valor principal de la métrica. Renderizado en `.ds-investigation-card__metric-value` sin formato adicional. Mayúsculas vía CSS. |

### InvestigationAction

| Field | Type | Default | Required | Description |
|-------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Texto del botón. Usado como `key` en el mapeo. |
| `variant` | `InvestigationActionVariant` | `"primary"` | no | `"primary"` = fondo `#494949`; `"ghost"` = fondo transparente. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | no | Manejador de clic del botón de acción. |
| `disabled` | `boolean` | — | no | Deshabilita el botón de acción. |

### InvestigationUtility

| Field | Type | Default | Required | Description |
|-------|------|----------|----------|-------------|
| `type` | `InvestigationUtilityType` | — | sí | Identificador fijo de la utilidad (`"edit"`, `"delete"`, `"close"`). Determina icono y orden canónico. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | sí | Manejador de clic del botón de utilidad. |
| `label` | `string` | según `type` | no | Etiqueta accesible (`aria-label`). Por defecto: `"Editar"`, `"Eliminar"` o `"Cerrar"`. |

---

# Variants

No existen variantes de layout públicas. El componente aplica una única apariencia canónica (PDF TARJETAS p. 2).

## Acciones inferiores (`InvestigationActionVariant`)

| Variant | Apariencia | Clase CSS |
|---------|------------|-----------|
| `primary` | Fondo `#494949`, texto `#ffffff`, padding `2.5px 10px` (display) | `.ds-investigation-card__action--primary` |
| `ghost` | Fondo transparente, texto `#ffffff` | `.ds-investigation-card__action--ghost` |

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-investigation-card`. Fondo `rgb(0 0 0 / 0.7)`, borde `0.75px solid #606060`, padding `7.5px 5px` (display). |
| With utilities | Cuando `utilities.length > 0`. Aplica `ds-investigation-card--with-utilities` y reserva espacio superior derecho para iconos 10×10 display. |
| With metrics | Cuando `metrics.length > 0`, renderiza cuadrícula 2 columnas. |
| Without metrics | Cuando `metrics` está vacío, no renderiza bloque de métricas. |
| With actions | Cuando `actions.length > 0`, renderiza fila de botones inferiores. |
| Action disabled | `disabled: true` en una `InvestigationAction`; opacidad reducida, cursor `not-allowed`. |
| Action hover | Hover local en botones de acción y utilidades; no usa estilos globales de `Button`. |

---

# Layout (PDF TARJETAS p. 2)

Jerarquía canónica, de arriba a abajo:

| Nivel | Elemento DOM | Prop / origen |
|-------|--------------|---------------|
| 1 | `div.ds-investigation-card__utilities` → botones utilidad | `utilities` (opcional) |
| 2 | `div.ds-investigation-card__icon` | `icon` |
| 3 | `h3.ds-investigation-card__title` | `title` |
| 4 | `div.ds-investigation-card__metrics` → celdas valor/etiqueta | `metrics` |
| 5 | `div.ds-investigation-card__actions` → botones acción | `actions` (opcional) |

Cuadrícula de métricas canónica (ejemplo VUELO XR2180):

| Celda | Valor | Etiqueta |
|-------|-------|----------|
| Superior izquierda | `04/05` | Fecha de ingreso |
| Superior derecha | `EZE` | Aeropuerto |
| Inferior izquierda | `04:13` | Horario |
| Inferior derecha | `2` | Acompañantes |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica de `<article>` con `<h3>` para el título de la investigación.
- El título, valores y etiquetas de métricas quedan expuestos como contenido textual.
- Las utilidades y acciones son `<button type="button">` nativos con foco y activación por teclado.
- Los botones de utilidad reciben `aria-label` configurable vía `utilities[].label`.
- El icono principal está en contenedor `aria-hidden="true"`; el consumidor debe asegurar `alt=""` en `<img>` del icono.
- El consumidor puede pasar atributos ARIA adicionales vía `...props` en el `<article>` raíz.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Aplicado en `.ds-investigation-card__icon` y en `<img>` internos de utilidades. |
| `aria-label` | Aplicado en botones de utilidad vía `utilities[].label`. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, etc. en el `<article>` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Mueve el foco entre botones de utilidad y acciones (comportamiento nativo). |
| `Enter` / `Space` | Activa el botón enfocado (comportamiento nativo). |
| — | El `<article>` no es interactivo por sí mismo. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`InvestigationCard` no define media queries. La altura la define el contenido; el ancho lo define el contenedor padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. `max-width: 140px (display)`, `width: fit-content`. |
| Métricas | Cuadrícula `repeat(2, minmax(0, 1fr))`; dos columnas fijas. |
| Acciones | `flex-wrap: wrap` permite que botones pasen a varias líneas si el ancho es insuficiente. |
| Storybook `GridExample` | Contenedor padre con `gridTemplateColumns: repeat(auto-fit, minmax(130px, 1fr))`. |

---

# Composition

## Purpose in Layout

- **Detail** — tarjeta individual de investigación en listas o grids de consola.
- **Summary** — resumen mínimo con métricas clave y acciones contextuales.
- **Container** — estructura fija (icono, título, métricas, acciones); no admite `children` libres.

## Parent

- `div` con CSS Grid en `InvestigationCard.stories.tsx` → `GridExample`.
- Contenedor centrado de Storybook con padding en decoradores.

## Children

- No admite `children`. Solo contenido derivado de `icon`, `title`, `metrics`, `actions` y utilidades.

## Siblings

- `TaskCard` — tarjetas de tarea operativa en la misma vista de consola.
- `ModuleCard` — navegación por módulo con métricas en fila horizontal.
- `MetricCard` — KPIs de resumen sin contexto de investigación individual.
- `Button` — acciones globales en encabezados; no sustituye acciones embebidas de esta tarjeta.

## Alternatives

- `TaskCard` — tareas operativas con código, estado y descripción; sin icono de investigación ni cuadrícula de métricas.
- `ModuleCard` — entrada navegable a módulo; métricas en fila label-valor, no cuadrícula 2×2.
- `Card` — contenedor genérico con slots libres.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `TaskCard` | Tarjeta de tarea del mismo PDF (p. 1); identidad visual distinta, sin métricas ni utilidades. |
| `ModuleCard` | Tarjeta de módulo navegable (PDF p. 4); métricas horizontales, sin acciones inferiores PDF. |
| `Button` | Botón global del kit; no usar dentro de `InvestigationCard` (acciones usan estilos locales PDF). |
| `Card` | Contenedor compuesto con slots libres. |
| `MetricCard` | KPI independiente; complemento en filas de resumen. |

---

# Content Guidelines

## Labels

- `title`: identificador breve de la investigación (p. ej. `"VUELO XR2180"`, `"AUTO AB123CD"`). Mayúsculas vía CSS.
- `metrics[].label`: descripción corta bajo el valor (p. ej. `"Fecha de ingreso"`, `"Aeropuerto"`).
- `actions[].label`: texto de acción en mayúsculas (p. ej. `"ACCIÓN A"`, `"ACCIÓN B"`). El CSS aplica `text-transform: uppercase`.

## Values

- `metrics[].value`: datos preformateados (p. ej. `"04/05"`, `"EZE"`, `"2"`). Sin localización ni formato automático.

## Icons

- Icono principal: set Investigations 25×25 display (artboard 50×50) (`AvionIcon`, `AutoIcon`, `PersonaIcon`, etc.) desde `packages/ui/src/Icons`.
- Utilidades: iconos Cards 10×10 display embebidos por el componente (Editar, Eliminar, Cerrar).

## Localization

- Las stories usan español en etiquetas y acciones; el componente no impone idioma en props de texto.

---

# Examples

## Basic (canónico PDF)

```tsx
import { InvestigationCard } from "@alejandria/ui-kit";
import { AvionIcon } from "../Icons"; // o ruta al asset en la app consumidora

<InvestigationCard
  title="VUELO XR2180"
  icon={<img src={AvionIcon} alt="" />}
  metrics={[
    { value: "04/05", label: "Fecha de ingreso" },
    { value: "EZE", label: "Aeropuerto" },
    { value: "04:13", label: "Horario" },
    { value: "2", label: "Acompañantes" }
  ]}
  actions={[
    { label: "ACCIÓN A", variant: "primary" },
    { label: "ACCIÓN B", variant: "ghost" }
  ]}
  utilities={[
    { type: "edit", onClick: () => {} },
    { type: "delete", onClick: () => {} },
    { type: "close", onClick: () => {} }
  ]}
/>
```

## Sin utilidades

```tsx
<InvestigationCard
  title="DOCUMENTO 4421"
  icon={<img src={DocumentoIcon} alt="" />}
  metrics={[
    { value: "01/05", label: "Fecha de ingreso" },
    { value: "PDF", label: "Tipo" }
  ]}
/>
```

## Grid de investigaciones

```tsx
<div
  style={{
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))"
  }}
>
  {investigations.map((item) => (
    <InvestigationCard key={item.title} {...item} />
  ))}
</div>
```

---

# Reasoning Examples

## User Request

Mostrar un vuelo con fecha, aeropuerto, horario y acompañantes en una tarjeta compacta.

### Recommended Components

- `InvestigationCard` con `AvionIcon`

### Why

Patrón canónico PDF TARJETAS p. 2 (`InvestigationCard.stories.tsx` → `Flight`).

---

## User Request

Listar tareas operativas con código y estado en un grid.

### Recommended Components

- `TaskCard` ×N

### Why

`InvestigationCard` es para entidades investigativas con métricas 2×2; `TaskCard` cubre tareas operativas (PDF p. 1).

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token / value | Category | Usage |
|---------------|----------|-------|
| `rgb(0 0 0 / 0.7)` | color | Fondo de `.ds-investigation-card` (PDF: `#000000` 70% transparencia) |
| `#606060` | color | Borde de `.ds-investigation-card` |
| `#ffffff` | color | Título, valores de métrica, texto de acciones |
| `#c1c1c1` | color | Etiquetas de métrica (`.ds-investigation-card__metric-label`) |
| `#494949` | color | Fondo de acción primaria |
| `--ds-radius-xs` | radius | `border-radius` de `.ds-investigation-card` |
| `--ds-font-mono` | typography | `.ds-investigation-card__title` (Source Code Pro Light 6.5pt display (13pt @2× ÷2)) |
| `--ds-font-body` | typography | Valores, etiquetas y acciones (Montserrat Bold/Extralight) |

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/InvestigationCard.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- Iconos SVG Cards: `Editar-20x20.svg`, `Eliminar-20x20.svg`, `Cerrar-20x20.svg`
- `styles.css` (clases `ds-investigation-card`, `ds-investigation-card--with-utilities`, elementos internos)

## DOM Structure

```text
article.ds-investigation-card[.ds-investigation-card--with-utilities]
├── div.ds-investigation-card__utilities (solo si hay manejadores de utilidad)
│   └── button.ds-investigation-card__utility (× hasta 3)
│       └── img
├── div.ds-investigation-card__icon
│   └── {icon}
├── h3.ds-investigation-card__title
├── div.ds-investigation-card__metrics (solo si metrics.length > 0)
│   └── div.ds-investigation-card__metric (× metrics.length)
│       ├── span.ds-investigation-card__metric-value
│       └── span.ds-investigation-card__metric-label
└── div.ds-investigation-card__actions (solo si actions.length > 0)
    └── button.ds-investigation-card__action.ds-investigation-card__action--{variant}
```

---

# Known Limitations

- `metrics` usa `label` como `key`; etiquetas duplicadas generan advertencias de React.
- No expone `children` ni slots personalizables para utilidades o acciones.
- Las acciones inferiores no reutilizan el componente `Button` global (divergencia intencional por fidelidad PDF).
- Los iconos Cards para utilidades están embebidos en el componente; no son intercambiables vía props.
- Sin tests unitarios ni de integración en el repositorio.

---

# Future Improvements

- [ ] Prop opcional para personalizar iconos de utilidad sin romper el default PDF.
- [ ] Clave estable alternativa a `metric.label` para listas con etiquetas repetidas.
- [ ] Tokenizar `#494949`, `#606060` y `rgb(0 0 0 / 0.7)` si se reutilizan en más componentes PDF.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `InvestigationCard`, tipos públicos, estilos `ds-investigation-card` y stories en Storybook (`Default`, `Flight`, `GridExample`). Documentación en `knowledge/components/InvestigationCard.md`. |
| 0.1.1 | Refactor arquitectónico: API unificada declarativa (`utilities[]` + `actions[]`); props legadas `onEdit`/`onDelete`/`onClose` deprecadas con adaptador interno; subcomponentes internos simétricos (`InvestigationCardUtility`, `InvestigationCardAction`); `HTMLAttributes<HTMLArticleElement>`. |
