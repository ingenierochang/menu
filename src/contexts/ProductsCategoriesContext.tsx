import React, { createContext, useEffect, useState } from 'react';
import client from '../api';
import { Product } from '@/types/products';
import { useRestaurant } from '@/hooks/useRestaurant';

export interface ProductCategoriesContextProps {
    productsCategories: { [key: string]: Product[] } | undefined;
    loading: boolean;
    error: Error | null;
}

export const ProductCategoriesContext = createContext<ProductCategoriesContextProps | undefined>(undefined);

export const ProductCategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsCategories, setProductsCategories] = useState<{ [key: string]: Product[] } | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const {restaurant} = useRestaurant();

  useEffect(() => {
    const fetchCategories = async () => {
        setLoading(true);
        if (restaurant) {
            try {
              const response = await client.get(`/restaurants/${restaurant.slug}/products/products-categories/`);
              setProductsCategories(response.data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }
    };
    
    if (restaurant) {
      fetchCategories();
    }
  }, [restaurant]);

  return (
    <ProductCategoriesContext.Provider value={{ productsCategories, loading, error }}>
      {children}
    </ProductCategoriesContext.Provider>
  );
};
