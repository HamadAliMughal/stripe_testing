"use client";

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../utils/stipe';
import EmbeddedPaymentForm from '../../components/EmbeddedPaymentForm';

const Home = () => {
  return (
    <Elements stripe={stripePromise}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Stripe Payment Integration</h1>
        <EmbeddedPaymentForm />
      </div>
    </Elements>
  );
};

export default Home;
