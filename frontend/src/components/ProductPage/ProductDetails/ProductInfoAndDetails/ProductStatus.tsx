import './ProductStatus.css';
import { BsFacebook, BsLinkedin, BsTwitter } from 'react-icons/bs';

interface ProductInfoDetailsProps {
  sku: string;
  category: { id: string; name: string } | string;
  tags: string[];
}

export default function ProductInfoDetails({
  sku,
  category,
  tags,
}: ProductInfoDetailsProps) {
  console.log(category);
  const getCategoryName = () => {
    if (typeof category === 'string') {
      return category;
    }
    return category?.name || 'Unknown';
  };
  return (
    <div className="product-info-details">
      <div className="info-item">
        <span className="info-label">SKU</span>
        <span className="info-value">
          <span>:</span>
          {sku}
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">Category:</span>
        <span className="info-value">
          <span>:</span>
          {getCategoryName()}
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">Tag</span>
        <span className="info-value">
          <span>:</span>
          {tags.join(', ')}
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">Share</span>
        <div className="social-icons">
          <BsFacebook style={{cursor: 'pointer'}}/>
          <BsLinkedin style={{cursor: 'pointer'}}/>
          <BsTwitter style={{cursor: 'pointer'}}/>
        </div>
      </div>
    </div>
  );
}
