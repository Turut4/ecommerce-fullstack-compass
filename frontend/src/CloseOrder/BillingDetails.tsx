import { useSelector } from 'react-redux';
import BillingForm from './BillingForm';
import OrderSummary from './OrderSummary';
import { RootState } from '../store/store';
import { User } from '../hooks/useUser';
import { CartItem } from '../store/cartSlice';
import './BillingDetail.css';
import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import BenefitsBanner from '../components/BenefitsBanner/BennefitsBanner';
import { useNavigate } from 'react-router-dom';

export interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  zipCode: string;
  country: string;
  streetAddress: string;
  town: string;
  province: string;
  addOnAddress: string;
  email: string;
  additionalInfo: string;
  paymentMethod: string;
}

async function fetchOrder(
  user: User,
  formData: FormData,
  cartItems: CartItem[],
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_API_URL}/orders/${user.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: `${formData.streetAddress}, ${formData.province} ${formData.town}, ${formData.zipCode}, ${formData.country}`,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          createOrderItems: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          additional_information: formData.additionalInfo || '',
          email: formData.email,
          company: formData.companyName || '',
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
      console.log(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

function BillingDetails() {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  async function handleSubmit(formData: FormData) {
    const order = await fetchOrder(user, formData, cartItems);
    if (order) {
      alert('Order placed successfully');
      setTimeout(() => {
        navigate('/shop');
      }, 1000);
    }
  }

  return (
    <>
      <Header />
      <Banner path="Checkout" />
      <div className="billing-details-container">
        <BillingForm onSubmit={handleSubmit} user={user} />
        <OrderSummary products={cartItems} />
      </div>
      <BenefitsBanner />
      <Footer />
    </>
  );
}

export default BillingDetails;
