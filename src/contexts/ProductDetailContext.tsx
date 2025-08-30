import React, { createContext, useState } from "react";
import { Product } from "@/types/products";

type ProductScreenContextType = {
  isScreenVisible: boolean;
  selectedProduct: Product | null;
  showProductScreen: (product: Product) => void;
  hideProductScreen: () => void;
};

export const ProductScreenContext = createContext<
  ProductScreenContextType | undefined
>(undefined);

export const ProductScreenProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isScreenVisible, setIsScreenVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const showProductScreen = (product: Product) => {
    setSelectedProduct(product);
    setIsScreenVisible(true);
  };

  const hideProductScreen = () => {
    setIsScreenVisible(false);
    setSelectedProduct(null);
  };

  return (
    <ProductScreenContext.Provider
      value={{
        isScreenVisible,
        selectedProduct,
        showProductScreen,
        hideProductScreen,
      }}
    >
      {children}
    </ProductScreenContext.Provider>
  );
};
