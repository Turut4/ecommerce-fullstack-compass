import { useQuery } from '@tanstack/react-query';

interface Filters {
  category?: string;
  minPrice?: string;
  rating?: string;
  sort?: 'lower' | 'higher' | 'a-z' | 'z-a';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  stock: number;
  sku: string;
  description: string;
  image: string;
  percentageDiscount: number;
  createdAt: string;
}

async function fetchProducts(filters: Filters = {}): Promise<Product[]> {
  const query = new URLSearchParams(
    filters as Record<string, string>,
  ).toString();
  const response = await fetch(`http://localhost:3000/products?${query}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useProducts(filters: Filters = {}) {
  return useQuery<Product[]>({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  });
}
