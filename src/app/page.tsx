import Link from "next/link";

import { SiteHeader } from "@/components/site/site-header";
import { allStyles, componentsForStyle, recipesForStyle } from "@/lib/catalog";

function plural(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Early exploration</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Discover by style. Build with character.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start with a style, walk through a complete page, then take the pieces you want.
          </p>
        </div>

        <section aria-labelledby="styles">
          <h2 id="styles" className="text-sm font-medium text-muted-foreground">
            Styles
          </h2>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2">
            {allStyles.map((style) => (
              <li key={style.id}>
                <Link
                  href={`/styles/${style.id}`}
                  className="block rounded-xl border p-5 transition-colors hover:bg-muted/50"
                >
                  <p className="font-medium">{style.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{style.tagline}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {plural(recipesForStyle(style.id).length, "room")} ·{" "}
                    {plural(componentsForStyle(style.id).length, "piece")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
