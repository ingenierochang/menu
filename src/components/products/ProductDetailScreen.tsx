import React, { useEffect, useState } from "react";
import { Product } from "@/types/products";
import { formattedPrice } from "@/utils/formatPrice";
import { getDiscountPercentage } from "@/utils/getDiscountPercentage";

type ProductDetailScreenProps = {
  product: Product | null;
  isVisible: boolean;
  onClose: () => void;
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  isVisible,
  onClose,
}) => {
  const [isDetailImageLoaded, setDetailImageLoaded] = useState(false);

  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      // If the product detail modal is visible, close it
      if (isVisible) {
        e.preventDefault(); // Prevent the default back action
        onClose(); // Close the modal
      }
    };

    if (isVisible) {
      document.body.style.overflow = "hidden";
      window.history.pushState(null, "", window.location.href); // Add a new history entry
      window.addEventListener("popstate", handleBackButton);

      return () => {
        window.removeEventListener("popstate", handleBackButton);
        document.body.style.overflow = ""; // Restore scroll
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible || !product) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal when clicking outside the content
    }
  };

  const preventImageDownload = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[1001]"
      onClick={handleOverlayClick}
    >
      <div className="h-screen flex flex-col" style={{ pointerEvents: "none" }}>
        <div className="h-20 bg-transparent" />
        <div
          className="flex-grow bg-white rounded-t-3xl overflow-y-auto"
          style={{ pointerEvents: "auto" }}
        >
          <div className="sticky top-0 bg-white p-4 pb-10 border-b z-1">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold pr-8">{product.name}</h2>
          </div>
          <div className="px-4 py-20">
            {product.thumbnail_image && (
              <div className="relative w-full aspect-square mb-4">
                <img
                  src={product.thumbnail_image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  onContextMenu={preventImageDownload}
                />
                <img
                  src={product.detail_image}
                  alt={product.name}
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
                    isDetailImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setDetailImageLoaded(true)}
                  onContextMenu={preventImageDownload}
                />
                <div
                  className="absolute inset-0 bg-transparent"
                  onContextMenu={preventImageDownload}
                ></div>
              </div>
            )}
            <p className="mb-4">{product.description}</p>
            {/* <p className="font-bold text-xl mb-4">
              {Number(product.price).toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </p> */}
            {/* price */}
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
                  {getDiscountPercentage(
                    product.price,
                    product.discounted_price
                  )}{" "}
                  %
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
