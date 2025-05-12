import React, { useEffect, useState } from "react";


import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const serverName = process.env.NEXT_PUBLIC_SERVER_NAME;
const namespace = process.env.NEXT_PUBLIC_NAMESPACE;
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
// interface subscriptionData {
//   subscription_id: string;
//   product_name: string;
//   start_date: string;
//   status: string;
//   can_reactivate: boolean;
//   can_retry: boolean;
//   renewal_date: string;
//   amount: string;
//   times_billed: number;
//   can_update_payment_method: boolean;
//   can_renew: boolean;
//   is_expired: boolean;
//   duration: string;
//   can_cancel: boolean;
//   update_payment_method_url: string;
//   renew_url: string;
//   cancel_url: string;
//   cancel_type: string;
//   reactivation_available: string;
// }
// interface PaymentMethodData {
//   address_city: string;
//   address_country: string | null;
//   address_line1: string;
//   address_line2: string;
//   address_state: string;
//   address_zip: string;
//   fingerprint: string;
//   id: string;
//   brand: string;
//   last4: string;
//   exp_month: any;
//   exp_year: any;
//   is_default: boolean;
// }
// interface Props {
//   data: subscriptionData | any;
// }

function calculateNewDate(dateString) {
  // Convert the input string to a Date object
  const date = new Date(dateString);

  // Add 11 months
  date.setMonth(date.getMonth() + 11);

  // Add 1 day
  date.setDate(date.getDate() + 1);

  // Define options to format the date in the desired format (e.g., "September 12, 2025")
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Return the formatted date string
  return date.toLocaleDateString("en-US", options);
}
function hasCancelDateCome(dateString) {
  // Calculate the new date using the calculateNewDate function
  const newDateString = calculateNewDate(dateString);

  // Parse the new date string back into a Date object
  const newDate = new Date(newDateString);

  // Get the current date without the time component
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Compare the new date with the current date
  return newDate < currentDate;
}

const stripePromise = loadStripe(
  stripePublicKey 
);
const Subscriptionbox = ({ data }) => {
 const [hover, setHover] = useState(false);
  const [deafultPayment, setDefaultPayment] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethodData, setpaymentMethodData] = useState([]);



  const handleSubscribe = () => {
    SetMessageOfAlertPopup(
      "Are you sure you want to restart your subscription?"
    );
    SetHeadingOfAlertPopup("Restart Subscription");
    setTheSubId(data[0].subscription_id);
    openAlertPopup();
  };

  function isDateInThePast(date) {
    const currentDate = new Date();
    const comparisonDate = new Date(date);

    // Check if the given date is in the past
    return comparisonDate < currentDate;
  }
  const handleNewSubscription = () => {
    // addToCart(379383);
    // setLoading(true);
    router.push("/pricing");
  };
  const handleAdd = (item) => {
    setPaymentMethodData(item);
    openPayment();
  };

  const handleRetry = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/"); // Redirect to home if no token is found
      return;
    }
    // setLoading(true);
    // console.log('Calliing function')
    setLoading(true);
    try {
      const response = await fetch(
        `${serverName}/${namespace}/user/subscription/retry`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription_id: data[0].subscription_id,
          }),
        }
      );

      if (response.status === 403) {
        router.replace("/");
        // setLoading(false);
        throw new Error("Failed to cancel the subscription");
      }

      const data1 = await response.json();
      // console.log(data1);
      if (response.ok) {
        SetHeadingOfAlertPopup("Subscription Details");
        SetMessageOfAlertPopup("Subscription retried successfully.");
        openAlertPopup();
        router.reload();
      } else {
        SetHeadingOfAlertPopup("Subscription Retry");
        SetMessageOfAlertPopup(data1.message);
        openAlertPopup();
        setLoading(false);
      }

      // console.log('Payment Method Data:', data);
    } catch (error) {
      // setLoading(false);
      console.error("Error:", error);
    }
  };
  const handlePaymentAdded = () => {
    router.reload();
  };
  const showInfo = (date) => {
    SetHeadingOfAlertPopup("Payment Details");
    if (data[0].duration === "Year") {
      SetMessageOfAlertPopup(
        `You have a legacy annual subscription that renews on ${data[0].renewal_date}. You may cancel at any time before the renewal date and your subscription will expire <b class='exp-date'> ${data[0].renewal_date}</b>`
      );
    } else {
      SetMessageOfAlertPopup(
        `Story Loop offers two purchase methods: the first is à la carte, where the user pays the full retail value of each product on Story Loop. The second is a Story Loop subscription, where the user receives unlimited downloads in exchange for a commitment of twelve monthly payments. The twelve-month requirement is displayed on the subscription sign-up page, in the cart during checkout, and in our terms of service. The option to cancel a subscription will be available during the final month of the twelve-month term.<br/><br/>A subscription cannot be cancelled before the final month of a subscription term.<br/>You will be able to cancel your subscription beginning <b class='exp-date'> ${calculateNewDate(
          date
        )}</b>`
      );
    }
    openAlertPopup();
  };
  const handleCancelPopup = () => {
    SetMessageOfAlertPopup(
      "Are you sure you want to cancel your subscription?"
    );
    SetHeadingOfAlertPopup("Cancel Subscription");
    setTheSubId(data[0].subscription_id);
    openAlertPopup();
  };
  const parseAmount = (amount) => {
    // Remove the HTML encoding (&#36;) and parse the float value
    return parseFloat(amount.replace("&#36;", ""));
  };
  if (!data) {
    return (
      <div className="subscription-box">
        <div className="profile-header-box">
          <h3>No active subscription</h3>
        </div>
      </div>
    );
  }
  if (data) {
    console.log("sub", data);
  }
  return (
    <>
      {loading && <Loading />}
      {data.length > 0 ? (
        <div className="subscription-box">
          <div className="profile-header-box">
            <h3>Subscription</h3>
            <p>Manage your Story Loop Subscription.</p>
          </div>
          <div className="subscription-item">
            <div className="subscription-item-header">
              <div className="column-left">
                <h5>{data[0].product_name}</h5>
                <div className="info-wrapper">
                  <div className="time-wrap">
                    {" "}
                    Times Billed <span>{data[0].times_billed}/12</span>
                  </div>
                  {!(
                    hasCancelDateCome(data[0].start_date) && data[0].can_cancel
                  ) &&
                    data[0].status !== "Cancelled" && (
                      <div className="info-content time-wrap">
                        {" "}
                        Locked into 12 monthly payments. You can’t make any
                        changes until{" "}
                        <span>
                          <b className="exp-date">
                            {calculateNewDate(data[0].start_date)}{" "}
                          </b>{" "}
                        </span>{" "}
                        <a
                          className="info-popup-btn newInfo"
                          onClick={() => showInfo(data[0].start_date)}
                        >
                          <div
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1349_12528)">
                                <path
                                  d="M7 6.7085V9.62516"
                                  stroke={
                                    hover
                                      ? "rgb(255, 255, 255)"
                                      : "rgb(219, 255, 145)"
                                  }
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M7 4.38099L7.00583 4.37451"
                                  stroke={
                                    hover
                                      ? "rgb(255, 255, 255)"
                                      : "rgb(219, 255, 145)"
                                  }
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M6.99984 12.8332C10.2215 12.8332 12.8332 10.2215 12.8332 6.99984C12.8332 3.77817 10.2215 1.1665 6.99984 1.1665C3.77817 1.1665 1.1665 3.77817 1.1665 6.99984C1.1665 10.2215 3.77817 12.8332 6.99984 12.8332Z"
                                  stroke={
                                    hover
                                      ? "rgb(255, 255, 255)"
                                      : "rgb(219, 255, 145)"
                                  }
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1349_12528">
                                  <rect
                                    width="14"
                                    height="14"
                                    fill="rgb(229, 255, 145)"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </a>
                      </div>
                    )}
                </div>
              </div>
              <div className="column-right">
                <h6> $ {parseAmount(data[0].amount)}</h6>
                {data[0].duration === "Year" ? (
                  <span>year</span>
                ) : (
                  <span>month</span>
                )}
              </div>
            </div>
            <div className="subscription-item-details">
              <div className="column-1">
                <span>Status</span>
                <p>{data[0].status}</p>
              </div>
              <div className="column-2">
                <span>Start Date</span>
                <p>{data[0].start_date}</p>
              </div>
              <div className="column-3">
                <span>Renewal Date</span>
                {<p>{data[0].renewal_date}</p>}
              </div>
              <div className="column-4">
                <Link href="receipts/" className="view-receipt-btn">
                  View Receipts {data[0].can_renew}
                </Link>
                {data[0].can_update_payment_method && (
                  <a
                    className="add-button hover-plus"
                   
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 4.1665V15.8332"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M4.1665 10H15.8332"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </a>
                )}
                {/* {data[0].can_reactivate && data[0].reactivation_available ? (
                  <Link
                    href="#"
                    onClick={() => handleSubscribe()}
                    className="view-receipt-btn"
                  >
                    Restart Subscription
                  </Link>
                ) : (
                  <Link
                    href="#"
                    onClick={() => handleNewSubscription()}
                    className="view-receipt-btn"
                  >
                    Start New Subscription
                  </Link>
                )} */}

                {data[0].status === "Cancelled" &&
                  (data[0].can_reactivate && data[0].reactivation_available  ? (
                    <Link
                      href="#"
                      
                      className="view-receipt-btn"
                    >
                      Restart Subscription
                    </Link>
                  ) : (
                  
                  (!data[0]?.is_expired &&  <Link
                      href="#"
                    
                      className="view-receipt-btn"
                    >
                      Start New Subscription
                    </Link>
                  )
                  ))}

                {data[0].can_retry && (
                  <Link
                    href="#"
                   
                    className="view-receipt-btn"
                  >
                    {"Retry Payment For Existing Subscription"}
                  </Link>
                )}
                {data[0].is_expired && (
                  <Link
                    href="#"
               
                    className="view-receipt-btn"
                  >
                    {"Start New Subscription"}
                  </Link>
                )}

                {/* {data[0].status === "Cancelled" &&
                  data[0].reactivation_available === false &&
                  data[0].cancel_type === "immediate" && (
                    <Link
                      href="#"
                      onClick={() => handleNewSubscription()}
                      className="view-receipt-btn"
                    >
                      {"Start New Subscription"}
                    </Link>
                  )} */}

                {hasCancelDateCome(data[0].start_date) &&
                  data[0].can_cancel && (
                    <a
                      href="#"
                     
                      className="view-receipt-btn"
                    >
                      {"Cancel"}
                    </a>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="subscription-box">
          <div className="profile-header-box">
            <h3>You don&apos;t have any subscriptions</h3>
          </div>
        </div>
      )}
    
   
    </>
  );
};

export default Subscriptionbox;
