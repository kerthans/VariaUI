import type { RecipeEntry } from "./types";

export const recipes = [
  {
    id: "bauhaus-portfolio",
    name: "Bauhaus Portfolio",
    styleId: "modern-bauhaus",
    description:
      "A complete studio homepage composed from the Manifesto Hero, Modular Project Grid, and Indexed Section List.",
    scenario: "Independent developer or creative studio portfolio homepage.",
    components: ["bauhaus-manifesto-hero", "bauhaus-project-grid", "bauhaus-section-index"],
    status: "experimental",
  },
  {
    id: "outfitter-landing",
    name: "Outfitter Landing",
    styleId: "outdoor",
    description:
      "A complete brand landing page composed from the Trailhead Hero, Gear Catalog, and Field Journal.",
    scenario: "Landing page for an outdoor brand or independent shop.",
    components: ["outdoor-trailhead-hero", "outdoor-gear-catalog", "outdoor-field-journal"],
    status: "experimental",
  },
] as const satisfies readonly RecipeEntry[];
