import Link from "next/link";
import type { Metadata } from "next";
import { delay } from "@/lib/destinations";

export const metadata: Metadata = { title: "Напрямки" };
export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  await delay(1200); // штучна затримка для демонстрації loading.tsx

  return (
    <>
      <h1>Напрямки</h1>
      <p className="lead">Обери, куди їхати: Україною чи Європою.</p>
      <div className="grid two">
        <Link href="/destinations/ukraine" className="tile tile-green">
          <h3>Україна</h3>
          <p>4 напрямки: гори, старі міста й море.</p>
        </Link>
        <Link href="/destinations/europe" className="tile tile-blue">
          <h3>Європа</h3>
          <p>4 столиці та історичні міста за кордоном.</p>
        </Link>
      </div>
      <p className="note test-note">
        Перевірка error.tsx: сторінка «Європа» випадково видає помилку у половині
        випадків. Відкрий її й натисни «Спробувати ще раз».
      </p>
    </>
  );
}
