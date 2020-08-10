import React from 'react'

import Button from "@material-ui/core/Button"
import axios from 'axios'


function Payout() {

    const payout = (e) => {
        axios
        //make this not static
        .post("/payments/payOut", { tutorID: "5f15e64a023a5c42bb05e76a"})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Button onClick={payout}>Test Payout</Button>
        </div>
    )
}

export default Payout;