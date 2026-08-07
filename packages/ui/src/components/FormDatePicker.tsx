import { useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

const WEEKDAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];
const MONTH_LABELS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5); // "Minute column steps by 5" — PDF p.21 (00,05,...,55)
const SPINNER_ROW_HEIGHT = 10; // calibrated ÷2 — PDF row-to-row delta ~19.8pt @2×

export interface FormDatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  disabled?: boolean;
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstWeekdayMondayFirst(year: number, month: number) {
  const jsWeekday = new Date(year, month, 1).getDay(); // 0=domingo
  return (jsWeekday + 6) % 7; // 0=lunes
}

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * @description Calendario + selector de hora (PDF v3 p.21 "FORM - DATEPICKER").
 * Renderizado real de la página vía PyMuPDF (`get_pixmap`/`get_drawings`/`get_text`,
 * no fue posible con `pdftoppm`/poppler — ver handoff — pero PyMuPDF sí está
 * disponible en este entorno) confirmó una estructura de **2 triggers
 * independientes** ("FECHA" y "HORA"), no uno combinado: el trigger FECHA
 * (300×30pt @2× → 150×15px) abre un panel de calendario (300×202.68pt → 150×101px)
 * con nav de mes/año + grid L M M J V S D; el trigger HORA (200×30pt → 100×15px)
 * abre un panel (200×202.68pt → 100×101px) con un spinner de **2 columnas**
 * (hora / minutos de a 5) separadas por ":" y flechas arriba/abajo por columna —
 * no una lista plana. El texto del PDF ("14 10 13 05 16 20 17 25 15 15 11 12 55
 * 00") era exactamente esas dos columnas sin orden de posición, ver p.21 render.
 * @param {FormDatePickerProps} props - Propiedades del datepicker
 * @returns {JSX.Element} Datepicker del Design System (familia Form)
 */
export function FormDatePicker({ disabled, value, defaultValue, onChange, className, ...props }: FormDatePickerProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(value ?? defaultValue);
  const selected = value ?? internalValue;
  const [viewDate, setViewDate] = useState(() => selected ?? new Date());

  const dateRootRef = useRef<HTMLDivElement>(null);
  const timeRootRef = useRef<HTMLDivElement>(null);
  const hourListRef = useRef<HTMLUListElement>(null);
  const minuteListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!dateOpen && !timeOpen) return;
    function onOutsideClick(event: MouseEvent) {
      if (dateOpen && !dateRootRef.current?.contains(event.target as Node)) setDateOpen(false);
      if (timeOpen && !timeRootRef.current?.contains(event.target as Node)) setTimeOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [dateOpen, timeOpen]);

  useEffect(() => {
    if (!timeOpen) return;
    const hour = selected?.getHours() ?? 0;
    const minute = selected ? Math.round(selected.getMinutes() / 5) * 5 : 0;
    hourListRef.current?.querySelector(`[data-value="${hour}"]`)?.scrollIntoView({ block: "center" });
    minuteListRef.current?.querySelector(`[data-value="${minute}"]`)?.scrollIntoView({ block: "center" });
  }, [timeOpen, selected]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = useMemo(() => {
    const total = daysInMonth(year, month);
    const offset = firstWeekdayMondayFirst(year, month);
    return [...Array.from({ length: offset }, () => null), ...Array.from({ length: total }, (_, i) => i + 1)];
  }, [year, month]);

  function commit(next: Date) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  function selectDay(day: number) {
    const next = new Date(selected ?? viewDate);
    next.setFullYear(year, month, day);
    commit(next);
    setDateOpen(false);
  }

  function selectHour(hour: number) {
    const next = new Date(selected ?? viewDate);
    next.setHours(hour);
    commit(next);
  }

  function selectMinute(minute: number) {
    const next = new Date(selected ?? viewDate);
    next.setMinutes(minute, 0, 0);
    commit(next);
  }

  function scrollList(ref: React.RefObject<HTMLUListElement | null>, direction: 1 | -1) {
    ref.current?.scrollBy({ top: direction * SPINNER_ROW_HEIGHT, behavior: "smooth" });
  }

  const dateDisplay = selected
    ? `${pad2(selected.getDate())}/${pad2(selected.getMonth() + 1)}/${selected.getFullYear()}`
    : "";
  const timeDisplay = selected ? `${pad2(selected.getHours())}:${pad2(Math.round(selected.getMinutes() / 5) * 5)}` : "";
  const selectedHour = selected?.getHours();
  const selectedMinute = selected ? Math.round(selected.getMinutes() / 5) * 5 : undefined;

  return (
    <div className={cn("ds-form-date", disabled && "ds-form-field--disabled", className)} {...props}>
      {/* --- FECHA --- */}
      <div ref={dateRootRef} className="ds-form-field ds-form-date__field ds-form-date__field--fecha">
        <div className="ds-form-field__control">
          <button
            type="button"
            className="ds-form-field__input ds-form-date__trigger"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={dateOpen}
            onClick={() => setDateOpen((current) => !current)}
          >
            {dateDisplay || " "}
          </button>
          <label className={cn("ds-form-field__label", (dateDisplay || dateOpen) && "ds-form-field__label--active")}>
            FECHA
          </label>
          <span className="ds-form-field__chevron" aria-hidden="true" />
        </div>
        {dateOpen ? (
          <div className="ds-form-date__panel ds-form-date__panel--fecha" role="dialog" aria-label="Elegir fecha">
            <span className="ds-form-date__panel-label">FECHA</span>
            <div className="ds-form-date__month-nav">
              <button type="button" aria-label="Mes anterior" onClick={() => setViewDate(new Date(year, month - 1, 1))}>
                ‹
              </button>
              <select
                className="ds-form-date__month-select"
                value={month}
                onChange={(event) => setViewDate(new Date(year, Number(event.target.value), 1))}
                aria-label="Mes"
              >
                {MONTH_LABELS.map((monthLabel, index) => (
                  <option key={monthLabel} value={index}>
                    {monthLabel}
                  </option>
                ))}
              </select>
              <select
                className="ds-form-date__month-select"
                value={year}
                onChange={(event) => setViewDate(new Date(Number(event.target.value), month, 1))}
                aria-label="Año"
              >
                {Array.from({ length: 9 }, (_, i) => year - 4 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <button type="button" aria-label="Mes siguiente" onClick={() => setViewDate(new Date(year, month + 1, 1))}>
                ›
              </button>
            </div>
            <div className="ds-form-date__weekdays">
              {WEEKDAY_LABELS.map((weekday, index) => (
                <span key={`${weekday}-${index}`}>{weekday}</span>
              ))}
            </div>
            <div className="ds-form-date__days">
              {days.map((day, index) =>
                day === null ? (
                  <span key={`blank-${index}`} />
                ) : (
                  <button
                    key={day}
                    type="button"
                    className={cn(
                      "ds-form-date__day",
                      selected &&
                        selected.getDate() === day &&
                        selected.getMonth() === month &&
                        selected.getFullYear() === year &&
                        "ds-form-date__day--selected"
                    )}
                    onClick={() => selectDay(day)}
                  >
                    {day}
                  </button>
                )
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* --- HORA --- */}
      <div ref={timeRootRef} className="ds-form-field ds-form-date__field ds-form-date__field--hora">
        <div className="ds-form-field__control">
          <button
            type="button"
            className="ds-form-field__input ds-form-date__trigger"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={timeOpen}
            onClick={() => setTimeOpen((current) => !current)}
          >
            {timeDisplay || " "}
          </button>
          <label className={cn("ds-form-field__label", (timeDisplay || timeOpen) && "ds-form-field__label--active")}>
            HORA
          </label>
          <span className="ds-form-field__chevron" aria-hidden="true" />
        </div>
        {timeOpen ? (
          <div className="ds-form-date__panel ds-form-date__panel--hora" role="dialog" aria-label="Elegir hora">
            <span className="ds-form-date__panel-label">HORA</span>
            <div className="ds-form-date__spinner">
              <div className="ds-form-date__spinner-column">
                <button type="button" aria-label="Hora anterior" onClick={() => scrollList(hourListRef, -1)}>
                  ⌃
                </button>
                <ul ref={hourListRef} className="ds-form-date__spinner-list ds-scroll-area ds-scroll-area--y">
                  {HOURS.map((hour) => (
                    <li key={hour} data-value={hour}>
                      <button
                        type="button"
                        className={cn("ds-form-date__spinner-value", selectedHour === hour && "ds-form-date__spinner-value--selected")}
                        onClick={() => selectHour(hour)}
                      >
                        {pad2(hour)}
                      </button>
                    </li>
                  ))}
                </ul>
                <button type="button" aria-label="Hora siguiente" onClick={() => scrollList(hourListRef, 1)}>
                  ⌄
                </button>
              </div>
              <span className="ds-form-date__spinner-separator">:</span>
              <div className="ds-form-date__spinner-column">
                <button type="button" aria-label="Minuto anterior" onClick={() => scrollList(minuteListRef, -1)}>
                  ⌃
                </button>
                <ul ref={minuteListRef} className="ds-form-date__spinner-list ds-scroll-area ds-scroll-area--y">
                  {MINUTES.map((minute) => (
                    <li key={minute} data-value={minute}>
                      <button
                        type="button"
                        className={cn(
                          "ds-form-date__spinner-value",
                          selectedMinute === minute && "ds-form-date__spinner-value--selected"
                        )}
                        onClick={() => selectMinute(minute)}
                      >
                        {pad2(minute)}
                      </button>
                    </li>
                  ))}
                </ul>
                <button type="button" aria-label="Minuto siguiente" onClick={() => scrollList(minuteListRef, 1)}>
                  ⌄
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
