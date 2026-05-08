export type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const generateNews = (count: number, offset: number = 0): NewsItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = offset + i + 1;
    return {
      id: id.toString(),
      title: `Новина #${id}`,
      description: `Це опис новини номер ${id}. Тут міститься короткий зміст події, що відбулася. Залишайтеся з нами, щоб дізнатися більше деталей та аналітики.`,
      image: `https://picsum.photos/seed/${id + 100}/400/250`,
    };
  });
};

export const INITIAL_NEWS = generateNews(15);

export const fetchMoreNews = (
  currentLength: number,
  count: number = 10,
): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateNews(count, currentLength));
    }, 1500);
  });
};

export const refreshNews = (): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateNews(15));
    }, 1500);
  });
};
