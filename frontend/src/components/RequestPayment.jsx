import React, { useEffect, useState } from 'react'
//import StripeCheckout from "react-stripe-checout";
import axios from 'axios';


import CardSection from './CardSection';
import Button from "@material-ui/core/Button";

import {Elements, useElements, CardElement, useStripe} from '@stripe/react-stripe-js'


function RequestPayment(props) {

    const stripe = useStripe();
    const elements = useElements();
    const [secret, setSecret] = useState("");


    useEffect(() => {

        //axios
        

        axios
        .get("/payments/secret")
        .then(res => {
            console.log(res.data.client_secret);
            setSecret(res.data.client_secret);
        })
        .catch(err => console.log(err))
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            //stripe has not yet loaded, disable form submission until loaded
            console.log('damn')
            return;
        }

        const result = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if(result.paymentIntent.status === 'succeeded') {
                //payment has succeeded
                console.log('great success')
            }
        }
    }


    return(
        
        <form onSubmit={handleSubmit}>
            <CardSection />
            <Button disabled={!stripe} type="submit">Confirm Order</Button>
        </form>
        
    )
}

export default RequestPayment;