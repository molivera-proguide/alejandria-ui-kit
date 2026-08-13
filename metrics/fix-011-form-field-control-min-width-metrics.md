# Fix — fix-011-form-field-control-min-width

## Fix — 2026-08-13T00:00:00Z
- command_origin: reporte directo de Luna (post fix-010)
- archivos_tocados: 1 (packages/ui/src/styles.css — .ds-form-field__control)
- test_reproductor: sin framework de test instalado — verificación en vivo (Browser
  pane): 9 elementos desbordados hasta 99px a 820px antes del fix, 0 desbordes a
  820px y 700px después, labels largos truncando a "…" como diseñado
- colisiones_detectadas: 0 (no hay features OPEN al momento de este fix)
- alcance: componente compartido (styles.css), no solo la screen — beneficia a todo
  consumidor futuro de FormTextInput/FormSelect/FormDatePicker
