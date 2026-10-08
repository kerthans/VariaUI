import styles from "./section-index.module.css";
import { accent, cx, theme, type BauhausAccent } from "./theme";

export interface SectionIndexItem {
  title: string;
  description?: string;
  /** Short tags rendered beside the entry, e.g. ["Brand", "Type"]. */
  tags?: string[];
  href?: string;
}

export interface SectionIndexProps {
  /** Small label above the title, e.g. "Index / What We Do". */
  eyebrow?: string;
  title: string;
  description?: string;
  items: SectionIndexItem[];
  accent?: BauhausAccent;
  className?: string;
}

export function SectionIndex({
  eyebrow,
  title,
  description,
  items,
  accent: accentColor = "red",
  className,
}: SectionIndexProps) {
  return (
    <section className={cx(theme.root, styles.section, accent(accentColor), className)}>
      <header className={styles.aside}>
        <div className={styles.asideInner}>
          {eyebrow && <p className={theme.label}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </header>

      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={`${index}-${item.title}`} className={styles.row}>
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.body}>
              <h3 className={styles.itemTitle}>
                {item.href ? (
                  <a className={styles.link} href={item.href}>
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              {item.description && <p className={styles.itemText}>{item.description}</p>}
            </div>
            {item.tags && item.tags.length > 0 && (
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag} className={cx(theme.label, styles.tag)}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
