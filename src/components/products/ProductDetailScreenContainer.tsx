import { useProductScreen } from "@/hooks/useProductScreen";
import ProductDetailScreen from "./ProductDetailScreen";

export const ProductDetailsScreenContainer = () => {
  const { isScreenVisible, selectedProduct, hideProductScreen } =
    useProductScreen();

  return (
    <ProductDetailScreen
      isVisible={isScreenVisible}
      product={selectedProduct}
      onClose={hideProductScreen}
    />
  );
};
