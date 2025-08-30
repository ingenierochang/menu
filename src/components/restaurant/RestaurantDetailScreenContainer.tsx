import { useRestaurantScreen } from "@/hooks/useRestaurantScreen";
import RestaurantDetailScreen from "./RestaurantDetailScreen";

export const RestaurantDetailsScreenContainer = () => {
  const { isScreenVisible, selectedRestaurant, hideRestaurantScreen } =
    useRestaurantScreen();

  return (
    <RestaurantDetailScreen
      isVisible={isScreenVisible}
      restaurant={selectedRestaurant}
      onClose={hideRestaurantScreen}
    />
  );
};
