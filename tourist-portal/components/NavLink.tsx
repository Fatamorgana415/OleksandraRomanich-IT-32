"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  exact?: boolean;
  className?: string;
};

export default function NavLink({ href, children, exact = false, className = "" }: Props) {
  const pathname = usePathname();
  const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`${className} ${active ? "active" : ""}`.trim()}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
