import { useQuery } from '@tanstack/react-query';
import { Product } from '../components/ShopPage/Products/Product';

export interface Filters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: string;
  sort?: string;
  search?: string;
}

interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: Category;
  stock: number;
  sku: string;
  description: string;
  shortDescription: string;
  images: string[];
  percentageDiscount: number;
  createdAt: string;
  color: string;
  size: string;
  tags: string[];
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
    `${
      import.meta.env.VITE_REACT_API_URL
    }/products?page=${page}&pageSize=${pageSize}&${query}`,
  );
  console.log(import.meta.env);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_API_URL}/products/${id}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

async function fetchProductByName(
  name: string | undefined,
): Promise<Product[]> {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_API_URL}/products/name/${name}`,
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

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });
}

export function useProductsByName(name: string | undefined) {
  return useQuery<Product[]>({
    queryKey: ['productsByName', name],
    queryFn: () => fetchProductByName(name),
  });
}
