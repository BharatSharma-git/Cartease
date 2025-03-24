import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { clearCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("returning");
      return;
    }
    console.log("not returning");

    const cardElement = elements.getElement(CardElement);
    // console.log("CardElement", CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setSuccess(true);
      // console.log("PaymentMethod:", paymentMethod);

      dispatch(clearCart());
    }
  };

  return (
    <>
      {!success && (
        <>
          <h1 className="text-2xl font-bold mb-5 text-center ">Checkout</h1>
          <form
            className="flex flex-col gap-10 border-2 bg-gray-100 border-gray-300 px-5 py-8 mx-auto rounded-lg max-w-[600px] "
            onClick={handleSubmit}
          >
            <CardElement className="" />
            <button
              type="submit"
              disabled={!stripe}
              className="bg-green-500 hover:bg-green-600 text-lg text-white font-bold py-2 px-12 rounded-3xl mx-auto transition-all "
            >
              Pay
            </button>
            {error && <div>{error}</div>}
            {/* {success && <div>Payment successful!</div>} */}
          </form>
        </>
      )}
      {success && (
        <div className="flex flex-col items-center">
          <IoIosCheckmarkCircle size="100" className="text-green-500" />
          <h1 className="text-lg font-bold">Payment Sucessful</h1>

          <NavLink to={`/`}>
            <h1 className="text-blue-500 hover:font-bold">Continue Shoping</h1>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;

// import React, { useState, useEffect } from "react";
// import {
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { clearCart } from "../features/cart/cartSlice";
// import { useDispatch } from "react-redux";
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { NavLink } from "react-router-dom";
// import axios from "axios";

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const dispatch = useDispatch();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     axios
//       .post(
//         "https://api.stripe.com/v1/payment_intents",
//         {
//           amount: 1099, // amount in cents
//           currency: "usd",
//           payment_method_types: ["card"],
//         },
//         {
//           headers: {
//             Authorization: `Bearer sk_test_51PMRnoGzKQk7WiBaNgw2EovkVfGokkkDNSA4OowrD6IIYuNezv2OnYppoDU9ud5VCcKTI6LsKgDbrbVSnjUofUWf00Tm00i25h`,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       )
//       .then((response) => {
//         setClientSecret(response.data.client_secret);
//       })
//       .catch((error) => {
//         console.error("Error creating payment intent:", error);
//       });
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       console.log("Stripe or elements not loaded");
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Return URL after payment confirmation
//         return_url: "http://localhost:5173/checkout",
//       },
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       setError(null);
//       setSuccess(true);
//       dispatch(clearCart());
//     }
//   };

//   return (
//     <>
//       {!success && (
//         <>
//           <h1 className="text-2xl font-bold mb-5 text-center">Checkout</h1>
//           <form
//             className="flex flex-col gap-10 border-2 bg-gray-100 border-gray-300 px-5 py-8 mx-auto rounded-lg max-w-[600px]"
//             onSubmit={handleSubmit}
//           >
//             <PaymentElement />
//             <button
//               type="submit"
//               disabled={!stripe || !clientSecret}
//               className="bg-green-500 hover:bg-green-600 text-lg text-white font-bold py-2 px-12 rounded-3xl mx-auto transition-all"
//             >
//               Pay
//             </button>
//             {error && <div>{error}</div>}
//           </form>
//         </>
//       )}
//       {success && (
//         <div className="flex flex-col items-center">
//           <IoIosCheckmarkCircle size="100" className="text-green-500" />
//           <h1 className="text-lg font-bold">Payment Successful</h1>
//           <NavLink to={`/`}>
//             <h1 className="text-blue-500 hover:font-bold">Continue Shopping</h1>
//           </NavLink>
//         </div>
//       )}
//     </>
//   );
// };

// export default CheckoutForm;
