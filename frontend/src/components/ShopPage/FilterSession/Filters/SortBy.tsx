import { Dropdown } from 'primereact/dropdown';

interface SortByProps {
  onSetSortBy: (sortBy: string) => void;
  sortBy: string;
}

export default function SortBy({ onSetSortBy, sortBy }: SortByProps) {
  const sortByOptions = ['A-Z', 'Z-A', 'Higher', 'Lower'];
  const options = ['Default', ...sortByOptions];
  return (
    <div className="show">
      <label>Sort By</label>
      <Dropdown
        options={options}
        value={sortBy}
        onChange={(e) => onSetSortBy(e.value)}
        placeholder="Select..."
        className="dropdown"
      />
    </div>
  );
}
