import type { ComponentEntry } from "./types";

const themeFiles = [
  "src/registry/modern-bauhaus/theme.ts",
  "src/registry/modern-bauhaus/theme.module.css",
];

const original = {
  type: "original",
  notes: "Designed and implemented for VariaUI. Uses Jost (SIL Open Font License 1.1) via Fontsource.",
} as const;

const outdoorThemeFiles = ["src/registry/outdoor/theme.ts", "src/registry/outdoor/theme.module.css"];

const outdoorDependencies = ["@fontsource-variable/fraunces", "@fontsource/ibm-plex-mono"];

const outdoorOriginal = {
  type: "original",
  notes:
    "Designed and implemented for VariaUI. Uses Fraunces and IBM Plex Mono (SIL Open Font License 1.1) via Fontsource. Illustrations are generated SVG.",
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
  {
    id: "outdoor-trailhead-hero",
    name: "Trailhead Hero",
    category: "hero",
    primaryStyle: "outdoor",
    styleIds: ["outdoor"],
    description:
      "Full-bleed landscape opening with a navigation bar, serif headline with italic emphasis, two actions, and a field card of product specifications.",
    intent: "Open a brand or product page with a sense of place before the sales pitch.",
    useCases: ["outdoor or lifestyle brand", "product launch", "travel or expedition page"],
    traits: [
      "full-bleed photo or illustrated ridge plate",
      "light serif headline with italic accent",
      "8/4 split with spec card",
      "film grain and legibility gradients",
    ],
    recommendedWith: ["outdoor-gear-catalog", "outdoor-field-journal"],
    avoidWith: ["geometric primary-color heroes", "centered SaaS hero layouts", "neon gradients"],
    files: [
      "src/registry/outdoor/trailhead-hero.tsx",
      "src/registry/outdoor/trailhead-hero.module.css",
      ...outdoorThemeFiles,
    ],
    dependencies: outdoorDependencies,
    license: "TBD",
    provenance: outdoorOriginal,
    status: "experimental",
  },
  {
    id: "outdoor-gear-catalog",
    name: "Gear Catalog",
    category: "gallery",
    primaryStyle: "outdoor",
    styleIds: ["outdoor"],
    description:
      "Catalog of product cards with numbered plates, stamps, spec tables, prices, and colorway swatches. Topographic plates stand in when there is no photograph.",
    intent: "Present a small product range like a field catalog, where details earn trust.",
    useCases: ["product range", "shop highlights", "equipment list", "menu or collection"],
    traits: ["numbered plates", "dashed spec tables", "colorway swatches", "generated contour plates"],
    recommendedWith: ["outdoor-trailhead-hero", "outdoor-field-journal"],
    avoidWith: ["glossy e-commerce carousels", "discount badges", "dense masonry walls"],
    files: [
      "src/registry/outdoor/gear-catalog.tsx",
      "src/registry/outdoor/gear-catalog.module.css",
      ...outdoorThemeFiles,
    ],
    dependencies: outdoorDependencies,
    license: "TBD",
    provenance: outdoorOriginal,
    status: "experimental",
  },
  {
    id: "outdoor-field-journal",
    name: "Field Journal",
    category: "content",
    primaryStyle: "outdoor",
    styleIds: ["outdoor"],
    description:
      "Stages of a route drawn as an elevation profile, followed by short journal entries with markers, elevations, and places.",
    intent: "Tell a story or process as a journey with a visible shape.",
    useCases: ["expedition or trip report", "product testing story", "roadmap or process", "itinerary"],
    traits: [
      "elevation profile generated from data",
      "numbered route markers",
      "dashed trail line on mobile",
      "route-aligned columns on desktop",
    ],
    recommendedWith: ["outdoor-trailhead-hero", "outdoor-gear-catalog"],
    avoidWith: ["generic timeline dots", "icon-heavy feature grids", "chart libraries"],
    files: [
      "src/registry/outdoor/field-journal.tsx",
      "src/registry/outdoor/field-journal.module.css",
      ...outdoorThemeFiles,
    ],
    dependencies: outdoorDependencies,
    license: "TBD",
    provenance: outdoorOriginal,
    status: "experimental",
  },
] as const satisfies readonly ComponentEntry[];
