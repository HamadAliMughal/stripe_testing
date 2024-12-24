import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, name, paymentMethodId } = req.body;

    if (!email || !name || !paymentMethodId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Step 1: Create a customer
    const customer = await stripe.customers.create({
      email,
      name,
    });

    // Step 2: Attach payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Step 3: Set the payment method as the default payment method for the customer
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    res.status(200).json({
      customerId: customer.id,
      message: "Customer created and payment method attached successfully",
    });
  } catch (error) {
    console.error("Error creating customer or attaching payment method:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
