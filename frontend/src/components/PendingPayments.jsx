import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import axios from "axios"
import { useSelector } from "react-redux"
import PendingPaymentCard from "./PendingPaymentCard"

const dateOptions = { weekday: "long", month: "long", day: "numeric"};
const timeOptions = { hour: "numeric", minute: "numeric"};

function PendingPayments(props) {

    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [pendingPayments, setPendingPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get("/users/pendingPayments", { params: { studentID: user.id } })
        .then(res => {
            setPendingPayments(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }, []);

    const enterPay = (paymentID) => {
        props.history.push("/pay/" + paymentID);
    };

    return (
        <Grid container spacing={2}>
        {
            !loading ? (
                pendingPayments.map(payment => {
                    const date = new Date(payment.dateAndTime);
                    const dateString = date.toLocaleDateString("en-CA", dateOptions) + ", " + date.toLocaleTimeString("en-CA", timeOptions);

                    return (
                        <Grid item xs={4}>
                            <PendingPaymentCard 
                                course={payment.subject}
                                description={payment.description}
                                enterPay={() => enterPay(payment._id)}
                                tutorName={payment.tutorName}
                                tutorEmail={payment.tutorEmail}
                                dateString={dateString}
                            />
                        </Grid>
                    )
                })
            ) : (
                <Typography variant="h5">Loading...</Typography>
            )   
        }
        </Grid>
    )
}

export default PendingPayments;