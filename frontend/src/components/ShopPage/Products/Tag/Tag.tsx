import './Tag.css';

interface TagProps {
  isNew: boolean;
  isDiscount: boolean;
  discount: number;
}
export function Tag({ isNew, isDiscount, discount }: TagProps) {
  if (isNew) {
    return (
      <div className="tags">
        <div className="new-tag">New</div>
      </div>
    );
  }
  if (isDiscount) {
    return (
      <div className="tags">
        {isDiscount && <div className="discount-tag">-{discount}%</div>}
      </div>
    );
  }
}
