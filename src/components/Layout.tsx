import { Outlet } from "react-router-dom";
import { RestaurantProvider } from "@/contexts/RestaurantContext";
import { CartProvider } from "@/contexts/CartContext";
import { RestaurantDetailScreenProvider } from "@/contexts/RestaurantDetailContext";
import { RestaurantDetailsScreenContainer } from "./restaurant/RestaurantDetailScreenContainer";
import { ProductCategoriesProvider } from "@/contexts/ProductsCategoriesContext";
import { FaviconUpdater } from "./FaviconUpdater";

function Layout() {
  return (
    <RestaurantProvider>
      <CartProvider>
        <RestaurantDetailScreenProvider>
          <ProductCategoriesProvider>
            <>
              <main>
                <Outlet /> {/* This is where nested routes will be rendered */}
              </main>
            </>

            {/* utils start */}
            <RestaurantDetailsScreenContainer />
            <FaviconUpdater />
            {/* utils end */}
          </ProductCategoriesProvider>
        </RestaurantDetailScreenProvider>
      </CartProvider>
    </RestaurantProvider>
  );
}

export default Layout;
