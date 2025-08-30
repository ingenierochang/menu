import { useRestaurant } from "@/hooks/useRestaurant";
import { getWhatsappLink } from "@/utils/getWhatsappLink";
import React from "react";

const RestaurantSocials = () => {
  const { restaurant } = useRestaurant();

  return (
    <div className="flex gap-3 border-b pb-3 pt-2">
      {restaurant?.whatsapp && (
        <a href={getWhatsappLink(restaurant.whatsapp)}>
          <i className="bi bi-whatsapp text-xl"></i>
        </a>
      )}
      {restaurant?.instagram && (
        <a href={restaurant.instagram}>
          <i className="bi bi-instagram text-xl"></i>
        </a>
      )}
      {restaurant?.facebook && (
        <a href={restaurant.facebook}>
          <i className="bi bi-facebook text-xl"></i>
        </a>
      )}
      {restaurant?.phone && (
        <a href={"tel:" + restaurant.phone}>
          <i className="bi bi-telephone text-xl"></i>
        </a>
      )}
    </div>
  );
};

export default RestaurantSocials;
