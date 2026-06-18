import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      iconLeft,
      iconRight,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "ds-button",
          `ds-button--${variant}`,
          `ds-button--${size}`,
          fullWidth && "ds-button--full",
          className
        )}
        disabled={disabled || loading}
        data-loading={loading ? "true" : undefined}
        {...props}
      >
        {loading ? <span className="ds-button__spinner" aria-hidden="true" /> : null}
        {!loading && iconLeft ? <span className="ds-button__icon">{iconLeft}</span> : null}
        <span className="ds-button__label">{children}</span>
        {!loading && iconRight ? <span className="ds-button__icon">{iconRight}</span> : null}
      </button>
    );
  }
);

Button.displayName = "Button";
