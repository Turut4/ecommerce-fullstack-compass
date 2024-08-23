import { Category } from '../../../hooks/useCategory';
import { useState } from 'react';
import './FilterSession.css';
import FilterByCategory from './Filters/FilterByCategory/FilterByCategory';
import SortBy from './Filters/SortBy';
import Show from './Filters/FilterByCategory/Show';

interface FilterSessionProps {
  categories: Category[];
  onSetCategory: (category: string) => void;
  message: string;
  selectedCategory: string;
  sortBy: string;
  onSetSortBy: (sortBy: string) => void;
  onSetPageSize: (pageSize: number) => void;
  pageSize: number;
}
export default function FilterSession({
  categories,
  onSetCategory,
  message,
  selectedCategory,
  onSetSortBy,
  sortBy,
  onSetPageSize,
  pageSize,
}: FilterSessionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-session">
      <div>
        <FilterByCategory
          selectedCategory={selectedCategory}
          message={message}
          onSetCategory={onSetCategory}
          categories={categories}
          isOpen={isOpen}
          onSetIsOpen={setIsOpen}
        />
      </div>
      <div className='sort-by'>
        <Show onSetPageSize={onSetPageSize} pageSize={pageSize} />
        <SortBy onSetSortBy={onSetSortBy} sortBy={sortBy} />
      </div>
    </div>
  );
}
