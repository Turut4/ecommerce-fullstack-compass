import { FormEvent, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

interface SearchBarProps {
  onIsOpen: () => void;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="icons">
      <BsSearch onClick={handleIsOpen} />
      {isOpen && <SearchBar onIsOpen={handleIsOpen} />}
    </div>
  );
}
function SearchBar({ onIsOpen }: SearchBarProps) {
  const [search, setSearch] = useState('');

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setSearch('');
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div>
        <input type="submit" value="Buscar" />
      </div>
      <div>
        <input
          type="text"
          placeholder="Faça uma busca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="close" onClick={onIsOpen}>
        &times;
      </div>
    </form>
  );
}
