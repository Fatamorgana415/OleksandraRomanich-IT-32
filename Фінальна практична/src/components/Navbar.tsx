"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/catalog", label: "Каталог" },
  { href: "/form", label: "Замовлення" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#FAF9F6]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-zinc-900 transition-opacity hover:opacity-85"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-[#FAF9F6] transition-colors group-hover:bg-[#C2410C]">
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">КРАМНИЦЯ</span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              DummyJSON Store
            </span>
          </div>
        </Link>

        <nav
          aria-label="Головна навігація"
          className="flex items-center gap-1 sm:gap-2"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-[#FAF9F6]"
                    : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center">
          <Link
            href="/form"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-900 shadow-xs transition-all hover:border-[#C2410C]/40 hover:text-[#C2410C]"
          >
            <span>Оформити заявку</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
