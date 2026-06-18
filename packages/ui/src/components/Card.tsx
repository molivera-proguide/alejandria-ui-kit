import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function Card({
  eyebrow,
  title,
  description,
  actions,
  footer,
  children,
  className,
  ...props
}: CardProps) {
  const hasHeader = eyebrow || title || description || actions;

  return (
    <section className={cn("ds-card", className)} {...props}>
      {hasHeader ? (
        <header className="ds-card__header">
          <div className="ds-card__heading">
            {eyebrow ? <p className="ds-card__eyebrow">{eyebrow}</p> : null}
            {title ? <h3 className="ds-card__title">{title}</h3> : null}
            {description ? <p className="ds-card__description">{description}</p> : null}
          </div>
          {actions ? <div className="ds-card__actions">{actions}</div> : null}
        </header>
      ) : null}
      {children ? <div className="ds-card__body">{children}</div> : null}
      {footer ? <footer className="ds-card__footer">{footer}</footer> : null}
    </section>
  );
}
