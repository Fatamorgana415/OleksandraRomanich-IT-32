import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Головна" };

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-text">
          <h1>Куди рушимо цього разу?</h1>
          <p>
            Від Карпатських полонин до терас Будапешта. Обирай напрямок,
            дивись найкращий сезон і скільки днів треба на поїздку.
          </p>
          <div className="hero-actions">
            <Link href="/destinations/ukraine" className="btn btn-sun">Подорожі Україною</Link>
            <Link href="/destinations/europe" className="btn btn-ghost">Подорожі Європою</Link>
          </div>
        </div>
        <svg className="hero-art" viewBox="0 0 1200 320" preserveAspectRatio="none" aria-hidden="true">
          <circle cx="930" cy="92" r="54" fill="#F2B705" />
          <path d="M0 320 V210 L170 90 L290 200 L400 120 L560 250 L700 150 L860 260 L1010 170 L1200 250 V320 Z" fill="#2B6C8F" />
          <path d="M0 320 V260 L140 190 L260 250 L420 170 L600 275 L780 200 L960 280 L1200 215 V320 Z" fill="#3F7D58" />
          <path d="M0 320 V295 L200 255 L450 300 L700 265 L950 305 L1200 280 V320 Z" fill="#F3F6F8" />
        </svg>
      </section>

      <section className="container section">
        <h2>Два способи почати</h2>
        <div className="grid two">
          <Link href="/destinations/ukraine" className="tile tile-green">
            <h3>Україна</h3>
            <p>Карпати, Львів, Кам’янець-Подільський, Одеса.</p>
          </Link>
          <Link href="/destinations/europe" className="tile tile-blue">
            <h3>Європа</h3>
            <p>Прага, Краків, Відень, Будапешт.</p>
          </Link>
        </div>
        <p className="note">
          Усі напрямки зібрано в розділі <Link href="/destinations">«Напрямки»</Link>.
          Є питання щодо маршруту? Напиши нам у <Link href="/contacts">контактах</Link>.
        </p>
      </section>
    </>
  );
}
