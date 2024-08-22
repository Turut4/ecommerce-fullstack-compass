import { BsHeart, BsPersonExclamation, BsCart } from 'react-icons/bs';
import Search from './Search';
import './Header.css';

export default function Header() {
  return (
    <header>
      <Logo />
      <NavLinks />
      <NavButtons />
    </header>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img src="src/assets/logo.png" alt="Compass Logo" />
      <h1>Compass</h1>
    </div>
  );
}

function NavLinks() {
  return (
    <nav className="nav-pages">
      <a href="#">Home</a>
      <a href="#">Shop</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  );
}

function NavButtons() {
  return (
    <div className="icons">
      <BsPersonExclamation />
      <Search />
      <BsHeart />
      <BsCart />
    </div>
  );
}
