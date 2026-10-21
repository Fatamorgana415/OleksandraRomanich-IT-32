import type { Destination } from "@/lib/destinations";

export default function DestinationCard({ item }: { item: Destination }) {
  return (
    <article className="card" style={{ borderTopColor: item.color }}>
      <h3>{item.name}</h3>
      <p className="card-region">{item.region}</p>
      <p>{item.description}</p>
      <dl className="card-meta">
        <div>
          <dt>Сезон</dt>
          <dd>{item.season}</dd>
        </div>
        <div>
          <dt>Тривалість</dt>
          <dd>{item.days}</dd>
        </div>
      </dl>
    </article>
  );
}
