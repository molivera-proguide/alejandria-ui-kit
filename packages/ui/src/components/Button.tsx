import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

/**
 * @description Variante visual del botón del Design System
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "pdf";

/**
 * @description Tamaño del botón
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * @description Propiedades del componente Button
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

/**
 * @description Botón de acción del Design System con variantes semánticas y contextuales
 * @param {ButtonProps} props - Propiedades del botón
 * @returns {JSX.Element} Elemento button con clases ds-button
 */
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
