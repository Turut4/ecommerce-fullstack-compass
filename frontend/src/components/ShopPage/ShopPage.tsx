import ProductsList from './Products/ProductsList';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import { useEffect, useState } from 'react';
import useCategories from '../../hooks/useCategory';
import FilterSession from './FilterSession/FilterSession';
import { useProducts } from '../../hooks/useProduct';
import {
  getDisplayMessage,
  normalizeCategory,
  normalizeSortBy,
  validatePriceRange,
} from './validateFilters';

export type Filters = {
  sortBy: string;
  selectedCategory: string;
  pageSize: number;
  priceMin: number;
  priceMax: number;
};

export type Setters = {
  setSortBy: (value: string) => void;
  setCategory: (value: string) => void;
  setPageSize: (value: number) => void;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
};

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000000);

  useEffect(() => {
    setPage(1);

    const [validatedPriceMin, validatedPriceMax] = validatePriceRange(
      priceMin,
      priceMax,
    );
    setPriceMin(validatedPriceMin);
    setPriceMax(validatedPriceMax);
    setSortBy(normalizeSortBy(sortBy));
    setCategory(normalizeCategory(selectedCategory));
    setPageSize(Math.max(1, Math.min(pageSize, 32)));
  }, [priceMin, priceMax, sortBy, selectedCategory, pageSize]);

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

  const totalProducts = productsData?.total || 0;

  const filters: Filters = {
    selectedCategory,
    sortBy,
    pageSize,
    priceMin,
    priceMax,
  };

  const setters: Setters = {
    setCategory,
    setSortBy,
    setPriceMin,
    setPageSize,
    setPriceMax,
  };

  return (
    <div>
      <Header search={search} onSetSearch={setSearch} />
      <Banner />
      <FilterSession
        filters={filters}
        categories={categoriesData}
        message={getDisplayMessage(page, pageSize, totalProducts)}
        setters={setters}
      />
      <ProductsList
        page={page}
        onSetPage={setPage}
        pageSize={pageSize}
        productData={productsData}
        isLoadingProducts={isLoadingProducts}
      />
    </div>
  );
}
