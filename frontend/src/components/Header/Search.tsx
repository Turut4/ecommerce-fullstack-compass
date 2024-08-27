import { FormEvent } from 'react';

interface SearchBarProps {
  onSetSearch: (search: string) => void;
  search: string;
}

export default function SearchBar({ search, onSetSearch }: SearchBarProps) {
  function handleSearch(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div>
        <label>Buscar: </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Faça uma busca..."
          value={search}
          onChange={(e) => onSetSearch(e.target.value)}
        />
      </div>
      <div className="close" onClick={() => onSetSearch('')}>
        &times;
      </div>
    </form>
  );
}
