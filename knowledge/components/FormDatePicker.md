---
id: form-date-picker
name: FormDatePicker
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/FormDatePicker.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/FormDatePicker

aliases:
  - calendario
  - selector de fecha
  - selector de hora
  - date picker
keywords:
  - FormDatePicker
  - calendario
  - calendar
  - hora
  - spinner
  - fecha
  - FormDatePickerProps
tags:
  - forms
  - input
  - overlay
  - molecule

last_reviewed: 2026-08-07
---

# FormDatePicker

## Purpose

Selector de fecha (calendario) y hora (spinner de 2 columnas) mediante dos triggers
independientes, alineado con la sección **FORM - DATEPICKER** del PDF de referencia (p.21).

Describe:

- **Responsabilidad principal:** elegir un `Date` completo (día + hora + minuto) a través
  de dos campos separados, "FECHA" y "HORA", cada uno con su propio desplegable.
- **Problema que resuelve:** el extract de texto del PDF no resolvía el layout del grid de
  días ni el rango de horas visible — requería render directo de la página (p.21) antes de
  poder implementarlo con confianza (gate explícito de `tasks.md` T006).
- **Alcance:** dos triggers+panel independientes (no un popover combinado), compartiendo un
  único valor `Date` interno. FECHA abre un calendario con navegación de mes/año; HORA abre
  un spinner de 2 columnas (hora / minutos de a 5).

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` v3 p.21 "FORM -
DATEPICKER". Layout resuelto vía PyMuPDF `get_pixmap()`/`get_drawings()` (no alcanzaba el
extract de texto solo) — ver Changelog para el detalle de lo que cambió respecto a la
primera interpretación basada solo en texto.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

## This component guarantees

- Renderiza **2 campos independientes** (`FECHA`, `HORA`), cada uno con su propio trigger
  (`aria-haspopup="dialog"`, `aria-expanded`) y panel (`role="dialog"`).
- El trigger FECHA muestra `dd/mm/aaaa`; el trigger HORA muestra `hh:mm` (minutos redondeados
  al múltiplo de 5 más cercano) — ambos derivados del mismo `Date` interno/controlado.
- El panel FECHA incluye navegación de mes (‹/›) y `<select>` nativos de mes/año, grid de
  días `L M M J V S D` (semana empieza en lunes), y marca el día seleccionado con un borde
  blanco literal (no solo cambio de color) — PDF: caja dibujada sobre el día elegido.
- El panel HORA incluye un spinner de 2 columnas (horas 00–23, minutos 00/05/…/55) separadas
  por `:`, cada columna con flechas arriba/abajo (`scrollBy`) además de click directo sobre
  un valor.
- Ambos paneles cierran al hacer click afuera o al elegir (FECHA cierra al elegir día; HORA
  permanece abierto tras elegir hora/minuto, permitiendo ajustar ambos sin reabrir).
- Es controlado u no-controlado: si se pasa `value`, no gestiona `internalValue` propio.
- `disabled` deshabilita ambos triggers.

## This component never

- Combina FECHA y HORA en un único popover — son dos triggers+panel independientes por
  diseño (confirmado contra el render real del PDF, no una simplificación arbitraria).
- Valida rangos de fecha/hora (mín/máx, fechas deshabilitadas) — no hay prop para eso hoy.
- Reconstruye el mes/año con listboxes custom — usa `<select>` nativos estilizados
  (decisión registrada en `DECISIONS.md`, el PDF no da spec de esa interacción más allá de
  un chevron sugerido).

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- Tratar FECHA y HORA como dos affordances independientes en cualquier layout que use este
  componente — no asumir que aparecen siempre juntas ni en un orden fijo más allá del que
  el componente ya impone.

## Forbidden

- Reemplazar los `<select>` nativos de mes/año por listboxes custom sin registrar la
  desviación — es una decisión ya tomada (`DECISIONS.md` 2026-08-07), no un placeholder a
  "mejorar" sin discusión.
- Asumir un rango de horas visible distinto a 24 horas × 12 pasos de 5 minutos — es el rango
  completo, no un subconjunto curado.

## Recommendations

- Pasar `defaultValue` con una fecha real (no `undefined`) cuando el caso de uso lo permita
  — mejora el mensaje de "vista actual" del calendario al abrir (usa la fecha seleccionada
  como `viewDate` inicial en vez de `new Date()`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Import | `import { FormDatePicker } from "@alejandria/ui-kit"` |

---

# Public API

```tsx
import {
  FormDatePicker,
  type FormDatePickerProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `FormDatePicker` — componente funcional.
- `FormDatePickerProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `value` | `Date` | — | no | Fecha/hora controlada. |
| `defaultValue` | `Date` | — | no | Fecha/hora inicial (no controlada). |
| `onChange` | `(date: Date) => void` | — | no | Notifica cambios (día, hora o minuto). |
| `disabled` | `boolean` | — | no | Deshabilita ambos triggers. |
| `...props` | `HTMLAttributes<HTMLDivElement>` (menos `onChange`/`defaultValue`) | — | no | Atributos nativos del contenedor raíz. |

---

# Variants

No hay variantes visuales públicas — una sola apariencia canónica (PDF p.21).

---

# States

| State | Description |
|--------|-------------|
| Default | Ambos triggers vacíos (`" "`), ambos paneles cerrados. |
| Activo — FECHA | Panel de calendario abierto (`dateOpen: true`). |
| Activo — HORA | Panel de spinner abierto (`timeOpen: true`). |
| Día/hora seleccionada | Trigger(s) muestran el valor formateado; el día elegido tiene borde blanco en el grid; hora/minuto elegidos en blanco+bold en el spinner. |
| Disabled | Ambos triggers deshabilitados. |

---

# Layout (PDF p.21)

| Nivel | Elemento | Prop / origen |
|-------|----------|---------------|
| FECHA · 1 | `button.ds-form-date__trigger` | `value`/`defaultValue` formateado `dd/mm/aaaa` |
| FECHA · 2 (panel) | nav mes/año + grid `L M M J V S D` + días | `viewDate`, `value` |
| HORA · 1 | `button.ds-form-date__trigger` | `value`/`defaultValue` formateado `hh:mm` |
| HORA · 2 (panel) | spinner 2 columnas (hora / minuto) separadas por `:` | `value` |

Medidas (PDF p.21, @2× → ÷2): trigger FECHA 300×30pt → 150×15px; panel FECHA
300×202.68pt → 150×101px. Trigger HORA 200×30pt → 100×15px; panel HORA 200×202.68pt →
100×101px.

---

# Accessibility

## Requirements

- Cada trigger es `<button aria-haspopup="dialog" aria-expanded>`.
- Cada panel es `<div role="dialog" aria-label="Elegir fecha"|"Elegir hora">`.
- Los `<select>` de mes/año tienen `aria-label="Mes"`/`"Año"`.
- Botones de mes anterior/siguiente y de spinner arriba/abajo tienen `aria-label`
  descriptivo.
- Cierra al click afuera de cada panel de forma independiente.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-haspopup="dialog"` / `aria-expanded` | Ambos triggers. |
| `role="dialog"` / `aria-label` | Ambos paneles. |
| `aria-label` | Navegación de mes/año, flechas del spinner. |

### Keyboard

| Key | Action |
|-----|--------|
| `Click` en trigger | Abre/cierra el panel correspondiente (toggle). No hay atajo de teclado dedicado documentado para abrir/cerrar sin mouse más allá del foco+Enter nativo del `<button>`. |
| `Tab` | Navega entre triggers, `<select>` de mes/año, días del grid y valores del spinner (orden DOM). |

**Nota:** no hay navegación de flechas dedicada dentro del grid de días ni del spinner
más allá de los botones ‹/›/⌃/⌄ — ver Known Limitations.

---

# Responsive Behavior

Sin media queries propias. Ancho fijo por campo (`150px` FECHA, `100px` HORA); el spinner
usa `max-height: 70px` (7 filas visibles) con scroll interno.

---

# Composition

## Purpose in Layout

- **Input** — selección de fecha/hora dentro de un formulario.

## Parent

- Cualquier contenedor de formulario del consumidor.

## Children

- No admite `children` libres — calendario y spinner se generan internamente.

## Siblings

- `FormTextInput`, `FormSelect`, `FormCheckable`, `FormFileUpload` — misma familia visual y
  feature.

## Alternatives

- Ninguna dentro del kit — es el único selector de fecha/hora.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `FormSelect` | Mismo patrón de overlay + cierre al click afuera. |
| `FormTextInput` | Comparte `.ds-form-field__control` como base del trigger. |

---

# Content Guidelines

## Labels

- `FECHA`/`HORA` — labels fijos en mayúsculas vía CSS, no configurables vía props (el PDF
  no da variantes de nombre de campo para este componente).

## Values

- Fecha formateada `dd/mm/aaaa`; hora formateada `hh:mm` (minutos redondeados a múltiplo de
  5).

## Icons

- Chevrons de navegación de mes (‹/›) y de spinner (⌃/⌄) — glifos de texto, no SVG.

## Localization

- Nombres de mes en español, hardcodeados (`MONTH_LABELS`) — no es una prop.

---

# Examples

## Default

```tsx
<FormDatePicker />
```

## Con valor inicial

```tsx
<FormDatePicker defaultValue={new Date(2026, 6, 20, 14, 10)} />
```

## Controlado

```tsx
const [date, setDate] = useState<Date>();
<FormDatePicker value={date} onChange={setDate} />
```

---

# Reasoning Examples

## User Request

Elegir fecha y hora de un evento en un formulario, con calendario visual y spinner de hora.

### Recommended Components

- `FormDatePicker`

### Why

Único componente del kit con calendario + spinner de hora combinados (PDF p.21).

---

# Design Tokens

| Token / value | Category | Usage |
|---------------|----------|-------|
| `--ds-color-pdf-surface` (`#060606`) | color | Fondo de ambos paneles |
| `--ds-color-white` (`#ffffff`) | color | Borde activo de panel, día/hora seleccionada |
| `--ds-color-pdf-form-muted` (`#8d8d8d`) | color | Label de panel, días/números no seleccionados |
| `--ds-font-mono` | typography | Label de panel (Source Code Light) |
| `--ds-font-body` | typography | Mes/año (bold), números de días, valores de spinner |

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
packages/ui/src/components/FormDatePicker.tsx
```

## Dependencies

- `styles.css` (`.ds-form-date*`, reutiliza `.ds-form-field__control` como base de trigger)
- Utility CSS `.ds-scroll-area--y` para el spinner de hora
- API nativa `Date`

## DOM Structure

```text
div.ds-form-date[.ds-form-field--disabled]
├── div.ds-form-field.ds-form-date__field--fecha
│   ├── div.ds-form-field__control → button.ds-form-date__trigger + label + chevron
│   └── div.ds-form-date__panel--fecha (solo si dateOpen)
│       ├── span.ds-form-date__panel-label
│       ├── div.ds-form-date__month-nav → ‹ + select(mes) + select(año) + ›
│       ├── div.ds-form-date__weekdays
│       └── div.ds-form-date__days → button.ds-form-date__day[--selected] (×N)
└── div.ds-form-field.ds-form-date__field--hora
    ├── div.ds-form-field__control → button.ds-form-date__trigger + label + chevron
    └── div.ds-form-date__panel--hora (solo si timeOpen)
        ├── span.ds-form-date__panel-label
        └── div.ds-form-date__spinner
            ├── div.ds-form-date__spinner-column (horas)
            ├── span.ds-form-date__spinner-separator (":")
            └── div.ds-form-date__spinner-column (minutos)
```

---

# Known Limitations

- Sin navegación de flechas dedicada dentro del grid de días ni del spinner de hora más
  allá de los botones de paginación (‹/›/⌃/⌄) — mismo tipo de brecha que `FormSelect`.
- Sin validación de rango (fecha mínima/máxima, días deshabilitados).
- Mes/año usan `<select>` nativo, no listboxes custom con el estilo del resto del kit —
  decisión registrada, no un placeholder pendiente.
- Sin tests unitarios ni de integración (sin framework de test instalado).

---

# Future Improvements

- [ ] Props de fecha mínima/máxima si un consumidor lo necesita.
- [ ] Navegación de flechas dentro del grid de días / spinner de hora.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Primera interpretación basada solo en el extract de texto del PDF (trigger combinado, lista plana de horas cada 30min) — **descartada** antes de shippear, ver siguiente entrada. |
| 0.1.0 | **Reconstrucción tras render directo de p.21 vía PyMuPDF** (`get_pixmap()`/`get_drawings()`, gate explícito de `tasks.md` T006): estructura real es 2 triggers+panel independientes (FECHA/HORA), no un popover combinado; HORA es un spinner de 2 columnas (hora / minutos de a 5), no una lista plana; el día seleccionado tiene una caja de borde blanco dibujada (no solo cambio de color); mes/año resueltos como `<select>` nativos (decisión registrada en `DECISIONS.md`). Implementación final feature `001-form-modal`. |
