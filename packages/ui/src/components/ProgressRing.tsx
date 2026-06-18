import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type ProgressRingTone = "neutral" | "success" | "warning" | "danger";
export type ProgressRingSize = "sm" | "md" | "lg";

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
  tone?: ProgressRingTone;
  size?: ProgressRingSize;
}

export function ProgressRing({
  value,
  label,
  tone = "neutral",
  size = "md",
  className,
  style,
  ...props
}: ProgressRingProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
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
