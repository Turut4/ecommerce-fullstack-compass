import { BsPersonExclamation, BsCart } from 'react-icons/bs';

export function NavButtons() {
  return (
    <div className="icons">
      <BsPersonExclamation />
      <a href="/cart"><BsCart/></a>
    </div>
  );
}
