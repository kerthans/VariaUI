import {
  bauhausPortfolioSections,
  type RecipeSection,
} from "@/registry/modern-bauhaus/bauhaus-portfolio";
import { outfitterLandingSections } from "@/registry/outdoor/outfitter-landing";

export type { RecipeSection };

export const recipeSections: Record<string, RecipeSection[]> = {
  "bauhaus-portfolio": bauhausPortfolioSections,
  "outfitter-landing": outfitterLandingSections,
};

/** First recipe section that showcases the given component, used as its live preview. */
export function findComponentPreview(componentId: string) {
  for (const [recipeId, sections] of Object.entries(recipeSections)) {
    const section = sections.find((entry) => entry.component === componentId);
    if (section) return { recipeId, section };
  }
  return undefined;
}
