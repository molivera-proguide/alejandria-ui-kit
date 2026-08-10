# Handoff — Chequear geometría de los otros 5 componentes de Form/Modal, luego draft de pantallas Grupo A
Fecha: 2026-08-07
Tipo: GATE
Sesión de origen: Post-cierre de 001-form-modal (checklist + review APROBADO) — sesión de indexación de `knowledge/`, primera screen (`Carga de Formulario`) y fidelity-hardening de `FormCheckable`
Próximo comando sugerido: ninguno de SDD formal para la parte 1 (fidelity-pass manual, mismo método ya usado); `/sdd-refine` para la parte 2

---

## Contexto del proyecto
`alejandria-ui-kit` construye componentes a partir de `knowledge/references/design-reference.pdf`, con `knowledge/` como fuente de verdad visual. `001-form-modal` (6 componentes: FormTextInput, FormSelect, FormCheckable, FormFileUpload, FormDatePicker, Modal) está cerrada y revisada. Esta sesión construyó la primera "screen" documentada del kit (`Carga de Formulario`, PDF de pantallas compuestas) y, al revisarla, se encontraron 3 bugs reales de **geometría** en `FormCheckable` que un sweep de fidelidad anterior había dado por "verificado pixel-a-pixel" — pero ese sweep solo chequeó colores, nunca posición ni tamaño.
→ Ver: `specs/001-form-modal/`, `knowledge/components/FormCheckable.md`, `knowledge/component-roadmap.md` § "Screens triage".

## Estado al momento del handoff

✅ Completado:
- `001-form-modal`: checklist + review APROBADO, feature `CLOSED`.
- `knowledge/` indexado completo: los 6 componentes de Form/Modal + `LinearBarChartCard` + `DetailSheet` — manifest pasó de 24/27 a 32 componentes/35 specs.
- `DetailSheet`: cita de página PDF corregida (p.5, no p.4) + colores hardcodeados tokenizados.
- `component-roadmap.md`: 2 notas obsoletas corregidas (Ficha "no exportado", Asistente "774px deferred").
- PDF "Alejandria - Agosto 2026.pdf" (pantallas compuestas, 107.7MB, en el Downloads de Luna): triage completo de las 24 pantallas reales (6 páginas del archivo están vacías, descartadas) — clasificadas Grupo A/B/C en `component-roadmap.md` § "Screens triage". Decisión: el PDF **no se commitea al repo** (excede el límite duro de 100MB de GitHub sin Git LFS configurado) — queda externo, citado por página.
- Primera screen construida: `knowledge/screens/carga-de-formulario.md` + `packages/ui/src/screens/carga-de-formulario/` (pantalla #19 del triage, Grupo A, cero gaps de componentes al momento de construirla).
- **3 bugs reales de geometría en `FormCheckable`**, encontrados al revisar esa screen y corregidos en esta sesión:
  1. Switch: el control renderizaba antes del label (debía ir después, pegado al borde derecho) y a un tamaño ~3.4× oversized (52×28px vs. real 16×8px — medido con `get_drawings()`).
  2. `FormCheckableGroup` no soportaba layout horizontal — el PDF muestra el grupo "TIPO DE USUARIO" sin bajada en una sola fila; se agregó `layout="vertical"|"horizontal"` (default vertical, no rompe usos existentes).
  3. Control checkbox/radio: 17px shipeado vs. ⌀7px real (~2.4× oversized) — confirmado en 4 filas distintas del PDF antes de corregir. Check-glyph y punto interior del radio recalibrados en la misma pasada.

🔄 En curso:
- Ninguno — todo lo de arriba con commit hecho (`b5890e2`, `2c36072`, `074bb3e`) **excepto** la screen `Carga de Formulario` y los 3 fixes de `FormCheckable` de esta última sesión, que todavía no se commitearon.

🚧 Bloqueado / pendiente de decisión:
- Ninguno.

## Caminos descartados (intentados sin éxito)
- **Leer `getComputedStyle` inmediatamente después de mutar `:checked` vía JS** — devuelve el valor previo al toggle porque el Browser pane de este entorno no composita frames (ya documentado en handoffs previos), y una propiedad con `transition` declarada nunca "avanza" su reloj de interpolación. Solución: anular `element.style.transition = 'none'` antes de leer, o confiar en propiedades sin `transition` (los `.matches()`/atributos DOM sí reflejan el estado real al instante).
- **Commitear el PDF de pantallas tal cual** — descartado por Luna explícitamente: 107.7MB excede el límite de GitHub (100MB) sin Git LFS; se decidió no sumar esa infraestructura para un archivo de uso interno único (ver DECISIONS.md).
- **Tocar los tokens compartidos `--ds-size-icon-md`/`--ds-size-switch-track-*` directamente** en vez de usar literales locales en `FormCheckable` — habría afectado `Button`/`TextField`/`Switch` (familias no relacionadas, otra escala). Se usaron literales locales solo en `FormCheckable`.

## Foco de la próxima sesión

**Parte 1 — Chequear geometría (no solo color) de los otros 5 componentes de `001-form-modal` contra `design-reference.pdf`:**
`FormTextInput` (p.17-18), `FormSelect` (p.18), `FormFileUpload` (p.20), `FormDatePicker` (p.21), `Modal` (p.22).

- Usar el mismo método que destapó los 3 bugs de `FormCheckable`: `page.get_drawings()` (rects de controles/track/thumb reales) + `page.get_text('dict')` (posición de spans de texto) sobre la página real del PDF — **no** confiar solo en `pdf-text-extract.md` ni asumir que el sweep post-review anterior (`knowledge/fidelity-pass/next-steps.md`, entrada "Full PyMuPDF visual sweep de p.17-20") ya cubrió esto: esa pasada dice explícitamente haber verificado colores, no geometría (posición, tamaño de controles).
- Puntos concretos a mirar, por lo que ya salió mal en `FormCheckable`: tamaño absoluto de cualquier control/track/thumb/glyph reusado de un token de otra familia (`--ds-size-*`, `--ds-color-*` están bien, pero tamaños compartidos con `Button`/`TextField`/`Switch` son sospechosos); orden visual del control respecto al label en cada sub-variante; cualquier gap/spacing entre elementos repetidos (como el layout horizontal que faltaba).
- Corregir lo que aparezca. Documentar cada fix en el `.md`/`.spec.md` del componente correspondiente + `knowledge/fidelity-pass/next-steps.md` (mismo patrón que `FormCheckable` esta sesión). Solo usar `/sdd-log`/`DECISIONS.md` si el fix es una desviación real del brief (ej. una interpretación donde el PDF no especifica algo) — no para correcciones de fidelidad puras hacia un valor que el PDF sí especifica.

**Parte 2 — Después de cerrar la Parte 1, armar el draft en `drafts/` para las pantallas del Grupo A/B del triage** (`knowledge/component-roadmap.md` § "Screens triage") que faltan construir: p.1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 20, 21, 22, 23 (p.19 ya está hecha).

- p.2 (Login) y p.3 (Asistente vacío) ya tienen el componente/pattern construido — el draft para esas dos es sobre documentar la composición como *screen* (`knowledge/screens/*.md`), no sobre componentes nuevos.
- p.8 (kanban) tiene un bug de sizing sin cerrar en `TaskCard` (ver tabla "Post-baseline" en `component-roadmap.md` — un `style` externo pisa el cap del componente) — decidir si se resuelve antes del draft o como parte del scope de esa pantalla.
- p.20/21/22 (Grupo B) necesitan primero decidir sobre los gaps chicos que el triage ya identificó (Toast/Snackbar, Acordeón, Tabs, thread de chat de Asistente) — el draft debería plantear esas preguntas para el grilling de `/sdd-refine`, no asumir respuestas.

## Decisiones relevantes
→ Ver `DECISIONS.md`, entradas 2026-08-07: "PDFs de referencia grandes: no se commitean al repo por defecto", "Primera screen (`Carga de Formulario`, p.19): reencuadrada como field gallery". Los 3 fixes de geometría de `FormCheckable` de esta sesión **no** tienen entrada en `DECISIONS.md` a propósito (ver Paso 1 de este handoff) — están documentados en `knowledge/components/FormCheckable.md` y `.spec.md` (Changelog/Deltas) y en `knowledge/fidelity-pass/next-steps.md`.

## Skills / comandos sugeridos para la próxima sesión
- Ninguno de SDD formal para la Parte 1 — es fidelity-pass manual directo (PyMuPDF + fix + doc), sin ciclo spec/plan/tasks, mismo patrón ya usado en toda la sesión.
- `/sdd-refine` para la Parte 2 — el draft de pantallas Grupo A/B alimenta ese comando.

## Información redactada
Ninguna.
