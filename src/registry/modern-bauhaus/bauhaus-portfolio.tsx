import type { ReactNode } from "react";

import styles from "./bauhaus-portfolio.module.css";
import { ManifestoHero } from "./manifesto-hero";
import { ProjectGrid } from "./project-grid";
import { SectionIndex } from "./section-index";
import { cx, theme } from "./theme";

export interface RecipeSection {
  key: string;
  /** Registry id of the component this section is built from, if any. */
  component?: string;
  render: () => ReactNode;
}

export const bauhausPortfolioSections: RecipeSection[] = [
  {
    key: "hero",
    component: "bauhaus-manifesto-hero",
    render: () => (
      <ManifestoHero
        brand="Studio / 001"
        navigation={[
          { label: "Work", href: "#work" },
          { label: "Index", href: "#index" },
          { label: "Contact", href: "#contact" },
        ]}
        eyebrow="Manifesto / 2026"
        headline={["Form", "follows", "intention."]}
        accentLine={2}
        lede="An independent studio for identities, interfaces, and the systems that hold them together."
        action={{ label: "View work", href: "#work" }}
        facts={["Identity & Interface", "Independent since 2019", "Booking spring 2027"]}
      />
    ),
  },
  {
    key: "work",
    component: "bauhaus-project-grid",
    render: () => (
      <div id="work">
        <ProjectGrid
          eyebrow="01 / Selected Work"
          title="Selected Work"
          description="A small set of projects where structure, type, and purpose were designed as one."
          projects={[
            { title: "Transit Wayfinding", category: "Signage system", year: "2026", href: "#" },
            { title: "Archive Interface", category: "Web application", year: "2025", href: "#" },
            { title: "Type Specimen", category: "Editorial", year: "2025", href: "#" },
            { title: "Kiosk Identity", category: "Brand identity", year: "2024", href: "#" },
            { title: "Material Library", category: "Exhibition", year: "2024", href: "#" },
          ]}
        />
      </div>
    ),
  },
  {
    key: "index",
    component: "bauhaus-section-index",
    render: () => (
      <div id="index">
        <SectionIndex
          eyebrow="Index / What We Do"
          title="Practice"
          description="Four disciplines, one method: start from function, then give it a clear form."
          items={[
            {
              title: "Identity",
              description: "Marks, typography, and rules that stay recognizable across every surface.",
              tags: ["Brand", "Type"],
            },
            {
              title: "Interfaces",
              description: "Product and web interfaces built on strict grids and readable hierarchy.",
              tags: ["Web", "Product"],
            },
            {
              title: "Systems",
              description: "Design tokens, components, and documentation that teams can maintain.",
              tags: ["Tokens", "Docs"],
            },
            {
              title: "Experiments",
              description: "Self-initiated studies in geometry, motion, and print.",
              tags: ["Research"],
            },
          ]}
        />
      </div>
    ),
  },
  {
    key: "contact",
    render: () => (
      <footer id="contact" className={cx(theme.root, styles.footer)}>
        <p className={theme.label}>Contact / 04</p>
        <a className={styles.mail} href="mailto:hello@example.com">
          hello@example.com
        </a>
        <p className={cx(theme.label, styles.note)}>
          Sample content for the VariaUI Bauhaus Portfolio recipe.
        </p>
      </footer>
    ),
  },
];

export function BauhausPortfolio() {
  return (
    <main className={styles.page}>
      {bauhausPortfolioSections.map((section) => (
        <div key={section.key}>{section.render()}</div>
      ))}
    </main>
  );
}
