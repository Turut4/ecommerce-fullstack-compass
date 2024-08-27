import { ComponentProps } from 'react';
import { Tag } from './Tag/Tag';
import { BsHeart, BsShare, BsArrowLeftRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../store/cartSlice';

interface ProductProps extends ComponentProps<'div'> {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  createdAt: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export function formatCurrency(value: number): string {
  return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function Product({
  id,
  name,
  description,
  price,
  discount,
  image,
  createdAt,
}: ProductProps) {
  const dispatch = useDispatch();
  const newPrice = Math.ceil(price - (price * discount) / 100);
  const isNew =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 30;
  const isDiscount = discount > 0;

  return (
    <div className="product" style={{ width: '301px' }}>
      <div>
        <div className="product-overlay">
          <button
            onClick={() => {
              dispatch(addItemToCart({ id, name, price, quantity: 1, image }));
            }}
          >
            Add to cart
          </button>
          <div>
            <span>
              <BsShare /> Share
            </span>
            <span>
              <BsArrowLeftRight /> Compare
            </span>
            <span>
              <BsHeart /> Like
            </span>
          </div>
        </div>
        <Tag isNew={isNew} isDiscount={isDiscount} discount={discount} />
        <img src={image} />
      </div>
      <div className="details">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="price">
          <p style={{ fontWeight: '600', fontSize: '20px' }}>
            {formatCurrency(newPrice)}
          </p>
          {isDiscount && (
            <p style={{ textDecoration: 'line-through', color: '#B0B0B0' }}>
              {formatCurrency(price)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
