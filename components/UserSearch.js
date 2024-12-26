//  "use client";

// import React, { useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// const EmbeddedPaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting form");

//     if (!stripe || !elements) {
//       console.error("Stripe has not loaded yet.");
//       setErrorMessage("Stripe.js is not loaded. Please refresh the page.");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       // Get the CardElement
//       const cardElement = elements.getElement(CardElement);
//       if (!cardElement) {
//         setErrorMessage("Card element not found.");
//         setIsProcessing(false);
//         return;
//       }

//       // Step 1: Create the payment method
//       const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//         billing_details: {
//           name: "John Doe", // Replace with user's actual name
//         },
//       });

//       if (paymentMethodError) {
//         setErrorMessage(paymentMethodError.message || "Failed to create payment method.");
//         setIsProcessing(false);
//         return;
//       }

//       // Step 2: Create a customer and attach the payment method
//       const customerResponse = await fetch("/api/create-customer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: "2020cs152@gmail.com", // Replace with actual user's email
//           name: "Hamad Ali", // Replace with actual user's name
//           paymentMethodId: paymentMethod.id, // Send the payment method ID to the backend
//         }),
//       });

//       const customerData = await customerResponse.json();
//       if (!customerResponse.ok) {
//         setErrorMessage(customerData.error || "Failed to create customer.");
//         setIsProcessing(false);
//         return;
//       }

//       const customerId = customerData.customerId;
//       console.log("Customer created:", customerId);

//       // Step 3: Create a payment intent for the customer
//       const intentResponse = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: 8800, // $88.00 in cents
//           customerId: customerId, // Send the customer ID
//           paymentMethodId: paymentMethod.id, // Send the payment method ID
//         }),
//       });

//       const intentData = await intentResponse.json();
//       if (!intentResponse.ok) {
//         setErrorMessage(intentData.error || "Failed to create payment intent.");
//         setIsProcessing(false);
//         return;
//       }

//       const clientSecret = intentData.clientSecret;
//       console.log("Payment Intent created:", clientSecret);

//       // Step 4: Confirm the payment
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentMethod.id, // Use the payment method ID created earlier
//       });

//       if (error) {
//         console.error("Payment Error:", error);
//         setErrorMessage(error.message || "Payment failed. Please try again.");
//       } else if (paymentIntent && paymentIntent.status === "succeeded") {
//         console.log("Payment succeeded:", paymentIntent);
//         alert("Payment successful!");
//       }
//     } catch (error) {
//       console.error("Unexpected error during payment:", error);
//       setErrorMessage("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "400px",
//         margin: "auto",
//         padding: "20px",
//         background: "transparent",
//         borderRadius: "8px",
//       }}
//     >
//       <form onSubmit={handleSubmit}>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Card Details:
//         </label>
//         <div
//           style={{
//             backgroundColor: "white",
//             padding: "10px",
//             borderRadius: "6px",
//           }}
//         >
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "black",
//                   "::placeholder": {
//                     color: "#aab7c4",
//                   },
//                 },
//                 invalid: {
//                   color: "red",
//                 },
//               },
//             }}
//           />
//         </div>
//         {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//         <button
//           type="submit"
//           disabled={isProcessing || !stripe}
//           style={{
//             padding: "10px",
//             width: "100%",
//             height: "70px",
//             backgroundColor: "#BA0C2F",
//             color: "#fff",
//             border: "none",
//             borderRadius: "8px",
//             fontSize: "16px",
//             marginTop: "55px",
//           }}
//         >
//           {isProcessing ? "Processing..." : "Complete Your Purchase"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmbeddedPaymentForm;


"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Subscriptionbox from './Subscription';
const calculateNewDate = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 30);
  return date.toISOString().split("T")[0];
};

const hasCancelDateCome = (dateString) => {
  const newDateString = calculateNewDate(dateString);
  const newDate = new Date(newDateString);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return newDate < currentDate;
};

const UserSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [ctaDetails, setCtaDetails] = useState([]);
  const [mainData, setMainData]=useState(null)
  const [error, setError] = useState("");

  useEffect(() => {
    const queryUserId = searchParams.get("user_id");
    if (queryUserId) {
      setUserId(queryUserId);
      fetchUserData(queryUserId);
    }
  }, [searchParams]);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(
        `https://storyloop.com/wp-json/debug/v1/user/subscriptions?user_id=${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);
        
      const firstSubscription = data[0];
      const firstCtaDetails = firstSubscription?.cta_details || [];
      const startDate = firstSubscription?.start_date;
      const canShowCancelButton = startDate
        ? hasCancelDateCome(startDate)
        : false;

      const updatedCtaDetails = firstCtaDetails.map((cta) => {
        if (cta.ctaBtn === "Cancel" && !canShowCancelButton) {
          return null;
        }
        return cta;
      }).filter(Boolean);

      setCtaDetails(updatedCtaDetails);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleSearch = () => {
    if (!userId.trim()) {
      setError("Please enter a valid user ID");
      return;
    }

    setError("");
    setUserData(null);
    setCtaDetails([]);
    router.push(`?user_id=${userId}`);
    fetchUserData(userId);
  };

  return (
    <>
    <div
      style={{
        backgroundColor: "white",
      
        color: "black",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h3 style={{ textAlign: "center", color: "black" }}>
        Search User Data Here
      </h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background:'white',
            color: "black",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {ctaDetails.length > 0 ? (
        <div>
          <h4>CTA Details of Subscription</h4>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "10px",
              background:'#4ad259ed',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Button
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ctaDetails.map((cta, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign:'left'
                    }}
                  >
                    {cta.ctaBtn}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign:'left'
                    }}
                  >
                    {cta.ctaAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          No button should display
        </p>
      )}
     <Subscriptionbox data={userData}/>

<br></br>
     <h4>The API response: </h4>
      <textarea
        readOnly
        value={userData ? JSON.stringify(userData, null, 2) : ""}
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          color: "black",
        }}
        placeholder="User data will appear here..."
      />
    </div>
     
      </>


  );
};

export default function UserSearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserSearch />
    </Suspense>
  );
}
