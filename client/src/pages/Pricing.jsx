import React, { useState, useEffect } from 'react';
import { createPaymentIntent, saveTransaction, getTransactions, processPayment } from '../services/paymentApi';
import PriceCard from '../components/PriceCard';
import { pricingData } from '../lib/pricingData';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [transactions, setTransactions] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const stripe = useStripe();
  const elements = useElements();
   const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  const makePayment = async (price, product) => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const { clientSecret } = await createPaymentIntent(price, product);
      setClientSecret(clientSecret);
      setSelectedPrice(price);
      setSelectedProduct(product);
      setShowPopup(true);
    } catch (error) {
      console.error('Error creating payment intent:', error.message);
    }
  };

  const handlePaymentSubmit = async () => {
    const cardElement = elements.getElement(CardElement);
    
    if (cardElement && stripe) {
      const customerDetails = {
        name: customerName,
        address: {
          line1: customerAddress,
          city: "City",
          country: "IN",
        },
      };

      const paymentResult = await processPayment(stripe, clientSecret, cardElement, customerDetails);
      if (paymentResult.success) {
        await saveTransaction(selectedProduct, selectedPrice, 'INR');
        fetchTransactions();
        setShowPopup(false);

        toast.success('Payment Successful!');
      } else {
        console.error('Payment failed:', paymentResult.error);
        toast.error('Payment failed, please try again.');
      }
    }
  };

  const { heading, subHead, plans } = pricingData;

  return (
    
    <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
      
      <ToastContainer />
      <button
            onClick={() => navigate('/farmerdashboard')}
            className="absolute top-0 left-10 mb-4 p-3  bg-transparent text-white font-semibold hover:text-blue-600 mt-4"
        >
            🡸 Go Back
        </button>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex flex-col items-center">
          <h1 className="text-[32px] font-medium md:text-hero md:font-semibold text-center">
            {heading}
          </h1>
          <p className="text-center md:text-2xl text-subHead">{subHead}</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 pt-4 md:grid-cols-2 md:max-w-[920px]">
          {plans.map(({ heading, subHead, price, priceDesc, features, renewal }, id) => (
            <div key={id} onClick={() => makePayment(price, heading)}>
              <PriceCard
                heading={heading}
                subHead={subHead}
                price={price}
                priceDesc={priceDesc}
                features={features}
                renewal={renewal}
              />
            </div>
          ))}
        </div>
      </div>

 
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Complete Your Payment</h2>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-md mb-4"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)} 
              />
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-md mb-4"
                placeholder="Address Line 1"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)} 
              />
              <CardElement className="w-full p-4 border border-gray-300 rounded-md" />
            </div>
            <button
              onClick={handlePaymentSubmit}
              disabled={!stripe || !clientSecret}
              className="w-full py-2 bg-blue-500 text-white rounded-md mt-4 disabled:bg-gray-400"
            >
              Pay Now
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full py-2 bg-gray-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-left">Payment History</h1>
      </div>
      <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
        <table className="w-full table-auto">
          <thead className="text-fuchsia-200">
            <tr>
              <th className="px-4 text-left">S.No</th>
              <th className="px-4 text-left">Product</th>
              <th className="px-4 text-left">Currency</th>
              <th className="px-4 text-left">Price</th>
              <th className="px-4 text-left">Paid on</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ product, price, currency, createdAt, _id }, index) => (
              <tr key={_id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{product}</td>
                <td className="px-4 py-2">{currency}</td>
                <td className="px-4 py-2">{price}</td>
                <td className="px-4 py-2">{new Date(createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pricing;




