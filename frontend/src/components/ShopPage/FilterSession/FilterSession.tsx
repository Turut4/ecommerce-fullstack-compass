import { Category } from '../../../hooks/useCategory';
import { useState } from 'react';
import './FilterSession.css';
import FilterByCategory from './Filters/FilterByCategory/FilterByCategory';
import SortBy from './Filters/SortBy';
import Show from './Filters/FilterByCategory/Show';
import { Filters, Setters } from '../ShopPage';

interface FilterSessionProps {
  filters: Filters;
  setters: Setters;
  categories: Category[] | undefined;
  message: string;
}
export default function FilterSession({
  filters,
  setters,
  categories,
  message,
}: FilterSessionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { sortBy, selectedCategory, priceMin, priceMax, pageSize } = filters;
  const { setSortBy, setCategory, setPriceMin, setPriceMax, setPageSize } =
    setters;
  return (
    <div className="filter-session">
      <div>
        <FilterByCategory
          onSetPriceMin={setPriceMin}
          priceMin={priceMin}
          onSetPriceMax={setPriceMax}
          priceMax={priceMax}
          selectedCategory={selectedCategory}
          message={message}
          onSetCategory={setCategory}
          categories={categories}
          isOpen={isOpen}
          onSetIsOpen={setIsOpen}
        />
      </div>
      <div className="sort-by">
        <Show onSetPageSize={setPageSize} pageSize={pageSize} />
        <SortBy onSetSortBy={setSortBy} sortBy={sortBy} />
      </div>
    </div>
  );
}
