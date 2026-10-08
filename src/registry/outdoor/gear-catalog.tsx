import styles from "./gear-catalog.module.css";
import { contourPaths, cx, theme } from "./theme";

export type GearCatalogTone = "sand" | "lichen" | "clay" | "forest";

export interface GearCatalogItem {
  name: string;
  category: string;
  price?: string;
  href?: string;
  /** Product photograph. Defaults to a topographic plate. */
  image?: { src: string; alt: string };
  /** Short stamp in the corner of the plate, e.g. "New" or "Field-tested". */
  badge?: string;
  specs?: { label: string; value: string }[];
  colors?: { name: string; value: string }[];
  /** Plate color used when no image is provided. */
  tone?: GearCatalogTone;
}

export interface GearCatalogProps {
  /** Small label above the title, e.g. "02 — The kit". */
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  items: GearCatalogItem[];
  className?: string;
}

const toneRhythm: GearCatalogTone[] = ["sand", "forest", "lichen", "clay"];

export function GearCatalog({
  eyebrow,
  title,
  description,
  action,
  items,
  className,
}: GearCatalogProps) {
  return (
    <section className={cx(theme.root, styles.section, className)}>
      <header className={styles.header}>
        <div>
          {eyebrow && <p className={cx(theme.label, styles.eyebrow)}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
        </div>
        {(description || action) && (
          <div className={styles.intro}>
            {description && <p className={styles.description}>{description}</p>}
            {action && (
              <a className={cx(theme.label, styles.action)} href={action.href}>
                {action.label} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        )}
      </header>

      <ul className={styles.grid}>
        {items.map((item, index) => (
          <li key={`${index}-${item.name}`}>
            <GearCard
              item={item}
              number={String(index + 1).padStart(2, "0")}
              tone={item.tone ?? toneRhythm[index % toneRhythm.length]}
              seed={index * 1.9 + 0.6}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function GearCard({
  item,
  number,
  tone,
  seed,
}: {
  item: GearCatalogItem;
  number: string;
  tone: GearCatalogTone;
  seed: number;
}) {
  return (
    <article className={styles.card}>
      <div className={cx(styles.plate, !item.image && styles[tone])}>
        {item.image ? (
          <img
            className={styles.image}
            src={item.image.src}
            alt={item.image.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <ContourPlate seed={seed} />
        )}
        <span className={cx(theme.label, styles.number)}>No. {number}</span>
        {item.badge && <span className={cx(theme.label, styles.badge)}>{item.badge}</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.heading}>
          <div>
            <p className={cx(theme.label, styles.category)}>{item.category}</p>
            <h3 className={styles.name}>
              {item.href ? (
                <a className={styles.link} href={item.href}>
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </h3>
          </div>
          {item.price && <p className={styles.price}>{item.price}</p>}
        </div>

        {item.specs && item.specs.length > 0 && (
          <dl className={styles.specs}>
            {item.specs.map((spec) => (
              <div key={spec.label} className={styles.spec}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {item.colors && item.colors.length > 0 && (
          <ul
            className={styles.colors}
            aria-label={`Colorways: ${item.colors.map((color) => color.name).join(", ")}`}
          >
            {item.colors.map((color) => (
              <li
                key={color.name}
                className={styles.swatch}
                style={{ background: color.value }}
                title={color.name}
              />
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function ContourPlate({ seed }: { seed: number }) {
  const centerX = 150 + Math.sin(seed) * 40;
  const centerY = 190 + Math.cos(seed * 1.3) * 40;
  return (
    <svg
      className={styles.contours}
      viewBox="0 0 300 375"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {contourPaths({ cx: centerX, cy: centerY, rings: 11, spacing: 19, seed }).map((d, ring) => (
        <path key={ring} d={d} strokeWidth={ring % 4 === 3 ? 1.6 : 0.8} />
      ))}
      <path className={styles.mark} d={`M${centerX - 7} ${centerY}h14M${centerX} ${centerY - 7}v14`} />
    </svg>
  );
}
