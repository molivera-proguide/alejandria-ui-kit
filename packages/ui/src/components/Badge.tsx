import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn("ds-badge", `ds-badge--${tone}`, className)} {...props}>
      {dot ? <span className="ds-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
