export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface ContactSection {
  title: string;
  data: Contact[];
}

const rawContacts: Contact[] = [
  {
    id: "1",
    name: "Андрій Петров",
    phone: "+38 (067) 123-45-67",
    email: "andriy@example.com",
  },
  {
    id: "2",
    name: "Анна Коваль",
    phone: "+38 (068) 234-56-78",
    email: "anna@example.com",
  },
  {
    id: "3",
    name: "Богдан Шевченко",
    phone: "+38 (050) 345-67-89",
    email: "bogdan@example.com",
  },
  {
    id: "4",
    name: "Вікторія Лисенко",
    phone: "+38 (063) 456-78-90",
    email: "viktoriya@example.com",
  },
  {
    id: "5",
    name: "Володимир Мельник",
    phone: "+38 (066) 567-89-01",
    email: "volodymyr@example.com",
  },
  {
    id: "6",
    name: "Ганна Бойко",
    phone: "+38 (097) 678-90-12",
    email: "hanna@example.com",
  },
  {
    id: "7",
    name: "Денис Кравченко",
    phone: "+38 (098) 789-01-23",
    email: "denys@example.com",
  },
  {
    id: "8",
    name: "Діана Павленко",
    phone: "+38 (099) 890-12-34",
    email: "diana@example.com",
  },
  {
    id: "9",
    name: "Євген Мороз",
    phone: "+38 (073) 901-23-45",
    email: "yevhen@example.com",
  },
  {
    id: "10",
    name: "Злата Кузьменко",
    phone: "+38 (093) 012-34-56",
    email: "zlata@example.com",
  },
  {
    id: "11",
    name: "Іван Сидоренко",
    phone: "+38 (094) 123-45-67",
    email: "ivan@example.com",
  },
  {
    id: "12",
    name: "Ірина Ткаченко",
    phone: "+38 (095) 234-56-78",
    email: "iryna@example.com",
  },
  {
    id: "13",
    name: "Катерина Остапчук",
    phone: "+38 (096) 345-67-89",
    email: "kateryna@example.com",
  },
  {
    id: "14",
    name: "Максим Гончар",
    phone: "+38 (091) 456-78-90",
    email: "maksym@example.com",
  },
  {
    id: "15",
    name: "Марина Руденко",
    phone: "+38 (092) 567-89-01",
    email: "marina@example.com",
  },
  {
    id: "16",
    name: "Наталія Волошина",
    phone: "+38 (061) 678-90-12",
    email: "nataliya@example.com",
  },
  {
    id: "17",
    name: "Олександр Данилюк",
    phone: "+38 (062) 789-01-23",
    email: "oleksandr@example.com",
  },
  {
    id: "18",
    name: "Олена Захарченко",
    phone: "+38 (064) 890-12-34",
    email: "olena@example.com",
  },
  {
    id: "19",
    name: "Павло Литвин",
    phone: "+38 (065) 901-23-45",
    email: "pavlo@example.com",
  },
  {
    id: "20",
    name: "Софія Марченко",
    phone: "+38 (071) 012-34-56",
    email: "sofiya@example.com",
  },
  {
    id: "21",
    name: "Тарас Шевчук",
    phone: "+38 (072) 123-45-67",
    email: "taras@example.com",
  },
  {
    id: "22",
    name: "Юлія Григоренко",
    phone: "+38 (074) 234-56-78",
    email: "yuliya@example.com",
  },
  {
    id: "23",
    name: "Ярослав Бондаренко",
    phone: "+38 (075) 345-67-89",
    email: "yaroslav@example.com",
  },
];

export const CONTACT_SECTIONS: ContactSection[] = (() => {
  const grouped = new Map<string, Contact[]>();

  rawContacts.forEach((contact) => {
    const letter = contact.name.charAt(0).toUpperCase();
    if (!grouped.has(letter)) {
      grouped.set(letter, []);
    }
    grouped.get(letter)?.push(contact);
  });

  const letters = Array.from(grouped.keys()).sort((a, b) =>
    a.localeCompare(b, "uk"),
  );
  return letters.map((letter) => ({
    title: letter,
    data: grouped.get(letter)!,
  }));
})();
