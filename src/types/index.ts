export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  image: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  lastName: string;
  firstName: string;
}
