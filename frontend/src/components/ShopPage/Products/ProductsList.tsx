import './ProductsList.css';
import { Product } from './Product';
import { useProducts } from '../../../hooks/useProduct';
import FilterSession from '../Filter/FilterSession';
import useCategories from '../../../hooks/useCategory';
import { useState } from 'react';
import WarningSession from '../Filter/WarningSession';

export default function ProductsList() {
  const [category, setCategory] = useState('');

  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: products, isLoading: isLoadingProducts } = useProducts({
    category,
  });

  if (isLoadingCategories) {
    return <WarningSession message={'Loading categories...'} />;
  }

  if (!categories) {
    return <WarningSession message={`No categories found`} />;
  }

  if (isLoadingProducts) {
    return (
      <FilterSession
        categories={categories}
        onSetCategory={setCategory}
        message={'Loading products...'}
      />
    );
  }

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
