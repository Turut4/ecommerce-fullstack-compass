import './Header.css';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { NavButtons } from './NavButtons';

interface HeaderProps {
  search: string;
  onSetSearch: (search: string) => void;
}

export default function Header({ search, onSetSearch }: HeaderProps) {
  return (
    <header>
      <Logo />
      <NavLinks />
      <NavButtons search={search} onSetSearch={onSetSearch} />
    </header>
  );
}
