import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import axios from "axios";
import Button from "@material-ui/core/Button"

function Request(props) {

    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric'};
    const timeOptions = { hour: 'numeric', minute: 'numeric' };

    const [request, setRequest] = useState({});
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [busy, setBusy] = useState(true);
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
        .catch(err => console.log(err))
    }, []);

    console.log(request);
    console.log(busy);



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
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
        { !busy ? (

            <Paper>
            <Typography variant="h5">Lesson Request</Typography>

            <br />

            <Typography variant="body1">Course: {request.course}</Typography>
            <br />
            <Typography variant="body1">Description: {request.description}</Typography>

            {
               request.availableTimes && request.availableTimes.map((time, index) => {
                const date = new Date(time);
                return (
                    <div>
                    <Typography variant="body1">Date: {date.toLocaleDateString('en-CA', dateOptions)}</Typography>
                    
                    <Typography variant="body1">Time: {date.toLocaleTimeString('en-CA', timeOptions)}</Typography>
                    
                    <Button onClick={() => onSubmit(time)}>Select this Time</Button>
                    <br />
                    <br />
                    </div>
                )})
            }

            <Button onClick={deny}>Decline Request</Button>

        </Paper>

        ) : (
            <Typography variant="body1">Loading...</Typography>
        )}
        </div>
        
    )

}

export default Request;