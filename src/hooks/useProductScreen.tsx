import { ProductScreenContext } from "@/contexts/ProductDetailContext";
import { useContext } from "react";

export const useProductScreen = () => {
  const context = useContext(ProductScreenContext);
  if (context === undefined) {
    throw new Error(
      "useProductScreen must be used within a ProductScreenProvider"
    );
  }
  return context;
};
