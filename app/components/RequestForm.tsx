"use client";

import { useActionState } from "react";
import { submitRequest, type FormState } from "../actions";

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

export default function RequestForm() {
  const [state, formAction, isPending] = useActionState(
    submitRequest,
    initialState
  );

  return (
    <form action={formAction} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px", marginTop: "1rem" }}>
      
      {/* Поле ПІБ */}
      <div>
        <label htmlFor="fullName" style={{ display: "block", marginBottom: "0.3rem" }}>ПІБ студента:</label>
        <input id="fullName" name="fullName" type="text" style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
        {state.errors.fullName && (
          <p style={{ color: "red", fontSize: "0.9rem", margin: "0.2rem 0" }}>{state.errors.fullName[0]}</p>
        )}
      </div>

      {/* Поле Email */}
      <div>
        <label htmlFor="email" style={{ display: "block", marginBottom: "0.3rem" }}>Email:</label>
        <input id="email" name="email" type="email" style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
        {state.errors.email && (
          <p style={{ color: "red", fontSize: "0.9rem", margin: "0.2rem 0" }}>{state.errors.email[0]}</p>
        )}
      </div>

      {/* Поле Select (Тема) */}
      <div>
        <label htmlFor="topic" style={{ display: "block", marginBottom: "0.3rem" }}>Тема консультації:</label>
        <select id="topic" name="topic" defaultValue="" style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>
          <option value="" disabled>Оберіть тему...</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="Next.js">Next.js</option>
        </select>
        {state.errors.topic && (
          <p style={{ color: "red", fontSize: "0.9rem", margin: "0.2rem 0" }}>{state.errors.topic[0]}</p>
        )}
      </div>

      {/* Поле Textarea (Деталі) */}
      <div>
        <label htmlFor="details" style={{ display: "block", marginBottom: "0.3rem" }}>Запитання до викладача:</label>
        <textarea id="details" name="details" rows={4} style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
        {state.errors.details && (
          <p style={{ color: "red", fontSize: "0.9rem", margin: "0.2rem 0" }}>{state.errors.details[0]}</p>
        )}
      </div>

      {/* Кнопка */}
      <button type="submit" disabled={isPending} style={{ padding: "0.75rem", cursor: isPending ? "not-allowed" : "pointer", backgroundColor: isPending ? "#ccc" : "#0070f3", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", fontSize: "1rem" }}>
        {isPending ? "Надсилання..." : "Надіслати"}
      </button>

      {/* Повідомлення про успіх або загальну помилку */}
      {state.message && (
        <p aria-live="polite" style={{ color: state.success ? "green" : "red", fontWeight: "bold", padding: "0.5rem", backgroundColor: state.success ? "#e6ffed" : "#ffe6e6", borderRadius: "4px" }}>
          {state.message}
        </p>
      )}
    </form>
  );
}