import { CURRENCY } from "@/constants/payments";
import { useCart } from "@/hooks/useCart";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useRestaurantTheme } from "@/hooks/useRestaurantTheme";
import { OrderItem } from "@/types/orderItem";
import { formattedPrice } from "@/utils/formatPrice";
import clsx from "clsx";

type CartOrderItemRowProps = {
  orderItem: OrderItem;
  index?: number;
};

const CartOrderItemRow = ({ orderItem }: CartOrderItemRowProps) => {
  const { restaurant } = useRestaurant();

  const { buttonStyles } = useRestaurantTheme(restaurant?.main_color);
  const { addProduct, removeProduct } = useCart();

  if (!restaurant) return;

  console.log("orderItem", orderItem);

  return (
    <div className={clsx("flex flex-col relative", "h-20", "border-b")}>
      <div className="flex">
        {orderItem.product.thumbnail_image && (
          <div className="aspect-square size-16 mr-2 shrink-0">
            <img
              src={orderItem.product.thumbnail_image}
              className="w-full h-full rounded-xl"
              alt=""
            />
          </div>
        )}
        <div className="w-full">
          <div className="flex w-full justify-between">
            <p className="font-bold">{orderItem.product.name}</p>
            <p className="font-bold">
              {formattedPrice(orderItem.product.price * orderItem.quantity)}{" "}
              {CURRENCY}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            {formattedPrice(orderItem.product.price)} {CURRENCY}
          </p>
        </div>
      </div>

      <div className="absolute bottom-2 right-2">
        <div className="flex justify-between w-[5.5rem]">
          <>
            <div
              onClick={() => removeProduct(orderItem.product.id)}
              className="text-white bg-red-800 py-px px-[10px] rounded"
            >
              -
            </div>
            <div>{orderItem.quantity}</div>
          </>

          <div
            onClick={() => addProduct(orderItem.product)}
            className={clsx("text-white py-px px-2 rounded")}
            style={buttonStyles}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOrderItemRow;
