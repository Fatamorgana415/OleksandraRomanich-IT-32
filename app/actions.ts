"use server";
import { z } from "zod";
const schema = z.object({
  fullName: z.string().trim().min(2, "ПІБ повинно містити мінімум 2 символи"),
  email: z.string().email("Некоректний формат email"),
  topic: z.string().min(1, "Оберіть тему консультації"),
  details: z.string().trim().min(10, "Запитання має містити мінімум 10 символів"),
});
export type FormState = {
  success: boolean;
  message: string;
  errors: {
    fullName?: string[];
    email?: string[];
    topic?: string[];
    details?: string[];
  };
};
export async function submitRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    details: formData.get("details"),
  };
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: "Виправте помилки у формі",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }
  return {
    success: true,
    message: "Запит на консультацію перевірено!",
    errors: {},
  };
}