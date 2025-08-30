import { CURRENCY } from "@/constants/payments";

export const formattedPrice = (price: number) => {
  return price
    ? Number(price).toLocaleString("es-CL", {
        style: "currency",
        currency: CURRENCY,
      })
    : null;
};
