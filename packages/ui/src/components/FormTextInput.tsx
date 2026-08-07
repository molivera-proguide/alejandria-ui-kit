import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Contexto visual del campo — "login" cubre PDF p.17 (fondo #2a2927,
 * label #f6f6f6); "default" cubre PDF p.18 (fondo #060606 al 50%, label #8d8d8d).
 * No confundir con `TextFieldAppearance` ("default" | "pdf") de `TextField` — este
 * componente es un primitive distinto, con su propio mecanismo de label flotante
 * (activo↔estático), no un modificador de `TextField`.
 */
export type FormTextInputVariant = "login" | "default";

/**
 * @description Propiedades compartidas entre las variantes input y textarea
 */
interface FormTextInputBaseProps {
  label: string;
  error?: string;
  variant?: FormTextInputVariant;
  /**
   * @description Si es `true`, renderiza un `<textarea>` en vez de un `<input>`
   * (ver PDF p.18, ejemplo "DESCRIPCIÓN")
   */
  multiline?: boolean;
}

export type FormTextInputProps = FormTextInputBaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "multiline"> &
  Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows">;

/**
 * @description Campo de texto con label flotante (PDF v3 p.17 "FORM - LOGIN" / p.18
 * "FORM - INPUT"). El label pasa de estático (tamaño completo, centrado en el campo)
 * a activo (achicado, arriba) cuando el input tiene foco o valor — puramente visual,
 * vía CSS (`:focus` / `:not(:placeholder-shown)`), sin lógica de validación.
 * @param {FormTextInputProps} props - Propiedades del campo
 * @returns {JSX.Element} Campo de texto del Design System (familia Form)
 */
export const FormTextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormTextInputProps
>(
  (
    {
      id,
      label,
      error,
      variant = "default",
      multiline = false,
      disabled,
      className,
      placeholder,
      rows,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const errorId = error ? `${fieldId}-error` : undefined;
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;
    // placeholder=" " (no vacío) es lo que hace que `:not(:placeholder-shown)` detecte
    // "tiene valor" de forma puramente CSS — ver comentario de la clase en styles.css
    const effectivePlaceholder = placeholder ?? " ";

    return (
      <div
        className={cn(
          "ds-form-field",
          variant === "login" && "ds-form-field--login",
          error && "ds-form-field--invalid",
          disabled && "ds-form-field--disabled",
          className
        )}
      >
        <div className="ds-form-field__control">
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={fieldId}
              className="ds-form-field__textarea"
              placeholder={effectivePlaceholder}
              disabled={disabled}
              rows={rows ?? 3}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={describedBy}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={fieldId}
              className="ds-form-field__input"
              placeholder={effectivePlaceholder}
              disabled={disabled}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={describedBy}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          <label className="ds-form-field__label" htmlFor={fieldId}>
            {label}
          </label>
        </div>
        {error ? (
          <p className="ds-form-field__error" id={errorId}>
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

FormTextInput.displayName = "FormTextInput";
