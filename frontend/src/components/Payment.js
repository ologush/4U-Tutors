import React, { useEffect, useState } from 'react'
import axios from "axios"

import CardSection from "./CardSection"
import Button from "@material-ui/core/Button"

import PropTypes from "prop-types"

import { useElements, CardElement, useStripe } from "@stripe/react-stripe-js"
import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"


const dateOptions = { month: "long", weekday: "long", day: "numeric"}
const timeOptions = { hour: "numeric", minute: "numeric" }



function Payment(props) {
    const stripe = useStripe();
    const elements = useElements();
    const [secret, setSecret] = useState("");
    const [dateString, setDateString] = useState("");
    useEffect(() => {

        setDateString(props.date.toLocaleDateString("en-CA", dateOptions) + ", " + props.date.toLocaleTimeString("en-CA", timeOptions));

        axios
        .get("/payments/secret", { params: { cost: props.cost } })
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
            <Paper>
            <CardSection />
            <Divider />
            <Typography variant="h5">Cost: ${props.cost}</Typography>
            <Typography variant="h5">At: {dateString}</Typography>
            <Typography variant="h5">For: {props.course}</Typography>

            <Button disabled={!stripe} type="submit">Confirm Order</Button>
            </Paper>
        </form>
    )
}

Payment.propTypes = {
    onPay: PropTypes.func.isRequired,
    date: PropTypes.object.isRequired,
    cost: PropTypes.number.isRequired,
    course: PropTypes.string.isRequired
}

export default Payment;