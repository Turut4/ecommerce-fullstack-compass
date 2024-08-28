import { Product } from '../../../../hooks/useProduct';
import { formatCurrency } from '../../../ShopPage/Products/Product';
import Star from '../../../../assets/icons/star.svg';
import './ProductInfo.css';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      <h2 className="product-title">{product.name}</h2>
      <span className="product-price">{formatCurrency(product.price)}</span>
      <div className="reviews">
        <div className='stars'>
          {Array.from({ length: 5 }, (_, index) => (
            <img key={index} src={Star} alt="Star" />
          ))}
        </div>
        <div>
          <span className='reviews-quantity'>Custumers reviews 5</span>
        </div>
      </div>
      <div className="description">
        <span>{product.description}</span>
      </div>
    </div>
  );
}
