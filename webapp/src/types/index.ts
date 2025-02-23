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

export interface AuthData {
  session_token: string;
  uuid: string;
}

export interface SupabasePostOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export interface SupabaseGetOptions {
  queryParams?: Record<string, string>;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface ContentCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url?: string;
  created_at: string;
  category_id: string;
}