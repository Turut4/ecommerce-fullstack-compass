import { Dropdown } from 'primereact/dropdown';

interface SortByProps {
  onSetSortBy: (sortBy: string) => void;
  sortBy: string;
}

export default function SortBy({ onSetSortBy, sortBy }: SortByProps) {
  const options = ['A-Z', 'Z-A', 'Higher', 'Lower'];
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
