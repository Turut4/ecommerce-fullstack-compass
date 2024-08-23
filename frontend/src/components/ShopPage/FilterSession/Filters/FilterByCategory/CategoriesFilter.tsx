import { Category } from '../../../../../hooks/useCategory';
import { Dropdown } from 'primereact/dropdown';

interface SetCategoryProps {
  onSetCategory: (category: string) => void;
  categories: Category[];
  selectedCategory: string;
}

export default function SetCategory({
  onSetCategory,
  selectedCategory,
  categories,
}: SetCategoryProps) {
  return (
    <div>
      <Dropdown
        options={categories.map((category) => category.name)}
        value={selectedCategory}
        onChange={(e) => onSetCategory(e.value)}
        placeholder="Select a Category"
      />
      <label>price: </label>
      <input type="text" />
      -
      <input type="text" />
    </div>
  );
}
