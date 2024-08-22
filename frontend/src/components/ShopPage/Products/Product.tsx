import { ComponentProps } from 'react';

interface ProductProps extends ComponentProps<'div'> {
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
}

export function Product({
  name,
  description,
  price,
  discount,
  image,
}: ProductProps) {
  return (
    <div style={{ width: '301px' }}>
      <img src={image} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p style={{ fontWeight: '600', fontSize: '20px' }}>Rp {price}</p>
        {discount && (
          <p style={{ textDecoration: 'line-through', color: '#B0B0B0' }}>
            Rp1500
          </p>
        )}
      </div>
    </div>
  );
}
