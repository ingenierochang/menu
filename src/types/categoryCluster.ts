import { Category } from "./category";

export type CategoryCluster = {
  restaurant_id: number;
  created_at: string;
  id: number;
  name: string;

  image?: string;

  slug: string;

  categories: number[];
  categories_details?: Category[];
};
