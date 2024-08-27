import './Header.css';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { NavButtons } from './NavButtons';

export default function Header() {
  return (
    <header>
      <Logo />
      <NavLinks />
      <NavButtons />
    </header>
  );
}
