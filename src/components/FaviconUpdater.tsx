// components/FaviconUpdater.tsx
import { useRestaurant } from "@/hooks/useRestaurant";
import { useEffect } from "react";

export function FaviconUpdater() {
  const { restaurant, loading, error } = useRestaurant();

  useEffect(() => {
    console.log("FaviconUpdater effect running", {
      restaurant,
      loading,
      error,
    });

    if (!loading && restaurant && restaurant.logo_image) {
      console.log("Updating favicon with:", restaurant.logo_image);
      const link: HTMLLinkElement =
        document.querySelector("link[rel~='icon']") ||
        document.createElement("link");
      link.type = "image/png";
      link.rel = "icon";
      link.href = restaurant.logo_image;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  }, [restaurant, loading, error]);

  return null;
}
