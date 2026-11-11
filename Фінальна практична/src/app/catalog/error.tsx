"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function CatalogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("CatalogPage error:", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-16">
      <div className="w-full rounded-2xl border border-red-200/80 bg-white p-8 text-center shadow-xs sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#DC2626]">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900">
          Не вдалося завантажити каталог
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Під час звернення до зовнішнього API виникла помилка. Ви можете
          повторити запит або повернутися на головну сторінку.
        </p>

        {error?.message && (
          <div className="mt-4 rounded-xl border border-zinc-200 bg-[#FAF9F6] px-4 py-2.5 font-mono text-xs text-zinc-700">
            {error.message}
          </div>
        )}

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Спробувати ще раз</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            <Home className="h-4 w-4" />
            <span>На головну</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
