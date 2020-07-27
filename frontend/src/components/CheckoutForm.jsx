import React from 'react'

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmP24Payment('secret', {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if(result.error) {
            console.log(result.error.message);
        } else {
            if(result.paymentIntent.status === 'succeeded') {
                console.log("Great Success!")
            }
        }
    }
}