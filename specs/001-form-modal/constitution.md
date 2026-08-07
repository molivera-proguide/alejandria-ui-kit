# Constitution — 001-form-modal

## MUST

1. Cada componente nuevo (`FormTextInput`, `FormSelect`, `FormCheckable`,
   `FormFileUpload`, `FormDatePicker`, `Modal`) es un `.tsx` + `.stories.tsx`
   plano en `packages/ui/src/components/`, sin carpeta propia.
2. Todo export público pasa por `packages/ui/src/index.ts` — ningún componente
   se considera terminado sin su línea `export` en el barrel.
3. Valores visuales (color, tipografía, borde, espaciado) citan la página
   exacta del PDF v3 (`knowledge/references/pdf-text-extract.md`, p.17–22) vía
   comentario en el código, mismo patrón que componentes ya cerrados.
4. Colores/medidas del PDF (@2×) se dividen entre 2 al pasar a `--ds-*` en
   `styles.css`, salvo que un token equivalente ya exista — en ese caso se
   reusa, no se duplica.
5. `error` y `disabled` son props puramente visuales, controladas por quien
   consume el componente. Ningún componente dispara lógica de validación por
   su cuenta.
6. `Modal` implementa únicamente la variante "Confirmación de acción" (p.22) —
   título, texto, línea separadora, 2 botones de acción configurables.
7. `knowledge/component-roadmap.md` se actualiza como parte del cierre de esta
   feature (nota de Form obsoleta + gap Modal/Dialog resuelto).
8. Cualquier valor no especificado por el PDF (timing de animación, estilo de
   `disabled`, comportamiento de drag&drop) se implementa con un criterio
   razonable y se registra en `DECISIONS.md` vía `/sdd-log`.

## PROHIBITED

1. No crear un componente `Form` compuesto que orqueste los field primitives —
   arquitectura descartada explícitamente en `/sdd-refine`.
2. No instalar framework de test ni linter como efecto colateral de esta
   feature — decisión consciente del proyecto, fuera de este scope.
3. No implementar FILTER (p.23) ni tocar `Scrollbar.tsx` — quedan fuera de
   esta feature (ver `spec.md` § Fuera de scope).
4. No implementar las variantes "Alert Sigcat" ni "Tarea realizada" de p.22 —
   solo "Confirmación de acción".
5. No agregar lógica de validación (client o server), autoguardado, ni los
   estados `readonly`/`loading`.
6. No modificar `existing-arch.md` — es descriptivo, no se edita para
   acomodar esta feature.
7. No exportar ningún componente sin story en Storybook.
