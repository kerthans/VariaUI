import { components } from "@/catalog/components";
import { recipes } from "@/catalog/recipes";
import { styles } from "@/catalog/styles";
import type { ComponentCategory, ComponentEntry, RecipeEntry, StyleEntry } from "@/catalog/types";

export const allStyles: readonly StyleEntry[] = styles;
export const allComponents: readonly ComponentEntry[] = components;
export const allRecipes: readonly RecipeEntry[] = recipes;

export const categoryLabels: Record<ComponentCategory, string> = {
  hero: "Hero",
  gallery: "Gallery",
  content: "Content",
  navigation: "Navigation",
  footer: "Footer",
};

export function getStyle(id: string) {
  return allStyles.find((style) => style.id === id);
}

export function getComponent(id: string) {
  return allComponents.find((component) => component.id === id);
}

export function getRecipe(id: string) {
  return allRecipes.find((recipe) => recipe.id === id);
}

export function componentsForStyle(styleId: string) {
  return allComponents.filter((component) => component.styleIds.includes(styleId));
}

export function recipesForStyle(styleId: string) {
  return allRecipes.filter((recipe) => recipe.styleId === styleId);
}

export function recipesUsingComponent(componentId: string) {
  return allRecipes.filter((recipe) => recipe.components.includes(componentId));
}
