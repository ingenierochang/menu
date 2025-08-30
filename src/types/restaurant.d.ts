export type BannerImage = {
  id: number;
  image: string;
};

export interface Restaurant {
  id?: number;
  owner: number;
  name: string;
  slug?: string;

  image?: string;
  logo_image?: string;

  banner_images?: BannerImage[];
  slogan?: string;
  description?: string;
  address?: string;
  address_url?: string;
  whatsapp?: number;
  facebook?: string;
  phone?: number;
  instagram?: string;
  tiktok?: string;
  open_hours?: string;
  payment_methods?: string;
  parking?: string;
  alcohol_patents?: string;
  website?: string;
  custom_css_text?: string;
  custom_css_json?: string;

  whatsapp_orders_extension?: boolean;

  main_color?: string;
}
