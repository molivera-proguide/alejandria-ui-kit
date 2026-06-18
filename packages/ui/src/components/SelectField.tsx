import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  error?: string;
  options?: SelectOption[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, hint, error, options, children, className, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const hintId = hint ? `${fieldId}-hint` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("ds-field", error && "ds-field--invalid", className)}>
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
