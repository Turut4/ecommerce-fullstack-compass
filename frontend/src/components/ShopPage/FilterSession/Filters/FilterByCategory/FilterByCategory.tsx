import { BsFilter } from 'react-icons/bs';
import { Category } from '../../../../../hooks/useCategory';
import SetCategory from './CategoriesFilter';

interface FilterByCategoryProps {
  isOpen: boolean;
  onSetIsOpen: (isOpen: boolean) => void;
  onSetCategory: (category: string) => void;
  categories: Category[];
  selectedCategory: string;
  message: string;
}

export default function FilterByCategory({
  selectedCategory,
  isOpen,
  onSetIsOpen,
  onSetCategory,
  categories,
  message,
}: FilterByCategoryProps) {
  return (
    <div className="filter">
      <span>
        <BsFilter
          className="filter-icon"
          onClick={() => onSetIsOpen(!isOpen)}
        />{' '}
        Filter
        {isOpen && (
          <SetCategory
            onSetCategory={onSetCategory}
            categories={categories}
            selectedCategory={selectedCategory}
          />
        )}
      </span>
      <p className="message">{message}</p>
    </div>
  );
}
