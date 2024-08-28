import { useQuery } from '@tanstack/react-query';
import { Product } from './useProduct';

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_API_URL}/categories`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export default function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });
}
