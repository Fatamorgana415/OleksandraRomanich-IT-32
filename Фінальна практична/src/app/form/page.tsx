import type { Metadata } from "next";
import Link from "next/link";
import { RequestForm, type CatalogOption } from "@/components/RequestForm";
import { ArrowLeft, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Оформлення замовлення — КРАМНИЦЯ",
  description:
    "Форма оформлення замовлення з перевіркою введення через Next.js Server Actions.",
};

async function getCatalogOptions(): Promise<CatalogOption[]> {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=30&select=id,title,price",
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      return [];
    }
    const data = (await response.json()) as { products?: CatalogOption[] };
    return data.products ?? [];
  } catch {
    return [];
  }
}

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const initialProduct = params.product ?? "";
  const catalogProducts = await getCatalogOptions();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
            <FileCheck2 className="h-3.5 w-3.5 text-[#C2410C]" />
            <span>Server Actions · Серверна валідація</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Оформлення замовлення
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Заповніть форму нижче, щоб створити заявку на товар. Усі поля
            перевіряються на сервері через директиву{" "}
            <span className="font-mono text-zinc-800">&quot;use server&quot;</span>.
          </p>
        </div>

        <Link
          href="/catalog"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>До каталогу</span>
        </Link>
      </div>

      <RequestForm
        catalogProducts={catalogProducts}
        initialProduct={initialProduct}
      />
    </section>
  );
}
