import './Path.css';
import { PathIcon } from '../../Banner/PathIcon';

interface PathProps {
  productName: string | undefined;
}

export default function Path({ productName }: PathProps) {
  return (
    <div className="path-session">
      <span className='path-fixed'>Home</span> <PathIcon /> <span className='path-fixed'>Shop</span> <PathIcon />
      <span className='product-path'>{productName}</span>
    </div>
  );
}
