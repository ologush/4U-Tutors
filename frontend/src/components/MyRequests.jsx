import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import axios from "axios"
import { useSelector } from "react-redux"
import RequestCard from "./RequestCard"

function MyRequests(props) {
    
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [requestsEmpty, setRequestsEmpty] = useState(false);

    useEffect(() => {
        axios
        .get("/users/getRequests", { params: { studentID: user.id } })
        .then(res => {
            setRequests(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log('damn')
            setLoading(false);
            setRequestsEmpty(true);
        })
    }, []);

    const cancelRequest = (requestID) => {
        axios
        .post("/lessons/cancelRequest", { requestID: requestID })
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    let display;

    if(!requestsEmpty) {
        display = 
        (<div>
        {requests.map(request => 

            (
                <Grid item xs={4}>
                    <RequestCard 
                        course={request.course}
                        description={request.description}
                        times={request.availableTimes}
                        tutorName={request.tutorName}
                        tutorEmail={request.tutorEmail}
                        onCancel={() => cancelRequest(request._id)}
                    />
                </Grid>
            ))}
            </div>)
        
    } else {
        display = <Typography variant="h5">No Pending Requests</Typography>
    }

    return (
        <Grid container spacing={2}>
        {
            !loading ? (
                display
                
            ) : (
                <Typography variant="h5">Loading...</Typography>
            )
        }
        </Grid>
    )
}

export default MyRequests;