import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import BenefitsBanner from '../BenefitsBanner/BennefitsBanner';
import Footer from '../Footer/Footer';
import CartSession from './CartSession/CartSession';

export default function Cart() {
  return (
    <div>
      <Header />
      <Banner path="Cart" />
      <CartSession />
      <BenefitsBanner />
      <Footer />
    </div>
  );
}
