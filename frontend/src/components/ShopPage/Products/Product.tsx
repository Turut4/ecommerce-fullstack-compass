import { ComponentProps } from 'react';
import { Tag } from './Tag/Tag';

interface ProductProps extends ComponentProps<'div'> {
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  createdAt: string;
}

function formatCurrency(value: number): string {
  return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function Product({
  name,
  description,
  price,
  discount,
  image,
  createdAt,
}: ProductProps) {
  const newPrice = Math.ceil(price - (price * discount) / 100);
  const isNew =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 30;
  const isDiscount = discount > 0;
  return (
    <div className="product" style={{ width: '301px' }}>
      <div>
        <Tag isNew={isNew} isDiscount={isDiscount} discount={discount} />
        <img src={image} />
      </div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
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
  );
}
