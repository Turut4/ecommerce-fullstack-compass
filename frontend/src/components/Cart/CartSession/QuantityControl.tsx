import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../../../store/cartSlice';

interface QuantityControlProps {
  id: string;
  quantity: number;
}
export default function QuantityControl({
  id,
  quantity,
}: QuantityControlProps) {
  const dispatch = useDispatch();

  return (
    <div className="quantity-control">
      <button onClick={() => dispatch(decreaseQuantity(id))}>-</button>
      <span>{quantity}</span>
      <button onClick={() => dispatch(increaseQuantity(id))}>+</button>
    </div>
  );
}
