import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, customerId, paymentMethodId } = req.body;

    if (!amount || !customerId || !paymentMethodId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Step 1: Create a Payment Intent with a payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd",
      customer: customerId, // Use the existing customer ID
      payment_method: paymentMethodId, // Attach the payment method
     // off_session: true, // Indicate that the payment is happening off-session (e.g., without direct interaction)
      confirm: false, // Set to false, since we will confirm the payment separately
    });

    // Send the client_secret to the frontend to confirm the payment
    res.status(200).json({
      clientSecret: paymentIntent.client_secret, // Send the client_secret
    });
  } catch (error) {
    console.error("Error creating Payment Intent:", error.message);

    // Handle specific Stripe errors
    if (error.type === "StripeCardError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
}
