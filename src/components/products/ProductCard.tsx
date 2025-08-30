import { useEffect } from "react";
import { useProductCategories } from "@/hooks/useProductsCategories";
import { useRestaurant } from "@/hooks/useRestaurant";
import { Product } from "@/types/products";
import clsx from "clsx";
import AddToCart from "../extensions/whatsappOrders/AddToCart";
import { useProductScreen } from "@/hooks/useProductScreen";
import { formattedPrice } from "@/utils/formatPrice";
import { OrderItemProduct } from "@/types/orderItem";
import { getDiscountPercentage } from "@/utils/getDiscountPercentage";

type ProductCardProps = {
  product: Product;
  categoryName: string;
  index: number;
};

const ProductCard = ({ product, categoryName, index }: ProductCardProps) => {
  const { restaurant } = useRestaurant();
  const { productsCategories } = useProductCategories();
  const { showProductScreen } = useProductScreen();

  const preventImageDownload = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Preload image when component mounts
  useEffect(() => {
    if (product.thumbnail_image) {
      const img = new Image();
      img.src = product.thumbnail_image;
    }
  }, [product.thumbnail_image]);

  if (!productsCategories || !restaurant) return null;

  if (!product.active) return null;

  return (
    <li>
      <div
        onClick={() => {
          console.log("click");
          showProductScreen(product);
        }}
        className={clsx(
          "flex gap-3",
          index !== Object.keys(productsCategories[categoryName]).length - 1 &&
            "pb-1 border-b",
          index !== 0 && "pt-1"
        )}
      >
        {product.thumbnail_image && (
          <div className="size-24 aspect-square shrink-0 relative">
            <img
              src={product.thumbnail_image}
              alt=""
              className="rounded-lg object-cover w-full h-full shrink-0"
              onContextMenu={preventImageDownload}
              draggable="false"
            />
            <div
              className="absolute inset-0 bg-transparent"
              onContextMenu={preventImageDownload}
            ></div>
          </div>
        )}
        <div className="relative w-full">
          <p>{product.name}</p>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          {product.price && !product.discounted_price && (
            <p className="font-bold">{formattedPrice(product.price)}</p>
          )}
          {product.price && product.discounted_price && (
            <div className="flex gap-1 justify-start items-center">
              <p className="font-bold">
                {formattedPrice(product.discounted_price)}
              </p>
              <p className="line-through text-sm text-gray-400">
                {formattedPrice(product.price)}
              </p>
              <p className="text-sm font-bold bg-orange-400 text-white px-1 rounded">
                {getDiscountPercentage(product.price, product.discounted_price)}{" "}
                %
              </p>
            </div>
          )}

          {restaurant.whatsapp_orders_extension &&
            product.price &&
            product.price !== undefined && (
              <AddToCart product={product as OrderItemProduct} />
            )}
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
