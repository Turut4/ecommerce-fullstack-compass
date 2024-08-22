import { Category } from '../../../../hooks/useCategory';

interface CategoriesFilterProps {
  onSetCategory: (category: string) => void;
  categories: Category[];
}

export default function CategoriesFilter({
  onSetCategory,
  categories,
}: CategoriesFilterProps) {
  return (
    <select>
      <option value="" onClick={(e) => onSetCategory(e.currentTarget.value)}>
        All
      </option>
      {categories.map((category) => (
        <option
          onClick={(e) => onSetCategory(e.currentTarget.value)}
          value={category.name}
          key={category.name}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}
