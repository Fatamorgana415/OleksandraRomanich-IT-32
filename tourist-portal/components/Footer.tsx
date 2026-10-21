import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          <strong>Шлях</strong> — туристичний портал. Маршрути по Україні та Європі.
        </p>
        <ul className="footer-links">
          <li><Link href="/destinations/ukraine">Україна</Link></li>
          <li><Link href="/destinations/europe">Європа</Link></li>
          <li><Link href="/contacts">Контакти</Link></li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} Шлях. Навчальний проєкт.</p>
      </div>
    </footer>
  );
}
