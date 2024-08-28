import { BsPersonExclamation, BsCart, BsDoorOpen } from 'react-icons/bs';

export function NavButtons() {
  const token = localStorage.getItem('token');
  const isLogedIn = token ? true : false;
  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <div className="icons">
      {isLogedIn ? (
        <button onClick={handleLogOut}>
          <BsDoorOpen />
        </button>
      ) : (
        <a href="/signin">
          <BsPersonExclamation />
        </a>
      )}
      <a href="/cart">
        <BsCart />
      </a>
    </div>
  );
}
