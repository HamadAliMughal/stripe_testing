"use client";

import React, { useState, useEffect } from "react";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

const EmbeddedPaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Total",
          amount: 8800, // $88.00 in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check if Google Pay is available
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
          setCanMakePayment(true);
        }
      });

      pr.on("paymentmethod", async (event) => {
        setIsProcessing(true);
        try {
          // Send the event.paymentMethod.id to your server for processing
          event.complete("success");
          alert("Google Pay Payment Successful!");
        } catch (error) {
          console.error(error);
          event.complete("fail");
          setErrorMessage("Google Pay Payment failed. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      });
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    setIsProcessing(true);

    try {
      const { token, error } = await stripe.createToken({
        card: {
          number: cardNumber,
          exp_month: expiry.split("/")[0],
          exp_year: expiry.split("/")[1],
          cvc,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        alert(`Payment Successful! Token: ${token.id}`);
        // Send the token to your server for further processing
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
      {canMakePayment && paymentRequest && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Pay with Google Pay:</h4>
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label style={{color:'black'}}>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="4242 4242 4242 4242"
            required
            style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
          />
        </label>
        <label style={{color:'black'}}>
          Expiration (MM/YY):
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            required
            style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
          />
        </label>
        <label style={{color:'black'}}>
          CVC:
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            required
            style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
          />
        </label>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit"  disabled={isProcessing || !stripe} style={{ padding: "10px", width: "100%" ,backgroundColor:'blue'}}>
          {isProcessing ? "Processing..." : "Pay $88"}
        </button>
      </form>
    </div>
  );
};

export default EmbeddedPaymentForm;
