import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../ShopPage/Products/Product';
interface CartTotalsProps {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export default function CartTotals({ items }: CartTotalsProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal;
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-totals">
      <h2>Cart Totals</h2>
      <div className="totals-row">
        <span>Subtotal</span>
        <span className="subtotal">{formatCurrency(total)}</span>
      </div>
      <div className="totals-row">
        <span>Total</span>
        <span className="total">{formatCurrency(total)}</span>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Check Out</button>
    </div>
  );
}
