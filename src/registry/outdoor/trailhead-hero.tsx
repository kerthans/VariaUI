import { cx, theme } from "./theme";
import styles from "./trailhead-hero.module.css";

export interface TrailheadHeroLink {
  label: string;
  href: string;
}

export interface TrailheadHeroStat {
  label: string;
  value: string;
}

export interface TrailheadHeroProps {
  /** Wordmark shown at the top-left, e.g. "Northfold". */
  brand?: string;
  navigation?: TrailheadHeroLink[];
  /** Compact action in the navigation bar, e.g. a shop or cart link. */
  barAction?: TrailheadHeroLink;
  /** Small label above the headline, e.g. "Field Series · Autumn 2026". */
  eyebrow?: string;
  headline: string;
  /** A word or phrase inside `headline` set in italic accent, e.g. "outside". */
  emphasis?: string;
  lede?: string;
  primaryAction?: TrailheadHeroLink;
  secondaryAction?: TrailheadHeroLink;
  /** Short specifications shown on the field card, e.g. weight or rating. */
  stats?: TrailheadHeroStat[];
  /** Title of the field card. */
  statsTitle?: string;
  /** Background photograph. Defaults to an illustrated ridge line. */
  image?: { src: string; alt: string };
  caption?: string;
  className?: string;
}

export function TrailheadHero({
  brand,
  navigation = [],
  barAction,
  eyebrow,
  headline,
  emphasis,
  lede,
  primaryAction,
  secondaryAction,
  stats = [],
  statsTitle = "Field notes",
  image,
  caption,
  className,
}: TrailheadHeroProps) {
  const plateCaption = caption ?? (image ? undefined : "Plate I — Ridge line at first light, illustrated");

  return (
    <section className={cx(theme.root, theme.grain, styles.hero, className)}>
      <div className={styles.media}>
        {image ? (
          <img className={styles.image} src={image.src} alt={image.alt} decoding="async" />
        ) : (
          <RidgeIllustration />
        )}
      </div>

      {(brand || navigation.length > 0 || barAction) && (
        <header className={styles.bar}>
          {brand && <p className={styles.brand}>{brand}</p>}
          {navigation.length > 0 && (
            <nav aria-label="Primary" className={styles.navWrap}>
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
          {barAction && (
            <a className={cx(theme.label, styles.barAction)} href={barAction.href}>
              {barAction.label}
            </a>
          )}
        </header>
      )}

      <div className={styles.body}>
        <div className={styles.copy}>
          {eyebrow && <p className={cx(theme.label, styles.eyebrow)}>{eyebrow}</p>}
          <h1 className={styles.headline}>{renderHeadline(headline, emphasis)}</h1>
          {lede && <p className={styles.lede}>{lede}</p>}
          {(primaryAction || secondaryAction) && (
            <div className={styles.actions}>
              {primaryAction && (
                <a className={theme.button} href={primaryAction.href}>
                  {primaryAction.label}
                  <span aria-hidden="true">→</span>
                </a>
              )}
              {secondaryAction && (
                <a className={cx(theme.label, styles.secondary)} href={secondaryAction.href}>
                  {secondaryAction.label}
                </a>
              )}
            </div>
          )}
        </div>

        {stats.length > 0 && (
          <aside className={styles.card} aria-label={statsTitle}>
            <p className={cx(theme.label, styles.cardTitle)}>{statsTitle}</p>
            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={theme.label}>{stat.label}</dt>
                  <dd className={styles.statValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>

      {plateCaption && <p className={cx(theme.label, styles.caption)}>{plateCaption}</p>}
    </section>
  );
}

function renderHeadline(headline: string, emphasis?: string) {
  const index = emphasis ? headline.indexOf(emphasis) : -1;
  if (!emphasis || index < 0) return headline;
  return (
    <>
      {headline.slice(0, index)}
      <em className={styles.emphasis}>{emphasis}</em>
      {headline.slice(index + emphasis.length)}
    </>
  );
}

const pines = Array.from({ length: 46 }, (_, index) => {
  const x = index * 36 + ((index * 53) % 17);
  const height = 34 + ((index * 37) % 46);
  const base = 792 - Math.sin(index * 0.45) * 14;
  return `M${x} ${base}L${x + height * 0.28} ${base - height}L${x + height * 0.56} ${base}Z`;
}).join("");

function RidgeIllustration() {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="1600" height="900" fill="#cdb98f" />
      <circle cx="1130" cy="330" r="92" fill="#e8d7b0" />
      <g fill="none" stroke="#1e2b23" strokeOpacity="0.12" strokeWidth="1.5">
        {[150, 210, 270, 330].map((y) => (
          <path key={y} d={`M0 ${y} C 400 ${y - 40}, 800 ${y + 30}, 1600 ${y - 20}`} />
        ))}
      </g>
      <path
        fill="#8c8f6c"
        d="M0 520 L120 470 L230 500 L360 410 L470 455 L610 360 L720 420 L850 380 L980 440 L1100 350 L1240 420 L1380 390 L1500 450 L1600 420 V900 H0Z"
      />
      <path
        fill="#56653f"
        d="M0 600 L150 540 L300 590 L420 520 L560 580 L700 500 L840 570 L980 520 L1120 590 L1260 530 L1400 580 L1600 540 V900 H0Z"
      />
      <path
        fill="#34452f"
        d="M0 690 L180 640 L330 680 L500 620 L680 690 L860 640 L1040 700 L1220 650 L1420 700 L1600 660 V900 H0Z"
      />
      <path fill="#1e2b23" d={`M0 790 Q400 760 800 784 T1600 776 V900 H0Z ${pines}`} />
    </svg>
  );
}
