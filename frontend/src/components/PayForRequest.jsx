import React, { useEffect, useState } from 'react'
import Payment from "./Payment"
import axios from "axios"
import { useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"

function PayForRequest(props) {

    const { paymentID } = props.match.params;
    console.log(paymentID);

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [lessonConfirm, setLessonConfirm] = useState({});

    useEffect(() => {
        axios
        .get("/lesson/user/lessonConfirm", { params: { confirmID: paymentID } })
        .then(res => {
            setLessonConfirm(res.data);
            setLoading(false);
        })
    }, []);

    const onPay = () => {
        axios
        .post("/lesson/setLessonFromConfirm", { confirmID: paymentID })
        .then(res => {
            props.history.push("/displayLessons");
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
        {
            !loading ? (
                <Payment
                    onPay={onPay}
                    course={lessonConfirm.subject}
                    cost={lessonConfirm.cost}
                    date={new Date(lessonConfirm.dateAndTime)}
                />
            ) : (
                <Typography variant="h5">Loading...</Typography>
            )
        }
        </div>
    )
}

export default PayForRequest;