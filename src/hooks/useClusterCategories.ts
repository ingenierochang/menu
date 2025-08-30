import { useEffect, useState } from "react";
import { useRestaurant } from "./useRestaurant";
import { getAllCategoryClusters } from "@/services/categoryClusters";
import { CategoryCluster } from "@/types/categoryCluster";

export function useClusterCategories(clusterSlug: string) {
  const [categoryClusters, setCategoryClusters] = useState<
    CategoryCluster[] | undefined
  >();
  const { restaurant } = useRestaurant();

  useEffect(() => {
    const fetchCategoryClusters = async (restaurantSlug: string) => {
      try {
        const response = await getAllCategoryClusters(restaurantSlug);
        setCategoryClusters(response);
      } catch (error) {
        console.error("Error fetching category clusters:", error);
      }
    };

    if (restaurant && restaurant.slug) fetchCategoryClusters(restaurant.slug);
  }, [restaurant]);

  const cluster = categoryClusters
    ? categoryClusters.find((cluster) => cluster.slug === clusterSlug)
    : undefined;

  const filteredCategories = cluster?.categories_details?.map(
    (cat) => cat.name
  );

  console.log("filteredCategories", filteredCategories);

  return { filteredCategories };
}
