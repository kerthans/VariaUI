import Link from "next/link";

import { recipes } from "@/catalog/recipes";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      <p className="text-sm text-muted-foreground">Early exploration</p>
      <h1 className="text-4xl font-semibold tracking-tight">VariaUI</h1>
      <p className="text-lg text-muted-foreground">
        Discover by style. Build with character.
      </p>
      <ul className="flex flex-col gap-2 text-sm">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link
              href={`/recipes/${recipe.id}`}
              className="font-medium underline underline-offset-4"
            >
              {recipe.name}
            </Link>
            <span className="text-muted-foreground"> — {recipe.scenario}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://github.com/kerthans/VariaUI"
        className="text-sm font-medium underline underline-offset-4"
      >
        GitHub
      </a>
    </main>
  );
}
