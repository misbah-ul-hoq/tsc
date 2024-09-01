// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import api from "../../../axios/api";

// import { FormEvent, useState } from "react";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// // Replace 'YOUR_STRIPE_TEST_PUBLISHABLE_KEY' with your actual test publishable key
// const stripePromise = loadStripe(
//   "pk_test_51PlT0qRxcgpNfVI0nCFVetvvycDbr5AQ7w9zNutmuxxczLfvSgxNn37QPq3VkNau2tWSpJ1CxYj81NIJeHXXWzXp00KxFNy29g"
// );

// function PaymentForm() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null | undefined>(null);
//   const params = useParams();
//   const stripe = useStripe();
//   const elements = useElements();
//   const { data } = useQuery({
//     queryKey: ["payment"],
//     queryFn: async () => {
//       const response = await api.get(`/study-session/${params.id}`);
//       return response.data;
//     },
//   });

//   console.log(data);
//   if (!data)
//     return (
//       <span className="loading loading-dots loading-lg text-secondary"></span>
//     );

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const { error: paymentError } = await stripe.confirmCardPayment(
//         // Replace 'YOUR_STRIPE_INTENT_ID' with your actual test intent ID
//         "YOUR_STRIPE_INTENT_ID",
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (paymentError) {
//         setError(paymentError.message);
//       } else {
//         // Handle successful payment (e.g., display a confirmation message)
//         console.log("Payment successful!");
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card w-full max-w-lg mx-auto my-5 shadow-lg">
//       <div className="card-body">
//         <form onSubmit={handleSubmit} className="form-control">
//           <div className="form-control mb-5">
//             <h2>Pay: {data.registrationFee} Taka</h2>
//           </div>
//           <CardElement className="card-element" />
//           <div className="form-control mt-6">
//             <button
//               className="btn btn-primary"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Processing..." : "Pay"}
//             </button>
//           </div>
//         </form>
//         {error && <p className="text-error">{error}</p>}
//       </div>
//     </div>
//   );
// }

// const Payment = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// };

// export default Payment;

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axios/api";
import { useAuth } from "../../../hooks/useAuth";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const response = await api.get(`/study-session/${params.id}`);
      return response.data;
    },
  });

  console.log(data);
  if (!data)
    return (
      <span className="loading loading-dots loading-lg text-secondary"></span>
    );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();
    setIsProcessingPayment(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      api
        .post(`/booked-sessions`, {
          sessionId: data._id,
          sessionTitle: data.sessionTitle,
          sessionDescription: data.sessionDescription,
          tutorEmail: data.tutorEmail,
          tutorName: data.tutorName,
          registrationStartDate: data.registrationStartDate,
          registrationEndDate: data.registrationEndDate,
          classStartDate: data.classStartDate,
          classEndDate: data.classEndDate,
          registrationFee: data.registrationFee,
          sessionDuration: data.sessionDuration,
          studentName: user?.displayName,
          studentEmail: user?.email,
        })
        .then((res) => {
          setIsProcessingPayment(false);
          if (res.data.acknowledged) {
            Swal.fire({
              title: "Payment successfull",
              text: "You have booked this session",
              icon: "success",
            });
          }
        })
        .catch((err: AxiosError) => {
          setIsProcessingPayment(false);
          Swal.fire({
            title:
              err.response?.status == 409
                ? "You have Already booked for this session"
                : err.message,
            icon: "error",
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h2 className="text-2xl font-semibold mb-3">
        Pay: {data.registrationFee} taka
      </h2>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {isProcessingPayment && (
        <span className="loading loading-spinner loading-lg text-warning mt-3 block"></span>
      )}
      <button type="submit" disabled={!stripe} className="btn btn-success mt-4">
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51PlT0qRxcgpNfVI0nCFVetvvycDbr5AQ7w9zNutmuxxczLfvSgxNn37QPq3VkNau2tWSpJ1CxYj81NIJeHXXWzXp00KxFNy29g"
);

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-4 min-h-[70vh]">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default PaymentPage;
