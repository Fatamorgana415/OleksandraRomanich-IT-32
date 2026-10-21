export default function Loading() {
  return (
    <div role="status" aria-live="polite">
      <p className="loading-text">
        <span className="spinner" aria-hidden="true" />
        Завантажуємо напрямки…
      </p>
      <div className="grid cards" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="card skeleton">
            <span className="sk sk-title" />
            <span className="sk sk-line short" />
            <span className="sk sk-line" />
            <span className="sk sk-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
