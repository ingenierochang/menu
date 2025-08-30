import { useRestaurant } from "@/hooks/useRestaurant";
import { getAllCategoryClusters } from "@/services/categoryClusters";
import { CategoryCluster } from "@/types/categoryCluster";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const CategoriesFold = () => {
  const [categoryClusters, setCategoryClusters] = useState<
    CategoryCluster[] | undefined
  >();
  const { restaurant } = useRestaurant();

  console.log("categories", categoryClusters);

  useEffect(() => {
    const fetchCategoryClusters = async (restaurantSlug: string) => {
      try {
        const response = await getAllCategoryClusters(restaurantSlug);
        console.log("response", response);
        setCategoryClusters(response);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (restaurant && restaurant.slug) fetchCategoryClusters(restaurant.slug);
  }, [restaurant]);

  const preventImageDownload = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (!categoryClusters) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {categoryClusters.map((cluster) => (
        <a
          href={`/${restaurant?.slug}/clusters/${cluster.slug}`}
          key={cluster.id}
        >
          <div
            className={clsx(
              "border rounded-lg p-3 h-24",
              "flex items-end",
              "text-lg font-bold",
              "relative",
              cluster.image && "bg-opacity-10 bg-black text-white",
              !cluster.image && "bg-white"
            )}
            style={{
              backgroundImage: cluster.image ? `url(${cluster.image})` : "none",
              backgroundSize: "cover",
              backgroundBlendMode: "darken",
            }}
            onContextMenu={preventImageDownload}
          >
            <p>{cluster.name}</p>
            {cluster.image && (
              <div
                className="absolute inset-0 bg-transparent"
                onContextMenu={preventImageDownload}
              ></div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default CategoriesFold;
