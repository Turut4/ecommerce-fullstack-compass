import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../ShopPage/Products/Product';
import QuantityControl from './QuantityControl';
import { removeItemFromCart } from '../../../store/cartSlice';
import TrashIcon from '../../../assets/icons/trash.svg';
import { useNavigate } from 'react-router-dom';

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
  const navigete = useNavigate();

  const handleItemClick = (id: string) => {
    navigete(`/shop/${id}`);
  };
  return (
    <tr className="cart-item">
      <td className="miniature">
        <img
          src={image}
          alt={name}
          className="product-image"
          onClick={() => handleItemClick(id)}
        />
        <span className="item-name">{name}</span>
      </td>
      <td className="item-price">{formatCurrency(price)}</td>
      <td>
        <QuantityControl quantity={quantity} id={item.id} />
      </td>
      <td>{formatCurrency(price * quantity)}</td>
      <td>
        <button
          className="remove-item"
          onClick={() => dispatch(removeItemFromCart(id))}
        >
          <img src={TrashIcon} alt="Remove" />
        </button>
      </td>
    </tr>
  );
}
