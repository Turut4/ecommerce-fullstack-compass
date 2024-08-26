import { BsFilter } from 'react-icons/bs';
import { Category } from '../../../../../hooks/useCategory';
import SetCategory from './SetCategory';

interface FilterByCategoryProps {
  isOpen: boolean;
  onSetIsOpen: (isOpen: boolean) => void;
  onSetCategory: (category: string) => void;
  categories: Category[] | undefined;
  selectedCategory: string;
  message: string;
  onSetPriceMin: (priceMin: number) => void;
  onSetPriceMax: (priceMax: number) => void;
  priceMin: number;
  priceMax: number;
}

export default function FilterByCategory({
  selectedCategory,
  isOpen,
  onSetIsOpen,
  onSetCategory,
  categories,
  message,
  onSetPriceMin,
  onSetPriceMax,
  priceMin,
  priceMax,
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
            onSetPriceMin={onSetPriceMin}
            onSetPriceMax={onSetPriceMax}
            priceMin={priceMin}
            priceMax={priceMax}
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
