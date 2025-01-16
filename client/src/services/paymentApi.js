import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const API_BASE_URL = 'https://sensegrass-69dv.onrender.com/api/payments';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


export const processPayment = async (stripe, clientSecret, cardElement, customerDetails) => {
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: customerDetails.name,
        address: customerDetails.address,
      },
    },
  });

  if (error) {
    console.error('Payment failed: ', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, paymentIntent };
};



// Create a payment intent
export const createPaymentIntent = async (price, product, currency = 'INR') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-payment-intent`, {
      price,
      product,
      currency,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error creating payment intent');
  }
};

// Save a transaction
export const saveTransaction = async (product, price, currency) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save-transaction`, {
      product,
      price,
      currency,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error saving transaction');
  }
};

// Get all transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error fetching transactions');
  }
};

