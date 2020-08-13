import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import axios from "axios";
import Button from "@material-ui/core/Button"
import RequestTime from "./RequestTime"
import Grid from "@material-ui/core/Grid"

function Request(props) {

    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric'};
    const timeOptions = { hour: 'numeric', minute: 'numeric' };

    const [request, setRequest] = useState({});
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [busy, setBusy] = useState(true);
    const [unavailableTimes, setUnavailableTimes] = useState([]);
    const requestID = props.match.params.requestID;
    let date;
    useEffect(() => {
        

        axios
        .get("/lesson/getRequest", { params: { requestID: requestID }})
        .then(res => {
            console.log(res.data)
            setRequest(res.data);
            setBusy(false);
            
        })
        .catch(err => console.log(err));

        axios
        .get("/tutors/unavailableTimes", { params: { tutorID: user.id } })
        .then(res => {
            setUnavailableTimes(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    console.log(request);
    console.log(busy);

    const isConflict = (date) => {

        
        let conflict = false;

         unavailableTimes.forEach( (time, index) => {
            const unavailable = new Date(time);
            console.log('a')
            if(date.getTime() >= unavailable.getTime() && date.getTime() <= (unavailable.getTime() + 3600000)) {
                console.log(date);
                console.log(unavailable);
                console.log(index)
                console.log('conflict')
                conflict = true;
                return;
            } else {
                console.log("no conflict")
            }
        })
        
        

        return conflict;
    }



    const onSubmit = (time) => {
        const submissionData = {
            studentID: request.studentID,
            tutorID: request.tutorID,
            dateAndTime: time,
            subject: request.course,
            tutorName: user.name,
            studentName: request.studentName,
            type: "SINGLE_SINGLE",
            studentEmail: request.studentEmail,
            tutorEmail: request.tutorEmail,
            requestID: requestID
        };

        console.log(request.subject)

        axios
        .post("/tutors/acceptRequest", submissionData)
        .then(res => {
            //Redirect to pending lessons on student payment
            props.history.push("/lessonsPendingPayment")
        })
        .catch(err => console.log(err))
    }

    const deny = () => {

        const submissionData = {
            requestID: requestID
        };

        axios
        .post("/tutors/denyRequest", submissionData)
        .then(res => {
            //redirect to requests page
            props.history.push("/requests")
        })
        .catch(err => console.log(err))
    }

    // return(
    //     <div>
    //     { !busy ? (

    //         <Paper>
    //         <Typography variant="h5">Lesson Request</Typography>

    //         <br />

    //         <Typography variant="body1">Course: {request.course}</Typography>
    //         <br />
    //         <Typography variant="body1">Description: {request.description}</Typography>

    //         {
    //            request.availableTimes && request.availableTimes.map((time, index) => {
    //             const date = new Date(time);
    //             return (
    //                 <div>
    //                 <Typography variant="body1">Date: {date.toLocaleDateString('en-CA', dateOptions)}</Typography>
                    
    //                 <Typography variant="body1">Time: {date.toLocaleTimeString('en-CA', timeOptions)}</Typography>
                    
    //                 <Button onClick={() => onSubmit(time)} disabled={isConflict(date)}>Select this Time</Button>
    //                 <br />
    //                 <br />
    //                 </div>
    //             )})
    //         }

    //         <Button onClick={deny}>Decline Request</Button>

    //     </Paper>

    //     ) : (
    //         <Typography variant="body1">Loading...</Typography>
    //     )}
    //     </div>
        
    // )

    return (
        <div>
            {
                !busy ? (
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper>
                            <Typography variant="h5">Course: {request.course}</Typography>
                            <Typography variant="body1">{request.description}</Typography>
                        </Paper>
                    </Grid>
                    {
                        request.availableTimes.map((time, index) => {
                            const date = new Date(time);

                            const dateString = date.toLocaleDateString("en-CA", dateOptions);
                            const timeString = date.toLocaleTimeString("en-CA", timeOptions);

                            return (
                                <Grid item xs={4}>
                                    <RequestTime
                                        disabled={isConflict(date)}
                                        timeString={timeString}
                                        dateString={dateString}
                                        select={() => onSubmit(time)}
                                    />
                                </Grid>
                            )
                        })
                    }
                    <Grid item xs={12}>
                        <Button onClick={deny} fullWidth variant="contained" color="secondary">Decline Request</Button>
                    </Grid>
                    </Grid>
                ) : (
                    <Typography variant="h5">Loading...</Typography>
                )
            }
        </div>
    )

}

export default Request;