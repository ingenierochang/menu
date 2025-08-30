import { Category } from "./category";

export type BaseProduct = {
  restaurant_id: number;
  created_at: string;
  id: number;

  // image: string | null; // deprecated for the ones below
  thumbnail_image?: string;
  detail_image?: string;

  name: string;

  discounted_price?: number;

  category: Category;
  category_name: string; // serializer only
  active: boolean;

  description?: string;
};

export type Product = BaseProduct & {
  price?: number;
};
