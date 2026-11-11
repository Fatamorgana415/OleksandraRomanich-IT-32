import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Zap,
  Star,
  ShoppingBag,
} from "lucide-react";
import type { DummyJsonProductsResponse, Product } from "@/types/product";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=4", {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      return [];
    }
    const data: DummyJsonProductsResponse = await response.json();
    return data.products;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-zinc-200/80 bg-gradient-to-b from-[#FAF9F6] to-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-medium text-zinc-600 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#C2410C]" />
              <span>Варіант 1 · Інтернет-магазин на DummyJSON</span>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:leading-[1.1]">
              Добірний каталог товарів та миттєві замовлення
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600">
              Сучасний багатосторінковий вебзастосунок на{" "}
              <span className="font-semibold text-zinc-900">
                Next.js App Router
              </span>
              . Дані каталогу завантажуються на сервері з зовнішнього API,
              фільтруються на клієнті в реальному часі, а заявки перевіряються
              через Server Actions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C]"
              >
                <span>Перейти до каталогу</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/form"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
              >
                <ShoppingBag className="h-4 w-4 text-[#C2410C]" />
                <span>Оформити замовлення</span>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-zinc-200/80 pt-6 text-xs text-zinc-500">
              <div>
                <span className="block font-mono text-base font-bold text-zinc-900">
                  30+
                </span>
                <span>товарів із API</span>
              </div>
              <div className="h-7 w-px bg-zinc-200" />
              <div>
                <span className="block font-mono text-base font-bold text-zinc-900">
                  300 с
                </span>
                <span>серверне кешування</span>
              </div>
              <div className="h-7 w-px bg-zinc-200" />
              <div>
                <span className="block font-mono text-base font-bold text-zinc-900">
                  use server
                </span>
                <span>валідація заявок</span>
              </div>
            </div>
          </div>

          {/* Right Editorial 2x2 Featured Grid */}
          <div className="lg:col-span-6">
            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {featuredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/form?product=${encodeURIComponent(product.title)}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100/80">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 260px"
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3.5 flex items-center justify-between text-xs text-zinc-500">
                      <span className="truncate font-medium">
                        {product.brand ?? product.category}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-zinc-700">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <h2 className="mt-1 line-clamp-1 text-sm font-semibold text-zinc-900 group-hover:text-[#C2410C]">
                      {product.title}
                    </h2>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-base font-bold tabular-nums text-zinc-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-medium text-[#C2410C]">
                        Замовити →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
                <p className="text-sm text-zinc-600">
                  Перейдіть до повного каталогу для перегляду актуальних товарів.
                </p>
                <Link
                  href="/catalog"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white"
                >
                  <span>Відкрити каталог</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-wider text-[#C2410C] uppercase">
              Можливості платформи
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-900">
              Архітектура Next.js App Router у дії
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-semibold text-zinc-700 underline-offset-4 hover:text-[#C2410C] hover:underline"
          >
            Дивитися весь каталог →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-[#C2410C]">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-zinc-900">
              Серверне отримання даних
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Асинхронні Server Components завантажують товари з DummyJSON API
              із перевіркою <span className="font-mono">response.ok</span>,
              кешуванням та межами завантаження й помилок.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-[#C2410C]">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-zinc-900">
              Клієнтський пошук і фільтри
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Компонент <span className="font-mono">Filter.tsx</span> на базі{" "}
              <span className="font-mono">useState</span> забезпечує миттєвий
              пошук, фільтрацію за категоріями, сортування та перемикання виду.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-[#C2410C]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-zinc-900">
              Server Actions і валідація
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Форма замовлення обробляється серверною функцією{" "}
              <span className="font-mono">&quot;use server&quot;</span>, яка
              відхиляє порожні чи некоректні дані та формує підтвердження.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
