// src/contexts/RestaurantContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api";
import { Restaurant } from "../types/restaurant";

export interface RestaurantContextProps {
  restaurant: Restaurant | undefined;
  loading: boolean;
  error: Error | null;
}

export const RestaurantContext = createContext<
  RestaurantContextProps | undefined
>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { path } = useParams();
  const restaurantSlug = path || "";

  const [restaurant, setRestaurant] = useState<Restaurant | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await client.get(`/restaurants/${restaurantSlug}`);
        setRestaurant(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantSlug]);

  useEffect(() => {
    if (restaurant && restaurant.name) {
      document.title = `${restaurant.name} - Menú Digital`;
    }
  }, [restaurant]);

  return (
    <RestaurantContext.Provider value={{ restaurant, loading, error }}>
      {children}
    </RestaurantContext.Provider>
  );
};
