import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PieceTag, Showroom, type ShowroomPiece } from "@/components/site/showroom";
import { SiteHeader } from "@/components/site/site-header";
import { allRecipes, categoryLabels, getComponent, getRecipe, getStyle } from "@/lib/catalog";
import { recipeSections } from "@/lib/recipe-views";

export function generateStaticParams() {
  return allRecipes.map((recipe) => ({ slug: recipe.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/recipes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  return recipe ? { title: `${recipe.name} — VariaUI`, description: recipe.description } : {};
}

function toPiece(componentId: string | undefined): ShowroomPiece | undefined {
  const component = componentId ? getComponent(componentId) : undefined;
  return component
    ? { id: component.id, name: component.name, category: categoryLabels[component.category] }
    : undefined;
}

export default async function RecipePage({ params }: PageProps<"/recipes/[slug]">) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  const sections = recipeSections[slug];
  if (!recipe || !sections) notFound();

  const style = getStyle(recipe.styleId);
  const pieces = recipe.components.map(toPiece).filter((piece) => piece !== undefined);

  return (
    <>
      <SiteHeader />
      <Showroom
        title={recipe.name}
        styleName={style?.name ?? recipe.styleId}
        styleHref={`/styles/${recipe.styleId}`}
        pieces={pieces}
      >
        <main>
          {sections.map((section) => (
            <PieceTag key={section.key} piece={toPiece(section.component)}>
              {section.render()}
            </PieceTag>
          ))}
        </main>
      </Showroom>
    </>
  );
}
