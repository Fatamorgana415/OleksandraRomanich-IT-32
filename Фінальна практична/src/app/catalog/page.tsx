import type { Metadata } from "next";
import Link from "next/link";
import { Filter } from "@/components/Filter";
import type { DummyJsonProductsResponse } from "@/types/product";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Каталог товарів — КРАМНИЦЯ",
  description:
    "Каталог товарів інтернет-магазину, завантажений на сервері з DummyJSON API з пошуком та фільтрацією.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ simulateError?: string }>;
}) {
  const params = await searchParams;
  const endpoint =
    params.simulateError === "1"
      ? "https://dummyjson.com/products-invalid-endpoint"
      : "https://dummyjson.com/products?limit=30";

  const response = await fetch(endpoint, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `Помилка отримання даних каталогу (HTTP ${response.status})`
    );
  }

  const data: DummyJsonProductsResponse = await response.json();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
            <Sparkles className="h-3.5 w-3.5 text-[#C2410C]" />
            <span>Server Component · Кешування 300 с</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Каталог товарів
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Дані завантажено на сервері з{" "}
            <span className="font-mono text-zinc-800">dummyjson.com/products</span>.
            Використовуйте пошук, фільтри за категоріями та сортування у режимі
            реального часу.
          </p>
        </div>

        <Link
          href="/form"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C] sm:self-auto"
        >
          <span>Швидке замовлення</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Filter products={data.products} />
    </section>
  );
}
