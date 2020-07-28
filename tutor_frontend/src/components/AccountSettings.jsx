import React, { useState, useEffect } from 'react'
import Button from "@material-ui/core/Button"
import { useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"
import axios from "axios"

const URI = "https://connect.stripe.com/express/oauth/authorize?client_id=ca_Hhx4MECM4ayyLP7qKPVrRuZw9ompwsUj&suggested_capabilities[]=transfers&stripe_user[business_type]=individual&stripe_user[email]="

function AccountSettings() {

    const [user, setUser] = useState(useSelector(state => state.auth.user));
    
    const [hasStripe, setHasStripe] = useState(false);

    const connectStripe = (e) => {

        let finalURI = URI + user.email;
        console.log(finalURI)
       window.location.href = finalURI;
    }

    useEffect(() => {
        axios
        .get("/tutors/findByEmail", { params: { email: user.email } })
        .then(res => {
            console.log(res);
            if(res.data.stripeID) {
                setHasStripe(true);
            }
        })
        .catch(err => console.log(err))

    }, [])

    return(
        <div>
            <Typography variant="h5">Name: {user.name}</Typography>
            <Typography variant="h5">Email: {user.email}</Typography>
            {
                !hasStripe ? (
                    <div>
                        <Typography variant="h5">Please connect your stripe account, if you don't you will not be paid for the lessons you teach</Typography>
                        <Button onClick={connectStripe}>Connect with stripe!</Button>
                    </div>
                ) : (
                    <Typography variant="h5">Your stripe account is connected! You are ready to recieve payments</Typography>
                )
            }
        </div>
    )
}

export default AccountSettings;