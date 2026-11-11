export default function CatalogLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 border-b border-zinc-200/80 pb-8">
        <div className="h-6 w-48 animate-pulse rounded-full bg-zinc-200" />
        <div className="mt-4 h-9 w-64 animate-pulse rounded-xl bg-zinc-200" />
        <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded-lg bg-zinc-200/80" />
      </div>

      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-10 w-56 animate-pulse rounded-xl bg-zinc-100" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-100 pt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-7 w-24 animate-pulse rounded-full bg-zinc-100"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
          >
            <div className="aspect-square animate-pulse bg-zinc-100" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-20 animate-pulse rounded bg-zinc-100" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                <div className="h-6 w-16 animate-pulse rounded bg-zinc-200" />
                <div className="h-9 w-24 animate-pulse rounded-xl bg-zinc-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
