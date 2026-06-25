import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface ModuleMetric {
  label: string;
  value: string | number;
}

export interface ModuleCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon: ReactNode;
  metrics: ModuleMetric[];
}

export function ModuleCard({
  title,
  icon,
  metrics,
  className,
  onClick,
  type = "button",
  ...props
}: ModuleCardProps) {
  return (
    <button
      type={type}
      className={cn("ds-module-card", className)}
      onClick={onClick}
      {...props}
    >
      <div className="ds-module-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="ds-module-card__headline">
        <span className="ds-module-card__title">{title}</span>
      </div>
      <hr className="ds-module-card__divider" />
      <div className="ds-module-card__metrics">
        {metrics.map((metric) => (
          <div key={metric.label} className="ds-module-card__metric">
            <span className="ds-module-card__metric-label">{metric.label}</span>
            <span className="ds-module-card__metric-value">{metric.value}</span>
          </div>
        ))}
      </div>
    </button>
  );
}
