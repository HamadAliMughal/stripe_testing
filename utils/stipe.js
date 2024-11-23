
"use client";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_4NvvktNi6W8LjRam8qMrCY86'); // Replace with your Stripe publishable key

export default stripePromise;
