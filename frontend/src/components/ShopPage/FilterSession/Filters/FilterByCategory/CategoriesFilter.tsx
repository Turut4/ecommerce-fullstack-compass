import { Category } from '../../../../../hooks/useCategory';
import { Dropdown } from 'primereact/dropdown';

interface SetCategoryProps {
  onSetCategory: (category: string) => void;
  categories: Category[] | undefined;
  selectedCategory: string;
  onSetPriceMin: (priceMin: number) => void;
  onSetPriceMax: (priceMax: number) => void;
  priceMin: number;
  priceMax: number;
}

export default function SetCategory({
  onSetCategory,
  selectedCategory,
  categories,
  onSetPriceMin,
  onSetPriceMax,
  priceMin,
  priceMax,
}: SetCategoryProps) {
  if (categories === undefined) return <></>;

  const category = categories.map((category) => category.name);
  const options = [...category, 'All'];

  return (
    <div className="category-filter">
      <Dropdown
        checkmark={true}
        options={options}
        value={selectedCategory}
        onChange={(e) => onSetCategory(e.value)}
        placeholder="Select a Category"
        className="dropdown-category"
      />
      <label>price: </label>
      <input
        type="text"
        placeholder="Min"
        value={priceMin}
        onChange={(e) =>
          onSetPriceMin(e.target.value === '' ? 0 : parseInt(e.target.value))
        }
      />
      -
      <input
        type="text"
        placeholder="Max"
        value={priceMax}
        onChange={(e) =>
          onSetPriceMax(e.target.value === '' ? 0 : parseInt(e.target.value))
        }
      />
    </div>
  );
}
