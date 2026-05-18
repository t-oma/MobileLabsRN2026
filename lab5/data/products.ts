export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  platform: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "The Witcher 3: Wild Hunt",
    price: 29.99,
    description: "Епічна RPG у відкритому світі з Геральтом із Рівії",
    category: "RPG",
    platform: "PC, PS, Xbox",
  },
  {
    id: "2",
    name: "Cyberpunk 2077",
    price: 39.99,
    description: "Пригода у футуристичному Найт-Сіті",
    category: "Action/RPG",
    platform: "PC, PS, Xbox",
  },
  {
    id: "3",
    name: "Elden Ring",
    price: 49.99,
    description: "Dark fantasy RPG у відкритому світі від FromSoftware",
    category: "RPG",
    platform: "PC, PS, Xbox",
  },
  {
    id: "4",
    name: "God of War Ragnarök",
    price: 59.99,
    description: "Продовження легендарної саги Кратоса",
    category: "Action/Adventure",
    platform: "PS, PC",
  },
  {
    id: "5",
    name: "Red Dead Redemption 2",
    price: 39.99,
    description: "Пригода Дикого Заходу від Rockstar Games",
    category: "Action/Adventure",
    platform: "PC, PS, Xbox",
  },
  {
    id: "6",
    name: "Grand Theft Auto V",
    price: 29.99,
    description: "Легендарна кримінальна пісочниця",
    category: "Action",
    platform: "PC, PS, Xbox",
  },
  {
    id: "7",
    name: "Minecraft",
    price: 19.99,
    description: "Безмежна пісочниця для творчості та виживання",
    category: "Sandbox",
    platform: "PC, Console, Mobile",
  },
  {
    id: "8",
    name: "The Last of Us Part II",
    price: 49.99,
    description: "Емоційна пригода у постапокаліптичному світі",
    category: "Action/Adventure",
    platform: "PS, PC",
  },
];
