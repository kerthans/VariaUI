import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          VariaUI
        </Link>
        <nav aria-label="Site" className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/styles/modern-bauhaus" className="hover:text-foreground">
            Styles
          </Link>
          <Link href="/components" className="hover:text-foreground">
            Components
          </Link>
          <a href="https://github.com/kerthans/VariaUI" className="hover:text-foreground">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
