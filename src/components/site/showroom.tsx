"use client";

import Link from "next/link";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface ShowroomPiece {
  id: string;
  name: string;
  category: string;
}

const TagsVisible = createContext(true);

export function Showroom({
  title,
  styleName,
  styleHref,
  pieces,
  children,
}: {
  title: string;
  styleName: string;
  styleHref: string;
  pieces: ShowroomPiece[];
  children: ReactNode;
}) {
  const [showTags, setShowTags] = useState(true);

  return (
    <TagsVisible value={showTags}>
      <div className="sticky top-14 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 text-sm">
          <p className="font-medium">
            <Link href={styleHref} className="text-muted-foreground hover:text-foreground">
              {styleName}
            </Link>
            <span className="text-muted-foreground"> / </span>
            {title}
          </p>
          <ul className="flex flex-1 flex-wrap items-center gap-2">
            <li className="text-xs text-muted-foreground">{pieces.length} pieces in this room:</li>
            {pieces.map((piece) => (
              <li key={piece.id}>
                <Link
                  href={`/components/${piece.id}`}
                  className="rounded-full border px-2.5 py-0.5 text-xs hover:bg-muted"
                >
                  {piece.name}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setShowTags((value) => !value)}
            aria-pressed={showTags}
            className="rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-muted"
          >
            {showTags ? "Hide tags" : "Show tags"}
          </button>
        </div>
      </div>
      {children}
    </TagsVisible>
  );
}

export function PieceTag({ piece, children }: { piece?: ShowroomPiece; children: ReactNode }) {
  const visible = useContext(TagsVisible);
  if (!piece) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      {visible && (
        <Link
          href={`/components/${piece.id}`}
          className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 items-center gap-3 rounded-lg border bg-background px-3 py-1.5 text-foreground shadow-lg hover:bg-muted"
        >
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {piece.category}
          </span>
          <span className="text-sm font-medium whitespace-nowrap">{piece.name}</span>
          <span aria-hidden="true" className="text-muted-foreground">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
