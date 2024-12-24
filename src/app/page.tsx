"use client";

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../utils/stipe';
import UserSearch from '../../components/UserSearch';

const Home = () => {
  return (
    // <Elements stripe={stripePromise}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>User Subscription Data</h1>
        <UserSearch/>
      </div>
    // </Elements>
  );
};

export default Home;
