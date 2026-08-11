# Checklist — 002-bg-texture (verificación manual)

> Generado por `/sdd-checklist` a partir de `spec.md`, `plan.md` y `tasks.md`.
> Cubre solo lo que un test automatizado no puede verificar — no repite
> chequeos de código-vs-spec ya confirmados con computed styles en Storybook
> durante `/sdd-implement` (mix-blend-mode, cantidad de puntos, `position:
> relative`, etc.). Lo completa un humano.
>
> **Verificado por Luna el 2026-08-10** — los 14 ítems confirmados OK, incluyendo
> el sign-off de diseño (CHK012, CHK014).

## Accesibilidad
- [x] CHK001 Activé "reducir movimiento" (Chrome DevTools → Rendering →
  Emulate CSS media feature `prefers-reduced-motion: reduce`, o la
  preferencia real del sistema) y confirmé que la textura de fondo de
  **Login** queda completamente estática, sin oscilar.
- [x] CHK002 Repetí el mismo chequeo en **Carga de Formulario** y confirmé
  el mismo resultado.
- [x] CHK003 Con un lector de pantalla (NVDA/VoiceOver) activo, navegué
  Login y Carga de Formulario y confirmé que el overlay de textura
  (`aria-hidden="true"`) no se anuncia ni interrumpe el orden de lectura
  del contenido real.
- [x] CHK004 En el punto más brillante de la oscilación de cada punto,
  confirmé visualmente que el texto y los controles que quedan sobre el
  fondo (labels, inputs, botones) siguen siendo legibles sin pérdida de
  contraste perceptible.

## UX
- [x] CHK005 Miré la pantalla completa (no solo el tile aislado) y confirmé
  que la repetición del tile de 137×73 no genera una costura o patrón de
  repetición visible a simple vista.
- [x] CHK006 Dejé la pantalla abierta al menos 30 segundos y confirmé que
  la animación se sigue leyendo "sutil, que no llama la atención" — el
  criterio original del diseñador — y no "ruidosa" o distractiva.
- [x] CHK007 Interactué con el resto del contenido de la pantalla
  (formularios, sidebar, botones) mientras la textura anima de fondo y
  confirmé que no se percibe como una distracción durante tareas reales.

## Performance
- [x] CHK008 Con el panel de Performance/Rendering de DevTools abierto,
  confirmé que no hay caída de FPS ni jank perceptible mientras la textura
  anima, incluso con scroll o interacciones simultáneas.
- [x] CHK009 Probé con throttling de CPU (perfil limitado en DevTools) y
  confirmé que la animación no degrada notablemente la fluidez del resto
  de la UI.

## Compatibilidad
- [x] CHK010 Verifiqué visualmente en al menos dos navegadores distintos
  (ej. Chrome y Firefox, o Chrome y Safari) que `mix-blend-mode: screen`
  sobre el `<pattern>` SVG se ve igual, sin diferencias de tono o pixelado.
- [x] CHK011 Probé con la ventana angosta (mobile/tablet width) y confirmé
  que el fondo se recorta correctamente en los bordes del contenedor, sin
  franjas ni cortes raros.

## Negocio
- [x] CHK012 Le mostré la pantalla completa (no el preview aislado de 3
  paneles) al diseñador o a Luna en su nombre, y confirmé que la velocidad
  "lenta" y la amplitud elegidas siguen pareciendo correctas en el contexto
  real del producto.
- [x] CHK013 Confirmé que ninguna pantalla fuera de Login y Carga de
  Formulario quedó afectada por este cambio (revisé Storybook completo, no
  solo estas dos stories).
- [x] CHK014 Confirmé con el diseñador que la interpretación de "como tiene
  Claude" (sensación general, no referencia literal) sigue siendo válida
  ahora que se ve el resultado real.
