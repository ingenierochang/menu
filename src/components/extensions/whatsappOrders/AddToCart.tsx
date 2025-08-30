import { useCart } from "@/hooks/useCart";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useRestaurantTheme } from "@/hooks/useRestaurantTheme";
import { OrderItemProduct } from "@/types/orderItem";
import clsx from "clsx";
import React from "react";

type AddToCartProps = {
  product: OrderItemProduct;
};

const AddToCart = ({ product }: AddToCartProps) => {
  const { restaurant } = useRestaurant();
  const { addProduct } = useCart();

  const { buttonStyles } = useRestaurantTheme(restaurant?.main_color);

  if (!restaurant) return;

  return (
    <div className="absolute bottom-1 right-1">
      <div className="flex gap-3">
        <div
          onClick={() => addProduct(product)}
          className={clsx("text-white py-px px-2 rounded")}
          style={buttonStyles}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
