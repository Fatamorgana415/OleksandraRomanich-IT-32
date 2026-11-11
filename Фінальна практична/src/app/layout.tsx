import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "КРАМНИЦЯ — Інтернет-магазин на Next.js App Router",
  description:
    "Підсумкова практична робота з Next.js (Варіант 1): каталог товарів DummyJSON, пошук і фільтрація, кешування та серверна валідація замовлень.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-zinc-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200/80 bg-white/60">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-zinc-900">
                КРАМНИЦЯ · Практична робота з Next.js App Router
              </p>
              <p className="text-xs text-zinc-500">
                Варіант 1 · Дані каталогу отримуються з{" "}
                <span className="font-mono text-zinc-700">
                  dummyjson.com/products
                </span>
              </p>
            </div>
            <div className="flex items-center gap-5 text-xs font-medium">
              <Link href="/" className="hover:text-zinc-900 transition-colors">
                Головна
              </Link>
              <Link
                href="/catalog"
                className="hover:text-zinc-900 transition-colors"
              >
                Каталог
              </Link>
              <Link
                href="/form"
                className="hover:text-zinc-900 transition-colors"
              >
                Форма замовлення
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
