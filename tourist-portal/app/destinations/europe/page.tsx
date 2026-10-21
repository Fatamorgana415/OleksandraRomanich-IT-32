import type { Metadata } from "next";
import DestinationCard from "@/components/DestinationCard";
import { delay, europe } from "@/lib/destinations";

export const metadata: Metadata = { title: "Європа" };
export const dynamic = "force-dynamic";

// Імовірність тестової помилки: 0 — ніколи, 0.5 — у половині випадків,
// 1 — завжди (щоб побачити error.tsx одразу).
const ERROR_CHANCE = 0.5;

export default async function EuropePage() {
  await delay(1500); // штучна затримка для демонстрації loading.tsx

  if (Math.random() < ERROR_CHANCE) {
    throw new Error("Тестова помилка: не вдалося отримати список європейських напрямків.");
  }

  return (
    <>
      <h1>Європа</h1>
      <p className="lead">Міста, до яких зручно дістатися з України поїздом, автобусом чи літаком.</p>
      <div className="grid cards">
        {europe.map((item) => (
          <DestinationCard key={item.slug} item={item} />
        ))}
      </div>
    </>
  );
}
