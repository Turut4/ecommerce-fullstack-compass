import { FormEvent, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

interface SearchBarProps {
  onIsOpen: () => void;
  onSetSearch: (search: string) => void;
  search: string;
}

interface SearchProps {
  search: string;
  onSetSearch: (search: string) => void;
}

export default function Search({ search, onSetSearch }: SearchProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
    onSetSearch('');
  }

  return (
    <div className="icons">
      <BsSearch onClick={handleIsOpen} />
      {isOpen && (
        <SearchBar
          onIsOpen={handleIsOpen}
          search={search}
          onSetSearch={onSetSearch}
        />
      )}
    </div>
  );
}
function SearchBar({ onIsOpen, search, onSetSearch }: SearchBarProps) {
  function handleSearch(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div>
        <label>Buscar</label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Faça uma busca..."
          value={search}
          onChange={(e) => onSetSearch(e.target.value)}
        />
      </div>
      <div className="close" onClick={onIsOpen}>
        &times;
      </div>
    </form>
  );
}
