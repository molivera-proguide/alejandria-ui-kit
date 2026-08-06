import type { CSSProperties, HTMLAttributes, ReactElement } from "react";
import { cn } from "../utils/cn";

export type ProgressRingTone = "neutral" | "success" | "warning" | "danger";
export type ProgressRingSize = "sm" | "md" | "lg";
/**
 * @description Sistema visual: `"console"` (conic-gradient, tokens `--ds-color-blue/green/amber/danger`,
 * escala rem) o `"pdf"` (anillo SVG de dos trazos, tokens `--ds-color-pdf-*`, calibrado @2× ÷2 según
 * GRAFICOS p.9 "Torta" — `doc[8]`, no confundir con la Torta comparativa de p.10 que ya cubre `DonutChartCard`).
 * @type {"console" | "pdf"}
 */
export type ProgressRingVariant = "console" | "pdf";

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
  tone?: ProgressRingTone;
  size?: ProgressRingSize;
  /**
   * @description `"pdf"` (default) para el gauge de estado de GRAFICOS p.9 "Torta", o
   * `"console"` para el anillo `conic-gradient` original.
   * @type {ProgressRingVariant}
   */
  variant?: ProgressRingVariant;
}

// PDF p.9 "GRAFICOS" › "Torta" (doc[8], get_drawings()/get_text() sobre el mediabox 1920×1080 @2×)
// — gauge de progreso con semántica de estado, distinto de la torta comparativa en gris de p.10
// que ya cubre DonutChartCard.
//
// Solo el tamaño que el PDF mide directamente (36px de diámetro, 7.5/3.5px de trazo, 9/10px de
// fuente — única instancia en la página) se usó alguna vez como "md" en la v1 de este variant.
// A pedido de usuario (2026-08-06, tras ver el render): ese tamaño se sentía muy chico y el
// número tocaba el trazo de progreso — el "large" extrapolado (48px) pasa a ser el nuevo "md", y
// "sm"/"lg" se re-derivan de este nuevo "md" con la misma razón proporcional que ya usaba la v1
// (0.696 / 1 / 1.321), aplicada esta vez a las CUATRO magnitudes (diámetro, ambos trazos y ambas
// fuentes) para que la relación texto/anillo se mantenga constante en los tres tamaños — así
// ninguno (ni "sm") corre riesgo de que el número toque el arco, no solo el que antes era "large".
// Ningún tamaño de esta tabla nueva es una medición PDF independiente salvo por herencia de la v1
// — ver ProgressRing.spec.md.
const PDF_DIAMETER: Record<ProgressRingSize, string> = {
  sm: "var(--ds-size-progress-pdf-sm)",
  md: "var(--ds-size-progress-pdf-md)",
  lg: "var(--ds-size-progress-pdf-lg)"
};
const PDF_DIAMETER_PX: Record<ProgressRingSize, number> = { sm: 33, md: 48, lg: 63 };
const PDF_PROGRESS_STROKE: Record<ProgressRingSize, number> = { sm: 6.9, md: 9.9, lg: 13.1 };
const PDF_TRACK_STROKE: Record<ProgressRingSize, number> = { sm: 3.2, md: 4.6, lg: 6.1 };
const PDF_VALUE_FONT: Record<ProgressRingSize, number> = { sm: 6, md: 9, lg: 12 };
const PDF_LABEL_FONT: Record<ProgressRingSize, number> = { sm: 7, md: 10, lg: 13 };

// PDF legend: "Número: ... #e3a500 - #ff0404 - #28a500" / "Porcion completada: ... #e3a500 -
// #ff0404 - #28a500" — ring + big-number color is driven entirely by tone, exact hex per color.
// "neutral" has no example on this page; falls back to the muted ink token rather than inventing
// a 4th hue not present in the PDF.
const PDF_TONE_COLOR: Record<ProgressRingTone, string> = {
  neutral: "var(--ds-color-pdf-ink-muted)",
  success: "var(--ds-color-pdf-success)",
  warning: "var(--ds-color-pdf-warning)",
  danger: "var(--ds-color-pdf-critical)"
};

/**
 * @description Anillo de progreso circular con tono semántico. Ver `ProgressRingVariant` para
 * elegir entre el gauge PDF de GRAFICOS p.9 "Torta" (default) y el sistema "console" original.
 * @param {ProgressRingProps} props - Propiedades del anillo de progreso.
 * @returns {ReactElement} Anillo de progreso.
 */
export function ProgressRing({
  value,
  label,
  tone = "neutral",
  size = "md",
  variant = "pdf",
  className,
  style,
  ...props
}: ProgressRingProps): ReactElement {
  const clampedValue = Math.max(0, Math.min(100, value));

  if (variant === "pdf") {
    const diameterPx = PDF_DIAMETER_PX[size];
    const progressStroke = PDF_PROGRESS_STROKE[size];
    const trackStroke = PDF_TRACK_STROKE[size];
    const outerStroke = Math.max(progressStroke, trackStroke);
    const radius = diameterPx / 2 - outerStroke / 2;
    const circumference = 2 * Math.PI * radius;
    const dash = (clampedValue / 100) * circumference;
    const color = PDF_TONE_COLOR[tone];
    const center = diameterPx / 2;

    return (
      <div className={cn("ds-progress-pdf", className)} style={style} {...props}>
        <div
          className="ds-progress-pdf__ring"
          style={{ height: PDF_DIAMETER[size], width: PDF_DIAMETER[size] }}
        >
          <svg
            viewBox={`0 0 ${diameterPx} ${diameterPx}`}
            role="img"
            aria-label={label ? `${label}: ${clampedValue}%` : `${clampedValue}%`}
          >
            <circle
              className="ds-progress-pdf__track"
              cx={center}
              cy={center}
              fill="none"
              r={radius}
              strokeWidth={trackStroke}
            />
            <circle
              className="ds-progress-pdf__arc"
              cx={center}
              cy={center}
              fill="none"
              r={radius}
              stroke={color}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeLinecap="butt"
              strokeWidth={progressStroke}
              transform={`rotate(-90 ${center} ${center})`}
            />
          </svg>
          <span
            className="ds-progress-pdf__value"
            style={{ color, fontSize: PDF_VALUE_FONT[size] }}
          >
            {clampedValue}%
          </span>
        </div>
        {label ? (
          <span className="ds-progress-pdf__label" style={{ fontSize: PDF_LABEL_FONT[size] }}>
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  const progressStyle = {
    ...style,
    "--progress-value": `${clampedValue * 3.6}deg`
  } as CSSProperties;

  return (
    <div
      className={cn("ds-progress", `ds-progress--${tone}`, `ds-progress--${size}`, className)}
      role="img"
      aria-label={label ? `${label}: ${clampedValue}%` : `${clampedValue}%`}
      style={progressStyle}
      {...props}
    >
      <span className="ds-progress__value">{clampedValue}%</span>
      {label ? <span className="ds-progress__label">{label}</span> : null}
    </div>
  );
}
