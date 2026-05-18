export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  platform: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "The Witcher 3: Wild Hunt",
    price: 29.99,
    description:
      "Епічна RPG у відкритому світі з Геральтом із Рівії. Вирушайте у небезпечну подорож крізь воєнні землі у пошуках Дитини Пророцтва.",
    category: "RPG",
    platform: "PC, PS, Xbox",
    image: "https://picsum.photos/seed/witcher3/400/250",
  },
  {
    id: "2",
    name: "Cyberpunk 2077",
    price: 39.99,
    description:
      "Пригода у футуристичному Найт-Сіті. Створіть свого персонажа, вибирайте імпланти та вирішуйте долю міста майбутнього.",
    category: "Action / RPG",
    platform: "PC, PS, Xbox",
    image: "https://picsum.photos/seed/cyberpunk2077/400/250",
  },
  {
    id: "3",
    name: "Elden Ring",
    price: 49.99,
    description:
      "Dark fantasy RPG у відкритому світі від FromSoftware. Досліджуйте Землі Між, боріться з легендарними босами та ставайте Повелителем Елдену.",
    category: "RPG",
    platform: "PC, PS, Xbox",
    image: "https://picsum.photos/seed/eldenring/400/250",
  },
  {
    id: "4",
    name: "God of War Ragnarök",
    price: 59.99,
    description:
      "Продовження легендарної саги Кратоса та Атреуса. Подорожуйте крізь дев'ять світів скандинавської міфології та зупиніть Рагнарёк.",
    category: "Action / Adventure",
    platform: "PS, PC",
    image: "https://picsum.photos/seed/godofwarragnarok/400/250",
  },
  {
    id: "5",
    name: "Red Dead Redemption 2",
    price: 39.99,
    description:
      "Пригода Дикого Заходу від Rockstar Games. Станьте Артуром Морганом, легендарним бандитом, та переживайте останні дні епохи стрільців.",
    category: "Action / Adventure",
    platform: "PC, PS, Xbox",
    image: "https://picsum.photos/seed/rdr2/400/250",
  },
  {
    id: "6",
    name: "Grand Theft Auto V",
    price: 29.99,
    description:
      "Легендарна кримінальна пісочниця. Грайте за трьох унікальних персонажів у безмежному відкритому світі Лос-Сантоса.",
    category: "Action",
    platform: "PC, PS, Xbox",
    image: "https://picsum.photos/seed/gtav/400/250",
  },
  {
    id: "7",
    name: "Minecraft",
    price: 19.99,
    description:
      "Безмежна пісочниця для творчості та виживання. Будуйте, досліджуйте та виживайте у процедурно згенерованому світі з кубиками.",
    category: "Sandbox",
    platform: "PC, Console, Mobile",
    image: "https://picsum.photos/seed/minecraft/400/250",
  },
  {
    id: "8",
    name: "The Last of Us Part II",
    price: 49.99,
    description:
      "Емоційна пригода у постапокаліптичному світі. Продовження історії Еллі та Джоела через темні води помсти та виживання.",
    category: "Action / Adventure",
    platform: "PS, PC",
    image: "https://picsum.photos/seed/tlou2/400/250",
  },
];
