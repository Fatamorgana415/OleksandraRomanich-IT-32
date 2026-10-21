import type { Metadata } from "next";

export const metadata: Metadata = { title: "Контакти" };

export default function ContactsPage() {
  return (
    <section className="container section narrow">
      <h1>Контакти</h1>
      <p className="lead">Напиши нам, якщо потрібна допомога з маршрутом або хочеш додати напрямок.</p>
      <dl className="contact-list">
        <div>
          <dt>Електронна пошта</dt>
          <dd><a href="mailto:hello@shlyakh.example">hello@shlyakh.example</a></dd>
        </div>
        <div>
          <dt>Телефон</dt>
          <dd><a href="tel:+380441234567">+38 044 123 45 67</a></dd>
        </div>
        <div>
          <dt>Години відповіді</dt>
          <dd>Пн–Пт, 9:00–18:00</dd>
        </div>
      </dl>
    </section>
  );
}
