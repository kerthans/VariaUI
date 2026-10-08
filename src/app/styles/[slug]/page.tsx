import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ScaledPreview } from "@/components/site/scaled-preview";
import { SiteHeader } from "@/components/site/site-header";
import {
  allStyles,
  categoryLabels,
  componentsForStyle,
  getComponent,
  getStyle,
  recipesForStyle,
} from "@/lib/catalog";
import { findComponentPreview, recipeSections } from "@/lib/recipe-views";

export function generateStaticParams() {
  return allStyles.map((style) => ({ slug: style.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/styles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const style = getStyle(slug);
  return style ? { title: `${style.name} — VariaUI`, description: style.tagline } : {};
}

const languageLabels = {
  typography: "Typography",
  color: "Color",
  geometry: "Geometry",
  layout: "Layout",
  texture: "Texture",
  imagery: "Imagery",
  motion: "Motion",
  mood: "Mood",
} as const;

export default async function StylePage({ params }: PageProps<"/styles/[slug]">) {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style) notFound();

  const recipes = recipesForStyle(style.id);
  const pieces = componentsForStyle(style.id);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-sm text-muted-foreground">Style · {style.status}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{style.name}</h1>
        <p className="mt-3 text-lg">{style.tagline}</p>
        <p className="mt-4 max-w-2xl text-muted-foreground">{style.summary}</p>

        <section className="mt-16" aria-labelledby="rooms">
          <h2 id="rooms" className="text-xl font-semibold tracking-tight">
            Rooms
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete pages composed from this style. Every piece inside can be taken on its own.
          </p>
          <ul className="mt-6 grid gap-6">
            {recipes.map((recipe) => {
              const sections = recipeSections[recipe.id] ?? [];
              return (
                <li
                  key={recipe.id}
                  className="grid overflow-hidden rounded-xl border lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
                >
                  <div className="relative border-b lg:border-r lg:border-b-0">
                    <ScaledPreview className="aspect-[4/3]">
                      {sections.map((section) => (
                        <div key={section.key}>{section.render()}</div>
                      ))}
                    </ScaledPreview>
                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="absolute inset-0"
                      aria-label={`Enter ${recipe.name}`}
                    />
                  </div>
                  <div className="flex flex-col gap-6 p-6">
                    <div>
                      <p className="text-lg font-medium">{recipe.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{recipe.scenario}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        In this room
                      </p>
                      <ol className="mt-2 divide-y rounded-lg border">
                        {recipe.components.map((id, index) => {
                          const piece = getComponent(id);
                          if (!piece) return null;
                          return (
                            <li key={id}>
                              <Link
                                href={`/components/${id}`}
                                className="flex items-baseline gap-3 px-3 py-2.5 text-sm hover:bg-muted/50"
                              >
                                <span className="font-mono text-xs text-muted-foreground">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="flex-1 font-medium">{piece.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {categoryLabels[piece.category]}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
                    >
                      Enter room →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="pieces">
          <h2 id="pieces" className="text-xl font-semibold tracking-tight">
            Pieces
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Individual components. Each one works alone or alongside the rest of the collection.
          </p>
          <ul className="mt-6 grid gap-6 lg:grid-cols-2">
            {pieces.map((piece) => {
              const preview = findComponentPreview(piece.id);
              return (
                <li key={piece.id} className="group relative overflow-hidden rounded-xl border">
                  {preview && (
                    <ScaledPreview className="aspect-[16/10] border-b">
                      {preview.section.render()}
                    </ScaledPreview>
                  )}
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {categoryLabels[piece.category]}
                    </p>
                    <Link
                      href={`/components/${piece.id}`}
                      className="mt-1 block font-medium after:absolute after:inset-0 group-hover:underline"
                    >
                      {piece.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">{piece.intent}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="language">
          <h2 id="language" className="text-xl font-semibold tracking-tight">
            Design language
          </h2>
          <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {Object.entries(languageLabels).map(([key, label]) => (
              <div key={key}>
                <dt className="text-sm font-medium">{label}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {style.language[key as keyof typeof languageLabels]}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <p className="text-sm font-medium">Avoid</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {style.avoid.map((item) => (
                <li key={item} className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
