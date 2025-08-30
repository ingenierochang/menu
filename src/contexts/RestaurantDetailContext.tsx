import React, { createContext, useState } from "react";
import { Restaurant } from "@/types/restaurant";

type RestaurantScreenContextType = {
  isScreenVisible: boolean;
  selectedRestaurant: Restaurant | null;
  showRestaurantScreen: (restaurant: Restaurant) => void;
  hideRestaurantScreen: () => void;
};

export const RestaurantScreenContext = createContext<
  RestaurantScreenContextType | undefined
>(undefined);

export const RestaurantDetailScreenProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const [isScreenVisible, setIsScreenVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const showRestaurantScreen = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsScreenVisible(true);
  };

  const hideRestaurantScreen = () => {
    setIsScreenVisible(false);
    setSelectedRestaurant(null);
  };

  return (
    <RestaurantScreenContext.Provider
      value={{
        isScreenVisible,
        selectedRestaurant,
        showRestaurantScreen,
        hideRestaurantScreen,
      }}
    >
      {children}
    </RestaurantScreenContext.Provider>
  );
};
