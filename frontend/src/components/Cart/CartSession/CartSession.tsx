import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import CartTotals from './CartTotals';
import { RootState } from '../../../store/store';
import './CartSession.css'

export default function CartSession() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <div className="cart-page">
      <div className="cart-items">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <CartTotals items={cartItems} />
    </div>
  );
}
