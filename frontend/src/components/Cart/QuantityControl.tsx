import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../../store/cartSlice';

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
    <div>
      <button onClick={() => dispatch(decreaseQuantity(id))} />
      <span>{quantity}</span>s
      <button onClick={() => dispatch(increaseQuantity(id))}></button>
    </div>
  );
}
