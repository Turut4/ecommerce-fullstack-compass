
interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  products: Product[];
}

function OrderSummary({ products }: OrderSummaryProps) {
  const subtotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  return (
    <div className="order-summary">
      <h3>Product</h3>
      {products.map((product, index) => (
        <div className="product-item" key={index}>
          <span>{`${product.name} x ${product.quantity}`}</span>
          <span className="subtotal">{`Rs. ${product.price.toFixed(2)}`}</span>
        </div>
      ))}
      <div className="separator"></div>
      <div className="summary">
        <div className="summary-item">
          <span>Subtotal</span>
          <span>{`Rs. ${subtotal.toFixed(2)}`}</span>
        </div>
        <div className="summary-item total">
          <span>Total</span>
          <span>{`Rs. ${subtotal.toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
