import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderItem, OrderItemProduct } from "@/types/orderItem";

// Define the context properties
export interface CartContextProps {
  orderItems?: OrderItem[];
  address?: string;
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[] | undefined>>;
  setAddress: (value: string) => void;
  addProduct: (product: OrderItemProduct) => void;
  removeProduct: (productId: number) => void; // Changed type to string for UUID compatibility
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { path } = useParams();
  const restaurantSlug = path || "";

  const [orderItems, setOrderItems] = useState<OrderItem[]>();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setOrderItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Remove cart from localStorage when restaurantSlug changes
    if (restaurantSlug) {
      localStorage.removeItem("cart");
    }
  }, [restaurantSlug]);

  useEffect(() => {
    // Save cart to localStorage whenever orderItems change
    if (orderItems) {
      localStorage.setItem("cart", JSON.stringify(orderItems));
    }
  }, [orderItems]);

  // Add a product to the cart
  const addProduct = (product: OrderItemProduct) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems?.find(
        (item) => item.product.id === product.id
      );

      if (existingItem && prevItems) {
        // Increase quantity if item already exists
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item if it doesn't exist
        const newOrderItem: OrderItem = {
          id: crypto.randomUUID(), // Use crypto to generate unique ID
          product,
          quantity: 1,
        };

        return [...(prevItems || []), newOrderItem];
      }
    });
  };

  // Remove a product from the cart
  const removeProduct = (productId: number) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems?.find(
        (item) => item.product.id === productId
      );

      if (existingItem && existingItem.quantity > 1 && prevItems) {
        // Decrease quantity if more than 1
        return prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Remove item if quantity is 1 or item doesn't exist
        return prevItems?.filter((item) => item.product.id !== productId);
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        orderItems,
        address,
        setOrderItems,
        setAddress,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
