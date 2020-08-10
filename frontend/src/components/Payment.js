import React, { useEffect, useState } from 'react'
import axios from "axios"

import CardSection from "./CardSection"
import Button from "@material-ui/core/Button"

import PropTypes from "prop-types"

import { useElements, CardElement, useStripe } from "@stripe/react-stripe-js"

function Payment(props) {
    const stripe = useStripe();
    const elements = useElements();
    const [secret, setSecret] = useState("");

    useEffect(() => {
        axios
        .get("/payments/secret")
        .then(res => {
            setSecret(res.data.client_secret);
        })
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Processing Payment...")
        if(!stripe || !elements) {
            console.log('damn');
            return;
        }

        const result = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        console.log(result);

        if(result.error) {
            console.log(result.error.message);
        } else {
            if(result.paymentIntent.status === 'succeeded') {
                console.log('great success');
                props.onPay();
                
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardSection />
            <Button disabled={!stripe} type="submit">Confirm Order</Button>
        </form>
    )
}

Payment.propTypes = {
    onPay: PropTypes.func.isRequired
}

export default Payment;