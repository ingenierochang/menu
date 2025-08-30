import client from "@/api";

// Fetch all categoryClusters for a specific restaurant, optionally ordering by ID
export async function getAllCategoryClusters(
    restaurantSlug: string,
    ascending: boolean = true
  ) {
    try {
      const response = await client.get(
        `/restaurants/${restaurantSlug}/category_clusters/`,
        {
          params: {
            ordering: ascending ? "id" : "-id",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category clusters:", error);
      throw error;
    }
  }