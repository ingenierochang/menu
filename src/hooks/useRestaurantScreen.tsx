import { RestaurantScreenContext } from "@/contexts/RestaurantDetailContext";
import { useContext } from "react";

export const useRestaurantScreen = () => {
  const context = useContext(RestaurantScreenContext);
  if (context === undefined) {
    throw new Error(
      "useRestaurantScreen must be used within a ProductScreenProvider"
    );
  }
  return context;
};
