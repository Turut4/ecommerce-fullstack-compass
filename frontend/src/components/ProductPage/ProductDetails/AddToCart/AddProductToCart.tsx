import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../../store/cartSlice';
import { Product } from '../../../../hooks/useProduct';
import './AddProductToCart.css';

interface AddProductToCartProps {
  product: Product;
}
export default function AddProductToCart({ product }: AddProductToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { id, name, price, images } = product;
  const image = images[0];
  const dispatch = useDispatch();

  useEffect(() => {
    if (quantity < 1) setQuantity(1);
  }, [quantity]);

  return (
    <div className='add-to-cart-session'>
      <div className='quantity-buttons'>
        <button onClick={() => setQuantity((qunatity) => qunatity - 1)}>
          -
        </button>
        <span>{quantity}</span>

        <button onClick={() => setQuantity((qunatity) => qunatity + 1)}>
          +
        </button>
      </div>
      <button style={{cursor: 'pointer'}}
        onClick={() =>
          dispatch(addItemToCart({ id, name, price, image, quantity }))
        }
        className="add-to-cart"
      >
        Add to cart
      </button>
    </div>
  );
}
