import React, { useState } from 'react';
import { FormData } from './BillingDetails';

interface BillingFormProps {
  onSubmit: (data: FormData) => void;
  user: {
    username: string;
    email: string;
  };
}

function BillingForm(props: BillingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: props.user.username,
    lastName: '',
    companyName: '',
    zipCode: '',
    country: '',
    streetAddress: '',
    town: '',
    province: '',
    addOnAddress: '',
    email: props.user.email,
    additionalInfo: '',
    paymentMethod: 'bankTransfer',
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handlePaymentMethodChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setFormData({ ...formData, paymentMethod: event.target.value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Billing details</h2>
      <div className="form-group">
        <div className="full-name">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label htmlFor="companyName">Company Name (Optional)</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Company Name (Optional)"
          value={formData.companyName}
          onChange={handleChange}
        />

        <label htmlFor="zipCode">ZIP code</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          placeholder="ZIP code"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />

        <label htmlFor="country">Country / Region</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="Country / Region"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <label htmlFor="streetAddress">Street address</label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          placeholder="Street address"
          value={formData.streetAddress}
          onChange={handleChange}
          required
        />

        <label htmlFor="town">Town / City</label>
        <input
          type="text"
          id="town"
          name="town"
          placeholder="Town / City"
          value={formData.town}
          onChange={handleChange}
          required
        />

        <label htmlFor="province">Province</label>
        <input
          type="text"
          id="province"
          name="province"
          placeholder="Province"
          value={formData.province}
          onChange={handleChange}
        />

        <label htmlFor="addOnAddress">Add-on address</label>
        <input
          type="text"
          id="addOnAddress"
          name="addOnAddress"
          placeholder="Add-on address"
          value={formData.addOnAddress}
          onChange={handleChange}
        />

        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="additionalInfo">Additional information</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          placeholder="Additional information"
          value={formData.additionalInfo}
          onChange={handleChange}
        />

        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            value="bankTransfer"
            checked={formData.paymentMethod === 'bankTransfer'}
            onChange={handlePaymentMethodChange}
          />
          Direct Bank Transfer
        </label>

        <label>
          <input
            type="radio"
            value="cashOnDelivery"
            checked={formData.paymentMethod === 'cashOnDelivery'}
            onChange={handlePaymentMethodChange}
          />
          Cash On Delivery
        </label>

        <p>
          Make your payment directly into our bank account. Please use your
          Order ID as the payment reference. Your order will not be shipped
          until the funds have cleared in our account.
        </p>
      </div>

      <button style={{ cursor: 'pointer' }} type="submit">
        Place order
      </button>
    </form>
  );
}

export default BillingForm;
