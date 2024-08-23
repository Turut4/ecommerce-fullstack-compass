import './ProductsList.css';
import { Product } from './Product';
import { useProducts } from '../../../hooks/useProduct';
import useCategories from '../../../hooks/useCategory';
import { useEffect, useState } from 'react';
import FilterSession from '../FilterSession/FilterSession';
import { ProgressSpinner } from 'primereact/progressspinner';

interface ProductsListProps {
  search: string;
}

export default function ProductsList({ search }: ProductsListProps) {
  const [selectedCategory, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100000);

  if (priceMax < priceMin) {
    setPriceMax(priceMin);
  }

  if (priceMin < 0) {
    setPriceMin(0);
  }

  if (sortBy === 'Default') {
    setSortBy('');
  }

  if (selectedCategory === 'All') {
    setCategory('');
  }

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    if (pageSize < 1) {
      setPageSize(0);
    } else if (pageSize > 32) {
      setPageSize(32);
    }
  }, [pageSize]);


  const { data: categoriesData } = useCategories();
  const { data: productsData, isLoading: isLoadingProducts } = useProducts(
    page,
    pageSize,
    {
      category: selectedCategory,
      sort: sortBy.toLowerCase(),
      search,
      priceMin,
      priceMax,
    },
  );

  if (isLoadingProducts) {
    return (
      <ProgressSpinner
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          width: '100vw',
        }}
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
        onSetPriceMin={setPriceMin}
        priceMin={priceMin}
        onSetPriceMax={setPriceMax}
        priceMax={priceMax}
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
        onSetPriceMin={setPriceMin}
        priceMin={priceMin}
        onSetPriceMax={setPriceMax}
        priceMax={priceMax}
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
