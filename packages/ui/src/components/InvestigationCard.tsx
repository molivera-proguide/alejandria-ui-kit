import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";
import CerrarIcon from "../Icons/Cards/Cerrar-20x20.svg";
import EditarIcon from "../Icons/Cards/Editar-20x20.svg";
import EliminarIcon from "../Icons/Cards/Eliminar-20x20.svg";
import { cn } from "../utils/cn";

/**
 * @description Forma de cada métrica mostrada en la cuadrícula de `InvestigationCard`
 */
export interface InvestigationMetric {
  label: string;
  value: string | number;
}

/**
 * @description Variantes visuales de las acciones inferiores de `InvestigationCard`
 */
export type InvestigationActionVariant = "primary" | "ghost";

/**
 * @description Configuración de una acción inferior en `InvestigationCard`
 */
export interface InvestigationAction {
  label: string;
  variant?: InvestigationActionVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

/**
 * @description Identificadores de las utilidades fijas de esquina en `InvestigationCard`
 */
export type InvestigationUtilityType = "edit" | "delete" | "close";

/**
 * @description Configuración de una utilidad de esquina en `InvestigationCard`
 */
export interface InvestigationUtility {
  type: InvestigationUtilityType;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label?: string;
}

/**
 * @description Props públicas del componente `InvestigationCard`
 */
export interface InvestigationCardProps extends Omit<ComponentPropsWithoutRef<"article">, "children"> {
  title: string;
  icon: ReactNode;
  metrics: InvestigationMetric[];
  actions?: InvestigationAction[];
  utilities?: InvestigationUtility[];
  /** @deprecated Usar `utilities={[{ type: "edit", onClick }]}` en su lugar. */
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  /** @deprecated Usar `utilities={[{ type: "delete", onClick }]}` en su lugar. */
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  /** @deprecated Usar `utilities={[{ type: "close", onClick }]}` en su lugar. */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /** @deprecated Usar `label` dentro de `utilities`. */
  editLabel?: string;
  /** @deprecated Usar `label` dentro de `utilities`. */
  deleteLabel?: string;
  /** @deprecated Usar `label` dentro de `utilities`. */
  closeLabel?: string;
}

/**
 * @description Orden canónico de renderizado de utilidades según PDF TARJETAS (p. 2)
 * @type {readonly InvestigationUtilityType[]}
 */
const UTILITY_ORDER: readonly InvestigationUtilityType[] = ["edit", "delete", "close"];

/**
 * @description Metadatos de icono y etiqueta accesible por tipo de utilidad
 */
const UTILITY_METADATA: Record<
  InvestigationUtilityType,
  { icon: string; defaultLabel: string }
> = {
  edit: { icon: EditarIcon, defaultLabel: "Editar" },
  delete: { icon: EliminarIcon, defaultLabel: "Eliminar" },
  close: { icon: CerrarIcon, defaultLabel: "Cerrar" }
};

/**
 * @description Resuelve las utilidades activas priorizando `utilities` y manteniendo compatibilidad con props legadas
 * @param {Pick<InvestigationCardProps, "utilities" | "onEdit" | "onDelete" | "onClose" | "editLabel" | "deleteLabel" | "closeLabel">} props - Props de utilidades del componente
 * @returns {InvestigationUtility[]} Utilidades normalizadas en orden canónico
 */
function resolveUtilities({
  utilities,
  onEdit,
  onDelete,
  onClose,
  editLabel,
  deleteLabel,
  closeLabel
}: Pick<
  InvestigationCardProps,
  "utilities" | "onEdit" | "onDelete" | "onClose" | "editLabel" | "deleteLabel" | "closeLabel"
>): InvestigationUtility[] {
  if (utilities?.length) {
    const utilityByType = new Map(utilities.map((utility) => [utility.type, utility]));

    return UTILITY_ORDER.flatMap((type) => {
      const utility = utilityByType.get(type);
      return utility ? [utility] : [];
    });
  }

  const legacyUtilities: InvestigationUtility[] = [];

  if (onEdit) {
    legacyUtilities.push({ type: "edit", onClick: onEdit, label: editLabel });
  }

  if (onDelete) {
    legacyUtilities.push({ type: "delete", onClick: onDelete, label: deleteLabel });
  }

  if (onClose) {
    legacyUtilities.push({ type: "close", onClick: onClose, label: closeLabel });
  }

  return legacyUtilities;
}

/**
 * @description Presenta una investigación con icono, título, métricas compactas y acciones según PDF TARJETAS (p. 2)
 * @param {InvestigationCardProps} props - Propiedades de la tarjeta de investigación
 * @returns {JSX.Element} Artículo semántico con la estructura fija de la tarjeta
 */
export function InvestigationCard({
  title,
  icon,
  metrics,
  actions = [],
  utilities,
  onEdit,
  onDelete,
  onClose,
  editLabel,
  deleteLabel,
  closeLabel,
  className,
  style,
  ...props
}: InvestigationCardProps) {
  const resolvedUtilities = resolveUtilities({
    utilities,
    onEdit,
    onDelete,
    onClose,
    editLabel,
    deleteLabel,
    closeLabel
  });
  const hasUtilities = resolvedUtilities.length > 0;

  return (
    <article
      className={cn(
        "ds-investigation-card",
        hasUtilities && "ds-investigation-card--with-utilities",
        className
      )}
      style={style}
      {...props}
    >
      {hasUtilities ? (
        <div className="ds-investigation-card__utilities">
          {resolvedUtilities.map((utility) => (
            <InvestigationCardUtility key={utility.type} {...utility} />
          ))}
        </div>
      ) : null}

      <div className="ds-investigation-card__icon" aria-hidden="true">
        {icon}
      </div>

      <h3 className="ds-investigation-card__title">{title}</h3>

      {metrics.length ? (
        <div className="ds-investigation-card__metrics">
          {metrics.map((metric) => (
            <div key={metric.label} className="ds-investigation-card__metric">
              <span className="ds-investigation-card__metric-value">{metric.value}</span>
              <span className="ds-investigation-card__metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      {actions.length ? (
        <div className="ds-investigation-card__actions">
          {actions.map((action) => (
            <InvestigationCardAction key={action.label} {...action} />
          ))}
        </div>
      ) : null}
    </article>
  );
}

/**
 * @description Renderiza un botón de utilidad de esquina con icono PDF de la tarjeta de investigación
 * @param {InvestigationUtility} props - Propiedades de la utilidad
 * @returns {JSX.Element} Botón con icono SVG 20×20
 */
function InvestigationCardUtility({ type, onClick, label }: InvestigationUtility) {
  const { icon, defaultLabel } = UTILITY_METADATA[type];

  return (
    <button
      type="button"
      className="ds-investigation-card__utility"
      onClick={onClick}
      aria-label={label ?? defaultLabel}
    >
      <img src={icon} alt="" aria-hidden="true" />
    </button>
  );
}

/**
 * @description Renderiza un botón de acción inferior con estilos PDF de la tarjeta de investigación
 * @param {InvestigationAction} props - Propiedades de la acción
 * @returns {JSX.Element} Botón con variante primaria o fantasma
 */
function InvestigationCardAction({
  label,
  variant = "primary",
  onClick,
  disabled
}: InvestigationAction) {
  return (
    <button
      type="button"
      className={cn(
        "ds-investigation-card__action",
        `ds-investigation-card__action--${variant}`
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
