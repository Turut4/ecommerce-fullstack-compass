import { BsPersonExclamation, BsCart } from 'react-icons/bs';
import Search from './Search';

interface NavButtonsProps {
  search: string;
  onSetSearch: (search: string) => void;
}

export function NavButtons({ search, onSetSearch }: NavButtonsProps) {
  return (
    <div className="icons">
      <BsPersonExclamation />
      <Search search={search} onSetSearch={onSetSearch} />
      <BsCart />
    </div>
  );
}
