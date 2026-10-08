import Link from "next/link";

import { ScaledPreview } from "@/components/site/scaled-preview";
import { SiteHeader } from "@/components/site/site-header";
import {
  allComponents,
  allRecipes,
  allStyles,
  categoryLabels,
  getComponent,
  getStyle,
  recipesForStyle,
  componentsForStyle,
} from "@/lib/catalog";
import { recipeSections } from "@/lib/recipe-views";
import { highlight } from "@/lib/source";

function plural(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

const featuredRecipe = allRecipes[0];
const featuredStyle = getStyle(featuredRecipe.styleId)!;
const featuredSections = recipeSections[featuredRecipe.id] ?? [];

export default async function Home() {
  const pieces = featuredSections.filter((section) => section.component);
  const sampleEntry = getComponent("bauhaus-manifesto-hero")!;
  const metadataHtml = await highlight(
    JSON.stringify(
      {
        id: sampleEntry.id,
        style: sampleEntry.primaryStyle,
        category: sampleEntry.category,
        intent: sampleEntry.intent,
        useCases: sampleEntry.useCases,
        recommendedWith: sampleEntry.recommendedWith,
        avoidWith: sampleEntry.avoidWith,
        provenance: sampleEntry.provenance.type,
        status: sampleEntry.status,
      },
      null,
      2,
    ),
    "entry.json",
  );

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-28">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-foreground" aria-hidden="true" />
                Open source · Early exploration
              </p>
              <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                Discover by style.
                <br />
                Build with character.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                VariaUI is a curated library of web components organized by design style. Pick a
                style, walk through a complete page built with it, then take only the pieces you
                need — as source code you own.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/styles/${featuredStyle.id}`}
                  prefetch
                  className="inline-flex h-11 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
                >
                  Explore {featuredStyle.name}
                </Link>
                <Link
                  href="/components"
                  className="inline-flex h-11 items-center rounded-md border px-5 text-sm font-medium hover:bg-muted"
                >
                  Browse components
                </Link>
              </div>
            </div>

            <div className="relative" aria-label={`${featuredRecipe.name}, taken apart into its pieces`}>
              {pieces.map((section, index) => {
                const component = getComponent(section.component!)!;
                const [layout, aspect] = [
                  ["relative z-10 w-[86%]", "aspect-[16/10]"],
                  ["relative z-20 -mt-[16%] ml-auto w-[76%]", "aspect-[16/10]"],
                  ["relative z-30 -mt-[12%] ml-[8%] w-[68%]", "aspect-[2/1]"],
                ][index];
                return (
                  <figure
                    key={section.key}
                    className={`${layout} overflow-hidden rounded-xl border bg-background shadow-xl`}
                  >
                    <ScaledPreview className={aspect}>{section.render()}</ScaledPreview>
                    <figcaption className="absolute left-3 top-3 flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs shadow-sm">
                      <span className="font-mono text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium">{component.name}</span>
                      <span className="hidden text-muted-foreground sm:inline">
                        {categoryLabels[component.category]}
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why style-first */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Start with the style, not the element.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Most libraries are organized by function. That is a good way to find a navbar, and a
              hard way to build a website with a clear point of view.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border p-6">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Component-first
                </p>
                <p className="mt-3 text-xl font-medium">“I need a hero. Which heroes are there?”</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  You get many good parts. Making them look like they belong to the same website is
                  left to you, or to another round of prompting.
                </p>
              </div>
              <div className="rounded-xl border bg-foreground p-6 text-background">
                <p className="text-xs uppercase tracking-wide opacity-60">Style-first</p>
                <p className="mt-3 text-xl font-medium">
                  “I want a Bauhaus-minded site. Which hero, gallery, and index belong together?”
                </p>
                <p className="mt-3 text-sm opacity-70">
                  Each style is a design language — type, color, geometry, layout, motion — and its
                  pieces are made to work with each other.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Like a furniture showroom.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              See a whole room first. If you like what you see, every piece in it comes with its own
              tag and can be taken home on its own.
            </p>
            <ol className="mt-10 grid gap-4 lg:grid-cols-3">
              <li className="flex flex-col rounded-xl border">
                <div className="flex h-44 flex-col justify-between border-b p-5">
                  <div className="flex gap-1.5">
                    {featuredStyle.palette.map((swatch) => (
                      <span
                        key={swatch.name}
                        title={`${swatch.name} ${swatch.value}`}
                        className="h-10 flex-1 rounded-md border"
                        style={{ background: swatch.value }}
                      />
                    ))}
                  </div>
                  <p className="text-4xl font-semibold tracking-tight">
                    Aa <span className="text-base font-normal text-muted-foreground">{featuredStyle.typeface}</span>
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs text-muted-foreground">01</p>
                  <p className="mt-1 font-medium">Pick a style</p>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">
                    Each style documents its typography, color, geometry, layout, and what to avoid.
                  </p>
                  <Link href={`/styles/${featuredStyle.id}`} prefetch className="mt-4 text-sm font-medium underline underline-offset-4">
                    Visit {featuredStyle.name}
                  </Link>
                </div>
              </li>
              <li className="flex flex-col rounded-xl border">
                <div className="h-44 overflow-hidden border-b">
                  <ScaledPreview className="h-full">
                    {featuredSections.map((section) => (
                      <div key={section.key}>{section.render()}</div>
                    ))}
                  </ScaledPreview>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs text-muted-foreground">02</p>
                  <p className="mt-1 font-medium">Walk through a room</p>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">
                    A room is a complete page composed from one style, so you can judge the pieces
                    together before choosing any.
                  </p>
                  <Link href={`/recipes/${featuredRecipe.id}`} prefetch className="mt-4 text-sm font-medium underline underline-offset-4">
                    Enter {featuredRecipe.name}
                  </Link>
                </div>
              </li>
              <li className="flex flex-col rounded-xl border">
                <ul className="flex h-44 flex-col justify-center gap-2 border-b p-5">
                  {featuredRecipe.components.map((id) => {
                    const component = getComponent(id)!;
                    return (
                      <li key={id} className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2 text-sm shadow-sm">
                        <span className="font-medium">{component.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {categoryLabels[component.category]}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs text-muted-foreground">03</p>
                  <p className="mt-1 font-medium">Take the pieces</p>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">
                    Every piece has its own page with a live preview, design notes, pairing advice,
                    and the full source.
                  </p>
                  <Link href="/components" className="mt-4 text-sm font-medium underline underline-offset-4">
                    Browse all pieces
                  </Link>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Styles */}
        <section id="styles" className="scroll-mt-14 border-b">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Styles</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Few, deliberately different, and carefully made. Quality over count.
            </p>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {allStyles.map((style) => {
                const hero = recipeSections[recipesForStyle(style.id)[0]?.id ?? ""]?.[0];
                return (
                  <li key={style.id} className="group relative overflow-hidden rounded-xl border">
                    {hero && (
                      <ScaledPreview className="aspect-[16/10] border-b">{hero.render()}</ScaledPreview>
                    )}
                    <div className="flex flex-wrap items-end justify-between gap-4 p-6">
                      <div>
                        <Link
                          href={`/styles/${style.id}`}
                          prefetch
                          className="text-lg font-medium after:absolute after:inset-0 group-hover:underline"
                        >
                          {style.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">{style.tagline}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-1">
                          {style.palette.map((swatch) => (
                            <span
                              key={swatch.name}
                              className="size-5 rounded-full border-2 border-background"
                              style={{ background: swatch.value }}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {plural(recipesForStyle(style.id).length, "room")} ·{" "}
                          {plural(componentsForStyle(style.id).length, "piece")}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* For people and agents */}
        <section className="border-b">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for people and AI agents.
              </h2>
              <dl className="mt-10 grid gap-8">
                <div>
                  <dt className="font-medium">Code you own</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    Pieces are copied into your project as plain React and CSS. No runtime package,
                    no framework lock-in — they do not depend on Next.js.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Styles that do not collide</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    Each style keeps its tokens in its own scope. Nothing touches your global CSS,
                    so different styles can share a page.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Curated, not crowdsourced</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    Every piece is reviewed for visual purpose, responsiveness, accessibility, and a
                    clear origin and license.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Design intent an agent can read</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    Each piece carries structured notes on what it is for, what it pairs with, and
                    what to avoid — so a coding agent can choose, not just install.
                  </dd>
                </div>
              </dl>
            </div>
            <div className="min-w-0 self-center overflow-hidden rounded-xl border">
              <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                <span className="font-mono text-xs">catalog / {sampleEntry.id}</span>
                <span className="text-xs text-muted-foreground">real entry</span>
              </div>
              <div
                className="overflow-auto text-[13px] leading-relaxed [&_pre]:whitespace-pre-wrap [&_pre]:p-4"
                dangerouslySetInnerHTML={{ __html: metadataHtml }}
              />
            </div>
          </div>
        </section>

        {/* Status */}
        <section>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-16">
            <div>
              <p className="font-medium">Where things stand</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {plural(allStyles.length, "style")} · {plural(allRecipes.length, "room")} ·{" "}
                {plural(allComponents.length, "piece")}. Installing pieces with the shadcn CLI is the
                next milestone; for now, copy the source from each piece page.
              </p>
            </div>
            <a
              href="https://github.com/kerthans/VariaUI"
              className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
            >
              Follow on GitHub
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <p>VariaUI — curated with intention, built for the open web.</p>
          <p>Less generic. More character.</p>
        </div>
      </footer>
    </>
  );
}
