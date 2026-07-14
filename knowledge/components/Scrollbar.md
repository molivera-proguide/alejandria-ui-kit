---
id: scrollbar
name: Scrollbar
category: navigation
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Scrollbar.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Scrollbar

aliases:
  - barra de desplazamiento
  - scroll
  - scroll bar
keywords:
  - Scrollbar
  - scrollbar
  - track
  - thumb
  - vertical
  - MISCELÁNEAS
  - ScrollbarProps
tags:
  - navigation
  - chrome
  - presentational
  - atom

last_reviewed: 2026-07-14
---

# Scrollbar

Component structure follows `knowledge/reasoning/component-archetype.md`.

## Purpose

Presenta el scrollbar vertical de la lámina MISCELÁNEAS (PDF p.13): track cápsula y thumb cápsula más oscuro, sin flechas.

Describe:

- **Responsabilidad principal:** mostrar el chrome de desplazamiento vertical fiel a la referencia (track + thumb).
- **Problema que resuelve:** unificar la apariencia PDF del scrollbar sin reinventar geometría ni colores por pantalla.
- **Alcance:** componente presentacional controlado por props (`value`, `thumbSize`); no envuelve contenido scrollable ni gestiona overflow.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div class="ds-scrollbar">` con thumb en `<div class="ds-scrollbar__thumb" aria-hidden="true">`.
- `value` acotado a 0–100; `thumbSize` acotado a 8–100 (porcentaje de la altura del track).
- Variables CSS `--ds-scrollbar-value` y `--ds-scrollbar-thumb-size` en el estilo inline del nodo raíz.
- `role="scrollbar"`, `aria-orientation="vertical"`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuenow` (entero redondeado de `value`).
- `aria-label` solo cuando la prop `label` es truthy.
- Fusión de `className` y `style` del consumidor mediante `cn()` / spread de estilo.
- Repaso de `HTMLAttributes<HTMLDivElement>` al `<div>` raíz vía `...props`.

## This component never

- Renderiza orientación horizontal, flechas, bordes, sombras ni estados hover/focus/disabled propios.
- Envuelve contenido overflow ni aplica `::-webkit-scrollbar` a un panel padre.
- Implementa arrastre, rueda ni teclado para cambiar `value` (estado propiedad del consumidor).
- Expone ejes `variant`, `appearance`, `size` o `tone`.
- Usa `forwardRef`.
- Importa otros componentes del kit.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si cualquier ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete.
- Dar altura al track (el CSS usa `height: 100%` del contenedor, o `style`/`className` del consumidor).
- Proveer `label` (o `aria-label` vía `...props`) cuando el scrollbar no es decorativo.

## Forbidden

- Inventar flechas, grip marks, glow o variantes no presentes en PDF p.13.
- Usar como sustituto de `Switch` (track/thumb de toggle booleano).
- Asumir scroll nativo sincronizado sin que el consumidor actualice `value`.

## Recommendations

- En Storybook, usar altura de track **121.5px** (PDF 242.76 ÷ 2) y `thumbSize={17.4}` / `value={0}` para la pose de referencia.
- Sincronizar `value` con el scroll de una región: `value = (scrollTop / (scrollHeight - clientHeight)) * 100`.
- Pasar `aria-controls` con el `id` de la región desplazable cuando aplique.

---

# Category

| Field | Value |
|--------|-------|
| Type | atom |
| Group | Chrome |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/Scrollbar.tsx |

---

# Public API

```tsx
import {
  Scrollbar,
  type ScrollbarProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Scrollbar` — componente funcional.
- `ScrollbarProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `value` | `number` | `0` | no | Posición del thumb (0 = inicio, 100 = fin). Acotada internamente. |
| `thumbSize` | `number` | `17.4` | no | Altura del thumb como % del track (proporción PDF ≈ 42.16/242.76). Mínimo efectivo 8. |
| `label` | `string` | — | no | Nombre accesible → `aria-label` en la raíz. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-scrollbar`. |
| `style` | `CSSProperties` | — | no | Fusionado con variables `--ds-scrollbar-*`. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos de la raíz (`id`, `aria-controls`, etc.). |

---

# Variants

## Default

Única apariencia pública: cápsula vertical MISCELÁNEAS. Sin modificadores BEM de variante.

| Elemento | Apariencia |
|----------|------------|
| Track (`.ds-scrollbar`) | Ancho 7.5px, `border-radius: 999px`, fondo `var(--ds-color-pdf-action)`. |
| Thumb (`.ds-scrollbar__thumb`) | Ancho 4.5px, inset lateral 1.5px, cápsula, fondo `var(--ds-color-pdf-surface-warm)`. |

---

# States

| State | Description |
|--------|-------------|
| Default | Pose según `value` / `thumbSize`. Sin `:hover` / `:focus` / `:disabled` en CSS del bloque. |
| Position | `value` 0…100 mueve el thumb entre insets de extremo 4.5px. |

---

# Accessibility

## Requirements

- `role="scrollbar"` con `aria-orientation="vertical"` y valuemin/max/now.
- Thumb decorativo con `aria-hidden="true"`.
- El consumidor aporta `label` / `aria-label` y, si controla una región, `aria-controls`.
- No es focusable por defecto; no implementa teclado.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="scrollbar"` | Raíz. |
| `aria-orientation="vertical"` | Fijo (solo vertical en la referencia). |
| `aria-valuemin` / `aria-valuemax` | `0` / `100`. |
| `aria-valuenow` | `Math.round(value)` acotado. |
| `aria-label` | Desde prop `label` si truthy. |
| `aria-hidden="true"` | En `.ds-scrollbar__thumb`. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado en el componente. |

---

# Responsive Behavior

`Scrollbar` no define media queries. El ancho del track es fijo (7.5px); la altura la aporta el contenedor (`height: 100%`).

---

# Composition

## Purpose in Layout

- **Chrome** — indicador de desplazamiento junto a paneles o listas PDF/consola.

## Parent

- Contenedor con altura definida (story: 121.5px).
- Paneles overflow del producto (el consumidor sincroniza `value`).

## Children

- Ninguno (sin slots ni `children`).

## Siblings

- Contenido scrollable adyacente (lista, ficha, tabla).

## Alternatives

- Scroll nativo del navegador — no reproduce el chrome MISCELÁNEAS.
- `Switch` — toggle booleano; no es scrollbar.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Switch` | También usa track/thumb en BEM, pero rol booleano distinto; no reutilizar identidad. |
| `ProgressRing` | Indicador presentacional con `value` 0–100; dominio distinto (progreso, no scroll). |
| `AlertBanner` | Aparece en la misma página PDF MISCELÁNEAS; no hay composición interna. |

---

# Content Guidelines

## Labels

- `label`: nombre de la región o control (p. ej. `"Desplazamiento vertical"`).

## Values

- `value` / `thumbSize` en escala 0–100; no strings.

## Icons

- No hay iconos ni flechas en la referencia.

## Localization

- `label` es responsabilidad del consumidor; sin copy fijo en el componente.

---

# Examples

## Basic

```tsx
import { Scrollbar } from "@alejandria/ui-kit";

<div style={{ height: 121.5 }}>
  <Scrollbar value={0} label="Desplazamiento vertical" />
</div>
```

## Variant

No hay variantes visuales públicas; variar solo `value` y `thumbSize`.

```tsx
<Scrollbar value={40} thumbSize={17.4} label="Panel" />
```

## Composition

```tsx
<div style={{ display: "flex", gap: 8, height: 240 }}>
  <div id="panel" style={{ flex: 1, overflow: "auto" }}>
    {/* contenido */}
  </div>
  <Scrollbar
    value={scrollPercent}
    thumbSize={thumbPercent}
    label="Panel"
    aria-controls="panel"
  />
</div>
```

---

# Reasoning Examples

## User Request

Barra de scroll vertical como en Misceláneas del PDF.

### Recommended Components

- `Scrollbar`

### Why

Identidad distinta (chrome de desplazamiento). No es `Switch` ni estilo nativo genérico. Referencia: PDF p.13.

---

# Design Tokens

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-action` | color | Fondo del track (`#494949`). |
| `--ds-color-pdf-surface-warm` | color | Fondo del thumb (`#2a2927`). |

Geometría (ancho, insets) es literal calibrada ÷2 en CSS; no hay tokens de tamaño de scrollbar.

---

# Implementation Notes

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/Scrollbar.tsx
```

## Dependencies

- `cn` (`packages/ui/src/utils/cn.ts`)
- Estilos en `packages/ui/src/styles.css` (`.ds-scrollbar`)

## DOM Structure

```text
div.ds-scrollbar[role=scrollbar]
  └── div.ds-scrollbar__thumb[aria-hidden]
```

Canonical reference: `knowledge/references/design-reference.pdf` page 13 (MISCELÁNEAS), left vertical scrollbar.

Scale: display px = PDF vector ÷ 2 (`knowledge/specs/README.md`).

---

# Known Limitations

- Solo orientación vertical (única en la referencia).
- Sin interacción de arrastre/teclado integrada.
- No estiliza `::-webkit-scrollbar` de un overflow padre; es chrome independiente.
- `thumbSize` mínimo de clamp en TS es 8; la referencia PDF usa ≈17.4.

---

# Future Improvements

- [ ] Patrón documentado de sincronización con región overflow.
- [ ] Estados hover/active si el diseño los aprueba.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Alta inicial desde PDF MISCELÁNEAS p.13. |
