import React from 'react'
import { CardElement } from "@stripe/react-stripe-js"

const CARD_ELEMENT_OPTIONS = {
    hidePostalCode: true,   //should remove needing to enter a postal code
    style: {
        base: {
            color: "#ffffff",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#ffffff"
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        },
    },
};

function CardSection() {
    return (
        <label>
            Card details
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
    )
}

export default CardSection;