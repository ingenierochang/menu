import React, { useEffect } from "react";
import { Restaurant } from "@/types/restaurant";
import RestaurantSocials from "./detail/RestaurantSocials";
import AddressFold from "./detail/AddressFold";
import MoreInfoFold from "./detail/MoreInfoFold";

type RestaurantDetailScreenProps = {
  restaurant: Restaurant | null;
  isVisible: boolean;
  onClose: () => void;
};

const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  restaurant,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible || !restaurant) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[1001] font-poppins"
      onClick={handleOverlayClick}
    >
      <div className="h-screen flex flex-col" style={{ pointerEvents: "none" }}>
        <div className="h-20 bg-transparent" />
        <div
          className="flex-grow bg-white rounded-t-3xl overflow-y-auto"
          style={{ pointerEvents: "auto" }} // Allow pointer events on modal content
        >
          <div className="sticky top-0 bg-white p-4 pb-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>

          {/* actual content */}
          <section className="py-10 px-3 grid gap-3 pb-40">
            <div>
              <h4 className="font-bold text-lg">{restaurant.name}</h4>
              {restaurant.slogan && (
                <p className="italic text-gray-500 text-sm">
                  {restaurant.slogan}
                </p>
              )}
            </div>
            <RestaurantSocials />
            <AddressFold />
            <MoreInfoFold />
          </section>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailScreen;
