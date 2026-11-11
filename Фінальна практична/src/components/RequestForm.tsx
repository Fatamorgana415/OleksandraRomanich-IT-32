"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShoppingBag,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { submitOrderAction } from "@/app/actions";
import type { OrderActionState } from "@/types/product";

export interface CatalogOption {
  id: number;
  title: string;
  price: number;
}

interface RequestFormProps {
  catalogProducts: CatalogOption[];
  initialProduct?: string;
}

const initialState: OrderActionState = {
  status: "idle",
};

export function RequestForm({
  catalogProducts,
  initialProduct = "",
}: RequestFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitOrderAction,
    initialState
  );
  const [resetKey, setResetKey] = useState(0);
  const [dismissedSuccess, setDismissedSuccess] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [quantityPreview, setQuantityPreview] = useState(1);

  const activeProductTitle =
    state.status === "error" && state.values?.productTitle !== undefined
      ? state.values.productTitle
      : selectedProduct;

  const matchedCatalogProduct = catalogProducts.find(
    (item) => item.title.toLowerCase() === activeProductTitle.trim().toLowerCase()
  );

  const showSuccess = state.status === "success" && !dismissedSuccess && state.order;

  function handleNewOrder() {
    setDismissedSuccess(true);
    setSelectedProduct("");
    setQuantityPreview(1);
    setResetKey((prev) => prev + 1);
  }

  if (showSuccess && state.order) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col items-start gap-4 border-b border-zinc-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#15803D]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="font-mono text-xs font-semibold tracking-wider text-[#15803D] uppercase">
                Підтверджено сервером
              </span>
              <h2 className="text-xl font-bold text-zinc-900">
                Замовлення успішно оформлено
              </h2>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-[#FAF9F6] px-3.5 py-2 text-left sm:text-right">
            <p className="text-[11px] text-zinc-500">Номер замовлення</p>
            <p className="font-mono text-sm font-bold text-zinc-900">
              {state.order.orderId}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-[#FAF9F6] p-4">
            <dt className="text-xs text-zinc-500">Замовник</dt>
            <dd className="mt-1 font-semibold text-zinc-900">
              {state.order.name}
            </dd>
          </div>
          <div className="rounded-xl bg-[#FAF9F6] p-4">
            <dt className="text-xs text-zinc-500">Електронна пошта</dt>
            <dd className="mt-1 font-mono text-sm font-medium text-zinc-900">
              {state.order.email}
            </dd>
          </div>
          <div className="rounded-xl bg-[#FAF9F6] p-4">
            <dt className="text-xs text-zinc-500">Обраний товар</dt>
            <dd className="mt-1 font-semibold text-zinc-900">
              {state.order.productTitle}
            </dd>
          </div>
          <div className="rounded-xl bg-[#FAF9F6] p-4">
            <dt className="text-xs text-zinc-500">Кількість та час</dt>
            <dd className="mt-1 font-semibold text-zinc-900">
              {state.order.quantity} шт. ·{" "}
              <span className="font-normal text-zinc-600">
                {state.order.submittedAt}
              </span>
            </dd>
          </div>
        </dl>

        {state.order.notes && (
          <div className="mt-4 rounded-xl bg-[#FAF9F6] p-4 text-sm">
            <p className="text-xs text-zinc-500">Коментар до замовлення</p>
            <p className="mt-1 text-zinc-800">{state.order.notes}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleNewOrder}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Оформити ще одне замовлення</span>
          </button>

          <Link
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Повернутися до каталогу</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <form
        key={resetKey}
        action={formAction}
        onSubmit={() => setDismissedSuccess(false)}
        noValidate
        className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8 lg:col-span-8"
      >
        {state.status === "error" && state.message && !dismissedSuccess && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-[#DC2626]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="font-medium">{state.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-semibold text-zinc-900"
            >
              Ім’я та прізвище <span className="text-[#C2410C]">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={state.values?.name ?? ""}
              placeholder="Наприклад, Олена Коваленко"
              aria-invalid={Boolean(state.fieldErrors?.name)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 ${
                state.fieldErrors?.name
                  ? "border-[#DC2626] bg-red-50/40 focus:border-[#DC2626] focus:ring-red-200"
                  : "border-zinc-200 bg-[#FAF9F6] focus:border-[#C2410C] focus:bg-white focus:ring-[#C2410C]/15"
              }`}
            />
            {state.fieldErrors?.name && (
              <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                {state.fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-zinc-900"
            >
              Електронна пошта <span className="text-[#C2410C]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={state.values?.email ?? ""}
              placeholder="olena@example.com"
              aria-invalid={Boolean(state.fieldErrors?.email)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 ${
                state.fieldErrors?.email
                  ? "border-[#DC2626] bg-red-50/40 focus:border-[#DC2626] focus:ring-red-200"
                  : "border-zinc-200 bg-[#FAF9F6] focus:border-[#C2410C] focus:bg-white focus:ring-[#C2410C]/15"
              }`}
            />
            {state.fieldErrors?.email && (
              <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                {state.fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Product Selection + Text Input */}
        <div className="space-y-3">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <label
              htmlFor="productTitle"
              className="text-sm font-semibold text-zinc-900"
            >
              Назва товару <span className="text-[#C2410C]">*</span>
            </label>
            {catalogProducts.length > 0 && (
              <select
                aria-label="Швидкий вибір товару з каталогу"
                value={
                  matchedCatalogProduct ? matchedCatalogProduct.title : ""
                }
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="rounded-lg border border-zinc-200 bg-[#FAF9F6] px-2.5 py-1 text-xs font-medium text-zinc-700 focus:border-[#C2410C] focus:outline-none"
              >
                <option value="">Швидкий вибір із каталогу...</option>
                {catalogProducts.map((product) => (
                  <option key={product.id} value={product.title}>
                    {product.title} (${product.price.toFixed(2)})
                  </option>
                ))}
              </select>
            )}
          </div>

          <input
            id="productTitle"
            name="productTitle"
            type="text"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            placeholder="Оберіть зі списку вище або введіть назву товару"
            aria-invalid={Boolean(state.fieldErrors?.productTitle)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 ${
              state.fieldErrors?.productTitle
                ? "border-[#DC2626] bg-red-50/40 focus:border-[#DC2626] focus:ring-red-200"
                : "border-zinc-200 bg-[#FAF9F6] focus:border-[#C2410C] focus:bg-white focus:ring-[#C2410C]/15"
            }`}
          />
          {state.fieldErrors?.productTitle && (
            <p className="text-xs font-medium text-[#DC2626]">
              {state.fieldErrors.productTitle}
            </p>
          )}
        </div>

        {/* Quantity & Notes */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="sm:col-span-1">
            <label
              htmlFor="quantity"
              className="mb-1.5 block text-sm font-semibold text-zinc-900"
            >
              Кількість <span className="text-[#C2410C]">*</span>
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              max={99}
              defaultValue={state.values?.quantity ?? "1"}
              onChange={(e) =>
                setQuantityPreview(Math.max(1, Number(e.target.value) || 1))
              }
              aria-invalid={Boolean(state.fieldErrors?.quantity)}
              className={`w-full rounded-xl border px-3.5 py-2.5 font-mono text-sm text-zinc-900 transition-colors focus:outline-none focus:ring-2 ${
                state.fieldErrors?.quantity
                  ? "border-[#DC2626] bg-red-50/40 focus:border-[#DC2626] focus:ring-red-200"
                  : "border-zinc-200 bg-[#FAF9F6] focus:border-[#C2410C] focus:bg-white focus:ring-[#C2410C]/15"
              }`}
            />
            {state.fieldErrors?.quantity && (
              <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                {state.fieldErrors.quantity}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-semibold text-zinc-900"
            >
              Адреса доставки або коментар
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              defaultValue={state.values?.notes ?? ""}
              placeholder="Вкажіть місто, відділення або побажання до замовлення (необов’язково)"
              aria-invalid={Boolean(state.fieldErrors?.notes)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 ${
                state.fieldErrors?.notes
                  ? "border-[#DC2626] bg-red-50/40 focus:border-[#DC2626] focus:ring-red-200"
                  : "border-zinc-200 bg-[#FAF9F6] focus:border-[#C2410C] focus:bg-white focus:ring-[#C2410C]/15"
              }`}
            />
            {state.fieldErrors?.notes && (
              <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                {state.fieldErrors.notes}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            Поля з <span className="text-[#C2410C]">*</span> обов’язкові для
            перевірки на сервері.
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Перевірка на сервері...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>Підтвердити замовлення</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Right Summary Sidebar */}
      <aside className="space-y-4 lg:col-span-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-bold text-zinc-900">
            Підсумок заявки
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            Після натискання кнопки форма надсилається через Next.js Server
            Action (<span className="font-mono">use server</span>) без
            перезавантаження сторінки.
          </p>

          <div className="mt-5 space-y-3 border-t border-zinc-100 pt-4 text-sm">
            <div className="flex items-start justify-between gap-2">
              <span className="text-zinc-500">Товар</span>
              <span className="text-right font-medium text-zinc-900">
                {activeProductTitle || "Не обрано"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-zinc-500">Кількість</span>
              <span className="font-mono font-semibold text-zinc-900">
                {quantityPreview} шт.
              </span>
            </div>

            {matchedCatalogProduct && (
              <>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-500">Ціна за одиницю</span>
                  <span className="font-mono text-zinc-900">
                    ${matchedCatalogProduct.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-zinc-100 pt-3">
                  <span className="font-semibold text-zinc-900">
                    Орієнтовна сума
                  </span>
                  <span className="font-mono text-lg font-bold tabular-nums text-[#C2410C]">
                    ${(matchedCatalogProduct.price * quantityPreview).toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-[#FAF9F6] p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C2410C]" />
            <div className="text-xs leading-relaxed text-zinc-600">
              <p className="font-semibold text-zinc-900">Серверна валідація</p>
              <p className="mt-1">
                Спробуйте надіслати порожню форму або неправильний email —
                серверна функція відхилить запит і поверне повідомлення про
                помилку для кожного поля.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
