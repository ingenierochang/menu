import clsx from "clsx";
import ProductCard from "./ProductCard";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useRestaurantTheme } from "@/hooks/useRestaurantTheme";
import { ProductsCategories } from "@/types/productCategories";

type ProductsProps = {
  className?: string;
  productsCategories: ProductsCategories;
};

const Products = ({ className, productsCategories }: ProductsProps) => {
  const { restaurant } = useRestaurant();
  const { buttonStyles } = useRestaurantTheme(restaurant?.main_color);

  return (
    <div className={clsx("grid gap-2 mb-20", className)}>
      {Object.keys(productsCategories).map((category) => (
        <div key={category} className="grid gap-2">
          <p
            id={category.toLowerCase().replace(/\s+/g, "-")}
            className={clsx("font-bold uppercase px-2", "scroll-margin")}
            style={buttonStyles}
          >
            {category}
          </p>

          <ul>
            {productsCategories[category].map((product, index) => (
              <ProductCard
                categoryName={category}
                product={product}
                key={index}
                index={index}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Products;
