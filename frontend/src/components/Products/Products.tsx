import './Products.css';
import { Product } from './Product';
import { useProducts } from '../../hooks/useProduct';

interface Product {
  name: string;
  description: string;
  price: number;
  percentageDiscount: number;
  image: string;
}

export default function ProductsList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="products-list">
      {products.map((p: Product) => (
        <Product
          key={p.name}
          name={p.name}
          description={p.description}
          price={p.price}
          discount={p.percentageDiscount}
          image={p.image}
        />
      ))}
    </div>
  );
}
