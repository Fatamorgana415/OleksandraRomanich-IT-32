"use server";

import type {
  OrderActionState,
  OrderFieldErrors,
  OrderFormValues,
} from "@/types/product";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitOrderAction(
  _prevState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const productTitle = String(formData.get("productTitle") ?? "").trim();
  const quantityRaw = String(formData.get("quantity") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  const values: OrderFormValues = {
    name,
    email,
    productTitle,
    quantity: quantityRaw,
    notes,
  };

  const fieldErrors: OrderFieldErrors = {};

  if (!name) {
    fieldErrors.name = "Введіть ім’я та прізвище.";
  } else if (name.length < 2) {
    fieldErrors.name = "Ім’я має містити щонайменше 2 символи.";
  } else if (name.length > 100) {
    fieldErrors.name = "Ім’я занадто довге (максимум 100 символів).";
  }

  if (!email) {
    fieldErrors.email = "Введіть електронну пошту.";
  } else if (!EMAIL_REGEX.test(email)) {
    fieldErrors.email =
      "Некоректний формат email (наприклад, olena@example.com).";
  }

  if (!productTitle) {
    fieldErrors.productTitle = "Оберіть або вкажіть назву товару.";
  } else if (productTitle.length < 2) {
    fieldErrors.productTitle =
      "Назва товару має містити щонайменше 2 символи.";
  } else if (productTitle.length > 160) {
    fieldErrors.productTitle = "Назва товару занадто довга.";
  }

  const parsedQuantity = Number(quantityRaw);
  if (!quantityRaw) {
    fieldErrors.quantity = "Вкажіть кількість товару.";
  } else if (
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity < 1 ||
    parsedQuantity > 99
  ) {
    fieldErrors.quantity =
      "Кількість має бути цілим числом від 1 до 99.";
  }

  if (notes.length > 500) {
    fieldErrors.notes = "Коментар не може перевищувати 500 символів.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message:
        "Не вдалося оформити замовлення. Перевірте виділені поля нижче.",
      fieldErrors,
      values,
    };
  }

  const randomCode = Math.floor(100000 + Math.random() * 900000);
  const orderId = `ORD-${randomCode}`;
  const submittedAt = new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  return {
    status: "success",
    message: "Замовлення успішно перевірено та підтверджено сервером!",
    order: {
      orderId,
      submittedAt,
      name,
      email,
      productTitle,
      quantity: parsedQuantity,
      notes,
    },
  };
}
