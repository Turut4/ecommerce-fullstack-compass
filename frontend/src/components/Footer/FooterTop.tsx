import FooterSection from './FooterSection';
import NewsletterForm from './NewsletterForm.tsx';

export default function FooterTop() {
  return (
    <div className="footer-container">
      <div className="address">
        <h2>Funiro.</h2>
        <address>
          400 University Drive Suite 200 Coral Gables,
          <br />
          FL 33134 USA
        </address>
      </div>
      <FooterSection title="Links">
        <ul className="footer-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </FooterSection>
      <FooterSection title="Help">
        <ul className="footer-links">
          <li>
            <a href="#">Payment Options</a>
          </li>
          <li>
            <a href="#">Returns</a>
          </li>
          <li>
            <a href="#">Privacy Policies</a>
          </li>
        </ul>
      </FooterSection>
      <FooterSection title="Newsletter">
        <NewsletterForm />
      </FooterSection>
    </div>
  );
}
