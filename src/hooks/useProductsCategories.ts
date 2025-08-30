import { ProductCategoriesContext } from "@/contexts/ProductsCategoriesContext";
import { useContext } from "react";

export const useProductCategories = () => {
  const context = useContext(ProductCategoriesContext);

  if (context === undefined) {
    throw new Error(
      "useProductCategories must be used within a ProductCategoriesProvider"
    );
  }

  return context;
};
