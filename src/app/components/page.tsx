import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site/site-header";
import { allComponents, categoryLabels, getStyle } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Components — VariaUI",
};

export default function ComponentsPage() {
  const categories = [...new Set(allComponents.map((component) => component.category))];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Components</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every piece in the library, by function. Each lists the style it belongs to.
        </p>
        {categories.map((category) => (
          <section key={category} className="mt-12" aria-labelledby={`cat-${category}`}>
            <h2 id={`cat-${category}`} className="text-sm font-medium text-muted-foreground">
              {categoryLabels[category]}
            </h2>
            <ul className="mt-3 divide-y rounded-xl border">
              {allComponents
                .filter((component) => component.category === category)
                .map((component) => (
                  <li key={component.id}>
                    <Link
                      href={`/components/${component.id}`}
                      className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4 hover:bg-muted/50"
                    >
                      <span className="font-medium">{component.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {getStyle(component.primaryStyle)?.name}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
