# Checklist — 001-form-modal

## Accesibilidad
- [ ] CHK001 Abro el desplegable de FormSelect con Enter estando enfocado en el trigger, sin usar el mouse.
- [ ] CHK002 Abro el desplegable de FormSelect con Espacio.
- [ ] CHK003 Cierro el desplegable de FormSelect con Escape y confirmo que el foco vuelve al trigger.
- [ ] CHK004 Navego las opciones del desplegable de FormSelect con flechas arriba/abajo y selecciono con Enter.
- [ ] CHK005 Abro el calendario de FormDatePicker con Enter/Espacio sin usar el mouse.
- [ ] CHK006 Cierro el calendario de FormDatePicker con Escape.
- [ ] CHK007 Navego los días del grid de FormDatePicker con las flechas del teclado y confirmo la selección con Enter.
- [ ] CHK008 Ajusto el selector de hora de FormDatePicker con teclado (no solo con mouse) y confirmo que el valor cambia.
- [ ] CHK009 Verifico foco visible (outline/contorno) al navegar con Tab por los 5 field primitives (FormTextInput, FormSelect, FormCheckable, FormFileUpload, FormDatePicker).
- [ ] CHK010 Confirmo que el label de cada uno de los 5 field primitives está asociado al control (click en el label enfoca/activa el control).
- [ ] CHK011 Navego FormCheckable con Tab y activo checkbox/switch con Espacio, o navego un grupo de radios con flechas.
- [ ] CHK012 Activo el selector de archivos de FormFileUpload con Enter/Espacio estando enfocada la zona, sin mouse.
- [ ] CHK013 Con un lector de pantalla (NVDA/VoiceOver), confirmo que el estado `error` de cada field primitive se anuncia, no solo se ve.

## UX
- [ ] CHK014 Arrastro un archivo real (PDF/JPG/PNG/DOC) desde el explorador de archivos sobre la zona de FormFileUpload y confirmo el highlight visual de drag.
- [ ] CHK015 Suelto un archivo con extensión no soportada sobre FormFileUpload y confirmo que el componente no rompe visualmente (la validación en sí es responsabilidad del consumidor, fuera de scope).
- [ ] CHK016 Subo múltiples archivos a FormFileUpload y confirmo que la lista muestra fila/thumbnail/botón quitar por cada uno sin desbordar el layout.
- [ ] CHK017 Quito un archivo con el botón "quitar" en FormFileUpload y confirmo que la lista se actualiza (y vuelve al estado vacío si era el último).
- [ ] CHK018 Ajusto el spinner de hora de FormDatePicker con mouse/trackpad real y confirmo que el valor cambia visualmente.
- [ ] CHK019 En FormSelect multiselect, marco varias opciones con mouse y confirmo que el desplegable refleja todas las marcadas sin cerrarse antes de tiempo.

## Negocio
- [ ] CHK020 Comparo cada uno de los 6 componentes, en pantalla lado a lado con el PDF, contra su página correspondiente (p.17 login, p.18 default/select, p.19 checkable, p.20 file upload, p.21 date picker, p.22 modal).
- [ ] CHK021 Confirmo visualmente que el label flotante de FormTextInput usa la tipografía "Source Code Light" (no solo reviso el nombre de la variable CSS).
- [ ] CHK022 Confirmo que el Modal implementado corresponde solo a "Confirmación de acción" y que no se coló ninguna variante de "Alert Sigcat"/"Tarea realizada" (fuera de scope).
- [ ] CHK023 Reviso que el contrato de props de Modal (`onClose`, `secondaryAction.onClick`, `primaryAction.onClick`) sea claro para quien lo consuma como controlado — Modal no se cierra solo, y la story actual no lo demuestra (wiring queda del lado de la app consumidora, no de este kit).
