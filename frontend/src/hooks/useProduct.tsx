import { useQuery } from '@tanstack/react-query';

export interface Filters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: string;
  sort?: string;
  search?: string;
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

export interface ApiResponse {
  products: Product[];
  total: number;
  page: number;
  currentPage: number;
}

async function fetchProducts(
  page: number,
  pageSize: number,
  filters: Filters = {},
): Promise<ApiResponse> {
  const query = new URLSearchParams(
    filters as Record<string, string>,
  ).toString();
  const response = await fetch(
    `http://localhost:3000/products?page=${page}&pageSize=${pageSize}&${query}`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useProducts(
  page: number,
  pageSize: number,
  filters: Filters = {},
) {
  return useQuery<ApiResponse>({
    queryKey: ['products', filters, page, pageSize],
    queryFn: () => fetchProducts(page, pageSize, filters),
  });
}
