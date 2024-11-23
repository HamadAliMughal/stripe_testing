
"use client";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PgM3ERrXZMuJmTGxuePJkqFCbXYgnV35djshusb2zYOQlydY7LqxBMVZJxYJ9zyCEOooyjo91mKyzf6TUERzvoz001jFYTYq6'); // Replace with your Stripe publishable key

export default stripePromise;
