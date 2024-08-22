import { Category } from '../../../hooks/useCategory';

interface SetCategoryProps {
  onSetCategory: (category: string) => void;
  categories: Category[];
}

export default function SetCategory({
  onSetCategory,
  categories,
}: SetCategoryProps) {
  return (
    <div>
      <label>Category: </label>
      <select>
        <option value="" onClick={(e) => onSetCategory(e.currentTarget.value)}>
          All
        </option>
        <option>aaaa</option>
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
      <label>price: </label>
      <input type="text" />
      -
      <input type="text" />
    </div>
  );
}
