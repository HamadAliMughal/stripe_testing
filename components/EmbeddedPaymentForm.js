"use client";

import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const EmbeddedPaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: 8800, // $88.00 in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
          setCanMakePayment(true);
        }
      });

      pr.on('paymentmethod', async (event) => {
        setIsProcessing(true);
        try {
          // You need to send event.paymentMethod.id to your server for further processing
          // For this example, we'll just simulate success
          event.complete('success');
          alert('Payment Successful!');
        } catch (error) {
          console.error(error);
          event.complete('fail');
          setErrorMessage('Payment failed. Please try again.');
        } finally {
          setIsProcessing(false);
        }
      });
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error('Stripe has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('CardElement not found.');
      return;
    }

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardName,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert('Payment Successful!');
    }

    setIsProcessing(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
      {canMakePayment && paymentRequest && (
        <div style={{ marginBottom: '20px' }}>
          <PaymentRequestButtonElement options={{ paymentRequest }} />
          <h3 style={{color:'black'}}>Heelo berrro</h3>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name on Card:
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
            style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        </label>
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
          <CardElement />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={isProcessing || !stripe} style={{ padding: '10px', width: '100%' }}>
          {isProcessing ? 'Processing...' : 'Pay $88'}
        </button>
      </form>
    </div>
  );
};

export default EmbeddedPaymentForm;
