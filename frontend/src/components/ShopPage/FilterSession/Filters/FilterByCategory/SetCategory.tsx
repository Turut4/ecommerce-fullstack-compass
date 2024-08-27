import { Category } from '../../../../../hooks/useCategory';
import { Dropdown } from 'primereact/dropdown';
import SearchBar from '../../../../Header/Search';

interface SetCategoryProps {
  onSetCategory: (category: string) => void;
  categories: Category[] | undefined;
  selectedCategory: string;
  onSetPriceMin: (priceMin: number) => void;
  onSetPriceMax: (priceMax: number) => void;
  priceMin: number | '';
  priceMax: number | '';
  search: string;
  onSetSearch: (search: string) => void;
}

export default function SetCategory({
  onSetCategory,
  selectedCategory,
  categories,
  onSetPriceMin,
  onSetPriceMax,
  priceMin,
  priceMax,
  search,
  onSetSearch,
}: SetCategoryProps) {
  const category = categories!.map((category) => category.name);
  const options = [...category, 'All'];

  return (
    <div className="category-filter">
      <div>
        <SearchBar search={search} onSetSearch={onSetSearch} />
      </div>
      <div className="min-max">
        <label>Price: </label>
        <input
          type="number"
          placeholder="Min"
          step={1}
          pattern="\d+"
          inputMode="numeric"
          value={priceMin === 0 ? '' : priceMin}
          onChange={(e) =>
            onSetPriceMin(e.target.value === '' ? 0 : parseInt(e.target.value))
          }
        />
        -
        <input
          type="number"
          placeholder="Max"
          step={1}
          inputMode="numeric"
          value={priceMax === 1000000 ? '' : priceMax}
          onChange={(e) =>
            onSetPriceMax(
              e.target.value === '' ? 1000000 : parseInt(e.target.value),
            )
          }
        />
      </div>
      <Dropdown
        checkmark={true}
        options={options}
        value={selectedCategory}
        onChange={(e) => onSetCategory(e.value)}
        placeholder="Select a Category"
        className="dropdown-category"
      />
    </div>
  );
}
