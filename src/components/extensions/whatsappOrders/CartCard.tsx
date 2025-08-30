import { CURRENCY } from "@/constants/payments";
import { useCart } from "@/hooks/useCart";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useRestaurantTheme } from "@/hooks/useRestaurantTheme";
import { formattedPrice } from "@/utils/formatPrice";
import clsx from "clsx";
import { useState } from "react";
import CartScreen from "./CartScreen";

type CartCardProps = {
  className?: string;
};

const CartCard = ({ className }: CartCardProps) => {
  const { restaurant } = useRestaurant();
  const { orderItems } = useCart();
  const { buttonStyles } = useRestaurantTheme(restaurant?.main_color);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!orderItems || !restaurant) return null;

  const subTotal = orderItems.reduce((acc, orderItem) => {
    return acc + orderItem.quantity * orderItem.product.price;
  }, 0);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 border-t-2 border-gray-400 shadow-xl bg-white p-2",
          className
        )}
      >
        <div className="flex justify-between items-center px-3">
          <section>
            <p className="text-sm">
              {orderItems.length}{" "}
              {orderItems.length == 1 ? "Producto" : "Productos"}
            </p>

            <p className="font-bold">
              {formattedPrice(subTotal)} {CURRENCY}
            </p>
          </section>

          <div
            className={clsx("py-2 px-3 rounded")}
            onClick={toggleModal}
            style={buttonStyles}
          >
            Ver carrito
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CartScreen className="font-poppins" toggleModal={toggleModal} />
      )}
    </>
  );
};

export default CartCard;
