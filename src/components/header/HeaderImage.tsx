import { useRestaurant } from "@/hooks/useRestaurant";
import React, { useEffect, useState } from "react";

const HeaderImage = () => {
  const { restaurant } = useRestaurant();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (restaurant && restaurant.logo_image) {
      const img = new Image();
      img.src = restaurant.logo_image;
      img.onload = () => setImageLoaded(true);
    }
  }, [restaurant]);

  return (
    <div className="aspect-square size-24">
      {restaurant && (
        <a href={`/${restaurant.slug}/clusters`}>
          <img
            className={`h-full w-full object-cover rounded-lg ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300 cursor-pointer`}
            src={restaurant.logo_image}
            alt={restaurant.name || "Restaurant logo"}
          />
        </a>
      )}
    </div>
  );
};

export default HeaderImage;
