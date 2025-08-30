// src/DynamicPage.jsx
import CategoriesNavbar from "@/components/navbar/CategoriesNavbar";
import Header from "../components/header/Header";
import Products from "@/components/products/Products";
import CartCard from "@/components/extensions/whatsappOrders/CartCard";
import { useRestaurant } from "@/hooks/useRestaurant";
import { ProductScreenProvider } from "@/contexts/ProductDetailContext";
import { ProductDetailsScreenContainer } from "@/components/products/ProductDetailScreenContainer";
import { useState } from "react";
import { useProductCategories } from "@/hooks/useProductsCategories";
import { ProductsCategories } from "@/types/productCategories";

function MainMenu() {
  const { restaurant } = useRestaurant();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const { productsCategories } = useProductCategories();

  if (!productsCategories || !restaurant) return null;

  const filteredProductsCategories: ProductsCategories = Object.keys(
    productsCategories
  ).reduce((acc: ProductsCategories, category: string) => {
    const filteredProducts = productsCategories[category].filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length > 0) {
      acc[category] = filteredProducts;
    }

    return acc;
  }, {});

  const categories = Object.keys(productsCategories);

  return (
    <ProductScreenProvider>
      <div className="w-full flex justify-center items-center">
        <div className="py-4 font-poppins grid gap-3 max-w-screen-md w-full">
          <Header className="px-2" />
          <CategoriesNavbar onSearch={handleSearch} categories={categories} />
          <Products
            productsCategories={filteredProductsCategories}
            className="px-2"
          />
        </div>
      </div>
      {/* utils start */}
      {restaurant && restaurant.whatsapp_orders_extension && (
        <CartCard className="font-poppins" />
      )}
      <ProductDetailsScreenContainer />

      {/* utils end */}
    </ProductScreenProvider>
  );
}

export default MainMenu;
