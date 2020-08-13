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

    useEffect(() => {
        axios
        .get("/users/getRequests", { params: { studentID: user.id } })
        .then(res => {
            setRequests(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }, []);

    const cancelRequest = (requestID) => {
        axios
        .post("/lessons/cancelRequest", { requestID: requestID })
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
        <Grid container spacing={2}>
        {
            !loading ? (
                requests.map(request => {

                    return (
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
                    )
                })
            ) : (
                <Typography variant="h5">Loading...</Typography>
            )
        }
        </Grid>
    )
}

export default MyRequests;