import Link from "next/link";
import Logo from "./Logo";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Шлях — на головну">
          <Logo />
          <span>Шлях</span>
        </Link>
        <nav aria-label="Головне меню" className="main-nav">
          <NavLink href="/" exact className="navlink">Головна</NavLink>
          <NavLink href="/destinations" className="navlink">Напрямки</NavLink>
          <NavLink href="/destinations/ukraine" className="navlink">Україна</NavLink>
          <NavLink href="/destinations/europe" className="navlink">Європа</NavLink>
          <NavLink href="/contacts" className="navlink">Контакти</NavLink>
        </nav>
      </div>
    </header>
  );
}
