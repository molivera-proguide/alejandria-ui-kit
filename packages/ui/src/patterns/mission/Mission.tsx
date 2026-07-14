import { AlertTriangle, Search, X } from "lucide-react";
import type { ProgressRingTone } from "../../components/ProgressRing";
import { AlertBanner } from "../../components/AlertBanner";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ProgressRing } from "../../components/ProgressRing";
import { TextField } from "../../components/TextField";
import mapImage from "./assets/alejandria-map.jpg";
import "./mission.css";

/**
 * @description Métrica de progreso operativo con estado semántico
 */
export interface MissionMetric {
  /**
   * @description Etiqueta del anillo (p. ej. Evacuados)
   */
  label: string;
  /**
   * @description Avance en porcentaje 0–100
   */
  value: number;
  /**
   * @description Tono semántico de ProgressRing
   */
  tone: ProgressRingTone;
}

/**
 * @description Feed de cámara en vivo (marcador; sin primitivo DS de video)
 */
export interface MissionCameraFeed {
  /**
   * @description Identificador visible del feed
   */
  id: string;
  /**
   * @description Etiqueta del origen (dron, body cam, etc.)
   */
  label: string;
}

/**
 * @description Opción de decisión en una entrada de log IA
 */
export interface MissionLogOption {
  /**
   * @description Texto del botón de opción
   */
  label: string;
}

/**
 * @description Entrada del log IA con sello temporal y opción de decisión
 */
export interface MissionLogEntry {
  /**
   * @description Código corto mostrado en Badge
   */
  code: string;
  /**
   * @description Marca temporal (HH:MM:SS)
   */
  timestamp: string;
  /**
   * @description Texto descriptivo de la entrada
   */
  text: string;
  /**
   * @description Par de opciones cuando la entrada requiere decisión del operador
   */
  options?: [MissionLogOption, MissionLogOption];
}

/**
 * @description Resumen de estado en el pie del panel
 */
export interface MissionStatusSummary {
  /**
   * @description Nombre de la misión
   */
  missionName: string;
  /**
   * @description Progreso global en porcentaje
   */
  progressPercent: number;
  /**
   * @description Personas evacuadas
   */
  evacuated: number;
  /**
   * @description Total de personas objetivo
   */
  total: number;
}

/**
 * @description Datos estáticos que componen la pantalla de misión de evacuación
 */
export interface MissionContent {
  /**
   * @description Etiqueta del indicador en vivo
   */
  liveLabel: string;
  /**
   * @description Tipo de misión (eyebrow del Card)
   */
  missionType: string;
  /**
   * @description Título con temporizador (p. ej. MISIÓN — 00:01:45)
   */
  title: string;
  /**
   * @description Título del banner de contexto de emergencia
   */
  incidentTitle: string;
  /**
   * @description Descripción opcional del incidente
   */
  incidentDescription?: string;
  /**
   * @description Cuatro métricas de progreso operativo
   */
  metrics: MissionMetric[];
  /**
   * @description Título de la región de imágenes en vivo
   */
  imageryTitle: string;
  /**
   * @description Feeds de cámara en vivo
   */
  cameraFeeds: MissionCameraFeed[];
  /**
   * @description Título de la región de log IA
   */
  logTitle: string;
  /**
   * @description Etiqueta del campo de búsqueda del log
   */
  logSearchLabel: string;
  /**
   * @description Placeholder del campo de búsqueda del log
   */
  logSearchPlaceholder: string;
  /**
   * @description Entradas del log IA
   */
  logEntries: MissionLogEntry[];
  /**
   * @description Resumen de estado inferior
   */
  statusSummary: MissionStatusSummary;
}

/**
 * @description Propiedades del patrón Mission (evacuación)
 */
export interface MissionProps {
  /**
   * @description Contenido estático de la composición
   */
  content: MissionContent;
}

/**
 * @description Composición del patrón Mission (panel de evacuación sobre mapa operativo)
 * @param {MissionProps} props - Contenido estático y estructura del panel
 * @returns {JSX.Element} Pantalla de misión en vivo sobre mapa
 */
export function Mission({ content }: MissionProps) {
  const { statusSummary } = content;
  const summaryLine = `${statusSummary.missionName} · ${statusSummary.progressPercent}% · ${statusSummary.evacuated} / ${statusSummary.total}`;

  return (
    <div className="mission-screen" aria-label="Misión de evacuación">
      <section className="mission-map" aria-label="Mapa operativo">
        <img className="mission-map__image" src={mapImage} alt="" aria-hidden="true" />
        <div className="mission-map__scan" aria-hidden="true" />
        <div className="mission-map__marker mission-map__marker--one" aria-hidden="true" />
        <div className="mission-map__marker mission-map__marker--two" aria-hidden="true" />

        <Card
          className="mission-panel"
          eyebrow={content.missionType}
          title={content.title}
          actions={
            <>
              <Badge tone="danger" dot>
                {content.liveLabel}
              </Badge>
              <button type="button" className="mission-panel__close" aria-label="Cerrar">
                <X aria-hidden="true" />
              </button>
            </>
          }
          footer={
            <p className="mission-panel__summary" aria-label="Resumen de misión">
              {summaryLine}
            </p>
          }
        >
          <div className="mission-panel__stack ds-scroll-area ds-scroll-area--y">
            <AlertBanner
              className="mission-panel__incident"
              tone="danger"
              icon={<AlertTriangle aria-hidden="true" />}
              title={content.incidentTitle}
              description={content.incidentDescription}
            />

            <section className="mission-panel__metrics" aria-label="Métricas operativas">
              {content.metrics.map((metric) => (
                <ProgressRing
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  tone={metric.tone}
                  size="sm"
                />
              ))}
            </section>

            <section className="mission-panel__imagery" aria-label={content.imageryTitle}>
              <h4 className="mission-panel__region-title">{content.imageryTitle}</h4>
              <div className="mission-panel__feeds ds-scroll-area ds-scroll-area--x" tabIndex={0}>
                {content.cameraFeeds.map((feed) => (
                  <article key={feed.id} className="mission-panel__feed" aria-label={feed.label}>
                    <div className="mission-panel__feed-frame" aria-hidden="true" />
                    <span className="mission-panel__feed-label">{feed.label}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="mission-panel__log" aria-label={content.logTitle}>
              <div className="mission-panel__log-head">
                <h4 className="mission-panel__region-title">{content.logTitle}</h4>
                <TextField
                  className="mission-panel__log-search"
                  appearance="pdf"
                  label={content.logSearchLabel}
                  placeholder={content.logSearchPlaceholder}
                  iconLeft={<Search aria-hidden="true" />}
                />
              </div>
              <div className="mission-panel__log-list ds-scroll-area ds-scroll-area--y" tabIndex={0}>
                {content.logEntries.map((entry) => (
                  <div
                    className="mission-panel__log-item"
                    key={`${entry.code}-${entry.timestamp}-${entry.text}`}
                  >
                    <div className="mission-panel__log-item-main">
                      <Badge tone={entry.options ? "warning" : "info"}>{entry.code}</Badge>
                      <span className="mission-panel__log-text">{entry.text}</span>
                      <strong className="mission-panel__log-time">{entry.timestamp}</strong>
                    </div>
                    {entry.options ? (
                      <div className="mission-panel__log-options" aria-label="Opciones">
                        <Button type="button" size="sm" variant="pdf">
                          {entry.options[0].label}
                        </Button>
                        <Button type="button" size="sm" variant="pdf">
                          {entry.options[1].label}
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Card>
      </section>
    </div>
  );
}
