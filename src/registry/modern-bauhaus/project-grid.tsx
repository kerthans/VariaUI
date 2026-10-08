import styles from "./project-grid.module.css";
import { accent, cx, theme, type BauhausAccent } from "./theme";

export type ProjectGridSize = "large" | "medium" | "small";
export type ProjectGridPattern = "disc" | "arch" | "split" | "bars" | "quarter";

export interface ProjectGridItem {
  title: string;
  category: string;
  year?: string;
  href?: string;
  image?: { src: string; alt: string };
  /** Defaults to a repeating large / medium / small rhythm. */
  size?: ProjectGridSize;
  accent?: BauhausAccent;
  /** Geometric plate used when no image is provided. */
  pattern?: ProjectGridPattern;
}

export interface ProjectGridProps {
  /** Small label above the title, e.g. "01 / Selected Work". */
  eyebrow?: string;
  title: string;
  description?: string;
  projects: ProjectGridItem[];
  className?: string;
}

const sizeRhythm: ProjectGridSize[] = ["large", "medium", "small", "small", "small"];
const accentRhythm: BauhausAccent[] = ["red", "blue", "yellow", "ink", "blue", "red"];
const patternRhythm: ProjectGridPattern[] = ["disc", "bars", "arch", "split", "quarter"];

export function ProjectGrid({
  eyebrow,
  title,
  description,
  projects,
  className,
}: ProjectGridProps) {
  return (
    <section className={cx(theme.root, styles.section, className)}>
      <header className={styles.header}>
        {eyebrow && <p className={theme.label}>{eyebrow}</p>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </header>

      <ol className={styles.grid}>
        {projects.map((project, index) => (
          <li
            key={`${index}-${project.title}`}
            className={cx(
              styles.item,
              styles[project.size ?? sizeRhythm[index % sizeRhythm.length]],
              accent(project.accent ?? accentRhythm[index % accentRhythm.length]),
            )}
          >
            <ProjectCard
              project={project}
              number={String(index + 1).padStart(2, "0")}
              pattern={project.pattern ?? patternRhythm[index % patternRhythm.length]}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectCard({
  project,
  number,
  pattern,
}: {
  project: ProjectGridItem;
  number: string;
  pattern: ProjectGridPattern;
}) {
  const content = (
    <>
      <div className={styles.cardTop}>
        <span className={styles.number}>{number}</span>
        {project.href && (
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        )}
      </div>
      <div className={styles.media}>
        {project.image ? (
          <img
            className={styles.image}
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={cx(styles.pattern, styles[pattern])} aria-hidden="true" />
        )}
      </div>
      <div className={styles.meta}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={cx(theme.label, styles.category)}>
          {project.category}
          {project.year && <span> / {project.year}</span>}
        </p>
      </div>
    </>
  );

  return project.href ? (
    <a className={styles.card} href={project.href}>
      {content}
    </a>
  ) : (
    <article className={styles.card}>{content}</article>
  );
}
