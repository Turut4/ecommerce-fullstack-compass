import { formatCurrency } from '../ShopPage/Products/Product';
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

  return (
    <div className="cart-totals">
      <h2>Cart Totals</h2>
      <div className="totals-row">
        <span>Subtotal</span>
        <span>Rs. {subtotal.toLocaleString()}</span>
      </div>
      <div className="totals-row total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <button className="checkout-button">Check Out</button>
    </div>
  );
}
