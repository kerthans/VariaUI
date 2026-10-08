import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { recipes } from "@/catalog/recipes";
import { recipeViews } from "@/lib/recipe-views";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/recipes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((entry) => entry.id === slug);
  return recipe ? { title: `${recipe.name} — VariaUI`, description: recipe.description } : {};
}

export default async function RecipePage({ params }: PageProps<"/recipes/[slug]">) {
  const { slug } = await params;
  const View = recipeViews[slug];
  if (!View) notFound();
  return <View />;
}
