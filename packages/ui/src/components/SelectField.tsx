import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Opción seleccionable de un SelectField
 */
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * @description Apariencia visual contextual del campo de selección
 */
export type SelectFieldAppearance = "default" | "pdf";

/**
 * @description Propiedades del componente SelectField
 */
export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  error?: string;
  options?: SelectOption[];
  appearance?: SelectFieldAppearance;
}

/**
 * @description Campo de selección con etiqueta, pista y estado de error
 * @param {SelectFieldProps} props - Propiedades del campo
 * @returns {JSX.Element} Campo de selección del Design System
 */
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id,
      label,
      hint,
      error,
      options,
      appearance = "default",
      children,
      className,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const hintId = hint ? `${fieldId}-hint` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        className={cn(
          "ds-field",
          appearance === "pdf" && "ds-field--pdf",
          error && "ds-field--invalid",
          className
        )}
      >
        <div className="ds-field__label-row">
          <label className="ds-field__label" htmlFor={fieldId}>
            {label}
          </label>
        </div>
        <div className="ds-field__control ds-field__control--select">
          <select
            ref={ref}
            id={fieldId}
            className="ds-field__select"
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            {...props}
          >
            {options
              ? options.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))
              : children}
          </select>
          <span className="ds-field__chevron" aria-hidden="true" />
        </div>
        {hint ? (
          <p className="ds-field__hint" id={hintId}>
            {hint}
          </p>
        ) : null}
        {error ? (
          <p className="ds-field__error" id={errorId}>
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
