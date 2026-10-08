import type { ComponentType } from "react";

import { BauhausPortfolio } from "@/registry/modern-bauhaus/bauhaus-portfolio";

export const recipeViews: Record<string, ComponentType> = {
  "bauhaus-portfolio": BauhausPortfolio,
};
