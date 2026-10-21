import type { Metadata } from "next";
import DestinationCard from "@/components/DestinationCard";
import { delay, ukraine } from "@/lib/destinations";

export const metadata: Metadata = { title: "Україна" };
export const dynamic = "force-dynamic";

export default async function UkrainePage() {
  await delay(1500); // штучна затримка для демонстрації loading.tsx

  return (
    <>
      <h1>Україна</h1>
      <p className="lead">Чотири напрямки для поїздки вихідного дня або відпустки.</p>
      <div className="grid cards">
        {ukraine.map((item) => (
          <DestinationCard key={item.slug} item={item} />
        ))}
      </div>
    </>
  );
}
