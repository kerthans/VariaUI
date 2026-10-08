import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";

import { CopyButton } from "@/components/site/copy-button";
import { PageSkeleton } from "@/components/site/page-skeleton";
import { SiteHeader } from "@/components/site/site-header";
import {
  allComponents,
  categoryLabels,
  getComponent,
  getStyle,
  recipesUsingComponent,
} from "@/lib/catalog";
import { findComponentPreview } from "@/lib/recipe-views";
import { highlight, readSourceFiles } from "@/lib/source";

export function generateStaticParams() {
  return allComponents.map((component) => ({ slug: component.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponent(slug);
  return component
    ? { title: `${component.name} — VariaUI`, description: component.description }
    : {};
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm font-medium">{label}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{children}</dd>
    </div>
  );
}

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="rounded-full border px-2 py-0.5 text-xs">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ComponentPage({ params }: PageProps<"/components/[slug]">) {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<PageSkeleton />}>
        <ComponentView params={params} />
      </Suspense>
    </>
  );
}

async function ComponentView({ params }: { params: PageProps<"/components/[slug]">["params"] }) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();

  const style = getStyle(component.primaryStyle);
  const preview = findComponentPreview(component.id);
  const rooms = recipesUsingComponent(component.id);
  const files = await Promise.all(
    readSourceFiles(component.files).map(async (file) => ({
      ...file,
      html: await highlight(file.code, file.name),
    })),
  );

  return (
    <>
      <main>
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link href={`/styles/${component.primaryStyle}`} prefetch className="hover:text-foreground">
              {style?.name ?? component.primaryStyle}
            </Link>
            <span> / </span>
            <span>{categoryLabels[component.category]}</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">{component.name}</h1>
            <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
              {component.status}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-muted-foreground">{component.description}</p>
        </div>

        <section aria-label="Preview" className="mt-10 border-y">
          {preview ? preview.section.render() : null}
        </section>

        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <aside>
            <dl className="grid gap-6">
              <Field label="Design intent">{component.intent}</Field>
              <Field label="Use it for">
                <Chips items={component.useCases} />
              </Field>
              <Field label="Traits">
                <Chips items={component.traits} />
              </Field>
              <Field label="Pairs well with">
                <ul className="grid gap-1">
                  {component.recommendedWith.map((id) => (
                    <li key={id}>
                      <Link href={`/components/${id}`} prefetch className="underline underline-offset-4 hover:text-foreground">
                        {getComponent(id)?.name ?? id}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Field>
              <Field label="Avoid with">
                <Chips items={component.avoidWith} />
              </Field>
              {rooms.length > 0 && (
                <Field label="Seen in">
                  <ul className="grid gap-1">
                    {rooms.map((room) => (
                      <li key={room.id}>
                        <Link href={`/recipes/${room.id}`} prefetch className="underline underline-offset-4 hover:text-foreground">
                          {room.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Field>
              )}
              <Field label="Dependencies">
                <Chips items={component.dependencies} />
              </Field>
              <Field label="Provenance">
                {component.provenance.type} — {component.provenance.notes}
              </Field>
              <Field label="License">
                {component.license === "TBD" ? "Not decided yet" : component.license}
              </Field>
            </dl>
          </aside>

          <section aria-labelledby="source" className="min-w-0">
            <h2 id="source" className="text-xl font-semibold tracking-tight">
              Source
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              CLI installation arrives with the registry. Until then, copy these {files.length} files into
              one folder and install{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">{component.dependencies.join(" ")}</code>.
            </p>
            <div className="mt-6 grid gap-6">
              {files.map((file) => (
                <div key={file.path} className="overflow-hidden rounded-xl border">
                  <div className="flex items-center justify-between gap-4 border-b bg-muted/50 px-4 py-2">
                    <span className="truncate font-mono text-xs">{file.name}</span>
                    <CopyButton value={file.code} />
                  </div>
                  <div
                    className="max-h-[28rem] overflow-auto text-[13px] leading-relaxed [&_pre]:p-4"
                    dangerouslySetInnerHTML={{ __html: file.html }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
