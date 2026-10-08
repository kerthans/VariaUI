export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-6 py-16" aria-busy="true">
      <div className="h-4 w-32 rounded bg-muted" />
      <div className="mt-4 h-9 w-72 rounded bg-muted" />
      <div className="mt-4 h-4 w-full max-w-xl rounded bg-muted" />
      <div className="mt-12 aspect-[16/7] rounded-xl bg-muted" />
    </div>
  );
}
