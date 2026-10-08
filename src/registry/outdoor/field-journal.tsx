import type { CSSProperties } from "react";

import styles from "./field-journal.module.css";
import { cx, theme } from "./theme";

export interface FieldJournalEntry {
  /** Short marker for the stage, e.g. "Day 01". */
  marker: string;
  /** Elevation of the stage, drawn on the profile. */
  elevation: number;
  title: string;
  text: string;
  /** Location note, e.g. "Camp II, north shoulder". */
  place?: string;
}

export interface FieldJournalProps {
  /** Small label above the title, e.g. "03 — From the field". */
  eyebrow?: string;
  title: string;
  description?: string;
  entries: FieldJournalEntry[];
  /** Unit appended to elevations. */
  unit?: string;
  /** Totals shown beside the profile, e.g. distance or ascent. */
  summary?: { label: string; value: string }[];
  className?: string;
}

const formatter = new Intl.NumberFormat("en-US");

export function FieldJournal({
  eyebrow,
  title,
  description,
  entries,
  unit = "m",
  summary = [],
  className,
}: FieldJournalProps) {
  const points = profilePoints(entries.map((entry) => entry.elevation));

  return (
    <section className={cx(theme.root, theme.grain, styles.section, className)}>
      <header className={styles.header}>
        <div>
          {eyebrow && <p className={cx(theme.label, styles.eyebrow)}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </header>

      {entries.length > 1 && (
        <figure className={styles.profile}>
          <div className={styles.chart}>
            <svg
              className={styles.svg}
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              {[50, 100, 150].map((y) => (
                <line key={y} className={styles.gridLine} x1="0" y1={y} x2="1000" y2={y} />
              ))}
              <path className={styles.area} d={`${points.line} L1000 200 L0 200 Z`} />
              <path className={styles.line} d={points.line} />
              {points.markers.map((marker, index) => (
                <line
                  key={index}
                  className={styles.drop}
                  x1={marker.x}
                  y1={marker.y}
                  x2={marker.x}
                  y2="200"
                />
              ))}
            </svg>
            {points.markers.map((marker, index) => (
              <span
                key={index}
                className={styles.marker}
                style={{ left: `${marker.x / 10}%`, top: `${marker.y / 2}%` } as CSSProperties}
                aria-hidden="true"
              >
                {index + 1}
              </span>
            ))}
          </div>
          <figcaption className={cx(theme.label, styles.caption)}>
            <span>
              Elevation profile · {formatter.format(Math.min(...entries.map((e) => e.elevation)))}–
              {formatter.format(Math.max(...entries.map((e) => e.elevation)))} {unit}
            </span>
            {summary.length > 0 && (
              <span className={styles.summary}>
                {summary.map((item) => (
                  <span key={item.label}>
                    {item.label} <strong className={styles.summaryValue}>{item.value}</strong>
                  </span>
                ))}
              </span>
            )}
          </figcaption>
        </figure>
      )}

      <ol
        className={styles.stages}
        style={{ "--fj-count": entries.length } as CSSProperties}
      >
        {entries.map((entry, index) => (
          <li key={`${index}-${entry.marker}`} className={styles.stage}>
            <span className={styles.dot} aria-hidden="true">
              {index + 1}
            </span>
            <p className={cx(theme.label, styles.meta)}>
              {entry.marker} · {formatter.format(entry.elevation)} {unit}
            </p>
            <h3 className={styles.stageTitle}>{entry.title}</h3>
            <p className={styles.text}>{entry.text}</p>
            {entry.place && <p className={cx(theme.label, styles.place)}>{entry.place}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Maps elevations onto a 1000×200 profile, inserting small deterministic undulations
 * between stages so the line reads as terrain rather than a chart.
 */
function profilePoints(elevations: number[]) {
  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  const range = max - min || 1;
  // Markers sit at column centres so they line up with the stage columns below.
  const step = 1000 / Math.max(elevations.length, 1);
  const markers = elevations.map((elevation, index) => ({
    x: step * (index + 0.5),
    y: 170 - ((elevation - min) / range) * 130,
  }));

  const path: string[] = [`M0 ${markers[0]?.y ?? 170}`];
  markers.forEach((marker, index) => {
    const next = markers[index + 1];
    path.push(`L${marker.x.toFixed(1)} ${marker.y.toFixed(1)}`);
    if (!next) return;
    for (let k = 1; k < 4; k += 1) {
      const t = k / 4;
      const x = marker.x + (next.x - marker.x) * t;
      const y = marker.y + (next.y - marker.y) * t + Math.sin(index * 2.1 + k * 1.7) * 9;
      path.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
    }
  });
  path.push(`L1000 ${markers.at(-1)?.y.toFixed(1) ?? 170}`);

  return { line: path.join(" "), markers };
}
