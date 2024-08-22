import './ProductsList.css';
import { Product } from './Product';
import { useProducts } from '../../../hooks/useProduct';
import FilterSession from './Filter/FilterSession';
import useCategories from '../../../hooks/useCategory';
import { useState } from 'react';

export default function ProductsList() {
  const [category, setCategory] = useState('');
  const { data: categories } = useCategories();
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts({
    category,
  });

  if (!categories) return <p>Some thing went wrong...</p>;

  if (isLoadingProducts) {
    return (
      <FilterSession
        categories={categories}
        onSetCategory={setCategory}
        message={'Loading products...'}
      />
    );
  }

  if (productsError)
    return <p>Error loading products: {productsError.message}</p>;

  if (!products) {
    return (
      <FilterSession
        categories={categories}
        onSetCategory={setCategory}
        message={`No products found`}
      />
    );
  }

  return (
    <div>
      <FilterSession
        categories={categories}
        onSetCategory={setCategory}
        message={`Showing 1-16 of ${products.length} results`}
      />
      <div className="products-list">
        {!products ? (
          <p>No products available</p>
        ) : (
          products.map((p) => (
            <Product
              key={p.name}
              name={p.name}
              description={p.description}
              price={p.price}
              discount={p.percentageDiscount}
              image={p.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
