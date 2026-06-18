import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export type AlertTone = "info" | "success" | "warning" | "danger";

export interface AlertBannerProps extends HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function AlertBanner({
  tone = "info",
  title,
  description,
  icon,
  action,
  className,
  ...props
}: AlertBannerProps) {
  return (
    <div className={cn("ds-alert", `ds-alert--${tone}`, className)} role="status" {...props}>
      {icon ? <span className="ds-alert__icon">{icon}</span> : null}
      <div className="ds-alert__content">
        <strong className="ds-alert__title">{title}</strong>
        {description ? <p className="ds-alert__description">{description}</p> : null}
      </div>
      {action ? <div className="ds-alert__action">{action}</div> : null}
    </div>
  );
}
