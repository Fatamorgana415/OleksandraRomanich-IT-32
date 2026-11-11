"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Star,
  LayoutGrid,
  List,
  ShoppingCart,
  SlidersHorizontal,
  PackageCheck,
} from "lucide-react";
import type { Product } from "@/types/product";

interface FilterProps {
  products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc";
type ViewMode = "grid" | "list";

const categoryTranslations: Record<string, string> = {
  beauty: "Краса",
  fragrances: "Парфумерія",
  furniture: "Меблі",
  groceries: "Продукти",
  "home-decoration": "Декор",
  "kitchen-accessories": "Кухня",
  laptops: "Ноутбуки",
  "mens-shirts": "Чоловічий одяг",
  "mens-shoes": "Чоловіче взуття",
  "mens-watches": "Годинники",
  "mobile-accessories": "Аксесуари",
};

function formatCategory(category: string): string {
  return (
    categoryTranslations[category] ??
    category
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function Filter({ products }: FilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesStock = !inStockOnly || product.stock > 0;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        (product.brand &&
          product.brand.toLowerCase().includes(normalizedQuery)) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesStock && matchesQuery;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating-desc") return b.rating - a.rating;
      return a.id - b.id;
    });

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    sortBy !== "default" ||
    inStockOnly;

  function resetFilters() {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
    setInStockOnly(false);
  }

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук за назвою, брендом або описом..."
              aria-label="Пошук товарів"
              className="w-full rounded-xl border border-zinc-200 bg-[#FAF9F6] py-2.5 pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-[#C2410C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]/15"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Очистити пошук"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Controls: Sort, Stock Toggle, View Mode */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-[#FAF9F6] px-3 py-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Сортування товарів"
                className="bg-transparent text-xs font-medium text-zinc-800 focus:outline-none"
              >
                <option value="default">За замовчуванням</option>
                <option value="price-asc">Ціна: спочатку дешевші</option>
                <option value="price-desc">Ціна: спочатку дорожчі</option>
                <option value="rating-desc">Найвищий рейтинг</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setInStockOnly((prev) => !prev)}
              aria-pressed={inStockOnly}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                inStockOnly
                  ? "border-[#C2410C] bg-[#C2410C]/10 text-[#C2410C]"
                  : "border-zinc-200 bg-[#FAF9F6] text-zinc-700 hover:border-zinc-300"
              }`}
            >
              <PackageCheck className="h-3.5 w-3.5" />
              <span>В наявності</span>
            </button>

            <div
              className="flex items-center rounded-xl border border-zinc-200 bg-[#FAF9F6] p-1"
              role="group"
              aria-label="Режим відображення"
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Сітка"
                aria-pressed={viewMode === "grid"}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-700"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="Список"
                aria-pressed={viewMode === "list"}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-700"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-4">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-zinc-900 text-[#FAF9F6]"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            Усі категорії
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-zinc-900 text-[#FAF9F6]"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {formatCategory(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Results Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
        <p>
          Показано{" "}
          <span className="font-mono font-semibold text-zinc-900">
            {filteredProducts.length}
          </span>{" "}
          із{" "}
          <span className="font-mono font-semibold text-zinc-900">
            {products.length}
          </span>{" "}
          товарів
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="font-medium text-[#C2410C] underline-offset-4 hover:underline"
          >
            Скинути всі фільтри
          </button>
        )}
      </div>

      {/* Empty State or Product Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="text-base font-semibold text-zinc-900">
            Товарів за вашим запитом не знайдено
          </h3>
          <p className="mt-1 max-w-md text-sm text-zinc-500">
            Спробуйте змінити ключові слова пошуку або скиньте вибрану
            категорію, щоб переглянути весь каталог.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#C2410C]"
          >
            Показати всі товари
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-100/80">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span className="rounded-full border border-zinc-200/80 bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 backdrop-blur-xs">
                    {formatCategory(product.category)}
                  </span>
                </div>
                {product.discountPercentage >= 10 && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#C2410C] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-white">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                  <span className="truncate font-medium">
                    {product.brand ?? "Оригінал"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-zinc-700">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                <h2 className="mt-1.5 line-clamp-1 text-base font-semibold text-zinc-900">
                  {product.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-500">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <div>
                    <span className="font-mono text-lg font-bold tabular-nums text-zinc-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <p className="text-[11px] text-zinc-400">
                      {product.stock > 0
                        ? `В наявності: ${product.stock} шт.`
                        : "Немає на складі"}
                    </p>
                  </div>

                  <Link
                    href={`/form?product=${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#C2410C]"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>Замовити</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-medium text-zinc-700">
                    {formatCategory(product.category)}
                  </span>
                  {product.brand && <span>· {product.brand}</span>}
                  <span className="inline-flex items-center gap-1 font-mono text-zinc-700">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <h2 className="mt-1 truncate text-base font-semibold text-zinc-900">
                  {product.title}
                </h2>
                <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <span className="font-mono text-lg font-bold tabular-nums text-zinc-900">
                  ${product.price.toFixed(2)}
                </span>
                <Link
                  href={`/form?product=${encodeURIComponent(product.title)}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#C2410C]"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>Замовити</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
