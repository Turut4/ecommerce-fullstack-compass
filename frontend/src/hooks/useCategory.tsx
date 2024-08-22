import { useQuery } from '@tanstack/react-query';

export interface Category {
  id: number;
  name: string;
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('http://localhost:3000/categories');
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
