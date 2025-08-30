import { useCart } from "@/hooks/useCart";
import CartOrderItemRow from "./CartOrderItemRow";
import clsx from "clsx";

type CartScreenProps = {
  toggleModal: () => void;
  className?: string;
};

const CartScreen = ({ toggleModal, className }: CartScreenProps) => {
  const { orderItems } = useCart();

  console.log("orderItems", orderItems);

  return (
    <div
      className={clsx(
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]",
        className
      )}
    >
      <div className="bg-white p-4 rounded shadow-lg w-full h-full">
        <div className="flex justify-end border-b">
          <button className="text-2xl" onClick={toggleModal}>
            X
          </button>
        </div>
        <div className="flex flex-col justify-top h-full gap-3 py-3">
          {orderItems?.map((orderItem, index) => (
            <CartOrderItemRow
              index={index}
              orderItem={orderItem}
              key={orderItem.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
