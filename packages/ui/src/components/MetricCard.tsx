import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export type MetricTone = "neutral" | "good" | "watch" | "critical";

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  change?: string;
  tone?: MetricTone;
  icon?: ReactNode;
}

export function MetricCard({
  label,
  value,
  change,
  tone = "neutral",
  icon,
  className,
  ...props
}: MetricCardProps) {
  return (
    <div className={cn("ds-metric", `ds-metric--${tone}`, className)} {...props}>
      <div className="ds-metric__topline">
        <span className="ds-metric__label">{label}</span>
        {icon ? <span className="ds-metric__icon">{icon}</span> : null}
      </div>
      <strong className="ds-metric__value">{value}</strong>
      {change ? <span className="ds-metric__change">{change}</span> : null}
    </div>
  );
}
