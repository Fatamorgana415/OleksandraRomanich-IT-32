"use client";

import Link from "next/link";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DestinationsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  function retry() {
    // router.refresh() повторно запитує дані з сервера,
    // reset() знову відображає сегмент після помилки.
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <div className="error-box" role="alert">
      <h2>Не вдалося завантажити напрямки</h2>
      <p>
        Сервер не відповів. Спробуй ще раз — зазвичай це спрацьовує з другої спроби.
      </p>
      <p className="error-detail">{error.message}</p>
      <div className="error-actions">
        <button type="button" className="btn btn-sun" onClick={retry} disabled={isPending}>
          {isPending ? "Завантажуємо…" : "Спробувати ще раз"}
        </button>
        <Link href="/" className="btn btn-outline">На головну</Link>
      </div>
    </div>
  );
}
