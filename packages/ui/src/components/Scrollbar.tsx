import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Props del scroll vertical presentacional (MISCELÁNEAS, PDF p.13).
 */
export interface ScrollbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description Posición del thumb a lo largo del track, de 0 (inicio) a 100 (fin).
   */
  value?: number;
  /**
   * @description Altura del thumb como porcentaje de la altura del track (proporción PDF ≈ 17.4).
   */
  thumbSize?: number;
  /**
   * @description Etiqueta accesible del scrollbar (consumidor; p. ej. nombre de la región que controla).
   */
  label?: string;
}

/**
 * @description Scrollbar vertical presentacional fiel a MISCELÁNEAS (PDF p.13): track y thumb cápsula.
 * @param {ScrollbarProps} props - Props del scrollbar.
 * @returns {JSX.Element} Track con thumb posicionado según `value` y `thumbSize`.
 */
export function Scrollbar({
  value = 0,
  thumbSize = 17.4,
  label,
  className,
  style,
  ...props
}: ScrollbarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const clampedThumbSize = Math.max(8, Math.min(100, thumbSize));

  const scrollbarStyle = {
    ...style,
    "--ds-scrollbar-value": clampedValue,
    "--ds-scrollbar-thumb-size": `${clampedThumbSize}%`
  } as CSSProperties;

  return (
    <div
      className={cn("ds-scrollbar", className)}
      role="scrollbar"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clampedValue)}
      aria-label={label}
      style={scrollbarStyle}
      {...props}
    >
      <div className="ds-scrollbar__thumb" aria-hidden="true" />
    </div>
  );
}
