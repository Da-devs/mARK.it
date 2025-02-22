export interface Item {
  id: string;
  title: string;
  tags: string[];
  imageUrl: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  tags: string[];
}