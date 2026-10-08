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
] as const satisfies readonly RecipeEntry[];
