import { useDispatch } from 'react-redux';
import { formatCurrency } from '../ShopPage/Products/Product';
import QuantityControl from './QuantityControl';
import { removeItemFromCart } from '../../store/cartSlice';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}
export default function CartItem({ item }: CartItemProps) {
  const { id, name, price, quantity, image } = item;
  const dispatch = useDispatch();
  return (
    <tr className="cart-item">
      <td>
        <img src={image} alt={name} className="product-image" />
        <span>{name}</span>
      </td>
      <td>Rs. {price.toLocaleString()}</td>
      <td>
        <QuantityControl quantity={quantity} id={item.id} />
      </td>
      <td>{formatCurrency(price)}</td>
      <td>
        <button
          className="remove-item"
          onClick={() => dispatch(removeItemFromCart(id))}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
