import './ProductsList.css';
import { Product } from './Product';
import { useProducts } from '../../../hooks/useProduct';
import useCategories from '../../../hooks/useCategory';
import { useEffect, useRef, useState } from 'react';
import WarningSession from '../FilterSession/WarningSession';
import FilterSession from '../FilterSession/FilterSession';

export default function ProductsList() {
  const [selectedCategory, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    if (pageSize < 1) {
      setPageSize(1);
    } else if (pageSize > 16) {
      setPageSize(16);
    }
  }, [pageSize]);

  if (pageSize > 16) {
    setPageSize(16);
  }

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();
  const { data: productsData, isLoading: isLoadingProducts } = useProducts(
    page,
    pageSize,
    {
      category: selectedCategory,
      sort: sortBy.toLowerCase(),
    },
  );

  if (isLoadingCategories) {
    return <WarningSession message={'Loading categories...'} />;
  }

  if (!categoriesData) {
    return <WarningSession message={`No categories found`} />;
  }

  if (isLoadingProducts) {
    return (
      <FilterSession
        sortBy={sortBy}
        onSetSortBy={setSortBy}
        categories={categoriesData}
        selectedCategory={selectedCategory}
        onSetCategory={setCategory}
        message={'Loading products...'}
        onSetPageSize={setPageSize}
        pageSize={pageSize}
      />
    );
  }

  if (!productsData) {
    return (
      <FilterSession
        sortBy={sortBy}
        onSetSortBy={setSortBy}
        categories={categoriesData}
        selectedCategory={selectedCategory}
        onSetCategory={setCategory}
        message={`No products found`}
        onSetPageSize={setPageSize}
        pageSize={pageSize}
      />
    );
  }

  return (
    <div>
      <FilterSession
        sortBy={sortBy}
        onSetSortBy={setSortBy}
        categories={categoriesData}
        selectedCategory={selectedCategory}
        onSetCategory={setCategory}
        message={`Showing 1-16 of ${productsData.total} results`}
        onSetPageSize={setPageSize}
        pageSize={pageSize}
      />
      <div className="products-list">
        {!productsData ? (
          <p>No products available</p>
        ) : (
          productsData.products.map((p) => (
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
