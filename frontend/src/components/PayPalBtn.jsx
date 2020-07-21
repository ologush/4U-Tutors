import React, { Component } from 'react'
import { PayPalButton } from "react-paypal-button-v2"
import PropTypes from "prop-types"

const options = {
    shippingPreference: "NO_SHIPPING",

}

class PayPalBtn extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <PayPalButton 
                amount={this.props.amount}
                currency={"CAD"}
                onSuccess={(details, data) => {
                    console.log(details);
                    console.log(data);
                    this.props.onSuccess();
                }}
                shippingPreference="NO_SHIPPING"

                options={{
                    clientId: "AQGhRTy5LENUVfn-PHd_7cVGr2yePsvw81VgVuHMelyaYrxjkWQcbOhLrc7QD4dLfOxVScgzPfxUaOfL",
                    currency: "CAD"
                }}
            
            />
        );
    }
}

PayPalBtn.propTypes = {
    amount: PropTypes.number.isRequired,
    onSuccess: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired

}

export default PayPalBtn;