---
id: form-file-upload
name: FormFileUpload
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/FormFileUpload.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/FormFileUpload

aliases:
  - upload de archivos
  - adjuntar archivos
  - drag and drop
  - file uploader
keywords:
  - FormFileUpload
  - upload
  - drag and drop
  - archivo
  - adjunto
  - thumbnail
  - FormFileUploadProps
tags:
  - forms
  - input
  - presentational
  - molecule

last_reviewed: 2026-08-07
---

# FormFileUpload

## Purpose

Zona de carga de uno o varios archivos (click-to-upload + drag&drop básico), con lista de
archivos cargados y estado vacío superpuesto durante el arrastre, alineado con la sección
**FORM - ADJUNTOS** del PDF de referencia (p.20).

Describe:

- **Responsabilidad principal:** capturar uno o más archivos (`File[]`) vía click o
  arrastre, mostrando una lista de lo ya cargado (filas para documentos, tarjetas con
  thumbnail para imágenes) con botón de quitar por archivo.
- **Problema que resuelve:** el PDF muestra dos estructuras distintas (panel de lista con
  filas/thumbnails vs. tarjeta vacía con ícono y botón "SUBIR ARCHIVO") que se superponen
  solo durante el arrastre — no un único placeholder de texto.
- **Alcance:** estado 100% interno (`useState` de `files`/`dragActive`) — funciona sin
  wiring externo; expone `onFilesChange` para que el consumidor se entere de la lista
  actual.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` v3 p.20 "FORM -
ADJUNTOS". Reconstruido por completo tras render directo con PyMuPDF (`get_pixmap()` +
`get_drawings()`) — el extract de texto había subestimado la estructura real de esta
página (ver Changelog).

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

## This component guarantees

- Click en la zona vacía o en el botón "SUBIR ARCHIVO" abre el selector nativo de archivos
  (`<input type="file">` oculto).
- Arrastrar un archivo sobre la zona activa `dragActive` (highlight `border-color: white`);
  soltar (`drop`) agrega el/los archivo(s) vía `dataTransfer.files`.
- Con `multiple` (default `true`), cada carga se acumula sobre la lista existente; con
  `multiple: false`, la nueva selección reemplaza la lista.
- Archivos de imagen (`file.type` empieza con `image/`) se renderizan como tarjeta con
  thumbnail (`URL.createObjectURL`); el resto, como fila con nombre + tipo/tamaño + botón
  quitar.
- El estado vacío/drop-zone (ícono + copy + botón "SUBIR ARCHIVO") se muestra siempre que no
  haya archivos, y se superpone (`position: absolute`, overlay) sobre la lista existente
  mientras se arrastra un archivo nuevo por encima — PDF: "al estar activo, el empty se
  superpone al input".
- Cada archivo tiene su propio botón "quitar" (`aria-label` dinámico con el nombre) que lo
  elimina de la lista y notifica `onFilesChange`.
- `accept` por defecto limita el selector nativo a `.pdf,.jpg,.jpeg,.png,.doc,.docx` (PDF:
  "Formatos admitidos: PDF, JPG, PNG, DOC").

## This component never

- Sube archivos a ningún servidor — solo mantiene la lista `File[]` en memoria y notifica
  vía `onFilesChange`; la persistencia es responsabilidad del consumidor.
- Valida tamaño ni tipo de archivo más allá del filtro nativo de `accept` (que el navegador
  puede o no reforzar según el selector del sistema).
- Previsualiza progreso de carga, reordena archivos ni admite drag&drop avanzado — el PDF
  deja esa interacción explícitamente sin especificar ("escucho sugerencias... mientras
  busco referencias").

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- Proveer `label` (título del panel de lista / label del estado vacío).
- Usar `onFilesChange` si el consumidor necesita conocer la lista actual — el componente no
  expone la lista de otra forma.

## Forbidden

- Asumir preview de progreso de carga o reorder — no implementado, y el PDF no lo
  especifica (ver `DECISIONS.md` 2026-08-07).
- Sustituir el highlight de drag-over por otro tratamiento visual sin registrar la
  desviación — el estilo actual (`border-color: white`) es una interpretación razonable
  documentada en `DECISIONS.md`, no una medición del PDF.

## Recommendations

- Revocar los `object URL` de thumbnails (`URL.createObjectURL`) si se gestiona la lista de
  archivos por fuera del componente durante mucho tiempo — el componente no los revoca por
  su cuenta (recreación en cada cambio de `files` vía `useMemo`, sin cleanup explícito).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Import | `import { FormFileUpload } from "@alejandria/ui-kit"` |

---

# Public API

```tsx
import {
  FormFileUpload,
  type FormFileUploadProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `FormFileUpload` — componente funcional.
- `FormFileUploadProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Título del panel de lista / label del estado vacío. |
| `multiple` | `boolean` | `true` | no | Permite acumular más de un archivo. |
| `accept` | `string` | `".pdf,.jpg,.jpeg,.png,.doc,.docx"` | no | Atributo `accept` del input nativo. |
| `defaultFiles` | `File[]` | `[]` | no | Lista inicial (no controlada). |
| `onFilesChange` | `(files: File[]) => void` | — | no | Notifica la lista actual tras agregar/quitar. |
| `error` | `string` | — | no | Mismo tratamiento visual que `FormTextInput`. |
| `disabled` | `boolean` | — | no | Deshabilita input/botones; `opacity: 0.58`. |
| `...props` | `HTMLAttributes<HTMLDivElement>` (menos `onChange`) | — | no | Atributos nativos del contenedor raíz. |

---

# Variants

No hay variantes visuales públicas — una sola apariencia canónica (PDF p.20). El estado
(vacío/con archivos/arrastrando) es derivado, no una prop.

---

# States

| State | Description |
|--------|-------------|
| Empty | Sin archivos. Tarjeta con ícono, copy instructivo y botón "SUBIR ARCHIVO" como contenido principal. |
| Drag-hover | `dragActive: true`. Highlight `border-color: white`; si ya hay archivos, la tarjeta vacía se superpone como overlay sobre la lista. |
| Con archivos | Panel de lista (header + filas/thumbnails), cada uno con botón quitar. |
| Error | Borde `#ff0404` en el panel de lista y/o la tarjeta vacía. |
| Disabled | `opacity: 0.58`; input y botones deshabilitados. |

---

# Layout (PDF p.20)

| Nivel | Elemento DOM | Prop / origen |
|-------|--------------|---------------|
| 1 | `div.ds-form-file__list-panel` (solo si hay archivos) | `files` |
| 1.1 | `div.ds-form-file__list-header` → label + botón "+" | `label` |
| 1.2 | `ul.ds-form-file__list` → filas o tarjetas thumbnail | cada `File` |
| 2 | `div.ds-form-file__empty` (siempre sin archivos; overlay si hay archivos + drag) | ícono, copy, botón "SUBIR ARCHIVO" |
| 3 | `input[type=file]` (oculto) | selector nativo |

---

# Accessibility

## Requirements

- El input de archivo real (`<input type="file">`) existe en el DOM (oculto visualmente,
  no `display: none`) — sigue siendo enfocable/activable por asistentes que lo requieran.
- Cada botón "quitar" tiene `aria-label` dinámico (`"Quitar {nombre de archivo}"`).
- El botón "+"/"SUBIR ARCHIVO" son `<button type="button">` nativos.
- `aria-invalid`/`aria-describedby` propagados al `<input>` oculto cuando hay `error`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-label` | Botones de quitar archivo (`"Quitar {nombre}"`) y de agregar más (`"Adjuntar más archivos"`). |
| `aria-invalid` / `aria-describedby` | En el `<input type="file">` oculto, cuando hay `error`. |

### Keyboard

| Key | Action |
|-----|--------|
| `Enter` / `Espacio` (foco en botón "SUBIR ARCHIVO" o "+") | Abre el selector nativo de archivos. |
| `Tab` | Navega entre botones de quitar/agregar. |

---

# Responsive Behavior

Sin media queries propias. Ancho fijo `253px` (calibrado ÷2 contra el vector del PDF,
505.5pt @2×) para el panel de lista y la tarjeta vacía.

---

# Composition

## Purpose in Layout

- **Input** — carga de archivos dentro de un formulario.

## Parent

- Cualquier contenedor de formulario del consumidor.

## Children

- No admite `children` libres — la lista se genera enteramente desde el estado interno de
  archivos.

## Siblings

- `FormTextInput`, `FormSelect`, `FormCheckable`, `FormDatePicker` — misma familia visual y
  feature.

## Alternatives

- Ninguna dentro del kit — es el único componente de carga de archivos.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `FormSelect` | Mismo patrón de overlay ("empty se superpone al input"). |
| `FormTextInput` | Comparte convención de `error`/`disabled` visual. |

---

# Content Guidelines

## Labels

- `label`: título corto (ej. `"ADJUNTAR ARCHIVOS"`).

## Values

- Nombre de archivo tal cual (`file.name`), tipo derivado de la extensión, tamaño formateado
  en Mb con un decimal.

## Icons

- Ícono de documento genérico (badge circular) en el estado vacío — no configurable vía
  props. Thumbnails de imagen usan la imagen real del archivo (`URL.createObjectURL`).

## Localization

- Copy de las stories en español ("Arrastra un archivo", "SUBIR ARCHIVO"); el componente no
  impone idioma (el texto instructivo está hardcodeado en el componente, no es una prop —
  ver Known Limitations).

---

# Examples

## Vacío

```tsx
<FormFileUpload label="ADJUNTAR ARCHIVOS" />
```

## Con archivos (controlado por el consumidor vía onFilesChange)

```tsx
<FormFileUpload
  label="ADJUNTAR ARCHIVOS"
  onFilesChange={(files) => console.log(files)}
/>
```

## Single-file

```tsx
<FormFileUpload label="ADJUNTAR ARCHIVOS" multiple={false} />
```

---

# Reasoning Examples

## User Request

Permitir adjuntar varios documentos y fotos a un caso, con posibilidad de quitarlos antes de
enviar.

### Recommended Components

- `FormFileUpload`

### Why

Único componente del kit con lista de archivos + drag&drop básico + botón de quitar por
ítem (PDF p.20).

---

# Design Tokens

| Token / value | Category | Usage |
|---------------|----------|-------|
| `--ds-color-pdf-surface` (`#060606`) | color | Fondo de filas/header/tarjeta vacía |
| `--ds-color-pdf-line` (`#c1c1c1`) | color | Texto del header ("ADJUNTAR ARCHIVOS") y meta de archivo (medido — la leyenda del PDF dice `#8d8d8d`, el span real gana) |
| `--ds-color-pdf-line-light` (`#e6e6e6`) | color | Copy instructivo y "Formatos admitidos" de la tarjeta vacía (medido — leyenda dice `#8d8d8d`) |
| `--ds-color-pdf-action` (`#494949`) | color | Ícono de documento (fondo del badge), botón "SUBIR ARCHIVO" |
| `--ds-color-pdf-ink-muted` (`#8a8b87`) | color | Trazo del ícono de documento |
| `--ds-color-white` (`#ffffff`) | color | Highlight de borde en drag-over, nombre de archivo |
| `--ds-color-black-a70` | color | Fondo del botón "quitar" sobre thumbnails |

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
packages/ui/src/components/FormFileUpload.tsx
```

## Dependencies

- `cn()` de `packages/ui/src/utils/cn.ts`
- `styles.css` (`.ds-form-file*`)
- API nativa del navegador: `File`, `DataTransfer`, `URL.createObjectURL`

## DOM Structure

```text
div.ds-form-file[.ds-form-field--invalid][.ds-form-field--disabled]
├── div.ds-form-file__list-panel (solo si hasFiles)
│   ├── div.ds-form-file__list-header → span + button "+"
│   └── ul.ds-form-file__list
│       ├── li.ds-form-file__row (archivos no-imagen)
│       └── li.ds-form-file__thumb (archivos imagen)
├── div.ds-form-file__empty[--drag][--overlay] (siempre sin archivos; overlay si drag+files)
│   ├── span.ds-form-file__empty-label
│   ├── span.ds-form-file__empty-icon → svg
│   ├── p.ds-form-file__empty-line (×2)
│   ├── p.ds-form-file__formats
│   └── button.ds-form-file__upload-button
├── input.ds-form-file__input[type=file] (oculto)
└── p.ds-form-field__error (solo si error)
```

---

# Known Limitations

- Sin previsualización de progreso de carga, reorder ni drag&drop avanzado — el PDF no
  especifica esa interacción más allá de la intención del diseñador (ver
  `DECISIONS.md` 2026-08-07).
- El copy instructivo ("Arrastra un archivo o haz click para subir.", "SUBIR ARCHIVO") está
  hardcodeado en español, no es una prop — un consumidor que necesite otro idioma debe
  hacer fork o pedirlo como mejora.
- No revoca los `object URL` de thumbnails al desmontar o reemplazar archivos.
- Sin tests unitarios ni de integración (sin framework de test instalado).

---

# Future Improvements

- [ ] Props de copy configurable (i18n) si un consumidor lo necesita.
- [ ] Cleanup explícito de `object URL`s de thumbnails.
- [ ] Preview de progreso de carga si un futuro consumidor lo requiere (fuera de scope v1).

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial (click-to-upload, drag&drop básico), feature `001-form-modal`. |
| 0.1.0 | **Reconstrucción estructural completa** (2026-08-07, sweep post-review): el extract de texto había subestimado la página — la implementación original renderizaba un único placeholder de texto sin lista real, sin thumbnails, sin botón de quitar. Renderizado directo con PyMuPDF (`get_pixmap()`/`get_drawings()`) reveló panel de lista (header + filas/thumbnails) separado de la tarjeta vacía, con ícono+botón "SUBIR ARCHIVO" real. Corregidos también 2 colores que discrepaban de la leyenda de la propia página (meta de archivo `#c1c1c1` no `#8d8d8d`; texto instructivo `#e6e6e6` no `#8d8d8d`) — mismo patrón que `Modal` p.22 (el span medido gana sobre la leyenda). |
| 0.1.1 | Fidelity pass de geometría 2026-08-10: insets del header/fila/label vacío (11px/8px/6px) sin medir, ~1.8-2.4× oversized — recalibrados a ~5px/3px contra `get_text("dict")` de p.20. |
