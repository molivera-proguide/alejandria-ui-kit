import type { CSSProperties, HTMLAttributes, ReactElement } from "react";
import { cn } from "../utils/cn";

/**
 * @description Variante geométrica del recuadro skeleton (PDF p.14).
 * @type {"rect" | "circle"}
 */
export type SkeletonVariant = "rect" | "circle";

/**
 * @description Props del placeholder de carga animado (SKELETON, PDF p.14).
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description Forma del recuadro: rectángulo (`--ds-radius-sm`) o círculo (`--ds-radius-pill`).
   * @type {SkeletonVariant}
   */
  variant?: SkeletonVariant;
  /**
   * @description Ancho del recuadro. Número → px; string se aplica tal cual.
   * @type {number | string}
   */
  width?: number | string;
  /**
   * @description Alto del recuadro. Número → px; string se aplica tal cual.
   * @type {number | string}
   */
  height?: number | string;
}

/**
 * @description Convierte un valor de dimensión a CSS: números a `px`, strings sin cambio.
 * @param {number | string | undefined} value - Dimensión recibida.
 * @returns {string | undefined} Valor CSS o `undefined` si no hay prop.
 */
function toCssSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

/**
 * @description Placeholder de carga presentacional (recuadro animado) según SKELETON (PDF p.14).
 * @param {SkeletonProps} props - Props del skeleton.
 * @returns {ReactElement} Recuadro decorativo con pulso de opacidad.
 */
export function Skeleton({
  variant = "rect",
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps): ReactElement {
  const skeletonStyle: CSSProperties = {
    ...(width !== undefined ? { width: toCssSize(width) } : {}),
    ...(height !== undefined ? { height: toCssSize(height) } : {}),
    ...style
  };

  return (
    <div
      className={cn("ds-skeleton", variant === "circle" && "ds-skeleton--circle", className)}
      aria-hidden="true"
      style={skeletonStyle}
      {...props}
    />
  );
}
