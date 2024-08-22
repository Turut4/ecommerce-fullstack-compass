import { useQuery } from '@tanstack/react-query';

async function fetchProducts() {
  const respose = await fetch('http://localhost:3000/products');

  if (!respose.ok) {
    throw new Error('Network response was not ok');
  }
  console.log(respose);

  return respose.json();
}

export function useProducts() {
  return useQuery({ queryKey: ['products'], queryFn: fetchProducts });
}
