# Практична робота №3 — Інтернет-магазин (Angular)

## Структура компонентів

```
AppComponent
│
├── HeaderComponent
├── ProductsComponent
│   └── ProductCardComponent (по одному на кожен товар)
└── FooterComponent
```

## Як запустити

1. Встановіть Node.js (LTS) та Angular CLI, якщо їх ще немає:
   ```
   npm install -g @angular/cli
   ```
2. У папці проєкту встановіть залежності:
   ```
   npm install
   ```
3. Запустіть застосунок:
   ```
   ng serve
   ```
4. Відкрийте в браузері: http://localhost:4200

## Як компоненти створювались через CLI

Проєкт відповідає структурі, яку дає Angular CLI:
```
ng new internet-shop
ng g c header
ng g c products
ng g c product-card
ng g c footer
```

## Виконання вимог завдання

1. **4+ компоненти** — Header, Products, ProductCard, Footer (+ AppComponent).
2. **Підключення до AppComponent** — усі компоненти викликані через їх selector
   у `app.component.html`.
3. **Selector** — `app-header`, `app-products`, `app-product-card`, `app-footer`.
4. **@Input() (2+ значення)**:
   - `HeaderComponent`: `@Input() title` — назва магазину.
   - `ProductCardComponent`: `@Input() name`, `@Input() price`, `@Input() description`.
   - `ProductsComponent`: `@Input() products` — масив товарів від AppComponent.
5. **Інтерполяція** — значення виводяться через `{{ }}` у шаблонах
   (наприклад, `{{ title }}`, `{{ name }}`, `{{ price }} грн`).
6. **@Output() подія** — `ProductCardComponent.buyClicked = new EventEmitter<string>()`.
7. **Виклик події при натисканні** — `onClick()` викликає `this.buyClicked.emit(this.name)`
   при натисканні кнопки «Купити».
8. **Обробка події в батьківському компоненті** — подія спливає:
   `ProductCardComponent` → `ProductsComponent` (`productAdded`) → `AppComponent`
   (`onProductAdded`), який показує повідомлення "Товар додано до кошика".
9. **CSS-оформлення** — кожен компонент має свій `.css`-файл з окремим стилем
   (шапка, картки товарів, кнопка, футер).

## Логіка кошика

При натисканні кнопки «Купити» на будь-якій картці товару:
1. `ProductCardComponent` емітить назву товару через `buyClicked`.
2. `ProductsComponent` перехоплює подію в `onBuy()` і передає її далі через `productAdded`.
3. `AppComponent` отримує назву товару і виводить над списком товарів
   зелене повідомлення: **"Товар "Назва" додано до кошика"** (зникає через 3 секунди).
