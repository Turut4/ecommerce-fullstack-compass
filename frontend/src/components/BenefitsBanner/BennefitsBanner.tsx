import './BeneftsBanner.css';
import HighQuality from './svgs/high-quality.svg';
import Warranty from './svgs/warranty.svg';
import FreeShipping from './svgs/free-shipping.svg';
import Support from './svgs/support.svg';
export default function BennefitsBanner() {
  return (
    <div className="benefits">
      <div className="benefits-content">
        <div className="benefits-item">
          <img src={HighQuality} alt="High Quality" />
          <div className="benefits-description">
            <span>High Quality</span>
            <p>crafted from top materials</p>
          </div>
        </div>
        <div className="benefits-item">
          <img src={Warranty} alt="Warranty Protection" />
          <div className="benefits-description">
            <span>Warranty Protection</span>
            <p>Over 2 years</p>
          </div>
        </div>
        <div className="benefits-item">
          <img src={FreeShipping} alt="Free Shipping" />
          <div className="benefits-description">
            <span>Free Shipping</span>
            <p>Order over 150 $</p>
          </div>
        </div>
        <div className="benefits-item">
          <img src={Support} alt="24/7 Support" />
          <div className="benefits-description">
            <span>24 / 7 Support</span>
            <p>Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
