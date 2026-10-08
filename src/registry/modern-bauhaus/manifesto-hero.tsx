import type { ReactNode } from "react";

import styles from "./manifesto-hero.module.css";
import { cx, theme } from "./theme";

export interface ManifestoHeroLink {
  label: string;
  href: string;
}

export interface ManifestoHeroProps {
  /** Wordmark shown at the top-left, e.g. "Studio / 001". */
  brand?: string;
  navigation?: ManifestoHeroLink[];
  /** Small label above the headline, e.g. "Manifesto / 2026". */
  eyebrow?: string;
  /** Each entry renders on its own line; odd lines are offset on wide screens. */
  headline: string[];
  /** Index of the headline line rendered in the accent color. */
  accentLine?: number;
  lede?: string;
  action?: ManifestoHeroLink;
  /** Short facts rendered as a ruled strip below the hero. */
  facts?: string[];
  /** Replaces the default geometric composition. */
  plate?: ReactNode;
  plateCaption?: string;
  className?: string;
}

export function ManifestoHero({
  brand,
  navigation = [],
  eyebrow,
  headline,
  accentLine,
  lede,
  action,
  facts = [],
  plate,
  plateCaption = "Fig. 01 — Construction",
  className,
}: ManifestoHeroProps) {
  return (
    <section className={cx(theme.root, styles.hero, className)}>
      {(brand || navigation.length > 0) && (
        <header className={styles.bar}>
          {brand && <p className={styles.brand}>{brand}</p>}
          {navigation.length > 0 && (
            <nav aria-label="Primary">
              <ul className={styles.nav}>
                {navigation.map((link) => (
                  <li key={link.href}>
                    <a className={cx(theme.label, styles.navLink)} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>
      )}

      <div className={styles.body}>
        <div className={styles.copy}>
          {eyebrow && <p className={cx(theme.label, styles.eyebrow)}>{eyebrow}</p>}
          <h1 className={styles.headline}>
            {headline.map((line, index) => (
              <span
                key={`${index}-${line}`}
                className={cx(
                  styles.line,
                  index % 2 === 1 && styles.offset,
                  index === accentLine && styles.accent,
                )}
              >
                {line}
              </span>
            ))}
          </h1>
          {(lede || action) && (
            <div className={styles.footer}>
              {lede && <p className={styles.lede}>{lede}</p>}
              {action && (
                <a className={styles.action} href={action.href}>
                  <span>{action.label}</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          )}
        </div>

        <figure className={styles.plate}>
          <div className={styles.plateArt} aria-hidden={plate ? undefined : true}>
            {plate ?? <ConstructionPlate />}
          </div>
          {plateCaption && (
            <figcaption className={cx(theme.label, styles.caption)}>
              {plateCaption}
            </figcaption>
          )}
        </figure>
      </div>

      {facts.length > 0 && (
        <ul className={styles.facts}>
          {facts.map((fact) => (
            <li key={fact} className={cx(theme.label, styles.fact)}>
              {fact}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ConstructionPlate() {
  return (
    <svg
      className={styles.construction}
      viewBox="0 0 400 560"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <g className={styles.gridLines}>
        {[100, 200, 300].map((x) => (
          <line key={`x${x}`} x1={x} y1="0" x2={x} y2="560" />
        ))}
        {[80, 160, 240, 320, 400, 480].map((y) => (
          <line key={`y${y}`} x1="0" y1={y} x2="400" y2={y} />
        ))}
        <line x1="0" y1="560" x2="400" y2="160" />
      </g>
      <path className={styles.fillRed} d="M0 560 V260 A300 300 0 0 1 300 560 Z" />
      <rect className={styles.fillBlue} x="240" y="0" width="64" height="320" />
      <rect className={styles.fillInk} x="0" y="88" width="240" height="20" />
      <rect className={styles.fillYellow} x="304" y="320" width="96" height="96" />
      <circle className={styles.stroke} cx="272" cy="176" r="80" />
      <circle className={styles.fillInk} cx="272" cy="176" r="6" />
    </svg>
  );
}
