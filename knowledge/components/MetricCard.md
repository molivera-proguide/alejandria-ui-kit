---
id: metric-card
name: MetricCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/MetricCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/MetricCard

aliases:
  - tarjeta de métrica
  - KPI card
  - indicador operativo
keywords:
  - MetricCard
  - métrica
  - KPI
  - indicador
  - dashboard
  - operaciones
  - riesgo
  - alertas
  - resumen
  - tone
  - MetricTone
  - appearance
  - MetricAppearance
  - reporting
  - ficha
tags:
  - data-display
  - cards
  - presentational
  - molecule

last_reviewed: 2026-08-05
---

# MetricCard

## Purpose

Presenta un indicador operativo de solo lectura con etiqueta, valor principal y texto de cambio opcional en consolas del Alejandria UI Kit, alineado con la sección **METRIC CARD** del PDF de referencia (p.11).

Describe:

- **Responsabilidad principal:** mostrar un KPI puntual (p. ej. riesgo operativo, unidades activas, alertas abiertas) en una tarjeta compacta con jerarquía visual fija.
- **Problema que resuelve:** unificar la presentación de métricas de resumen en filas de dashboard sin acoplar formato numérico, cálculo de tendencias ni navegación.
- **Alcance:** componente presentacional basado en `<div>`; el consumidor provee strings preformateados para `label`, `value` y `change`, y opcionalmente un `tone` semántico, una `appearance` de escala (reporting vs ficha) y `utilities` de editar/eliminar (solo en `appearance="reporting"`, agregado 2026-08-05).

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div>` con clases `ds-metric` y `ds-metric--{tone}` por defecto.
- `label` y `value` obligatorios en la firma de props; renderizados siempre en el DOM.
- `change` renderizado en `<span class="ds-metric__change">` solo cuando su valor es truthy.
- `tone` por defecto `"neutral"`; la clase modificadora `ds-metric--{tone}` se aplica en la raíz.
- `appearance` por defecto `"reporting"`; cuando es `"ficha"`, aplica además `ds-metric--ficha` en la raíz (composable con `tone`).
- `utilities` (editar/eliminar) solo se renderiza cuando `appearance="reporting"` — PDF METRIC CARD p.11 no muestra estos botones en las tiles "En ficha". Agregado 2026-08-05, mismo patrón que `InvestigationCard.utilities`.
- Fusión de `className` externa con `ds-metric`, el modificador de tono y el de apariencia mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLDivElement>` al `<div>` raíz vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Obtiene, calcula ni formatea datos numéricos.
- Renderiza iconos, gráficos ni `children`.
- Compone internamente `Card`, `ModuleCard`, `ProgressRing`, `Badge` ni otros componentes del kit.
- Define interactividad, manejadores de clic ni semántica de botón o enlace **fuera de los botones `utilities` de editar/eliminar** (agregado 2026-08-05) — la tarjeta en sí (el `<div>` raíz) sigue sin ser clickable ni focusable.
- Aplica estilos responsivos propios (sin media queries en `.ds-metric`).
- Define roles ARIA, etiquetas accesibles ni manejo de teclado propios.
- Diferencia visualmente los tonos `good` ni `watch` (sin color PDF definido). `critical` colorea el valor en `#ff0404`; `neutral` usa valor `#ffffff`.
- Inventa tokens tipográficos nuevos para la escala ficha; el valor `26px` (display; PDF 52pt @2× ÷2) queda como literal marcado (`/* TODO token */`).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `label` y `value` como `string`.
- Preformatear `value` y `change` en el consumidor (unidades, porcentajes, localización).

## Forbidden

- Inventar props que no existan en `MetricCardProps` (`icon`, `variant`, `size`, `children`, `footer`, etc.).
- Pasar `icon` u otras props no declaradas esperando renderizado interno; atributos desconocidos se reenvían al `<div>` raíz sin efecto visual.
- Asumir que `tone="good"` o `tone="watch"` alteran el color del valor (solo `critical` aplica `#ff0404` al valor).
- Anidar otro `MetricCard` como hijo (no hay slot `children`).
- Confiar en formato automático de números, fechas ni tendencias.
- En pantallas densas / ficha, sobrescribir el tamaño de la métrica con CSS local del patrón en lugar de usar `appearance="ficha"`.

## Recommendations

- Agrupar instancias en un contenedor flex o grid, como en la story `Tones` (`display: flex; flexWrap: wrap`, corregido 2026-08-05) o en `apps/web` (`.ops-metrics` con `repeat(4, minmax(0, 1fr))`). Con ancho fijo (113px), un grid `minmax(N, 1fr)` funciona igual de bien siempre que `N` no sea menor a 113.
- Usar `key={metric.label}` al mapear listas, como en `apps/web/src/App.tsx`.
- Envolver la fila de métricas en `<section aria-label="...">` cuando el grupo requiera región semántica; `MetricCard` no la provee.
- Reservar `change` para contexto breve del valor (p. ej. `"critico"`, `"en campo"`, `"7 sin leer"`).
- Usar `appearance="reporting"` (o omitir la prop) en filas de dashboard / reporting; usar `appearance="ficha"` dentro de layouts densos tipo DetailSheet / Fichas.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Cards |
| Package | @alejandria/ui-kit |
| Import | `import { MetricCard } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  MetricCard,
  type MetricCardProps,
  type MetricTone,
  type MetricAppearance,
  type MetricUtility,
  type MetricUtilityType
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `MetricCard` — componente funcional.
- `MetricCardProps` — props del componente.
- `MetricTone` — unión de tonos semánticos para la prop `tone`.
- `MetricAppearance` — unión de escalas visuales para la prop `appearance`.
- `MetricUtility` — configuración de una utilidad de esquina (`{ type, onClick, label? }`), agregado 2026-08-05.
- `MetricUtilityType` — unión `"edit" | "delete"`, agregado 2026-08-05.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Etiqueta de la métrica. Renderizada en `<span class="ds-metric__label">` dentro de `.ds-metric__topline`. Mayúsculas vía CSS (`text-transform: uppercase`). |
| `value` | `string` | — | sí | Valor principal de la métrica. Renderizado en `<strong class="ds-metric__value">`. |
| `change` | `string` | — | no | Texto de referencia/contexto. Renderizado en `<span class="ds-metric__change">` solo si es truthy. Estilo Montserrat Extralight 8px (display; 16÷2) `#ffffff` (sin `text-transform`). |
| `tone` | `MetricTone` | `"neutral"` | no | Tono semántico. Aplica clase `ds-metric--{tone}` en la raíz. Solo `critical` cambia el color del valor a `#ff0404`. Composable con `appearance`. |
| `appearance` | `MetricAppearance` | `"reporting"` | no | Escala visual. `"reporting"` conserva la métrica grande de dashboard. `"ficha"` aplica `ds-metric--ficha` (escala compacta PDF MÉTRICAS «En ficha»). |
| `utilities` | `MetricUtility[]` | `[]` | no | Botones de editar/eliminar en la esquina superior derecha. **Solo se renderizan si `appearance="reporting"`** — se ignoran silenciosamente en `"ficha"`, aunque se provean. Agregado 2026-08-05; mismo patrón que `InvestigationCard.utilities` (mismos iconos `Editar-20x20.svg`/`Eliminar-20x20.svg`). |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-metric` y los modificadores de tono/apariencia en el `<div>` raíz. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos del `<div>` raíz (`id`, `style`, `data-*`, `aria-*`, etc.). |

### MetricTone

| Value | Description |
|-------|-------------|
| `"neutral"` | Valor por defecto. Clase `ds-metric--neutral`. Valor en `#ffffff`. |
| `"good"` | Clase `ds-metric--good`. Sin acento de color en PDF; valor permanece `#ffffff`. |
| `"watch"` | Clase `ds-metric--watch`. Sin acento de color en PDF; valor permanece `#ffffff`. |
| `"critical"` | Clase `ds-metric--critical`. Valor en `#ff0404` (PDF MÉTRICAS). |

### MetricAppearance

| Value | Description |
|-------|-------------|
| `"reporting"` | Escala por defecto (dashboard / reporting). Valor 42px (display; PDF 84pt @2× ÷2), título Source Code Bold, fondo `#060606` 20%. Sin clase modificadora adicional. |
| `"ficha"` | Escala compacta para layouts densos / DetailSheet. Clase `ds-metric--ficha`. Valor 26px (display; PDF 52pt @2× ÷2), título Montserrat Extra Light, fondo transparente. |

### MetricUtility / MetricUtilityType

Agregado 2026-08-05 — PDF METRIC CARD p.11 muestra iconos de editar/eliminar en la esquina superior derecha de las 4 cards de ejemplo "Reporting"; ninguna tile "En ficha" los muestra.

| Field | Type | Default | Required | Description |
|-------|------|----------|----------|-------------|
| `type` | `MetricUtilityType` | — | sí | `"edit"` o `"delete"`. Determina icono y orden canónico (edit antes que delete). |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | sí | Manejador de clic del botón de utilidad. |
| `label` | `string` | según `type` | no | Etiqueta accesible (`aria-label`). Por defecto: `"Editar"` o `"Eliminar"`. |

---

# Variants

Describe every public visual variant.

## Default

Apariencia de reporting PDF (MÉTRICAS): fondo `rgb(6 6 6 / 0.2)` (nota: solo se ve como un fondo distinguible si el contenedor real detrás es más claro que `#060606` — ver Known Limitations), borde `0.75px solid #e6e6e6`, padding `5px`, `width: 113px` fijo (medido en el vector del PDF; alto `auto`, ver Responsive Behavior), layout en grid con `gap: 5.5px` (display scale). Etiqueta Source Code Pro Bold 8px display `#8a8b87` uppercase con `letter-spacing: 0.41em` (corregido 2026-08-05, antes 6px). Valor Montserrat Bold 42px `#ffffff`. Referencia (`change`) Montserrat Extralight (200) 8px `#ffffff`.

`tone="critical"` aplica `.ds-metric--critical` y colorea `.ds-metric__value` en `#ff0404`. Los tonos `good` y `watch` no tienen acento de color en el PDF y comparten el valor blanco de `neutral`.

## Appearance

La prop `appearance` selecciona la escala tipográfica del PDF METRIC CARD, antes MÉTRICAS (página 11). Composable con `tone`.

| Appearance | Valor | Título / label | Fondo | Uso |
|------------|-------|----------------|-------|-----|
| `"reporting"` (default) | Montserrat Bold **42px** (display = 84÷2) | Source Code Bold, `#8a8b87`, uppercase | `#060606` 20% (`--ds-color-pdf-surface-a20`) | Filas de KPI en reporting / dashboards |
| `"ficha"` | Montserrat Bold **26px** (display = 52÷2) (`/* TODO token */`) | Montserrat Extra Light (`--ds-font-body` + weight 200), `#8a8b87`, uppercase | transparente (hereda la superficie de la ficha) | Layouts densos tipo Fichas / DetailSheet |

Borde `#e6e6e6` y padding `5px` (display) son compartidos. En pantallas de ficha o detalle denso, usar `appearance="ficha"` en lugar de sobrescribir el tamaño con CSS local del patrón.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-metric`. Sin estados `:hover`, `:focus`, `:active` ni `:disabled` definidos en CSS. |
| With change | Cuando `change` es truthy, se muestra `.ds-metric__change` debajo del valor. |
| Without change | Cuando `change` es `undefined`, vacío o falsy, el nodo de cambio no se renderiza. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica genérica de `<div>`; no define rol, nombre accesible ni descripción propios.
- El texto visible (`label`, `value`, `change`) queda expuesto en el árbol de accesibilidad como contenido estático del `div`.
- El consumidor es responsable de proveer contexto semántico del grupo (p. ej. `aria-label` en un `<section>` padre) y atributos ARIA en la raíz si la métrica requiere nombre o descripción explícitos.
- No es interactivo; no recibe foco ni responde a teclado por diseño del componente.

### ARIA

| Attribute | Usage |
|-----------|-------|
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, `role`, etc. en el `<div>` raíz. El componente no los aplica por defecto. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. El componente no es focusable salvo que el consumidor lo haga mediante `tabIndex` u otro atributo vía `...props`. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`MetricCard` no define media queries. Impone solo `width` fijo en `.ds-metric` (113px reporting, 83px ficha) — corregido 2026-08-05, antes solo `min-height: 66px` sin ancho, lo que dejaba variar el ancho de cada card según el largo de su `label` dentro de un grid ("los tamaños de ancho varían" per reporte de usuario). El alto quedó `auto` en ambas apariencias: un alto fijo (91px reporting, 55px ficha, ambos medidos en el mismo vector del PDF) desbordaba en cuanto un label de dos palabras envolvía a dos líneas — pasó primero en ficha, y al confirmarlo en la story `Tones` pasó también en reporting ("Riesgo operativo" empujando `change` fuera de la card). `.ds-metric` también fija `grid-template-columns: minmax(0, 1fr)` explícitamente — sin esto, el padding-right reservado para los botones de `utilities` no achicaba la columna implícita del grid (bug real de navegador, no de fidelidad).

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Tamaño fijo (ancho y alto); no se ajusta al contenedor padre. |
| Storybook `Tones` | Contenedor `display: flex; flexWrap: wrap; gap: 14` (cambiado 2026-08-05, antes un grid `minmax(180px, 1fr)` que ya no aplica con ancho fijo). |
| `apps/web` `.ops-metrics` | Grid de 4 columnas en viewport amplio; media query del consumidor colapsa a `grid-template-columns: 1fr` bajo `@media (max-width: 960px)`. |

---

# Composition

## Purpose in Layout

- **Summary** — fila de KPIs operativos en la parte superior de una consola o dashboard.
- **Detail** — indicador puntual adyacente a paneles de detalle (`Card`, `TaskCard`).
- **Container** — envoltorio presentacional con estructura fija (etiqueta, valor, cambio); no admite slots libres.

## Parent

- `<section className="ops-metrics" aria-label="Estado operativo">` en `apps/web/src/App.tsx`.
- `div` con CSS Grid en la story `Tones` y en `Components.stories.tsx` → `OperationsConsole`.
- Contenedor centrado de Storybook con `minWidth: 340` en `MetricCard.stories.tsx`.

## Children

- No admite `children`. Solo contenido derivado de `label`, `value` y `change`.

## Siblings

- Otras instancias de `MetricCard` en la misma fila de resumen.
- `Card` — panel compuesto de misión o pronóstico debajo o al lado de la fila de métricas.
- `TaskCard` — listas de tareas en la sección inferior de la consola.
- `ProgressRing` — indicador de avance dentro de un `Card`, no sustituto de KPI puntual.
- `Badge` — etiquetas de contexto en encabezados de sección, no integradas en `MetricCard`.

## Alternatives

- `ModuleCard` — tarjeta navegable de módulo con métricas embebidas e interacción de clic.
- `Card` — contenedor genérico con slots libres para paneles compuestos.
- `ProgressRing` — progreso circular con valor numérico y etiqueta, no KPI de texto libre.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `ModuleCard` | Embebe filas de métricas similares en tarjeta navegable; `MetricCard` es solo lectura sin botón ni icono de módulo. |
| `Card` | Contenedor de detalle compuesto; hermano habitual debajo de la fila de `MetricCard` en consolas. |
| `TaskCard` | Tarjeta de tarea con estructura fija; hermano en dashboards, sin composición interna. |
| `ProgressRing` | Indicador de avance circular; complemento en paneles `Card`, no reemplazo de KPI textual. |
| `Badge` | Etiqueta de estado en otros contextos; no usado por `MetricCard`. |
| `ChartCard` | Contenedor de gráficos; alternativa cuando la métrica requiere visualización chart, no valor escalar. |

---

# Content Guidelines

## Labels

- `label`: descriptor breve de la métrica (p. ej. `"Riesgo operativo"`, `"Unidades activas"`, `"Alertas abiertas"`). El CSS aplica `text-transform: uppercase` y `letter-spacing: 0.41em` (interlettering PDF 410) en `.ds-metric__label`; no es obligatorio escribir en mayúsculas en la prop.

## Values

- `value`: string preformateado por el consumidor (p. ej. `"87%"`, `"50"`, `"23"`). Sin localización, unidades automáticas ni formato numérico interno.

## Icons

- `MetricCard` no expone prop `icon` ni slot para iconos.

## Localization

- Las stories y `apps/web` usan español. El componente no impone idioma; cualquier string es válido en `label`, `value` y `change`.

---

# Examples

## Basic

```tsx
import { MetricCard } from "@alejandria/ui-kit";

<MetricCard
  label="Riesgo operativo"
  value="87%"
  change="critico"
  tone="critical"
/>
```

## Variant

La prop `tone` selecciona la clase modificadora. Solo `critical` cambia el color del valor (`#ff0404`); el resto mantiene valor blanco.

```tsx
<MetricCard label="Unidades activas" value="50" change="en campo" tone="good" />
<MetricCard label="Alertas abiertas" value="23" change="7 sin leer" tone="watch" />
<MetricCard label="Nodos enlazados" value="15" change="red viva" tone="neutral" />
```

`MetricCard` también expone `appearance` (`"reporting" | "ficha"`). En fichas / detalle denso:

```tsx
// Escala compacta PDF MÉTRICAS «En ficha» (DetailSheet, modales densos)
<MetricCard
  label="TAREAS"
  value="13"
  change="Allanamientos"
  appearance="ficha"
/>
```

## Composition

```tsx
<section aria-label="Estado operativo">
  <div
    style={{
      display: "grid",
      gap: 14,
      gridTemplateColumns: "repeat(4, minmax(180px, 1fr))"
    }}
  >
    <MetricCard label="Riesgo operativo" value="87%" change="critico" tone="critical" />
    <MetricCard label="Unidades activas" value="50" change="en campo" tone="good" />
    <MetricCard label="Alertas abiertas" value="23" change="7 sin leer" tone="watch" />
    <MetricCard label="Nodos enlazados" value="15" change="red viva" />
  </div>
</section>
```

---

# Reasoning Examples

## User Request

Mostrar KPIs de riesgo, unidades, alertas y nodos en una fila superior del dashboard.

### Recommended Components

- `MetricCard` ×4

### Why

Patrón de `MetricCard.stories.tsx` → `Tones`, `Components.stories.tsx` → `OperationsConsole` y `apps/web/src/App.tsx` → sección `.ops-metrics`.

---

## User Request

Entrar a un módulo operativo con icono y métricas resumidas al hacer clic.

### Recommended Components

- `ModuleCard`

### Why

`MetricCard` es presentacional y no interactivo. `ModuleCard` combina icono, título y métricas en un `<button>` navegable.

---

## User Request

Colorear la métrica crítica en rojo según el tono.

### Recommended Components

- `MetricCard` con `tone="critical"`

### Why

`tone="critical"` aplica `.ds-metric--critical` y colorea el valor en `#ff0404` según el PDF MÉTRICAS.

---

## User Request

Mostrar métricas dentro de una ficha de detalle densa sin que el valor (display 42px / PDF 84pt @2×) desborde el layout.

### Recommended Components

- `MetricCard` con `appearance="ficha"`

### Why

PDF MÉTRICAS define la escala «En ficha» (valor display 26px (PDF 52pt @2×), título Extra Light, fondo transparente). Usar `appearance="ficha"` en lugar de sobrescribir tamaño con CSS del patrón.

---

## User Request

Mostrar un icono de alerta junto al valor de riesgo.

### Recommended Components

- Ninguno dentro de `MetricCard`

### Why

No existe prop `icon` ni slot en la API. Envolver la instancia en un layout del consumidor o extender el componente.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-radius-xs` | radius | `border-radius` de `.ds-metric` |
| `--ds-color-ink` | color | `color` base de `.ds-metric` |
| `--ds-font-mono` | typography | `font-family` de `.ds-metric__label` (Source Code Pro) |
| `--ds-font-body` | typography | `font-family` de `.ds-metric__value` y `.ds-metric__change` (Montserrat) |

Nota: colores de reporting PDF están hardcodeados (`rgb(6 6 6 / 0.2)`, `#e6e6e6`, `#8a8b87`, `#ffffff`, `#ff0404`) y no usan tokens del sistema.

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
packages/ui/src/components/MetricCard.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-metric`, `ds-metric--{tone}`, `ds-metric--ficha`, `ds-metric__utilities`, `ds-metric__utility` (agregadas 2026-08-05), `ds-metric__topline`, `ds-metric__label`, `ds-metric__value`, `ds-metric__change`)
- `Editar-20x20.svg`, `Eliminar-20x20.svg` de `packages/ui/src/Icons/Cards/` (agregado 2026-08-05, mismos assets que `InvestigationCard`)

## DOM Structure

```text
div.ds-metric.ds-metric--{tone}[.ds-metric--ficha]
├── div.ds-metric__utilities (solo si appearance="reporting" y utilities.length > 0)
│   └── button.ds-metric__utility (× utilities.length, orden edit → delete)
│       └── img
├── div.ds-metric__topline
│   └── span.ds-metric__label
├── strong.ds-metric__value
└── span.ds-metric__change (solo si change es truthy)
```

---

# Known Limitations

- Solo `tone="critical"` tiene acento de color PDF (`#ff0404` en el valor). `good` y `watch` no tienen color definido en el PDF.
- El `font-size: 26px` (display) de `.ds-metric--ficha .ds-metric__value` es un literal marcado (`/* TODO token */`); no hay token de type-scale para esa medida.
- No expone prop `icon`, `children`, slots de acciones ni pie de tarjeta.
- No formatea ni localiza valores numéricos.
- `.ds-metric__topline` no tiene reglas CSS propias; actúa solo como contenedor estructural.
- Sin estados interactivos (`hover`, `focus`, `disabled`) ni semántica de control.
- Sin tests unitarios ni de integración en el repositorio.
- Etiquetas largas (p. ej. "Riesgo operativo") pueden pasar a dos líneas dentro del ancho fijo de 113px — es el comportamiento esperado de una card de tamaño fijo, no un bug; ver `MetricCard.spec.md`.
- Colores hardcodeados; migración incompleta a tokens del design system.
- `utilities` no tiene props legadas equivalentes a las de `InvestigationCard` (`onEdit`/`onDelete` sueltos) — solo el array `utilities[]`, sin necesidad de compatibilidad retroactiva porque es una prop nueva.
- **El fondo `rgb(6 6 6 / 0.2)` de `appearance="reporting"` solo se percibe si el contenedor real detrás es visualmente distinto de `--ds-color-pdf-surface` (#060606).** Sobre un fondo idéntico a ese color, la composición matemática da el mismo `#060606` — indistinguible de "sin fondo". No es un bug del componente (el fill se sigue aplicando), pero sí una responsabilidad del consumidor: si la "pantalla de reporting" real usa un negro puro, esta card no se va a notar. La story de Storybook usa `--ds-color-pdf-surface-warm` (#2a2927) precisamente para evitar este caso.

---

# Future Improvements

- [ ] Acentos PDF para `good` / `watch` si el diseño los define
- [x] Variante ficha (26px display / 52pt @2×) vía `appearance="ficha"`
- [ ] Migrar colores hardcodeados a tokens del design system
- [ ] Tokenizar `26px` de la escala ficha cuando exista type-scale correspondiente

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `MetricCard`, `MetricCardProps` y `MetricTone` con estilos `ds-metric` y stories en Storybook (`Playground`, `Tones`). Uso en `Components.stories.tsx` → `OperationsConsole` y `apps/web/src/App.tsx`. |
| 0.1.0 | Refinamiento visual PDF (MÉTRICAS reporting): borde `#e6e6e6` 0.75px, label 16px Bold interlettering 410, value 42px display Montserrat Bold, reference Extralight 8px, `critical` → `#ff0404`, sin sombra, Storybook fondo oscuro. |
| 0.1.0 | Escala ficha aditiva: prop `appearance` (`"reporting" \| "ficha"`), modificador `.ds-metric--ficha` (valor 26px display, título Extra Light, fondo transparente), consumo en DetailSheet, story `Reporting vs Ficha`. |
| 0.1.1 | Pasada de fidelidad visual contra PDF METRIC CARD p.11 (coordenadas vectoriales y text-spans exactos vía PyMuPDF, a pedido de reporte de usuario con 3 puntos, los 3 confirmados reales): (1) `width`/`height` fijo 113×91px (reporting) reemplaza `min-height` sin ancho — la card se angostaba/ensanchaba con el largo del label dentro de un grid; (2) label corregido de 6px a 8px (PDF legend 16pt÷2, ya estaba anotado como delta pendiente en el spec); (3) agregada la prop `utilities` (editar/eliminar, solo en `appearance="reporting"`), mismo patrón que `InvestigationCard.utilities`, con evidencia directa en el vector del PDF (íconos de lápiz/tacho en las 4 cards reporting de ejemplo, ausentes en las 3 tiles ficha). Corregido también el bug de decorador oscuro faltante en Storybook (mismo patrón que `Empty`/`ChartCard`) que hacía que la card se viera gris clara y los íconos de utilidad (`#c1c1c1`) se fundieran con ella; agregado un panel oscuro dedicado alrededor del ejemplo "En ficha" en la story `Scales`, ya que esa variante no tiene fondo propio por diseño y se veía "casi invisible" sin un contenedor real detrás. |
| 0.1.2 | Segunda revisión de la usuaria el mismo día detectó dos problemas reales que 0.1.1 no había resuelto bien: la story `Scales` nunca le agregó `utilities` al ejemplo "Reporting" (solo `Tones` las tenía) — agregado. Y la ficha se veía "rota": el alto fijo de 55px (misma medición del PDF) desbordaba una vez sumados el padding/gap/tamaños ya correctos — revertido a `auto`, se deja solo el ancho fijo (83px, que era el problema real reportado). Además, el label de ficha heredaba el `letter-spacing: 0.41em` de reporting ("Inteletrado 410"), que la leyenda del PDF solo menciona para el título Source Code de reporting, no para el Montserrat de ficha — a ese espaciado, "HECTOPASCALES" no entraba en 83px y se veía cortado; corregido a `letter-spacing: 0`. |
| 0.1.3 | Tercera revisión de la usuaria el mismo día, tres hallazgos más: (1) el mismo desborde de alto fijo que ya se había corregido en ficha estaba también en reporting (91px) — un label de dos palabras envolviendo a dos líneas empujaba `change` fuera de la card en la story `Tones`; revertido a `auto`, igual que ficha. (2) El fondo semitransparente se veía como un simple recuadro blanco vacío: el decorador de Storybook usaba `--ds-color-pdf-surface` (#060606), el mismo color base del propio fill al 20% de opacidad — `rgb(6,6,6/0.2)` sobre un fondo `#060606` da exactamente `#060606`, matemáticamente indistinguible. Cambiado el decorador a `--ds-color-pdf-surface-warm` (#2a2927, sigue siendo oscuro, pero distinto) para que la opacidad se note. (3) "HECTOPASCALES" seguía superponiéndose con los botones a pesar del `padding-right` agregado en la ronda anterior — resultó ser un bug real de CSS grid: la columna implícita de `.ds-metric` (sin `grid-template-columns` explícito) no achicaba su ancho computado aunque el `padding-right` sí se aplicaba (confirmado con `getComputedStyle`). Se agregó `grid-template-columns: minmax(0, 1fr)` explícito (eso fue lo que realmente lo arregló) más `overflow-wrap: break-word` en el label como resguardo adicional para palabras largas sin espacios. |
| 0.1.4 | A pedido de la usuaria, corregidos los datos de ejemplo de la story `Scales`: mezclaban tres métricas distintas de la misma página del PDF ("Hectopascales" como label, cuando en realidad es la referencia de "Humedad"; "1013" sin corresponder a ningún valor real de esa página; "PRECIPITACIONES" siendo el título de una tercera métrica). Ahora ambos lados de la comparación usan la métrica real del PDF ("Humedad" / "87%" / "Hectopascales"), consistente entre reporting y ficha — y además "Humedad" es corta, así que no depende de los fixes de CSS de la ronda anterior para no tocar los botones. |
