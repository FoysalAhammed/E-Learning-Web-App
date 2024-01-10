import React, { useState,useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "../../../redux/features/orders/orderApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { styles } from "../../.../../../app/styles/style";
import toast from "react-hot-toast";
import { redirect } from 'next/navigation'
import socketIo from "socket.io-client"
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIo(ENDPOINT,{transports:["websocket"]});
type Props = {
  setOpen: any;
  data: any;
  user: any;

};

const CheckoutForm = ({ setOpen, data,user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      setMessage("payment succedeed");
      createOrder({ courseId: data._id, payment_Info: paymentIntent });

    }
  };
  useEffect(() => {
     if (orderData) {
      
        setLoadUser(true);
        console.log(data.name)
        socketId.emit("notification",{
          title:"New Order",
          Message:`You have a new order form ${data.name}`,
          
          userId:user._id,
        })
        redirect(`/course-access/${data._id}`);
     }
     if (error) {
        if ("data" in error) {
            const errorMessage= error as any;
            toast.error(errorMessage.data.message)
        }
     }
  }, [orderData,error])
  
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${styles.button} mt-2 !h-[35px] `}>
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-[red]">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
