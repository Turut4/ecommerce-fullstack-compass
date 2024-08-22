import './Banner.css';

export default function Banner() {
  return (
    <div className="banner">
      <div>
        <h2>Shop</h2>
      </div>
      <div>
        <h3>
          Home <PathIcon /> <span style={{ fontWeight: '500' }}>Shop</span>
        </h3>
      </div>
    </div>
  );
}

function PathIcon() {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z" fill="black" />
    </svg>
  );
}
