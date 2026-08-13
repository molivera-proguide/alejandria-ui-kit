# Fix — fix-009-scale-calibration-correction

**Status: OPEN — multi-session, componente por componente. Este archivo se actualiza
por cada ronda, no se cierra hasta que todo el kit esté re-calibrado.**

## Ronda 1 — 2026-08-13T00:00:00Z (Form* family / CargaDeFormulario)
- command_origin: conversación directa (no /sdd-fix — excede el alcance de un fix normal,
  ver features.yaml)
- archivos_tocados: 4 (styles.css § Form* family, carga-de-formulario.css,
  knowledge/specs/README.md, knowledge/fidelity-pass/next-steps.md)
- valores_recalibrados: ~35 declaraciones (font-size, min-height, padding, width, height,
  offsets derivados) en FormTextInput/FormSelect/FormCheckable(+Group)/FormFileUpload/
  FormDatePicker + 3 en la screen misma
- test_reproductor: sin framework de test instalado (mismo criterio ya establecido en
  DECISIONS.md) — verificación en vivo (Browser pane, getComputedStyle/
  getBoundingClientRect) antes y después: fuentes 5-8px → 10-20px; sin overflow a 1920px
  (ancho real del diseño), overflow esperado a 1280px (misma limitación "sin responsive"
  ya documentada en el kit)
- colisiones_detectadas: 0 (no hay features OPEN al momento de este fix)
- pendiente: el resto del kit (TaskCard, InvestigationCard, ModuleCard, MetricCard,
  Asistente, SideBar, CalendarCard, Modal, Login) — ver knowledge/fidelity-pass/next-steps.md

## Ronda 2 — 2026-08-13T00:00:00Z (rechazo visual + revert)
- command_origin: revisión visual directa de Luna en Storybook
- resultado: rechazado — "se ve enorme y solapado todo", "se veían visualmente más
  fieles antes de multiplicar x2"
- acción: revertido vía `git checkout --` (packages/ui/src/styles.css,
  carga-de-formulario.css) — sin cambios netos de código respecto al estado
  pre-sesión
- archivos_tocados (documentación, no código): DECISIONS.md, features.yaml,
  knowledge/fidelity-pass/next-steps.md
- estado: ratio general sigue sin resolver, Luna eligió seguir pensándolo antes de
  continuar — no re-intentar "sin dividir" en otro componente sin su decisión
  explícita

## Ronda 4 — 2026-08-13T00:00:00Z (piso de legibilidad solo en font-size)
- command_origin: pedido directo de Luna, tras rechazar ronda 3 (ratio 0.75)
- acción: revertido a ÷2 vía git checkout, después piso de 12px aplicado SOLO a
  font-size (labels/valores/descripciones/botones de navegación del datepicker) +
  2 ajustes dependientes (line-height/height) para evitar clipping vertical en 2
  filas de grilla auto-height
- archivos_tocados: 2 (styles.css § familia Form*, carga-de-formulario.css) — solo
  font-size, ningún otro tamaño tocado
- test_reproductor: sin framework de test instalado — verificación en vivo
  (getComputedStyle/getBoundingClientRect): fuentes de cuerpo en 12px, sin overflow
  a 1280px, columnas de 372px con FormFileUpload (253px, sin tocar) con margen
- colisiones_detectadas: 0
- estado: pendiente de confirmación visual de Luna en su propio Storybook

## Ronda 5 — 2026-08-13T00:00:00Z (piso bajado a 10px)
- command_origin: pedido directo de Luna
- acción: mismo mecanismo de ronda 4, piso bajado de 12px a 10px; 2 ajustes
  dependientes recalculados (14px→12px de alto de fila en day/spinner-value,
  max-height del spinner 98px→84px)
- test_reproductor: verificación en vivo — fuentes en 10px, sin overflow a 1280px
- estado: pendiente de confirmación visual de Luna

## Ronda 7 — 2026-08-13T00:00:00Z (piso vuelto a 10px)
- command_origin: pedido directo de Luna
- acción: piso subido de 8px (ronda 6) a 10px; recuperado el ajuste dependiente de
  line-height/height (12px) en day/spinner-value para evitar clipping
- test_reproductor: verificación en vivo — fuentes en 10px, sin overflow a 1280px
