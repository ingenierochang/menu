import { OrderItem, OrderItemProduct } from "@/types/orderItem";
import { v4 as uuidv4 } from "uuid";

// Define the type for the accumulator
type ProductQuantityMap = {
  [key: string]: OrderItem; // Key is product ID, value is OrderItem
};

export const generateOrderItems = (
  products: OrderItemProduct[]
): OrderItem[] => {
  const productQuantityMap = products.reduce<ProductQuantityMap>(
    (acc, product) => {
      const key = product.id; // Use product ID or another unique identifier as the key
      if (acc[key]) {
        acc[key].quantity += 1;
      } else {
        acc[key] = { id: uuidv4(), product, quantity: 1 }; // Generate a UUID for each order item
      }
      return acc;
    },
    {}
  );

  return Object.values(productQuantityMap);
};
