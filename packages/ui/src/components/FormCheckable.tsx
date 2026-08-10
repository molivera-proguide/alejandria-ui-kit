import { forwardRef, useId } from "react";
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

/**
 * @description Sub-tipo de control — checkbox, radio o switch (PDF v3 p.19
 * "FORM - CHECKABLES": "Tenemos versión simple y con bajada para todos los casos")
 */
export type FormCheckableType = "checkbox" | "radio" | "switch";

export interface FormCheckableProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  /**
   * @description Bajada opcional bajo el label (ver PDF p.19, ejemplos "Admin" /
   * "Editor" / "General" con descripción de alcance)
   */
  description?: string;
  type?: FormCheckableType;
}

/**
 * @description Checkbox, radio o switch con label y bajada opcional (PDF v3 p.19
 * "FORM - CHECKABLES"). "Seleccionado" en checkbox/radio: fondo #ffffff, selector
 * #060606. Switch: fondo #606060, selector #ffffff; seleccionado: fondo #ffffff,
 * selector #060606.
 * @param {FormCheckableProps} props - Propiedades del control
 * @returns {JSX.Element} Control checkable del Design System (familia Form)
 */
export const FormCheckable = forwardRef<HTMLInputElement, FormCheckableProps>(
  ({ id, label, description, type = "checkbox", className, ...props }, ref) => {
    const generatedId = useId();
    const controlId = id ?? generatedId;

    const control = (
      <span className="ds-form-checkable__control" aria-hidden="true">
        {type === "switch" ? (
          <span className="ds-form-checkable__thumb" />
        ) : type === "checkbox" ? (
          <svg className="ds-form-checkable__check" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5.2L4.4 8.6L11 1.4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    );
    const copy = (
      <span className="ds-form-checkable__copy">
        <span className="ds-form-checkable__label">{label}</span>
        {description ? (
          <span className="ds-form-checkable__description">{description}</span>
        ) : null}
      </span>
    );

    return (
      <label
        className={cn("ds-form-checkable", `ds-form-checkable--${type}`, className)}
        htmlFor={controlId}
      >
        <input
          ref={ref}
          id={controlId}
          className="ds-form-checkable__input"
          type={type === "switch" ? "checkbox" : type}
          {...props}
        />
        {/* Orden visual medido contra el PDF (design-reference.pdf p.19, get_drawings()):
            checkbox/radio muestran el glyph ANTES del label ("☑ Editor"); switch lo muestra
            DESPUÉS, pegado al borde derecho de la fila ("Editor [switch]") — no es el mismo
            orden para los 3 sub-tipos, corregido 2026-08-07 (antes switch también renderizaba
            control-primero). */}
        {type === "switch" ? (
          <>
            {copy}
            {control}
          </>
        ) : (
          <>
            {control}
            {copy}
          </>
        )}
      </label>
    );
  }
);

FormCheckable.displayName = "FormCheckable";

/**
 * @description Disposición de los `FormCheckable` dentro de un `FormCheckableGroup` — PDF
 * p.19 muestra ambas: el grupo "simple" (sin bajada) va en fila horizontal, el grupo "con
 * bajada" va en columna vertical (una descripción larga no entra en una fila).
 */
export type FormCheckableGroupLayout = "vertical" | "horizontal";

export interface FormCheckableGroupProps extends HTMLAttributes<HTMLFieldSetElement> {
  /**
   * @description "Título grupo" del PDF p.19 (ej. "ACCESO A MÓDULOS")
   */
  title: string;
  /**
   * @description `"vertical"` (default, una opción por fila) o `"horizontal"` (todas las
   * opciones en una sola fila — PDF p.19, ejemplo "TIPO DE USUARIO" sin bajada).
   */
  layout?: FormCheckableGroupLayout;
  children: ReactNode;
}

/**
 * @description Encabezado de grupo para varios `FormCheckable` relacionados (PDF p.19
 * "Título grupo"). Envoltorio liviano — no reemplaza `FormCheckable`, solo agrupa
 * visualmente varias instancias bajo un título común.
 */
export function FormCheckableGroup({
  title,
  layout = "vertical",
  children,
  className,
  ...props
}: FormCheckableGroupProps) {
  return (
    <fieldset className={cn("ds-form-checkable-group", className)} {...props}>
      <legend className="ds-form-checkable-group__title">{title}</legend>
      <div
        className={cn(
          "ds-form-checkable-group__items",
          layout === "horizontal" && "ds-form-checkable-group__items--horizontal"
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}
