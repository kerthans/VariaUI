import type { ComponentEntry } from "./types";

const themeFiles = [
  "src/registry/modern-bauhaus/theme.ts",
  "src/registry/modern-bauhaus/theme.module.css",
];

const original = {
  type: "original",
  notes: "Designed and implemented for VariaUI. Uses Jost (SIL Open Font License 1.1) via Fontsource.",
} as const;

export const components = [
  {
    id: "bauhaus-manifesto-hero",
    name: "Manifesto Hero",
    category: "hero",
    primaryStyle: "modern-bauhaus",
    styleIds: ["modern-bauhaus"],
    description:
      "Full-height opening section with a stacked manifesto headline, optional navigation bar, lede, call to action, and a geometric construction plate.",
    intent: "Bold, geometric, editorial landing hero that states a point of view.",
    useCases: ["creative portfolio", "independent studio", "product launch"],
    traits: ["asymmetric 8/4 grid", "oversized uppercase type", "offset headline lines", "constructed geometric plate"],
    recommendedWith: ["bauhaus-project-grid", "bauhaus-section-index"],
    avoidWith: ["heavy glassmorphism", "neon gradients", "soft rounded cards"],
    files: [
      "src/registry/modern-bauhaus/manifesto-hero.tsx",
      "src/registry/modern-bauhaus/manifesto-hero.module.css",
      ...themeFiles,
    ],
    dependencies: ["@fontsource-variable/jost"],
    license: "TBD",
    provenance: original,
    status: "experimental",
  },
  {
    id: "bauhaus-project-grid",
    name: "Modular Project Grid",
    category: "gallery",
    primaryStyle: "modern-bauhaus",
    styleIds: ["modern-bauhaus"],
    description:
      "Ruled, asymmetric grid of numbered project cards in a large / medium / small rhythm, with images or generated geometric plates.",
    intent: "Present a small set of projects as a composed system rather than a uniform feed.",
    useCases: ["portfolio", "case studies", "creative project directory"],
    traits: ["collapsed 2px rules", "7/5 and 4/4/4 rhythm", "numbered cards", "geometric placeholder plates"],
    recommendedWith: ["bauhaus-manifesto-hero", "bauhaus-section-index"],
    avoidWith: ["masonry photo walls", "card shadows", "infinite scroll feeds"],
    files: [
      "src/registry/modern-bauhaus/project-grid.tsx",
      "src/registry/modern-bauhaus/project-grid.module.css",
      ...themeFiles,
    ],
    dependencies: ["@fontsource-variable/jost"],
    license: "TBD",
    provenance: original,
    status: "experimental",
  },
  {
    id: "bauhaus-section-index",
    name: "Indexed Section List",
    category: "content",
    primaryStyle: "modern-bauhaus",
    styleIds: ["modern-bauhaus"],
    description:
      "Numbered index of entries beside a sticky section title, inspired by book contents, exhibition indexes, and drawing schedules.",
    intent: "Make a list of services or chapters read like a structured document.",
    useCases: ["services", "article index", "product capabilities", "FAQ outline"],
    traits: ["5/7 split with sticky aside", "numbered ruled rows", "accent bar on hover and focus", "ruled tags"],
    recommendedWith: ["bauhaus-manifesto-hero", "bauhaus-project-grid"],
    avoidWith: ["icon-heavy feature grids", "accordion chevrons"],
    files: [
      "src/registry/modern-bauhaus/section-index.tsx",
      "src/registry/modern-bauhaus/section-index.module.css",
      ...themeFiles,
    ],
    dependencies: ["@fontsource-variable/jost"],
    license: "TBD",
    provenance: original,
    status: "experimental",
  },
] as const satisfies readonly ComponentEntry[];
