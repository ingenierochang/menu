import { BaseProduct } from "./products";

export type OrderItemProduct = BaseProduct & {
  price: number;
};

export type OrderItem = {
  product: OrderItemProduct;
  quantity: number;
  id: string;
};
