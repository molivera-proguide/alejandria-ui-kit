import { Settings, X } from "lucide-react";
import { Button } from "../../components/Button";
import type { LineChartDatum } from "../../components/LineChartCard";
import { LineChartCard } from "../../components/LineChartCard";
import { MetricCard } from "../../components/MetricCard";
import { SelectField } from "../../components/SelectField";
import { cn } from "../../utils/cn";
import "./detail-sheet.css";

/**
 * @description Variante visual del indicador de estado en la ficha
 */
export type DetailSheetStatusVariant = "neutral" | "critical";

/**
 * @description Indicador de estado mostrado en el encabezado de la ficha
 */
export interface DetailSheetStatus {
  label: string;
  variant: DetailSheetStatusVariant;
}

/**
 * @description Métrica operativa mostrada en la región de KPIs
 */
export interface DetailSheetOperationalMetric {
  label: string;
  value: string;
  change: string;
}

/**
 * @description Contador multimedia basado en MetricCard
 */
export interface DetailSheetMediaMetric {
  label: string;
  value: string;
}

/**
 * @description Acción disponible en el pie de la ficha
 */
export interface DetailSheetAction {
  label: string;
  variant: "a" | "b" | "c";
}

/**
 * @description Datos estáticos que componen la ficha de detalle
 */
export interface DetailSheetContent {
  statuses: DetailSheetStatus[];
  identifier: string;
  descriptionTitle: string;
  description: string;
  territoryFilter: string;
  periodFilter: string;
  operationalMetrics: DetailSheetOperationalMetric[];
  performanceChart: {
    title: string;
    footer: string;
    data: LineChartDatum[];
  };
  mediaTitle: string;
  mediaMetrics: DetailSheetMediaMetric[];
  actionsLabel: string;
  actions: DetailSheetAction[];
}

/**
 * @description Propiedades del patrón Detail Sheet
 */
export interface DetailSheetProps {
  content: DetailSheetContent;
  /**
   * @description Se dispara al hacer click en el ícono "Cerrar" del header. Opcional — sin
   * ella, el ícono se renderiza igual pero sin acción (mismo criterio que el resto del kit
   * para affordances decorativas). Agregado en `004-familia-tareas` para permitir que una
   * screen consumidora lo use como panel lateral abrible/cerrable con estado local.
   */
  onClose?: () => void;
  /**
   * @description Clase adicional en el `<article>` raíz — permite que una screen consumidora
   * ajuste el ancho (ej. panel lateral amplio) sin tocar el contrato de `content`. Ver
   * `.detail-sheet--wide` en `detail-sheet.css`.
   */
  className?: string;
}

/**
 * @description Composición del patrón Detail Sheet a partir de componentes existentes del Design System
 * @param {DetailSheetProps} props - Contenido estático y estructura de la ficha
 * @returns {JSX.Element} Superficie de información de una entidad operativa
 */
export function DetailSheet({ content, onClose, className }: DetailSheetProps) {
  return (
    <article className={cn("detail-sheet", className)} aria-label="Ficha de detalle">
      <header className="detail-sheet__header">
        <div className="detail-sheet__header-main">
          <div className="detail-sheet__status-row" aria-label="Estado">
            {content.statuses.map((status) => (
              <span
                key={status.label}
                className={`detail-sheet__status detail-sheet__status--${status.variant}`}
              >
                {status.label}
              </span>
            ))}
          </div>
          <h1 className="detail-sheet__title">{content.identifier}</h1>
        </div>

        <div className="detail-sheet__header-tools">
          <div className="detail-sheet__icon-row">
            <button type="button" className="detail-sheet__icon-button" aria-label="Configuración">
              <Settings aria-hidden="true" />
            </button>
            <button type="button" className="detail-sheet__icon-button" aria-label="Cerrar" onClick={onClose}>
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="detail-sheet__filters" aria-label="Filtros contextuales">
            <SelectField
              label="Territorio"
              defaultValue={content.territoryFilter}
              options={[{ label: content.territoryFilter, value: content.territoryFilter }]}
            />
            <SelectField
              label="Período"
              defaultValue={content.periodFilter}
              options={[{ label: content.periodFilter, value: content.periodFilter }]}
            />
          </div>
        </div>
      </header>

      <div className="detail-sheet__body">
        <div className="detail-sheet__body-left">
          <section className="detail-sheet__narrative" aria-label="Descripción">
            <h2 className="detail-sheet__narrative-title">{content.descriptionTitle}</h2>
            <p className="detail-sheet__narrative-text">{content.description}</p>
          </section>

          <section className="detail-sheet__media" aria-label="Archivos multimedia">
            <h2 className="detail-sheet__media-title">{content.mediaTitle}</h2>
            <div className="detail-sheet__media-metrics">
              {content.mediaMetrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  appearance="ficha"
                />
              ))}
            </div>
            <div className="detail-sheet__media-preview" aria-label="Vista previa multimedia">
              <div className="detail-sheet__media-preview-frame">
                <span className="detail-sheet__media-preview-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              <div className="detail-sheet__media-preview-progress" aria-hidden="true">
                <span />
              </div>
            </div>
          </section>
        </div>

        <div className="detail-sheet__body-right">
          <section className="detail-sheet__metrics" aria-label="Métricas operativas">
            {content.operationalMetrics.map((metric) => (
              <MetricCard
                key={`${metric.label}-${metric.change}`}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                appearance="ficha"
              />
            ))}
          </section>

          <section className="detail-sheet__charts" aria-label="Métricas de rendimiento">
            <LineChartCard
              title={content.performanceChart.title}
              footer={content.performanceChart.footer}
              data={content.performanceChart.data}
              color="#ffffff"
            />
          </section>
        </div>
      </div>

      <footer className="detail-sheet__actions">
        <p className="detail-sheet__actions-label">{content.actionsLabel}</p>
        <div className="detail-sheet__actions-row">
          {content.actions.map((action) => (
            <Button
              key={action.label}
              type="button"
              variant="pdf"
              className={`detail-sheet__action-button detail-sheet__action-button--${action.variant}`}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </footer>
    </article>
  );
}
