# Шлях — туристичний портал (Next.js App Router)

Практична робота, варіант 3.

## Запуск
```bash
npm install
npm run dev      # http://localhost:3000
```

## Структура
```
app/
  layout.tsx                  головний layout: логотип, навігація, підвал
  page.tsx                    Головна
  contacts/page.tsx           Контакти
  destinations/
    layout.tsx                вкладений layout з підменю напрямків
    loading.tsx               індикатор завантаження
    error.tsx                 помилка + кнопка reset()
    page.tsx                  Напрямки
    ukraine/page.tsx          Україна (затримка 1,5 с)
    europe/page.tsx           Європа (затримка 1,5 с + тестова помилка)
```

## Демонстрація
- **loading.tsx**: відкрий «Напрямки», «Україна» або «Європа» — сторінки мають штучну затримку (`delay`).
- **error.tsx**: сторінка «Європа» кидає помилку з імовірністю `ERROR_CHANCE` (0.5).
  Постав `1` у `app/destinations/europe/page.tsx`, щоб помилка була завжди,
  потім `0`, щоб показати, що кнопка «Спробувати ще раз» відновлює сторінку.
