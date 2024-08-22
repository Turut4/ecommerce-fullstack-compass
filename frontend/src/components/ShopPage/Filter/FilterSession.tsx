import { BsFilter } from 'react-icons/bs';
import { Category } from '../../../hooks/useCategory';
import { useState } from 'react';
import SetCategory from './CategoriesFilter';

interface FilterSessionProps {
  categories: Category[];
  onSetCategory: (category: string) => void;
  message: string;
}
export default function FilterSession({
  categories,
  onSetCategory,
  message,
}: FilterSessionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-session">
      <div className="filter">
        <span>
          <BsFilter onClick={() => setIsOpen(!isOpen)} /> Filter
          {isOpen && (
            <SetCategory
              onSetCategory={onSetCategory}
              categories={categories}
            />
          )}
        </span>
        <span>{message}</span>
      </div>
      <div>
        <label>Sort by</label>
      </div>
    </div>
  );
}
