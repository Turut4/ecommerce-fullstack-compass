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
  const category = categories.map((category) => category.name);
  const options = ['All', ...category];

  return (
    <div className="category-filter">
      <Dropdown
        options={options}
        value={selectedCategory}
        onChange={(e) => onSetCategory(e.value)}
        placeholder="Select a Category"
        className="dropdown-category"
      />
      <label>price: </label>
      <input type="text" placeholder="Min" />
      -
      <input type="text" placeholder="Max" />
    </div>
  );
}
