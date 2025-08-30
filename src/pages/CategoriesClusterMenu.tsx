// src/pages/CategoriesClusterMenu.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesNavbar from "@/components/navbar/CategoriesNavbar";
import Header from "../components/header/Header";
import Products from "@/components/products/Products";
import CartCard from "@/components/extensions/whatsappOrders/CartCard";
import { useRestaurant } from "@/hooks/useRestaurant";
import { ProductScreenProvider } from "@/contexts/ProductDetailContext";
import { ProductDetailsScreenContainer } from "@/components/products/ProductDetailScreenContainer";
import { useClusterCategories } from "@/hooks/useClusterCategories";
import { ProductsCategories } from "@/types/productCategories";
import { useProductCategories } from "@/hooks/useProductsCategories";

// interface RouteParams {
//   cluster: string;
// }

function CategoriesClusterMenu() {
  const { cluster: clusterSlug } = useParams();
  const { restaurant } = useRestaurant();
  const { filteredCategories: categories } = useClusterCategories(
    clusterSlug || ""
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string): void => {
    console.log("term", term);
    setSearchTerm(term);
  };

  const { productsCategories } = useProductCategories();

  if (!productsCategories || !restaurant) return null;

  const clusterProductsCategories: ProductsCategories = Object.entries(
    productsCategories
  ).reduce((acc: ProductsCategories, [category, products]) => {
    // Only include the category if it's in the categories prop (if provided)
    console.log("categories", categories, category);
    if (categories && !categories.includes(category)) {
      return acc;
    }

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length > 0) {
      acc[category] = filteredProducts;
    }

    return acc;
  }, {});

  const clusterCategories = Object.keys(productsCategories).filter((cat) =>
    categories?.includes(cat)
  );

  return (
    <ProductScreenProvider>
      <div className="w-full flex justify-center items-center">
        <div className="py-4 font-poppins grid gap-3 max-w-screen-md w-full">
          <Header className="px-2" />
          <CategoriesNavbar
            onSearch={handleSearch}
            categories={clusterCategories}
          />
          <Products
            className="px-2"
            productsCategories={clusterProductsCategories}
          />
        </div>
      </div>
      {restaurant && restaurant.whatsapp_orders_extension && (
        <CartCard className="font-poppins" />
      )}
      <ProductDetailsScreenContainer />
    </ProductScreenProvider>
  );
}

export default CategoriesClusterMenu;
