import "./backgroundTexture.css";

/**
 * @description Textura de fondo compartida (002-bg-texture) — 32 puntos reales
 * extraídos de `Textura fondo.svg` (Downloads de Luna, no committeada por tamaño,
 * ver DECISIONS.md 2026-08-07). Grupo con mix-blend-mode: screen + opacity: .05
 * (medido sobre el wrapper real del SVG fuente, corrige el opacity: .63 que había
 * quedado documentado en input.md — ver DECISIONS.md 2026-08-10). Cada punto anima
 * su propia opacidad (ease-in-out, ciclo base ~6s con jitter por índice, sin
 * sincronía) entre su valor medido y ~25% de ese valor — ver DECISIONS.md.
 *
 * No exportado en index.ts a propósito (constitution.md PROHIBITED-2): es un
 * helper interno, no un componente público del catálogo. Se aplica solo sobre
 * --ds-color-pdf-surface (#060606) — no verificado sobre otras superficies.
 *
 * Se renderiza como el primer hijo de un contenedor con position: relative — pinta
 * detrás del resto del contenido por orden de DOM, sin necesitar z-index.
 *
 * **Para cambiar la velocidad** (o volver a generar este archivo desde cero):
 * `animationDuration`/`animationDelay` de cada punto NO son valores sueltos
 * tipeados a mano — salen de esta fórmula, aplicada en orden de aparición (i =
 * índice del elemento, empezando en 0, BASE_DUR = 6.0 elegida tras comparar 3
 * velocidades con el humano, ver DECISIONS.md 2026-08-10):
 *   dur   = BASE_DUR + (i % 5) * (BASE_DUR * 0.08)
 *   delay = (i * (BASE_DUR * 0.11)) % BASE_DUR
 * Para otra velocidad: recalcular ambos valores para los 32 elementos con un
 * BASE_DUR distinto (mismo i por elemento, en el mismo orden en que aparecen
 * abajo) — no hace falta volver a leer `Textura fondo.svg`, la geometría
 * (`d`/`cx`/`cy`/`rx`/`ry`) y la opacidad base de cada punto no cambian.
 * @returns {JSX.Element} Overlay de textura de fondo, aria-hidden.
 */
export function BackgroundTextureDots() {
  return (
    <svg className="ds-bg-texture-dots" aria-hidden="true" focusable="false">
      <defs>
        <pattern
          id="ds-bg-texture-dots-pattern"
          patternUnits="userSpaceOnUse"
          width="137"
          height="73"
        >
          <g className="ds-bg-texture-dots__group">
        <g key={0} style={{ opacity: 0.55 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.00s", animationDelay: "0.00s" }} d="M9.24,2.07c.41,0,.74-.35.74-.79s-.33-.79-.74-.79-.74.35-.74.79.33.79.74.79Z" />
        </g>
        <g key={1} style={{ opacity: 0.6 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.48s", animationDelay: "0.66s" }} d="M26.37,2.56c.66,0,1.2-.57,1.2-1.28s-.54-1.28-1.2-1.28-1.2.57-1.2,1.28.54,1.28,1.2,1.28Z" />
        </g>
        <g key={2} style={{ opacity: 0.88 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.96s", animationDelay: "1.32s" }} d="M43.5,2.43c.6,0,1.09-.51,1.09-1.15s-.48-1.15-1.09-1.15-1.08.52-1.08,1.15.48,1.15,1.08,1.15Z" />
        </g>
        <g key={3} style={{ opacity: 0.77 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.44s", animationDelay: "1.98s" }} d="M60.63,2.4c.58,0,1.06-.5,1.06-1.12s-.48-1.12-1.06-1.12-1.05.5-1.05,1.12.48,1.12,1.05,1.12Z" />
        </g>
        <g key={4} style={{ opacity: 0.67 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.92s", animationDelay: "2.64s" }} d="M77.76,2.05c.4,0,.73-.34.73-.78s-.33-.78-.73-.78-.73.35-.73.78.33.78.73.78Z" />
        </g>
        <g key={5} style={{ opacity: 0.72 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.00s", animationDelay: "3.30s" }} d="M94.89,2.35c.56,0,1.01-.48,1.01-1.08s-.45-1.07-1.01-1.07-1.01.48-1.01,1.07.45,1.08,1.01,1.08Z" />
        </g>
        <g key={6} style={{ opacity: 0.95 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.48s", animationDelay: "3.96s" }} d="M112.03,2.47c.62,0,1.12-.54,1.12-1.19s-.5-1.19-1.12-1.19-1.12.53-1.12,1.19.5,1.19,1.12,1.19Z" />
        </g>
        <g key={7} style={{ opacity: 0.54 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.96s", animationDelay: "4.62s" }} d="M129.16,1.92c.33,0,.61-.29.61-.64s-.27-.64-.61-.64-.6.29-.6.64.27.64.6.64Z" />
        </g>
        <g key={8} style={{ opacity: 0.64 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.44s", animationDelay: "5.28s" }} d="M9.24,21.12c.85,0,1.54-.73,1.54-1.64s-.69-1.63-1.54-1.63-1.54.73-1.54,1.63.69,1.64,1.54,1.64Z" />
        </g>
        <g key={9} style={{ opacity: 0.75 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.92s", animationDelay: "5.94s" }} d="M26.37,20.65c.6,0,1.09-.52,1.09-1.16s-.49-1.16-1.09-1.16-1.1.52-1.1,1.16.49,1.16,1.1,1.16Z" />
        </g>
        <g key={10} style={{ opacity: 0.64 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.00s", animationDelay: "0.60s" }} d="M43.5,21.19c.89,0,1.61-.76,1.61-1.71s-.72-1.71-1.61-1.71-1.6.77-1.6,1.71.72,1.71,1.6,1.71Z" />
        </g>
        <g key={11} style={{ opacity: 0.78 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.48s", animationDelay: "1.26s" }} d="M60.63,20.97c.77,0,1.39-.66,1.39-1.48s-.62-1.48-1.39-1.48-1.39.66-1.39,1.48.62,1.48,1.39,1.48Z" />
        </g>
        <g key={12} style={{ opacity: 0.59 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.96s", animationDelay: "1.92s" }} d="M77.76,20.61c.59,0,1.06-.51,1.06-1.13s-.48-1.12-1.06-1.12-1.06.51-1.06,1.12.48,1.13,1.06,1.13Z" />
        </g>
        <g key={13} style={{ opacity: 0.9 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.44s", animationDelay: "2.58s" }} d="M94.89,20.17c.36,0,.64-.31.64-.69s-.29-.68-.64-.68-.64.3-.64.68.29.69.64.69Z" />
        </g>
        <g key={14} style={{ opacity: 0.61 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.92s", animationDelay: "3.24s" }} d="M112.03,20.75c.66,0,1.19-.57,1.19-1.27s-.53-1.26-1.19-1.26-1.19.56-1.19,1.26.53,1.27,1.19,1.27Z" />
        </g>
        <g key={15} style={{ opacity: 0.96 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.00s", animationDelay: "3.90s" }} d="M129.16,20.52c.54,0,.98-.46.98-1.04s-.44-1.04-.98-1.04-.97.46-.97,1.04.44,1.04.97,1.04Z" />
        </g>
        <g key={16} style={{ opacity: 0.67 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.48s", animationDelay: "4.56s" }} d="M9.24,39.24c.8,0,1.45-.69,1.45-1.54s-.65-1.55-1.45-1.55-1.46.69-1.46,1.55.65,1.54,1.46,1.54Z" />
        </g>
        <g key={17} style={{ opacity: 0.83 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.96s", animationDelay: "5.22s" }} d="M26.37,38.9c.63,0,1.14-.54,1.14-1.21s-.51-1.22-1.14-1.22-1.14.54-1.14,1.22.51,1.21,1.14,1.21Z" />
        </g>
        <g key={18} style={{ opacity: 0.87 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.44s", animationDelay: "5.88s" }} d="M43.5,38.96c.66,0,1.2-.57,1.2-1.27s-.53-1.27-1.2-1.27-1.19.57-1.19,1.27.53,1.27,1.19,1.27Z" />
        </g>
        <g key={19} style={{ opacity: 0.74 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.92s", animationDelay: "0.54s" }} d="M60.63,39.47c.92,0,1.67-.79,1.67-1.77s-.75-1.78-1.67-1.78-1.67.79-1.67,1.78.75,1.77,1.67,1.77Z" />
        </g>
        <g key={20} style={{ opacity: 0.81 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.00s", animationDelay: "1.20s" }} d="M77.76,39.57c.98,0,1.77-.84,1.77-1.88s-.79-1.88-1.77-1.88-1.77.84-1.77,1.88.79,1.88,1.77,1.88Z" />
        </g>
        <g key={21} style={{ opacity: 0.79 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.48s", animationDelay: "1.86s" }} d="M94.89,39.35c.86,0,1.56-.74,1.56-1.66s-.7-1.66-1.56-1.66-1.56.74-1.56,1.66.7,1.66,1.56,1.66Z" />
        </g>
        <g key={22} style={{ opacity: 0.61 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.96s", animationDelay: "2.52s" }} d="M112.03,39.36c.87,0,1.57-.75,1.57-1.66s-.7-1.67-1.57-1.67-1.57.75-1.57,1.67.7,1.66,1.57,1.66Z" />
        </g>
        <g key={23} style={{ opacity: 0.8 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.44s", animationDelay: "3.18s" }} d="M129.16,39.15c.76,0,1.38-.65,1.38-1.46s-.62-1.46-1.38-1.46-1.38.65-1.38,1.46.62,1.46,1.38,1.46Z" />
        </g>
        <g key={24} style={{ opacity: 0.58 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.92s", animationDelay: "3.84s" }} d="M9.24,57.46c.81,0,1.47-.7,1.47-1.56s-.66-1.56-1.47-1.56-1.47.7-1.47,1.56.66,1.56,1.47,1.56Z" />
        </g>
        <g key={25} style={{ opacity: 0.59 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.00s", animationDelay: "4.50s" }} d="M43.5,58.15c1.17,0,2.12-1.01,2.12-2.25s-.95-2.25-2.12-2.25-2.11,1.01-2.11,2.25.95,2.25,2.11,2.25Z" />
        </g>
        <g key={26} style={{ opacity: 0.87 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.48s", animationDelay: "5.16s" }} d="M60.63,57.53c.85,0,1.54-.74,1.54-1.64s-.69-1.64-1.54-1.64-1.54.73-1.54,1.64.69,1.64,1.54,1.64Z" />
        </g>
        <g key={27} style={{ opacity: 0.67 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.96s", animationDelay: "5.82s" }} d="M94.89,57.53c.85,0,1.54-.73,1.54-1.63s-.69-1.64-1.54-1.64-1.54.73-1.54,1.64.69,1.63,1.54,1.63Z" />
        </g>
        <g key={28} style={{ opacity: 0.85 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.44s", animationDelay: "0.48s" }} d="M112.03,57.57c.87,0,1.57-.75,1.57-1.67s-.7-1.67-1.57-1.67-1.57.75-1.57,1.67.71,1.67,1.57,1.67Z" />
        </g>
        <g key={29} style={{ opacity: 0.9 }}>
          <path className="ds-bg-texture-dots__dot" style={{ animationDuration: "7.92s", animationDelay: "1.14s" }} d="M129.16,57.5c.83,0,1.51-.71,1.51-1.6s-.68-1.6-1.51-1.6-1.51.72-1.51,1.6.68,1.6,1.51,1.6Z" />
        </g>
        <g key={30} style={{ opacity: 0.88 }}>
          <ellipse className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.00s", animationDelay: "1.80s" }} cx="26.37" cy="55.9" rx="1.23" ry="1.31" />
        </g>
        <g key={31} style={{ opacity: 0.76 }}>
          <ellipse className="ds-bg-texture-dots__dot" style={{ animationDuration: "6.48s", animationDelay: "2.46s" }} cx="77.76" cy="55.9" rx="1.34" ry="1.43" />
        </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ds-bg-texture-dots-pattern)" />
    </svg>
  );
}
