export type Destination = {
  slug: string;
  name: string;
  region: string;
  season: string;
  days: string;
  description: string;
  color: string;
};

export const ukraine: Destination[] = [
  {
    slug: "carpathians",
    name: "Карпати",
    region: "Івано-Франківщина, Закарпаття",
    season: "Червень – вересень, грудень – лютий",
    days: "4–7 днів",
    description:
      "Полонини, гірські озера та маршрути на Говерлу. Узимку — Буковель і Драгобрат.",
    color: "#3F7D58",
  },
  {
    slug: "lviv",
    name: "Львів",
    region: "Львівщина",
    season: "Цілий рік",
    days: "2–4 дні",
    description:
      "Бруковані вулиці, кав’ярні в старих підвалах і найбільша в Україні кількість музеїв на квадратний кілометр.",
    color: "#B5532E",
  },
  {
    slug: "kamianets",
    name: "Кам’янець-Подільський",
    region: "Хмельниччина",
    season: "Травень – жовтень",
    days: "1–2 дні",
    description:
      "Фортеця на скелі в петлі річки Смотрич і старе місто, яке обійдеш пішки за день.",
    color: "#6B5B95",
  },
  {
    slug: "odesa",
    name: "Одеса",
    region: "Одещина",
    season: "Червень – вересень",
    days: "3–5 днів",
    description:
      "Набережна, Потьомкінські сходи, ринок Привоз і пляжі Аркадії.",
    color: "#2B6C8F",
  },
];

export const europe: Destination[] = [
  {
    slug: "prague",
    name: "Прага",
    region: "Чехія",
    season: "Квітень – червень, вересень",
    days: "3–4 дні",
    description:
      "Карлів міст, Празький град і пивні, де наливають за традиційними рецептами.",
    color: "#B5532E",
  },
  {
    slug: "krakow",
    name: "Краків",
    region: "Польща",
    season: "Травень – вересень",
    days: "2–3 дні",
    description:
      "Старе місто, Вавельський замок і квартал Казімеж. Звідси близько до соляної копальні Велічка.",
    color: "#2B6C8F",
  },
  {
    slug: "vienna",
    name: "Відень",
    region: "Австрія",
    season: "Квітень – жовтень, грудень",
    days: "3–5 днів",
    description:
      "Палаци Габсбургів, класична музика та кав’ярні з яблучним штруделем.",
    color: "#6B5B95",
  },
  {
    slug: "budapest",
    name: "Будапешт",
    region: "Угорщина",
    season: "Березень – червень, вересень",
    days: "3–4 дні",
    description:
      "Дунай ділить місто навпіл. Термальні купальні та вечірні круїзи під мостами.",
    color: "#3F7D58",
  },
];

export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
